const { Pool } = require('pg');

let pool;

const connectPostgres = () => {
    try {
        if (!process.env.DATABASE_URL) {
            console.warn("⚠️ DATABASE_URL (Neon PostgreSQL) no está definido en las variables de entorno.");
            return null;
        }
        
        pool = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false // Necesario para Neon y otras DBs en la nube
            }
        });
        
        console.log("✅ Configuración de conexión a PostgreSQL (Neon) lista.");
        return pool;
    } catch (error) {
        console.error("❌ Error al configurar PostgreSQL:", error);
        return null;
    }
};

// Exportar un método para obtener el pool
module.exports = {
    connectPostgres,
    query: (text, params) => pool ? pool.query(text, params) : Promise.reject("Pool de Postgres no inicializado")
};
