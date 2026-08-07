// ========== LOADER ==========
window.addEventListener('load', () => {
  const loader = document.querySelector('.loader');
  loader.style.opacity = '0';
  setTimeout(() => loader.style.display = 'none', 500);
});

// ========== THEME TOGGLE ==========
const themeToggle = document.querySelector('.theme-toggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
themeToggle.textContent = savedTheme === 'dark'? '☀️' : '🌙';

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark'? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  themeToggle.textContent = next === 'dark'? '☀️' : '🌙';
  localStorage.setItem('theme', next);
});

// ========== MOBILE NAVBAR / HAMBURGER ==========
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) &&!navLinks.contains(e.target)) {
    navLinks.classList.remove('active');
  }
});

// ========== BACK TO TOP BUTTON ==========
const backToTop = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTop.style.display = 'block';
  } else {
    backToTop.style.display = 'none';
  }
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========== MOUSE GLOW EFFECT ==========
document.addEventListener('mousemove', e => {
  const glow = document.querySelector('.mouse-glow');
  glow.style.left = e.clientX - 200 + 'px';
  glow.style.top = e.clientY - 200 + 'px';
});

// ========== TYPING ANIMATION IN TERMINAL ==========
const terminal = document.getElementById('terminal');
const terminalLines = [
  '$ whoami',
  'Amna Aqeel',
  '$ cat skills.txt',
  'Java, C++, OOP, HTML, CSS, JavaScript',
  '$ status',
  'Open to Internships & Collaborations'
];
let line = 0;
let char = 0;

function typeTerminal() {
  if (line < terminalLines.length) {
    if (char < terminalLines[line].length) {
      terminal.innerHTML += terminalLines[line].charAt(char);
      char++;
      setTimeout(typeTerminal, 50);
    } else {
      terminal.innerHTML += '<br>';
      line++;
      char = 0;
      setTimeout(typeTerminal, 500);
    }
  }
}
setTimeout(typeTerminal, 1500);

// ========== PROJECT MODAL ==========
const projectData = {
  banking: {
    title: "GUI Banking Application",
    desc: "A full-featured desktop banking system built with Core Java and Swing.",
    problem: "Needed a way to simulate real banking operations for OOP practice.",
    solution: "Built login, deposit, withdraw, and balance check using OOP principles and file handling.",
    learn: "Mastered Java Swing, OOP, and exception handling."
  },
  student: {
    title: "Student Record Management",
    desc: "Console-based C++ application for managing student data.",
    problem: "Manual record keeping was inefficient and error-prone.",
    solution: "Created CRUD operations with file handling to store data persistently.",
    learn: "Learned file I/O, structs, and modular programming in C++."
  },
  portfolio: {
    title: "Personal Portfolio Website",
    desc: "Responsive portfolio with dark/light theme and smooth animations.",
    problem: "Needed a professional way to showcase projects and skills.",
    solution: "Built from scratch using HTML, CSS, JS with responsive design.",
    learn: "Improved in responsive design, UI/UX, and deployment on GitHub Pages."
  }
};

const projectModal = document.getElementById('projectModal');
document.querySelectorAll('.project-row').forEach(row => {
  row.addEventListener('click', () => {
    const key = row.dataset.project;
    const data = projectData[key];
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalDesc').textContent = data.desc;
    document.getElementById('modalProblem').textContent = data.problem;
    document.getElementById('modalSolution').textContent = data.solution;
    document.getElementById('modalLearn').textContent = data.learn;
    projectModal.style.display = 'flex';
  });
});

document.querySelector('#projectModal.close-modal').addEventListener('click', () => {
  projectModal.style.display = 'none';
});
projectModal.addEventListener('click', (e) => {
  if (e.target === projectModal) projectModal.style.display = 'none';
});

// ========== CV MODAL + EDIT FEATURE ==========
const cvModal = document.getElementById('cvModal');
const openCV = document.getElementById('openCV');
const closeCV = document.getElementById('closeCV');
const editToggle = document.getElementById('editToggle');
const saveCV = document.getElementById('saveCV');
const resetCV = document.getElementById('resetCV');
const exportCV = document.getElementById('exportCV');
const importFile = document.getElementById('importFile');

const cvElements = ['cvName', 'cvRole', 'cvEducation', 'cvSkills', 'cvProjects', 'cvCerts'];
const originalCV = {};

// Save original on load
window.addEventListener('load', () => {
  cvElements.forEach(id => {
    originalCV[id] = document.getElementById(id).innerHTML;
  });
  loadCVFromStorage();
});

openCV.addEventListener('click', () => cvModal.style.display = 'flex');
closeCV.addEventListener('click', () => cvModal.style.display = 'none');
cvModal.addEventListener('click', (e) => {
  if (e.target === cvModal) cvModal.style.display = 'none';
});

// Edit Toggle
let isEditing = false;
editToggle.addEventListener('click', () => {
  isEditing =!isEditing;
  cvElements.forEach(id => {
    document.getElementById(id).contentEditable = isEditing;
  });
  editToggle.style.display = isEditing? 'none' : 'inline-block';
  saveCV.style.display = isEditing? 'inline-block' : 'none';
  document.getElementById('editHint').style.display = isEditing? 'block' : 'none';
});

// Save CV to localStorage
saveCV.addEventListener('click', () => {
  const cvData = {};
  cvElements.forEach(id => {
    cvData[id] = document.getElementById(id).innerHTML;
  });
  localStorage.setItem('cvData', JSON.stringify(cvData));
  alert('CV Saved! Changes will appear next time you open it.');
  editToggle.click(); // exit edit mode
});

// Reset CV
resetCV.addEventListener('click', () => {
  if (confirm('Reset CV to original?')) {
    cvElements.forEach(id => {
      document.getElementById(id).innerHTML = originalCV[id];
    });
    localStorage.removeItem('cvData');
  }
});

// Load CV from localStorage
function loadCVFromStorage() {
  const saved = localStorage.getItem('cvData');
  if (saved) {
    const cvData = JSON.parse(saved);
    cvElements.forEach(id => {
      if (cvData[id]) document.getElementById(id).innerHTML = cvData[id];
    });
  }
}

// Export CV as JSON
exportCV.addEventListener('click', () => {
  const cvData = {};
  cvElements.forEach(id => {
    cvData[id] = document.getElementById(id).innerHTML;
  });
  const blob = new Blob([JSON.stringify(cvData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Amna_CV_Data.json';
  a.click();
});

// Import CV from JSON
importFile.addEventListener('change', (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = (event) => {
    const cvData = JSON.parse(event.target.result);
    cvElements.forEach(id => {
      if (cvData[id]) document.getElementById(id).innerHTML = cvData[id];
    });
    localStorage.setItem('cvData', JSON.stringify(cvData));
    alert('CV Imported Successfully!');
  };
  reader.readAsText(file);
});

// ========== REVEAL ON SCROLL ANIMATION ==========
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'all 0.6s ease';
  observer.observe(el);
});