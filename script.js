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
// ==========================================================================
// AGREGADO: MOTOR 3D (THREE.JS), ARMAS E INTERACCIÓN CON RATÓN
// ==========================================================================

const weapons3DData = [
  {
    id: 'web-shooter-3d',
    name: 'Lanzatelarañas Stark Mk-II',
    icon: 'fa-bullseye',
    type: 'wrist',
    powerBoost: 12,
    techBoost: 20,
    desc: 'Brazalete con tecnología de nanopartículas para disparar cartuchos de telaraña sintética a alta presión.',
    color: 0xe62429
  },
  {
    id: 'spider-drone-3d',
    name: 'Spider-Dron Táctico',
    icon: 'fa-robot',
    type: 'drone',
    powerBoost: 18,
    techBoost: 35,
    desc: 'Unidad aérea autónoma de reconocimiento y distracción táctica con escáneres multiespectrales.',
    color: 0x0055ff
  },
  {
    id: 'iron-claw-3d',
    name: 'Garra Mecánica de Titanio',
    icon: 'fa-dharmachakra',
    type: 'claw',
    powerBoost: 35,
    techBoost: 25,
    desc: 'Extremidad robótica articulada de aleación de oro y titanio para combate pesado.',
    color: 0xffd700
  },
  {
    id: 'sonic-blaster-3d',
    name: 'Emisor Sónico Anti-Simbiontes',
    icon: 'fa-wave-square',
    type: 'sonic',
    powerBoost: 25,
    techBoost: 30,
    desc: 'Dispositivo generador de ondas de frecuencia modulada para neutralizar amenazas alienígenas.',
    color: 0x00ffcc
  }
];

let activeWeapon3D = weapons3DData[0];
let scene3D, camera3D, renderer3D, controls3D;
let current3DMesh = null;

// INICIALIZACIÓN DEL ENTORNO 3D
function init3DViewer() {
  const container = document.getElementById('canvas3dContainer');
  if (!container) return;

  const width = container.clientWidth;
  const height = container.clientHeight;

  // Escena
  scene3D = new THREE.Scene();
  scene3D.background = new THREE.Color(0x0f172a);

  // Cámara
  camera3D = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera3D.position.set(0, 0, 8);

  // Renderizador
  renderer3D = new THREE.WebGLRenderer({ antialias: true });
  renderer3D.setSize(width, height);
  renderer3D.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer3D.domElement);

  // OrbitControls para el movimiento con el ratón
  controls3D = new THREE.OrbitControls(camera3D, renderer3D.domElement);
  controls3D.enableDamping = true;
  controls3D.dampingFactor = 0.05;
  controls3D.enableZoom = true;
  controls3D.minDistance = 3;
  controls3D.maxDistance = 12;

  // Luces
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene3D.add(ambientLight);

  const dirLight1 = new THREE.DirectionalLight(0xffffff, 1);
  dirLight1.position.set(5, 10, 7);
  scene3D.add(dirLight1);

  const dirLight2 = new THREE.DirectionalLight(0xe62429, 0.8);
  dirLight2.position.set(-5, -5, -5);
  scene3D.add(dirLight2);

  // Cargar primera arma
  loadWeaponMesh(activeWeapon3D);

  // Animación continua
  function animate() {
    requestAnimationFrame(animate);
    controls3D.update();
    if (current3DMesh) {
      current3DMesh.rotation.y += 0.005; // Rotación automática continua
    }
    renderer3D.render(scene3D, camera3D);
  }
  animate();

  // Ajustar tamaño al redimensionar pantalla
  window.addEventListener('resize', () => {
    if (!container) return;
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera3D.aspect = w / h;
    camera3D.updateProjectionMatrix();
    renderer3D.setSize(w, h);
  });
}

// CONSTRUIR MODELO 3D SEGÚN EL ARMA SELECCIONADA
function loadWeaponMesh(weapon) {
  if (current3DMesh) scene3D.remove(current3DMesh);

  const group = new THREE.Group();
  const mainMat = new THREE.MeshStandardMaterial({ 
    color: weapon.color, 
    metalness: 0.8, 
    roughness: 0.2 
  });
  const darkMat = new THREE.MeshStandardMaterial({ 
    color: 0x334155, 
    metalness: 0.5, 
    roughness: 0.5 
  });

  if (weapon.type === 'wrist') {
    const baseGeo = new THREE.CylinderGeometry(1.2, 1.2, 2, 16);
    const base = new THREE.Mesh(baseGeo, darkMat);
    base.rotation.z = Math.PI / 2;
    group.add(base);

    const nozzleGeo = new THREE.CylinderGeometry(0.3, 0.4, 1.2, 12);
    const nozzle = new THREE.Mesh(nozzleGeo, mainMat);
    nozzle.position.set(0, 1.2, 0);
    group.add(nozzle);
  } else if (weapon.type === 'drone') {
    const bodyGeo = new THREE.SphereGeometry(1, 16, 16);
    const body = new THREE.Mesh(bodyGeo, mainMat);
    group.add(body);

    for (let i = 0; i < 4; i++) {
      const armGeo = new THREE.BoxGeometry(0.2, 0.2, 2.2);
      const arm = new THREE.Mesh(armGeo, darkMat);
      arm.rotation.y = (Math.PI / 2) * i;
      group.add(arm);
    }
  } else if (weapon.type === 'claw') {
    const baseGeo = new THREE.BoxGeometry(1, 2, 1);
    const base = new THREE.Mesh(baseGeo, darkMat);
    group.add(base);

    const clawGeo = new THREE.TorusGeometry(1.5, 0.2, 8, 20, Math.PI / 2);
    const claw = new THREE.Mesh(clawGeo, mainMat);
    claw.position.set(0, 1, 0);
    group.add(claw);
  } else {
    const coneGeo = new THREE.ConeGeometry(1.5, 2.5, 16);
    const cone = new THREE.Mesh(coneGeo, mainMat);
    cone.rotation.x = Math.PI;
    group.add(cone);
  }

  current3DMesh = group;
  scene3D.add(current3DMesh);
}

