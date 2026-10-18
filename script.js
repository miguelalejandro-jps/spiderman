// ==========================================================================
// BASE DE DATOS DE TRAJES (APUNTANDO A LA CARPETA img/)
// ==========================================================================
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

// ==========================================================================
// ARSENAL 3D Y MOTOR THREE.JS
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
let scene3D, camera3D, renderer3D, controls3D, current3DMesh = null;

function init3DViewer() {
  const container = document.getElementById('canvas3dContainer');
  if (!container) return;

  const width = container.clientWidth;
  const height = container.clientHeight;

  scene3D = new THREE.Scene();
  scene3D.background = new THREE.Color(0x0f172a);

  camera3D = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera3D.position.set(0, 0, 8);

  renderer3D = new THREE.WebGLRenderer({ antialias: true });
  renderer3D.setSize(width, height);
  renderer3D.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer3D.domElement);

  controls3D = new THREE.OrbitControls(camera3D, renderer3D.domElement);
  controls3D.enableDamping = true;
  controls3D.dampingFactor = 0.05;
  controls3D.enableZoom = true;

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene3D.add(ambientLight);

  const dirLight1 = new THREE.DirectionalLight(0xffffff, 1);
  dirLight1.position.set(5, 10, 7);
  scene3D.add(dirLight1);

  loadWeaponMesh(activeWeapon3D);

  function animate() {
    requestAnimationFrame(animate);
    controls3D.update();
    if (current3DMesh) current3DMesh.rotation.y += 0.005;
    renderer3D.render(scene3D, camera3D);
  }
  animate();
}

function loadWeaponMesh(weapon) {
  if (current3DMesh) scene3D.remove(current3DMesh);

  const group = new THREE.Group();
  const mainMat = new THREE.MeshStandardMaterial({ color: weapon.color, metalness: 0.8, roughness: 0.2 });
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.5, roughness: 0.5 });

  if (weapon.type === 'wrist') {
    const base = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 2, 16), darkMat);
    base.rotation.z = Math.PI / 2;
    group.add(base);
    const nozzle = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.4, 1.2, 12), mainMat);
    nozzle.position.set(0, 1.2, 0);
    group.add(nozzle);
  } else if (weapon.type === 'drone') {
    group.add(new THREE.Mesh(new THREE.SphereGeometry(1, 16, 16), mainMat));
    for (let i = 0; i < 4; i++) {
      const arm = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 2.2), darkMat);
      arm.rotation.y = (Math.PI / 2) * i;
      group.add(arm);
    }
  } else if (weapon.type === 'claw') {
    group.add(new THREE.Mesh(new THREE.BoxGeometry(1, 2, 1), darkMat));
    const claw = new THREE.Mesh(new THREE.TorusGeometry(1.5, 0.2, 8, 20, Math.PI / 2), mainMat);
    claw.position.set(0, 1, 0);
    group.add(claw);
  } else {
    const cone = new THREE.Mesh(new THREE.ConeGeometry(1.5, 2.5, 16), mainMat);
    cone.rotation.x = Math.PI;
    group.add(cone);
  }

  current3DMesh = group;
  scene3D.add(current3DMesh);
}

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
  updateComparison();
}

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

// ==========================================================================
// RENDERIZAR Y FILTRAR TRAJES
// ==========================================================================
const suitsGrid = document.getElementById('suitsGrid');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const filterBtns = document.querySelectorAll('.filter-btn');

function renderSuits(data) {
  suitsGrid.innerHTML = '';
  data.forEach(suit => {
    const card = document.createElement('div');
    card.className = 'suit-card';
    card.innerHTML = `
      <div class="card-img-container">
        <img src="${suit.image}" alt="${suit.name}" onerror="this.src='https://images.unsplash.com/photo-1604200213928-ba3cf4fc8436?auto=format&fit=crop&w=800&q=80'">
      </div>
      <div class="card-content">
        <span class="badge">${suit.category}</span>
        <h3>${suit.name}</h3>
        <p>${suit.description}</p>
        <button class="btn-details" onclick="openSuitModal('${suit.id}')"><i class="fas fa-search-plus"></i> Ver Detalles</button>
      </div>
    `;
    suitsGrid.appendChild(card);
  });
}

function filterData() {
  const category = document.querySelector('.filter-btn.active').dataset.category;
  const query = searchInput.value.toLowerCase();
  const sortBy = sortSelect.value;

  let filtered = suitsData.filter(suit => {
    const matchesCategory = category === 'all' || suit.category === category;
    const matchesQuery = suit.name.toLowerCase().includes(query) || suit.creator.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });

  filtered.sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'tech') return b.tech - a.tech;
    if (sortBy === 'power') return b.power - a.power;
  });

  renderSuits(filtered);
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    filterBtns.forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    filterData();
  });
});

searchInput.addEventListener('input', filterData);
sortSelect.addEventListener('change', filterData);

// ==========================================================================
// COMPARADOR Y MODAL
// ==========================================================================
function populateCompareSelects() {
  const c1 = document.getElementById('compareSuit1');
  const c2 = document.getElementById('compareSuit2');
  suitsData.forEach(suit => {
    c1.innerHTML += `<option value="${suit.id}">${suit.name}</option>`;
    c2.innerHTML += `<option value="${suit.id}">${suit.name}</option>`;
  });
  c2.selectedIndex = 1;
  c1.addEventListener('change', updateComparison);
  c2.addEventListener('change', updateComparison);
  updateComparison();
}

function updateComparison() {
  const c1 = document.getElementById('compareSuit1');
  const c2 = document.getElementById('compareSuit2');
  const s1 = suitsData.find(s => s.id === c1.value);
  const s2 = suitsData.find(s => s.id === c2.value);
  const results = document.getElementById('compareResults');

  const p1 = Math.min(100, s1.power + activeWeapon3D.powerBoost);
  const t1 = Math.min(100, s1.tech + activeWeapon3D.techBoost);
  const p2 = Math.min(100, s2.power + activeWeapon3D.powerBoost);
  const t2 = Math.min(100, s2.tech + activeWeapon3D.techBoost);

  results.innerHTML = `
    <div class="compare-col">
      <h3>${s1.name}</h3>
      ${createStatBar('Fuerza Total', p1)}
      ${createStatBar('Tecnología Total', t1)}
      ${createStatBar('Agilidad Base', s1.agility)}
    </div>
    <div class="compare-col">
      <h3>${s2.name}</h3>
      ${createStatBar('Fuerza Total', p2)}
      ${createStatBar('Tecnología Total', t2)}
      ${createStatBar('Agilidad Base', s2.agility)}
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

window.openSuitModal = function(id) {
  const suit = suitsData.find(s => s.id === id);
  const modal = document.getElementById('suitModal');
  const body = document.getElementById('modalBody');

  body.innerHTML = `
    <h2>${suit.name}</h2>
    <p><strong>Creador:</strong> ${suit.creator}</p>
    <p><strong>Primera Aparición:</strong> ${suit.firstApp}</p>
    <p style="margin: 1rem 0;">${suit.description}</p>
    ${createStatBar('Fuerza', suit.power)}
    ${createStatBar('Tecnología', suit.tech)}
    ${createStatBar('Agilidad', suit.agility)}
  `;
  modal.classList.add('active');
};

document.getElementById('closeModal').addEventListener('click', () => {
  document.getElementById('suitModal').classList.remove('active');
});

// INICIALIZAR AL CARGAR LA PÁGINA
window.addEventListener('DOMContentLoaded', () => {
  renderWeaponsGrid();
  init3DViewer();
  renderSuits(suitsData);
  populateCompareSelects();
});
