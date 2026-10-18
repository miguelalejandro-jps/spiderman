// BASE DE DATOS DE TRAJES CON SVG
const suitsData = [
  {
    id: 'classic',
    name: 'Traje Clásico',
    category: 'clasico',
    creator: 'Peter Parker',
    firstApp: 'Amazing Fantasy #15 (1962)',
    description: 'El traje tradicional de malla roja y azul con el emblemático patrón de telaraña.',
    power: 70,
    tech: 40,
    stealth: 50,
    agility: 95,
    svg: `<svg viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="45" fill="#e62429"/>
      <path d="M 20 50 Q 50 20 80 50 Q 50 80 20 50 Z" fill="#0055ff"/>
      <polygon points="50,30 35,65 50,55 65,65" fill="#ffffff" stroke="#000" stroke-width="2"/>
    </svg>`
  },
  {
    id: 'iron-spider',
    name: 'Iron Spider',
    category: 'tech',
    creator: 'Tony Stark',
    firstApp: 'The Amazing Spider-Man #529 (2006)',
    description: 'Equipado con nanotecnología avanzada, patas mecánicas ("waldoes") y blindaje.',
    power: 92,
    tech: 98,
    stealth: 40,
    agility: 88,
    svg: `<svg viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="45" fill="#a81c1c"/>
      <circle cx="50" cy="50" r="30" fill="#ffd700"/>
      <polygon points="50,25 35,65 50,55 65,65" fill="#a81c1c"/>
    </svg>`
  },
  {
    id: 'symbiote',
    name: 'Traje Negro / Simbionte',
    category: 'simbionte',
    creator: 'Origen Alienígena',
    firstApp: 'Secret Wars #8 (1984)',
    description: 'Traje alienígena vivo que potencia drásticamente la fuerza y genera telaraña orgánica.',
    power: 95,
    tech: 20,
    stealth: 85,
    agility: 90,
    svg: `<svg viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="45" fill="#111111"/>
      <polygon points="50,20 30,70 50,58 70,70" fill="#ffffff"/>
    </svg>`
  },
  {
    id: 'stealth',
    name: 'Stealth Suit (Big Time)',
    category: 'tech',
    creator: 'Peter Parker (Horizon Labs)',
    firstApp: 'The Amazing Spider-Man #650 (2010)',
    description: 'Diseñado con tecnología de refracción de luz para invisibilidad y anulación de sonido.',
    power: 75,
    tech: 90,
    stealth: 100,
    agility: 92,
    svg: `<svg viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="45" fill="#1a1a1a"/>
      <circle cx="50" cy="50" r="25" fill="none" stroke="#00ffcc" stroke-width="4"/>
      <polygon points="50,30 40,65 50,58 60,65" fill="#00ffcc"/>
    </svg>`
  },
  {
    id: '2099',
    name: 'Spider-Man 2099',
    category: 'multiverso',
    creator: 'Miguel O\'Hara',
    firstApp: 'Amazing Spider-Man #365 (1992)',
    description: 'Fabricado con moléculas inestables, garra retráctil y alas de telaraña para planear.',
    power: 88,
    tech: 92,
    stealth: 60,
    agility: 94,
    svg: `<svg viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="45" fill="#002266"/>
      <polygon points="50,15 30,50 50,85 70,50" fill="#e62429"/>
    </svg>`
  },
  {
    id: 'miles',
    name: 'Miles Morales Suit',
    category: 'multiverso',
    creator: 'Miles Morales',
    firstApp: 'Ultimate Fallout #4 (2011)',
    description: 'Traje negro y rojo diseñado para complementar sus habilidades de camuflaje y ráfaga Venom.',
    power: 82,
    tech: 60,
    stealth: 90,
    agility: 96,
    svg: `<svg viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="45" fill="#181818"/>
      <polygon points="50,25 35,65 50,55 65,65" fill="#e62429"/>
    </svg>`
  }
];

