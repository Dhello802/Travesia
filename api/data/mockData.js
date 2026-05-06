const mockData = {
    citySuggestions: [
        "Managua - Augusto C. Sandino (MGA), Nicaragua",
        "San José - Juan Santamaría (SJO), Costa Rica",
        "Ciudad de Panamá - Tocumen (PTY), Panamá",
        "Ciudad de México - Benito Juárez (MEX), México",
        "Cancún (CUN), México",
        "Bogotá - El Dorado (BOG), Colombia",
        "Medellín - José María Córdova (MDE), Colombia",
        "Lima - Jorge Chávez (LIM), Perú",
        "Cusco - Alejandro Velasco Astete (CUZ), Perú",
        "Santiago - Arturo Merino Benítez (SCL), Chile",
        "Buenos Aires - Ezeiza (EZE), Argentina",
        "La Habana - José Martí (HAV), Cuba",
        "Punta Cana (PUJ), República Dominicana",
        "San Salvador - Monseñor Óscar Romero (SAL), El Salvador",
        "Ciudad de Guatemala - La Aurora (GUA), Guatemala",
        "Miami (MIA), Estados Unidos"
    ],
    mockHotels: [
        {name:"Hotel Real Colonial", stars:4, price:85, location:"Managua"},
        {name:"Beach Resort Cancún", stars:5, price:210, location:"Cancún"},
        {name:"Andes Lodge Cusco", stars:3, price:55, location:"Cusco"},
        {name:"Panamá City Suites", stars:4, price:120, location:"Panamá"},
        {name:"Bogotá Plaza Hotel", stars:4, price:95, location:"Bogotá"}
    ],
    mockCars: [
        {model:"Toyota Corolla", type:"Económico", pricePerDay:35},
        {model:"Hyundai Tucson", type:"SUV", pricePerDay:55},
        {model:"BMW Serie 3", type:"Lujo", pricePerDay:110}
    ],
    mockAirlines: [
        {name:"Avianca",code:"AV"}, {name:"Copa Airlines",code:"CM"}, {name:"LATAM Airlines",code:"LA"},
        {name:"Volaris",code:"Y4"}, {name:"Aeroméxico",code:"AM"}, {name:"Interjet",code:"IJ"}
    ],
    mockPackages: [
        {name:"Cancún Todo Incluido", price:420, type:"Playa"},
        {name:"Aventura en Ometepe", price:120, type:"Aventura"},
        {name:"Machu Picchu Cultural", price:580, type:"Cultural"},
        {name:"Riviera Maya Relax", price:550, type:"Playa"},
        {name:"Selva Amazónica", price:380, type:"Aventura"}
    ]
};

module.exports = mockData;
