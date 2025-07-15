const menuLinks = document.querySelectorAll('.sidebar a');
const sections = document.querySelectorAll('.section');
let currentSectionId = 'inicio';

function showSection(newId) {
  if (newId === currentSectionId) return;

  const currentSection = document.getElementById(currentSectionId);
  const newSection = document.getElementById(newId);

  currentSection.classList.add('slide-out-left');
  currentSection.classList.remove('active');

  currentSection.addEventListener('animationend', () => {
    currentSection.classList.remove('slide-out-left');
    currentSection.style.opacity = '0';
    currentSection.style.pointerEvents = 'none';
    currentSection.style.position = 'absolute';
    currentSection.style.zIndex = '0';

    newSection.style.opacity = '0';
    newSection.style.pointerEvents = 'auto';
    newSection.style.position = 'relative';
    newSection.style.zIndex = '2';
    newSection.classList.add('slide-in-right', 'active');

    newSection.addEventListener('animationend', () => {
      newSection.classList.remove('slide-in-right');
      newSection.style.opacity = '1';
      newSection.style.pointerEvents = 'auto';
      newSection.style.position = 'relative';
      newSection.style.zIndex = '1';
      currentSectionId = newId;
    }, { once: true });
  }, { once: true });
}

// Inicializa - só mostra a seção início
sections.forEach(sec => {
  if (sec.id === 'inicio') {
    sec.classList.add('active');
    sec.style.opacity = '1';
    sec.style.pointerEvents = 'auto';
    sec.style.position = 'relative';
    sec.style.zIndex = '1';
  } else {
    sec.style.opacity = '0';
    sec.style.pointerEvents = 'none';
    sec.style.position = 'absolute';
    sec.style.zIndex = '0';
  }
});

// Configura cliques do menu
menuLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    showSection(targetId);
  });
});

// Efeito digitando na home
const phrases = [
  "Desenvolvedora Web",
  "Apaixonada por tecnologia",
  "Criadora de experiências digitais"
];

let i = 0, j = 0, currentPhrase = [], isDeleting = false, isEnd = false;

function loop() {
  const typewriter = document.getElementById('typewriter');
  isEnd = false;
  typewriter.innerHTML = currentPhrase.join('');

  if (i < phrases.length) {
    if (!isDeleting && j <= phrases[i].length) {
      currentPhrase.push(phrases[i][j]);
      j++;
    }

    if (isDeleting && j <= phrases[i].length) {
      currentPhrase.pop();
      j--;
    }

    if (j == phrases[i].length) {
      isEnd = true;
      isDeleting = true;
    }

    if (isDeleting && j === 0) {
      currentPhrase = [];
      isDeleting = false;
      i++;
      if (i === phrases.length) {
        i = 0;
      }
    }
  }

  const spedUp = Math.random() * (80 - 50) + 50;
  const normalSpeed = Math.random() * (300 - 200) + 200;
  const time = isEnd ? 1000 : isDeleting ? spedUp : normalSpeed;
  setTimeout(loop, time);
}

loop();

document.querySelectorAll('.carrossel').forEach(carrossel => {
  const imagens = carrossel.querySelector('.carrossel-imagens');
  const imgs = imagens.querySelectorAll('img');
  let index = 0;

  const updateSlide = () => {
    imagens.style.transform = `translateX(-${index * 100}%)`;
  };

  carrossel.querySelector('.next').addEventListener('click', () => {
    index = (index + 1) % imgs.length;
    updateSlide();
  });

  carrossel.querySelector('.prev').addEventListener('click', () => {
    index = (index - 1 + imgs.length) % imgs.length;
    updateSlide();
  });
});
