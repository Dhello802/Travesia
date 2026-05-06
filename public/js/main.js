// Estado global
const APP = {
    currentPage: 'inicio',
    searchResults: null,
    selectedFlight: null,
    citySuggestions: []
};

// Cargar datos iniciales
document.addEventListener('DOMContentLoaded', async () => {
    // Obtenemos ciudades del backend
    APP.citySuggestions = await getCitySuggestions();
    navigateTo('inicio');
});

function navigateTo(page) {
    APP.currentPage = page;
    document.getElementById('mobile-menu')?.classList.add('hidden');
    renderPage();
    window.scrollTo({top:0,behavior:'smooth'});
}

function renderPage() {
    const container = document.getElementById('app-content');
    switch(APP.currentPage) {
        case 'inicio': container.innerHTML = getHomeHTML(); initHome(); break;
        case 'explorar': container.innerHTML = getExplorarHTML(); break;
        case 'comunidad': container.innerHTML = getComunidadHTML(); break;
        case 'paquetes': container.innerHTML = getPaquetesHTML(); initCountdowns(); break;
        case 'contacto': container.innerHTML = getContactoHTML(); initChat(); break;
        default: container.innerHTML = getHomeHTML(); initHome();
    }
}

// ... [Html getters como getHomeHTML(), communitySection(), etc.] ...
// Para mantener el tamaño manejable y centrarse en la funcionalidad, vamos a copiar las plantillas base:
function getHomeHTML() {
    return `
    <header class="hero-gradient pt-16 pb-20 px-4">
        <div class="max-w-5xl mx-auto text-center text-white mb-12">
            <h1 class="text-4xl md:text-6xl font-bold mb-4">Tu próxima aventura en <span class="text-gray-300">Latinoamérica</span> empieza aquí</h1>
            <p class="text-lg opacity-90">Busca, reserva y comparte con la comunidad de <strong>Travesía Pinolera</strong>.</p>
        </div>
        <div class="max-w-6xl mx-auto bg-white rounded-3xl search-card p-6 md:p-8">
            <div class="flex space-x-6 mb-6 border-b pb-3 overflow-x-auto" id="search-tabs">
                <button class="tab-btn tab-active pb-2 whitespace-nowrap" data-tab="vuelos"><i class="fas fa-plane mr-2"></i>Vuelos</button>
                <button class="tab-btn text-gray-500 hover:text-gray-900 font-medium pb-2 whitespace-nowrap transition" data-tab="hoteles"><i class="fas fa-hotel mr-2"></i>Hoteles</button>
                <button class="tab-btn text-gray-500 hover:text-gray-900 font-medium pb-2 whitespace-nowrap transition" data-tab="paquetes"><i class="fas fa-suitcase mr-2"></i>Paquetes</button>
                <button class="tab-btn text-gray-500 hover:text-gray-900 font-medium pb-2 whitespace-nowrap transition" data-tab="autos"><i class="fas fa-car mr-2"></i>Autos</button>
            </div>
            <div id="search-form-content"></div>
            <div id="search-results" class="results-container hidden"></div>
        </div>
    </header>
    <main class="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section class="lg:col-span-2">${communitySection()}</section>
        <aside class="space-y-8">${homeSidebar()}</aside>
    </main>
    <section class="max-w-7xl mx-auto px-4 pb-12">${ofertasFlash()}</section>`;
}

function communitySection() {
    return `<div class="flex justify-between items-center mb-6"><h2 class="text-2xl font-bold">🌎 Comunidad <span class="text-gray-900">Travesía Pinolera</span></h2><a href="#" onclick="navigateTo('comunidad')" class="text-gray-900 font-semibold hover:underline text-sm">Ver comunidad →</a></div><div class="space-y-8">${communityPosts()}</div>`;
}

function communityPosts() {
    return `
    <article class="bg-white rounded-2xl shadow-sm border overflow-hidden social-post card-hover">
        <div class="p-4 flex justify-between"><div class="flex items-center space-x-3"><div class="w-11 h-11 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-900">JP</div><div><p class="font-bold">Juan Pérez</p><p class="text-xs text-gray-500">San Juan del Sur, Nicaragua</p></div></div><div class="text-yellow-400"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div></div>
        <div class="h-64 overflow-hidden"><img src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1200&q=80" alt="San Juan" class="w-full h-full object-cover"></div>
        <div class="p-5"><p class="text-sm mb-4">"¡Atardecer increíble! Reservé tour de ballenas con LATAM with you."</p><div class="flex text-gray-500 text-sm border-t pt-3"><button onclick="toggleLike(this)" class="hover:text-red-500"><i class="far fa-heart mr-1"></i><span>24</span></button><span class="ml-4"><i class="far fa-comment mr-1"></i>8</span></div></div>
    </article>`; // Acortado para brevedad
}