// CAMBIAR ARMA 3D SELECCIONADA
function selectWeapon3D(weapon) {
  activeWeapon3D = weapon;
  loadWeaponMesh(weapon);

  document.getElementById('w3dTitle').textContent = weapon.name;
  document.getElementById('w3dDesc').textContent = weapon.desc;
  document.getElementById('w3dBoosts').innerHTML = `
    <span class="boost-badge power">+${weapon.powerBoost}% Fuerza</span>
    <span class="boost-badge tech">+${weapon.techBoost}% Tecnología</span>
  `;

  document.querySelectorAll('.weapon-card').forEach(card => {
    card.classList.toggle('selected', card.dataset.id === weapon.id);
  });
}

// RENDERIZAR BOTONES DE SELECCIÓN DE ARMAS
function renderWeaponsGrid() {
  const grid = document.getElementById('weaponsGrid');
  if (!grid) return;
  grid.innerHTML = '';

  weapons3DData.forEach(w => {
    const card = document.createElement('div');
    card.className = `weapon-card ${w.id === activeWeapon3D.id ? 'selected' : ''}`;
    card.dataset.id = w.id;
    card.innerHTML = `
      <i class="fas ${w.icon}"></i>
      <h4>${w.name}</h4>
      <span>+${w.powerBoost}% PWR / +${w.techBoost}% TECH</span>
    `;
    card.addEventListener('click', () => selectWeapon3D(w));
    grid.appendChild(card);
  });
}

// INICIALIZAR EL MÓDULO 3D AL CORTAR LA PÁGINA
window.addEventListener('DOMContentLoaded', () => {
  renderWeaponsGrid();
  init3DViewer();
});
const suitsData = [
  {
    id: 'classic',
    name: 'Traje Clásico',
    category: 'clasico',
    creator: 'Peter Parker',
    firstApp: 'Amazing Fantasy #15 (1962)',
    description: 'El traje tradicional de malla roja y azul con el emblemático patrón de telaraña.',
    power: 70, tech: 40, stealth: 50, agility: 95,
    image: 'img/classic-suit.jpg'
  },
  {
    id: 'iron-spider',
    name: 'Iron Spider',
    category: 'tech',
    creator: 'Tony Stark',
    firstApp: 'The Amazing Spider-Man #529 (2006)',
    description: 'Equipado con nanotecnología avanzada, patas mecánicas y blindaje táctico.',
    power: 92, tech: 98, stealth: 40, agility: 88,
    image: 'img/iron-spider.jpg'
  },
  {
    id: 'symbiote',
    name: 'Traje Negro / Simbionte',
    category: 'simbionte',
    creator: 'Origen Alienígena',
    firstApp: 'Secret Wars #8 (1984)',
    description: 'Traje alienígena vivo que potencia drásticamente la fuerza y genera telaraña orgánica.',
    power: 95, tech: 20, stealth: 85, agility: 90,
    image: 'img/symbiote-suit.jpg'
  },
  {
    id: 'miles',
    name: 'Miles Morales Suit',
    category: 'multiverso',
    creator: 'Miles Morales',
    firstApp: 'Ultimate Fallout #4 (2011)',
    description: 'Traje negro y rojo diseñado para complementar sus habilidades de camuflaje y ráfaga Venom.',
    power: 82, tech: 60, stealth: 90, agility: 96,
    image: 'img/miles-morales.jpg'
  },
  {
    id: '2099',
    name: 'Spider-Man 2099',
    category: 'multiverso',
    creator: 'Miguel O\'Hara',
    firstApp: 'Amazing Spider-Man #365 (1992)',
    description: 'Fabricado con moléculas inestables, garra retráctil y alas de telaraña para planear.',
    power: 88, tech: 92, stealth: 60, agility: 94,
    image: 'img/spider-2099.jpg'
  }
];
