const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Cargar variables de entorno
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Servir frontend en modo local

// Simulación de base de datos mientras se conectan las reales
const mockData = require('./data/mockData');

// ==========================================
// Rutas de la API (Mock)
// ==========================================

// Endpoint: Sugerencias de ciudades
app.get('/api/data/cities', (req, res) => {
    res.json(mockData.citySuggestions);
});

// Endpoint: Búsqueda de Vuelos
app.get('/api/search/flights', (req, res) => {
    const { origin, dest } = req.query;
    if (!origin || !dest) return res.status(400).json({ error: 'Faltan parámetros' });

    const classes = [{name:'Económica',factor:1},{name:'Business',factor:2.5},{name:'Ejecutiva',factor:1.8}];
    const flights = [];
    for(let i=0; i<4; i++){
        const airline = mockData.mockAirlines[Math.floor(Math.random()*mockData.mockAirlines.length)];
        const basePrice = Math.floor(Math.random()*300)+150;
        const cls = classes[Math.floor(Math.random()*classes.length)];
        flights.push({
            airline: airline.name, 
            flightNo: airline.code + (Math.floor(Math.random()*900)+100),
            origin: origin.split(',')[0], 
            destination: dest.split(',')[0],
            class: cls.name,
            price: Math.round(basePrice * cls.factor)
        });
    }
    res.json(flights);
});

// Endpoint: Búsqueda de Hoteles
app.get('/api/search/hotels', (req, res) => {
    const { dest } = req.query;
    let hotels = [];
    if(dest) {
        hotels = mockData.mockHotels.filter(h => h.location.toLowerCase().includes(dest.split(',')[0].toLowerCase()));
    }
    if(hotels.length === 0) hotels = mockData.mockHotels.slice(0, 3); // Fallback
    res.json(hotels);
});

// Endpoint: Búsqueda de Paquetes
app.get('/api/search/packages', (req, res) => {
    res.json(mockData.mockPackages);
});

// Endpoint: Búsqueda de Autos
app.get('/api/search/cars', (req, res) => {
    res.json(mockData.mockCars);
});

// Iniciar servidor local (No requerido para Vercel pero útil para pruebas)
const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Servidor local corriendo en http://localhost:${PORT}`);
    });
}

// Exportar la app para Vercel Serverless Functions
module.exports = app;