function homeSidebar() {
    return `<div><h2 class="text-2xl font-bold text-gray-800 mb-5">✨ Recomendaciones</h2><div class="space-y-4">${recomendacionCards()}</div></div>`;
}

function recomendacionCards() {
    return [
        {img:"https://images.unsplash.com/photo-1533604131587-32c294752e83?w=600&q=80",title:"Isla de Ometepe",sub:"Nicaragua · Desde $120"}
    ].map(c=>`<div class="group relative rounded-2xl overflow-hidden cursor-pointer card-hover shadow-md" onclick="navigateTo('paquetes')"><img src="${c.img}" class="w-full h-48 object-cover group-hover:scale-110 transition duration-500"><div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div><div class="absolute bottom-4 left-4 text-white"><h3 class="font-bold text-lg">${c.title}</h3><p class="text-xs text-gray-200">${c.sub}</p></div></div>`).join('');
}

function ofertasFlash() {
    return `<div class="bg-red-50 border border-red-200 rounded-2xl p-6"><div class="flex flex-wrap items-center justify-between mb-4"><h3 class="text-xl font-bold text-red-800"><i class="fas fa-bolt text-yellow-500 mr-2"></i>Ofertas Flash</h3></div></div>`;
}

function getExplorarHTML() { return `<div class="bg-white border-b"><div class="max-w-7xl mx-auto px-4 py-8"><h1 class="text-3xl font-bold">Explorar destinos</h1></div></div>`; }
function getComunidadHTML() { return `<div class="bg-white border-b"><div class="max-w-7xl mx-auto px-4 py-8"><h1 class="text-3xl font-bold">Comunidad Travesía Pinolera</h1></div></div>`; }
function getPaquetesHTML() { return `<div class="bg-white border-b"><div class="max-w-7xl mx-auto px-4 py-8"><h1 class="text-3xl font-bold">Paquetes de Viaje</h1></div></div>`; }
function getContactoHTML() { return `<div class="bg-white border-b"><div class="max-w-7xl mx-auto px-4 py-8"><h1 class="text-3xl font-bold">Contacto y Soporte</h1></div></div>`; }

function initHome() {
    const tabs = document.getElementById('search-tabs');
    if(tabs) {
        tabs.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', function(){
                tabs.querySelectorAll('.tab-btn').forEach(b=>{b.classList.remove('tab-active');b.classList.add('text-gray-500');});
                this.classList.add('tab-active');this.classList.remove('text-gray-500');
                renderSearchForm(this.dataset.tab);
                document.getElementById('search-results').classList.add('hidden');
            });
        });
        renderSearchForm('vuelos');
    }
}

function renderSearchForm(tab) {
    const container = document.getElementById('search-form-content');
    const today = new Date().toISOString().split('T')[0];
    container.innerHTML = '';
    switch(tab) {
        case 'vuelos':
            container.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div class="relative"><label class="block text-xs font-bold text-gray-500 uppercase mb-1">Origen</label><input type="text" id="origin-input" placeholder="Managua (MGA)" class="w-full border rounded-xl p-3.5 bg-gray-50" autocomplete="off"><div id="origin-suggestions" class="suggestions-box hidden"></div></div>
                <div class="relative"><label class="block text-xs font-bold text-gray-500 uppercase mb-1">Destino</label><input type="text" id="dest-input" placeholder="¿A dónde?" class="w-full border rounded-xl p-3.5 bg-gray-50" autocomplete="off"><div id="dest-suggestions" class="suggestions-box hidden"></div></div>
                <div><label class="block text-xs font-bold text-gray-500 uppercase mb-1">Fecha ida</label><input type="date" id="departure-date" min="${today}" class="w-full border rounded-xl p-3.5 bg-gray-50"></div>
                <div><label class="block text-xs font-bold text-gray-500 uppercase mb-1">Adultos</label><select id="adults-count" class="w-full border rounded-xl p-3.5 bg-gray-50"><option>1</option><option>2</option></select></div>
                <div class="lg:col-span-4 flex items-end"><button onclick="searchFlights()" class="w-full bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-black shadow">BUSCAR VUELOS</button></div>
            </div>`;
            setupAutocomplete('origin-input','origin-suggestions');
            setupAutocomplete('dest-input','dest-suggestions');
            break;
        case 'hoteles':
            container.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="relative"><label class="block text-xs font-bold text-gray-500 uppercase mb-1">Destino</label><input type="text" id="hotel-dest-input" placeholder="Ciudad o zona" class="w-full border rounded-xl p-3.5 bg-gray-50" autocomplete="off"><div id="hotel-dest-suggestions" class="suggestions-box hidden"></div></div>
                <div class="flex items-end md:col-span-3"><button onclick="searchHotels()" class="w-full bg-gray-900 text-white font-bold py-4 rounded-xl">BUSCAR HOTEL</button></div>
            </div>`;
            setupAutocomplete('hotel-dest-input','hotel-dest-suggestions');
            break;
        case 'paquetes':
            container.innerHTML = `<button onclick="searchPackages()" class="w-full bg-gray-900 text-white font-bold py-4 rounded-xl">VER PAQUETES</button>`;
            break;
        case 'autos':
            container.innerHTML = `<button onclick="searchCars()" class="w-full bg-gray-900 text-white font-bold py-4 rounded-xl">BUSCAR AUTO</button>`;
            break;
    }
}

