const mongoose = require('mongoose');

const connectMongo = async () => {
    try {
        if (!process.env.MONGO_URI) {
            console.warn("⚠️ MONGO_URI no está definido en las variables de entorno.");
            return;
        }
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ Conectado exitosamente a MongoDB (Atlas)");
    } catch (error) {
        console.error("❌ Error al conectar a MongoDB:", error);
    }
};

module.exports = connectMongo;
