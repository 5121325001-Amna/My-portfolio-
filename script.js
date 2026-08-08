window.addEventListener('load', () => {
  document.querySelector('.loader').style.opacity = '0';
  setTimeout(() => document.querySelector('.loader').style.display = 'none', 300);
});

const html = document.documentElement;
const themeToggle = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
themeToggle.textContent = savedTheme === 'dark'? '☀️' : '🌙';
themeToggle.onclick = () => {
  const next = html.getAttribute('data-theme') === 'dark'? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  themeToggle.textContent = next === 'dark'? '☀️' : '🌙';
  localStorage.setItem('theme', next);
};

// Mobile nav
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.onclick = () => navLinks.classList.toggle('active');
function closeMenu(){ navLinks.classList.remove('active'); }
document.querySelectorAll('.nav-links a').forEach(a=>a.onclick=closeMenu);
window.onscroll = closeMenu;

// Back to top
const backToTop = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => backToTop.style.display = scrollY > 500? 'block' : 'none');
backToTop.onclick = () => scrollTo({top:0, behavior:'smooth'});

// Mouse glow desktop only
if(innerWidth > 768) addEventListener('mousemove', e => {
  const g = document.querySelector('.mouse-glow');
  g.style.left = e.clientX - 200 + 'px'; g.style.top = e.clientY - 200 + 'px';
});

// Terminal
const terminal = document.getElementById('terminal');
const lines = ['$ whoami','Amna Aqeel','$ skills','Java, C++, OOP, HTML, CSS, JS','$ status','Open to Internships'];
let l=0,c=0;
function type(){
  if(l<lines.length){
    if(c<lines[l].length){ terminal.innerHTML+=lines[l][c++]; setTimeout(type,40); }
    else{ terminal.innerHTML+='<br>'; l++; c=0; setTimeout(type,500); }
  }
}
setTimeout(type,1000);

// Modals
const projectData = {
  banking: { title:"GUI Banking Application", desc:"Core Java desktop app with login, deposit, withdraw using OOP", problem:"Apply OOP in real project", solution:"Java Swing + File I/O", learn:"Mastered Swing and OOP" },
  student: { title:"Student Record Management", desc:"Console C++ app for managing student grades with file handling", problem:"Manual record keeping", solution:"CRUD with file I/O in C++", learn:"File handling and structs" },
  portfolio: { title:"Personal Portfolio Website", desc:"This site — responsive with dark/light theme", problem:"Showcase skills professionally", solution:"HTML CSS JS + GitHub Pages", learn:"Responsive design and deployment" }
};
const pModal=document.getElementById('projectModal'), cModal=document.getElementById('cvModal');
function closeAll(){ pModal.style.display=cModal.style.display='none'; document.body.style.overflow='auto'; }
document.querySelectorAll('.project-row').forEach(r=>r.onclick=()=>{
  const d=projectData[r.dataset.project];
  modalTitle.textContent=d.title; modalDesc.textContent=d.desc; modalProblem.textContent=d.problem; modalSolution.textContent=d.solution; modalLearn.textContent=d.learn;
  pModal.style.display='flex'; document.body.style.overflow='hidden';
});
document.querySelectorAll('.close-modal').forEach(b=>b.onclick=closeAll);
window.addEventListener('scroll', ()=>pModal.style.display==='flex'&&closeAll());

// CV
openCV.onclick=()=>{cModal.style.display='flex'; document.body.style.overflow='hidden';};
let edit=false;
editToggle.onclick=()=>{
  edit=!edit;
  ['cvName','cvRole','cvEducation','cvSkills','cvProjects','cvCerts'].forEach(id=>document.getElementById(id).contentEditable=edit);
  editToggle.style.display=edit?'none':'inline-block'; saveCV.style.display=edit?'inline-block':'none'; editHint.style.display=edit?'block':'none';
};
saveCV.onclick=()=>{
  const data={}; ['cvName','cvRole','cvEducation','cvSkills','cvProjects','cvCerts'].forEach(id=>data[id]=document.getElementById(id).innerHTML);
  localStorage.setItem('cvData',JSON.stringify(data)); alert('CV Saved!'); editToggle.click();
};

// Reveal
const obs=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&(e.target.style.opacity=1,e.target.style.transform='translateY(0)')),{threshold:0.1});
document.querySelectorAll('.reveal').forEach(el=>{el.style.opacity=0;el.style.transform='translateY(20px)';el.style.transition='0.6s';obs.observe(el);});