function setupAutocomplete(inputId, suggestionsId) {
    const input = document.getElementById(inputId);
    const box = document.getElementById(suggestionsId);
    if(!input||!box) return;
    input.addEventListener('input', function(){
        const val = this.value.toLowerCase();
        if(val.length<1){box.classList.add('hidden');return;}
        const filtered = APP.citySuggestions.filter(c=>c.toLowerCase().includes(val));
        box.innerHTML = filtered.map(c=>`<div class="suggestion-item" onclick="selectSuggestion('${inputId}','${c}','${suggestionsId}')">${c}</div>`).join('');
        box.classList.toggle('hidden', filtered.length===0);
    });
    document.addEventListener('click',(e)=>{if(!input.contains(e.target)&&!box.contains(e.target))box.classList.add('hidden');});
}

function selectSuggestion(inputId, value, boxId) {
    document.getElementById(inputId).value = value;
    document.getElementById(boxId).classList.add('hidden');
}

// Llamadas API reales
async function searchFlights() {
    const origin = document.getElementById('origin-input')?.value.trim();
    const dest = document.getElementById('dest-input')?.value.trim();
    if(!origin||!dest){alert('Completa origen y destino.');return;}
    
    // Llamada al backend
    const flights = await searchFlightsAPI({ origin, dest });
    APP.searchResults = flights;
    renderResults('vuelos', flights);
}

async function searchHotels() {
    const dest = document.getElementById('hotel-dest-input')?.value.trim();
    const hotels = await searchHotelsAPI({ dest });
    renderResults('hoteles', hotels);
}

async function searchPackages() {
    const packages = await searchPackagesAPI({});
    renderResults('paquetes', packages);
}

async function searchCars() {
    const cars = await searchCarsAPI({});
    renderResults('autos', cars);
}

function renderResults(type, items) {
    const container = document.getElementById('search-results');
    container.classList.remove('hidden');
    let html = `<h3 class="text-xl font-bold mb-4">Resultados encontrados: ${items.length}</h3><div class="space-y-4">`;
    
    items.forEach(item => {
        html += `<div class="bg-white border rounded-xl p-5 flex flex-wrap justify-between items-center">`;
        if(type==='vuelos') {
            html += `<div><p class="font-bold text-lg">${item.airline} ${item.flightNo}</p><p class="text-sm">${item.origin} → ${item.destination}</p></div><div class="text-right"><p class="text-2xl font-bold text-gray-900">$${item.price}</p></div>`;
        } else if (type==='hoteles') {
            html += `<div><p class="font-bold text-lg">${item.name}</p><p class="text-sm">${item.location}</p></div><div class="text-right"><p class="text-2xl font-bold text-gray-900">$${item.price}/noche</p></div>`;
        } else if (type==='paquetes') {
            html += `<div><p class="font-bold text-lg">${item.name}</p><p class="text-sm">${item.type}</p></div><div class="text-right"><p class="text-2xl font-bold text-gray-900">$${item.price}</p></div>`;
        } else if (type==='autos') {
             html += `<div><p class="font-bold text-lg">${item.model}</p><p class="text-sm">${item.type}</p></div><div class="text-right"><p class="text-2xl font-bold text-gray-900">$${item.pricePerDay}/día</p></div>`;
        }
        html += `</div>`;
    });
    html += `</div>`;
    container.innerHTML = html;
}

// Modales y UI Básica
function openAuthModal(){document.getElementById('auth-modal').classList.remove('hidden');document.getElementById('auth-modal').classList.add('flex');showLogin();}
function closeAuthModal(){document.getElementById('auth-modal').classList.add('hidden');document.getElementById('auth-modal').classList.remove('flex');}
function showLogin(){document.getElementById('auth-form-login').classList.remove('hidden');document.getElementById('auth-form-register').classList.add('hidden');document.getElementById('auth-title').textContent='Iniciar Sesión';}
function showRegister(){document.getElementById('auth-form-login').classList.add('hidden');document.getElementById('auth-form-register').classList.remove('hidden');document.getElementById('auth-title').textContent='Crear Cuenta';}
document.getElementById('mobile-menu-btn')?.addEventListener('click',()=>document.getElementById('mobile-menu').classList.toggle('hidden'));
document.getElementById('auth-modal')?.addEventListener('click',function(e){if(e.target===this)closeAuthModal();});
