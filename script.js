/* ===== EDIT THESE DETAILS ===== */
const CONFIG = {
  whatsappNumber: "2347049625916", // digits only, with country code. Demo number: replace with the owner's.
  displayPhone: "+234 704 962 5916",
  email: "hello@example.com",
  restaurant: "Savanna Table",
  times: ["12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00"]
};
const MENU = [
  {n:"Jollof Rice with Grilled Chicken",d:"Smoky party jollof with spiced grilled chicken and fried plantain.",p:6500,c:"Main Courses",i:"jollof",pop:1},
  {n:"Egusi Soup with Pounded Yam",d:"Melon seed stew with greens, stockfish and soft pounded yam.",p:7500,c:"Local Specials",i:"egusi",pop:1},
  {n:"Grilled Tilapia",d:"Whole tilapia, charcoal grilled in pepper marinade.",p:8500,c:"Main Courses",i:"tilapia",pop:1},
  {n:"Suya Platter",d:"Thinly sliced beef with yaji spice, onions and tomato.",p:5500,c:"Starters",i:"suya",pop:1},
  {n:"Fried Rice with Chicken",d:"Vegetable fried rice with crisp chicken and coleslaw.",p:6000,c:"Main Courses",i:"fried-rice",pop:1},
  {n:"Pepper Soup",d:"Light, fiery broth with catfish or goat meat and uziza.",p:5000,c:"Starters",i:"pepper-soup",pop:1},
  {n:"Puff Puff Bites",d:"Warm, sugar-dusted dough balls with a chilli dip.",p:2500,c:"Starters",i:"starter"},
  {n:"Moi Moi",d:"Steamed bean pudding with egg and fish.",p:2800,c:"Starters",i:"starter"},
  {n:"Ofada Rice and Ayamase",d:"Local rice with green pepper stew and assorted meats.",p:7800,c:"Local Specials",i:"jollof"},
  {n:"Efo Riro with Eba",d:"Spinach stew in rich pepper base with garri.",p:6800,c:"Local Specials",i:"egusi"},
  {n:"Ofe Onugbu (Bitterleaf Soup)",d:"Traditional bitterleaf soup served with fufu.",p:7200,c:"Local Specials",i:"egusi"},
  {n:"Zobo Cooler",d:"Chilled hibiscus drink with ginger and pineapple.",p:1800,c:"Drinks",i:"drink"},
  {n:"Chapman",d:"Classic fruity non-alcoholic cocktail with bitters.",p:2500,c:"Drinks",i:"drink"},
  {n:"Fresh Palm Wine Mocktail",d:"Sparkling coconut and palm-style spritz (alcohol-free).",p:2800,c:"Drinks",i:"drink"},
  {n:"Plantain Cheesecake",d:"Caramelised plantain on a biscuit base.",p:3500,c:"Desserts",i:"dessert"},
  {n:"Coconut Rice Pudding",d:"Creamy coconut pudding with toasted cashews.",p:3200,c:"Desserts",i:"dessert"}
];
const CATS = ["All","Starters","Main Courses","Local Specials","Drinks","Desserts"];
const $ = s => document.querySelector(s);
const naira = n => "₦" + n.toLocaleString("en-NG");
const wa = text => `https://wa.me/${CONFIG.whatsappNumber}` + (text ? `?text=${encodeURIComponent(text)}` : "");

