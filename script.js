window.addEventListener('load', () => {
  setTimeout(() => document.querySelector('.loader').classList.add('hidden'), 800);
});

const glow = document.querySelector('.mouse-glow');
if (glow) {
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}

const themeToggle = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

function updateThemeIcon(theme) {
  if (themeToggle) themeToggle.textContent = theme === 'dark'? '☀️' : '🌙';
}
updateThemeIcon(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'dark'? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });
}

const terminal = document.getElementById('terminal');
if (terminal) {
  const commands = {
    whoami: "Amna Aqeel — Software Engineering Student",
    skills: "Java, C++, OOP, HTML, CSS, JavaScript",
    certifications: "Prompt Engineering, Intro to SE, HTML/CSS/JS, Cyber Security",
    contact: "5121325001@student.iiui.edu.pk"
  };
  const MAX_TERMINAL_LINES = 8;
  let cmdIndex = 0;
  function typeCmd() {
    const keys = Object.keys(commands);
    if (cmdIndex >= keys.length) cmdIndex = 0;
    const key = keys[cmdIndex];
    const block = document.createElement('div');
    block.innerHTML = `<div>&gt; ${key}</div><div style="color:var(--sage)">${commands[key]}</div>`;
    terminal.appendChild(block);
    while (terminal.children.length > MAX_TERMINAL_LINES) {
      terminal.removeChild(terminal.firstChild);
    }
    terminal.scrollTop = terminal.scrollHeight;
    cmdIndex++;
    setTimeout(typeCmd, 2500);
  }
  typeCmd();
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, idx) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), idx * 100);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const projectData = {
  banking: { title: "GUI Banking Application", desc: "Full desktop banking system built in Core Java", problem: "Manual banking was slow and error prone", solution: "Built OOP system with Swing GUI for deposits, withdrawals, and transfers", learn: "Mastered inheritance, polymorphism, and GUI event handling" },
  student: { title: "Student Record Management", desc: "Console C++ application", problem: "Tracking student data manually in files", solution: "File handling for CRUD operations: add, delete, search students", learn: "Pointers, file I/O, and modular programming" },
  portfolio: { title: "Personal Portfolio Website", desc: "This site — a fully responsive, interactive portfolio", problem: "Needed a single place to showcase real projects, skills, and certifications to recruiters", solution: "Built with HTML, CSS, and JavaScript — dark/light themes, scroll animations, an editable CV, and direct links to live project code", learn: "Responsive layout, accessibility, and deploying via GitHub Pages" }
};

const projectModal = document.getElementById('projectModal');
function openProjectModal(row) {
  const data = projectData[row.dataset.project];
  if (!data) return;
  document.getElementById('modalTitle').textContent = data.title;
  document.getElementById('modalDesc').textContent = data.desc;
  document.getElementById('modalProblem').textContent = data.problem;
  document.getElementById('modalSolution').textContent = data.solution;
  document.getElementById('modalLearn').textContent = data.learn;
  projectModal.classList.add('open');
}

document.querySelectorAll('.project-row').forEach(row => {
  row.addEventListener('click', (e) => {
    if (e.target.closest('a')) return;
    openProjectModal(row);
  });
  row.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openProjectModal(row);
    }
  });
});
if (projectModal) {
  projectModal.querySelector('.close-modal').addEventListener('click', () => projectModal.classList.remove('open'));
  projectModal.addEventListener('click', (e) => { if (e.target === projectModal) projectModal.classList.remove('open'); });
}

const cvModal = document.getElementById('cvModal');
document.getElementById('openCV').addEventListener('click', () => cvModal.classList.add('open'));
document.getElementById('closeCV').addEventListener('click', () => cvModal.classList.remove('open'));
cvModal.addEventListener('click', (e) => { if (e.target === cvModal) cvModal.classList.remove('open'); });

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    projectModal?.classList.remove('open');
    cvModal?.classList.remove('open');
  }
});

const editableIds = ['cvName', 'cvRole', 'cvEducation', 'cvSkills', 'cvProjects', 'cvCerts'];
const editToggle = document.getElementById('editToggle');
const saveCV = document.getElementById('saveCV');
const resetCV = document.getElementById('resetCV');
const editHint = document.getElementById('editHint');

const originalCV = {};
editableIds.forEach(id => { originalCV[id] = document.getElementById(id).innerHTML; });

function loadSavedCV() {
  const saved = localStorage.getItem('amna_cv