// ELEMENTOS DOM
const suitsGrid = document.getElementById('suitsGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const modal = document.getElementById('suitModal');
const closeModal = document.getElementById('closeModal');
const modalBody = document.getElementById('modalBody');
const compare1 = document.getElementById('compareSuit1');
const compare2 = document.getElementById('compareSuit2');
const compareResults = document.getElementById('compareResults');

// RENDERIZAR CARDS
function renderSuits(data) {
  suitsGrid.innerHTML = '';
  data.forEach(suit => {
    const card = document.createElement('div');
    card.className = 'suit-card';
    card.innerHTML = `
      <div class="card-img-container">${suit.svg}</div>
      <div class="card-content">
        <span class="badge">${suit.category}</span>
        <h3>${suit.name}</h3>
        <p>${suit.description}</p>
        <button class="btn-details" onclick="openSuitModal('${suit.id}')">Ver Especificaciones</button>
      </div>
    `;
    suitsGrid.appendChild(card);
  });
}

// FILTRADO Y BÚSQUEDA
function filterData() {
  const category = document.querySelector('.filter-btn.active').dataset.category;
  const query = searchInput.value.toLowerCase();
  const sortBy = sortSelect.value;

  let filtered = suitsData.filter(suit => {
    const matchesCategory = category === 'all' || suit.category === category;
    const matchesQuery = suit.name.toLowerCase().includes(query) || suit.creator.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });

  // ORDENAR
  filtered.sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'tech') return b.tech - a.tech;
    if (sortBy === 'power') return b.power - a.power;
  });

  renderSuits(filtered);
}

// EVENT LISTENERS FILTROS
filterBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    filterBtns.forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    filterData();
  });
});

searchInput.addEventListener('input', filterData);
sortSelect.addEventListener('change', filterData);

// MODAL DETALLES
window.openSuitModal = function(id) {
  const suit = suitsData.find(s => s.id === id);
  modalBody.innerHTML = `
    <div class="modal-header-info">
      <div>${suit.svg}</div>
      <div>
        <h2>${suit.name}</h2>
        <p><strong>Creador:</strong> ${suit.creator}</p>
        <p><strong>Primera Aparición:</strong> ${suit.firstApp}</p>
      </div>
    </div>
    <p style="margin-bottom: 1rem;">${suit.description}</p>
    <h4>Estadísticas de Rendimiento:</h4>
    ${createStatBar('Fuerza', suit.power)}
    ${createStatBar('Tecnología', suit.tech)}
    ${createStatBar('Sigilo', suit.stealth)}
    ${createStatBar('Agilidad', suit.agility)}
  `;
  modal.classList.add('active');
};

closeModal.addEventListener('click', () => modal.classList.remove('active'));

// COMPARADOR
function populateCompareSelects() {
  suitsData.forEach(suit => {
    compare1.innerHTML += `<option value="${suit.id}">${suit.name}</option>`;
    compare2.innerHTML += `<option value="${suit.id}">${suit.name}</option>`;
  });
  compare2.selectedIndex = 1;
  updateComparison();
}

function updateComparison() {
  const s1 = suitsData.find(s => s.id === compare1.value);
  const s2 = suitsData.find(s => s.id === compare2.value);

  compareResults.innerHTML = `
    <div class="compare-col">
      <h3>${s1.name}</h3>
      ${createStatBar('Fuerza', s1.power)}
      ${createStatBar('Tecnología', s1.tech)}
      ${createStatBar('Sigilo', s1.stealth)}
    </div>
    <div class="compare-col">
      <h3>${s2.name}</h3>
      ${createStatBar('Fuerza', s2.power)}
      ${createStatBar('Tecnología', s2.tech)}
      ${createStatBar('Sigilo', s2.stealth)}
    </div>
  `;
}

function createStatBar(label, val) {
  return `
    <div class="stat-bar-container">
      <div class="stat-label"><span>${label}</span><span>${val}%</span></div>
      <div class="stat-bar"><div class="stat-fill" style="width: ${val}%"></div></div>
    </div>
  `;
}

compare1.addEventListener('change', updateComparison);
compare2.addEventListener('change', updateComparison);

// INICIALIZACIÓN
renderSuits(suitsData);
populateCompareSelects();