function card(m){
  const el = document.createElement("article"); el.className = "card";
  el.innerHTML = `<img src="assets/img/${m.i}.svg" alt="${m.n}" loading="lazy" width="800" height="600"><div class="card-b"><h3></h3><p></p><span class="price">${naira(m.p)}</span></div>`;
  el.querySelector("h3").textContent = m.n; el.querySelector("p").textContent = m.d; return el;
}
/* Popular dishes */
MENU.filter(m => m.pop).forEach(m => $("#popularGrid").append(card(m)));
/* Menu filters */
const filters = $("#filters");
CATS.forEach((c,i) => { const b = document.createElement("button"); b.type="button"; b.textContent=c; b.setAttribute("aria-pressed", i===0); b.addEventListener("click",()=>show(c)); filters.append(b); });
function show(cat){
  [...filters.children].forEach(b => b.setAttribute("aria-pressed", b.textContent===cat));
  const list = MENU.filter(m => cat==="All" || m.c===cat);
  const g = $("#menuGrid"); g.replaceChildren(...list.map(card));
  $("#menuCount").textContent = `${list.length} dish${list.length===1?"":"es"} in ${cat==="All"?"the full menu":cat}`;
}
show("All");
/* Mobile nav */
const burger = $("#burger"), nav = $("#nav");
function setNav(open){ nav.classList.toggle("open",open); burger.setAttribute("aria-expanded",open); burger.setAttribute("aria-label",open?"Close menu":"Open menu"); }
burger.addEventListener("click",()=>setNav(!nav.classList.contains("open")));
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>setNav(false)));
document.addEventListener("keydown",e=>{ if(e.key==="Escape"&&nav.classList.contains("open")){setNav(false);burger.focus();} });
/* Active link on scroll */
const links = [...nav.querySelectorAll("a")];
const io = new IntersectionObserver(es => es.forEach(e => { if(e.isIntersecting){ links.forEach(l=>l.classList.toggle("active", l.getAttribute("href")==="#"+e.target.id)); } }), {rootMargin:"-45% 0px -50% 0px"});
["home","menu","about","gallery","reservations","contact"].forEach(id=>io.observe(document.getElementById(id)));
/* Config -> links */
$("#waFloat").href = wa(`Hello ${CONFIG.restaurant}, I have a question.`);
$("#waContact").href = wa(`Hello ${CONFIG.restaurant}, I have a question.`);
$("#waDirect").href = wa(`Hello ${CONFIG.restaurant}, I would like to reserve a table.`);
document.querySelectorAll("[data-tel]").forEach(a=>{a.href="tel:+"+CONFIG.whatsappNumber;a.textContent=CONFIG.displayPhone;});
document.querySelectorAll("[data-mail]").forEach(a=>{a.href="mailto:"+CONFIG.email;a.textContent=CONFIG.email;});
$("#year").textContent = new Date().getFullYear();
/* Reservation form */
const form = $("#resForm"), confirmBox = $("#confirm");
CONFIG.times.forEach(t=>$("#time").add(new Option(t,t)));
for(let i=1;i<=12;i++) $("#guests").add(new Option(i+(i===1?" guest":" guests"),i));
$("#guests").add(new Option("More than 12 (tell us in requests)","12+"));
const dateEl = $("#date"); const today = new Date(); today.setMinutes(today.getMinutes()-today.getTimezoneOffset());
dateEl.min = today.toISOString().slice(0,10);
const rules = {
  name: v => v.trim().length<2 && "Enter your full name.",
  phone: v => !/^[+\d][\d\s()-]{6,17}$/.test(v.trim()) && "Enter a valid phone number, for example 0704 962 5916.",
  email: v => !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) && "Enter a valid email address, like name@example.com.",
  date: v => (!v ? "Choose a date." : v<dateEl.min && "Choose today or a future date."),
  time: v => !v && "Choose a time.",
  guests: v => !v && "Choose the number of guests."
};
function check(f){ const el=form.elements[f], msg=rules[f](el.value); $("#e-"+f).textContent = msg||""; el.setAttribute("aria-invalid", !!msg); if(msg) el.setAttribute("aria-describedby","e-"+f); return !msg; }
Object.keys(rules).forEach(f=>form.elements[f].addEventListener("blur",()=>check(f)));
form.addEventListener("submit",e=>{
  e.preventDefault(); confirmBox.hidden = true;
  const bad = Object.keys(rules).filter(f=>!check(f));
  if(bad.length){ form.elements[bad[0]].focus(); return; }
  const d = Object.fromEntries(new FormData(form));
  const msg = `Hello ${CONFIG.restaurant}, I would like to reserve a table.\nName: ${d.name}\nPhone: ${d.phone}\nEmail: ${d.email}\nDate: ${d.date}\nTime: ${d.time}\nGuests: ${d.guests}\nRequests: ${d.notes||"None"}`;
  confirmBox.innerHTML = `<strong>Details checked. Your reservation is not sent yet.</strong><p>This website is a frontend demonstration with no server, so nothing has been submitted. To request this booking, send it by WhatsApp.</p>`;
  const a = document.createElement("a"); a.className="btn gold"; a.href=wa(msg); a.target="_blank"; a.rel="noopener"; a.textContent="Send reservation on WhatsApp";
  const r = document.createElement("button"); r.type="button"; r.className="btn ghost"; r.textContent="Clear form"; r.style.marginLeft=".6rem";
  r.addEventListener("click",()=>{form.reset();confirmBox.hidden=true;form.elements.name.focus();});
  confirmBox.append(a,r); confirmBox.hidden=false; confirmBox.focus();
});
