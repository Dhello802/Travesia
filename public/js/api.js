// Funciones para comunicarse con el Backend API

const API_URL = '/api'; // Apunta a las funciones serverless o servidor local

// Obtener ciudades sugeridas
async function getCitySuggestions() {
    try {
        const res = await fetch(`${API_URL}/data/cities`);
        if (!res.ok) throw new Error('Error en API');
        return await res.json();
    } catch (error) {
        console.error("Error al obtener ciudades, usando fallback:", error);
        return [
            "Managua - Augusto C. Sandino (MGA), Nicaragua",
            "San José - Juan Santamaría (SJO), Costa Rica",
            "Ciudad de Panamá - Tocumen (PTY), Panamá",
            "Cancún (CUN), México",
            "Bogotá - El Dorado (BOG), Colombia",
            "Lima - Jorge Chávez (LIM), Perú"
        ];
    }
}

async function searchFlightsAPI(params) {
    try {
        const query = new URLSearchParams(params).toString();
        const res = await fetch(`${API_URL}/search/flights?${query}`);
        if(!res.ok) throw new Error('Error en API');
        return await res.json();
    } catch (error) {
        console.error(error);
        return []; // Fallback a vacío
    }
}

async function searchHotelsAPI(params) {
    try {
        const query = new URLSearchParams(params).toString();
        const res = await fetch(`${API_URL}/search/hotels?${query}`);
        if(!res.ok) throw new Error('Error en API');
        return await res.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

async function searchPackagesAPI(params) {
    try {
        const query = new URLSearchParams(params).toString();
        const res = await fetch(`${API_URL}/search/packages?${query}`);
        if(!res.ok) throw new Error('Error en API');
        return await res.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

async function searchCarsAPI(params) {
    try {
        const query = new URLSearchParams(params).toString();
        const res = await fetch(`${API_URL}/search/cars?${query}`);
        if(!res.ok) throw new Error('Error en API');
        return await res.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}
