# Guía Paso a Paso: Bases de Datos y Despliegue

Este documento explica cómo configurar tus bases de datos (MongoDB y PostgreSQL) y cómo desplegar el proyecto en Vercel.

---

## 1. Configurar MongoDB (NoSQL) con MongoDB Atlas

MongoDB Atlas te permite tener una base de datos gratuita en la nube, perfecta para guardar datos estructurados por documentos (ej. perfiles de usuarios, comentarios de la comunidad).

### Pasos:
1. Ve a [MongoDB Atlas](https://www.mongodb.com/atlas) y regístrate o inicia sesión.
2. Crea un nuevo proyecto y selecciona **"Build a Database"**.
3. Elige el plan **"M0 Free"** (Gratis). Selecciona tu región más cercana y haz clic en "Create".
4. **Seguridad (Muy importante):**
   - Te pedirá crear un usuario. Escribe un nombre de usuario y una contraseña (guarda la contraseña, la necesitarás).
   - En "IP Access List", haz clic en **"Add My Current IP Address"** para desarrollo local, y luego añade `0.0.0.0/0` para permitir que Vercel se conecte.
5. Ve a "Database" y haz clic en **"Connect"**.
6. Selecciona **"Drivers"** (Node.js).
7. Copia el **Connection String** (URI) que te proporcionan. Será parecido a esto:
   `mongodb+srv://<usuario>:<password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority`
8. Reemplaza `<password>` con tu contraseña real y renombra tu base de datos antes del `?` (ej. `...mongodb.net/travesia_db?...`).
9. Ve a tu proyecto, crea un archivo `.env` basado en el `.env.example` y pega la URL en `MONGO_URI`.

---

## 2. Configurar PostgreSQL (SQL) con Neon

Neon es una plataforma Serverless Postgres excelente, ideal para datos relacionales estrictos (ej. Facturación, Reservas, Pasajeros).

### Pasos:
1. Ve a [Neon.tech](https://neon.tech) y regístrate.
2. Crea un **"New Project"**.
3. Selecciona PostgreSQL, dale un nombre (ej. `travesia-db`) y la región más cercana.
4. En el panel principal del proyecto (Dashboard), verás un cuadro llamado **"Connection Details"**.
5. Asegúrate de que el formato esté en "Postgres URL".
6. Copia el **Connection String**, que se verá así:
   `postgresql://usuario:contraseña@ep-rough-lake-1234.us-east-2.aws.neon.tech/neondb?sslmode=require`
7. Pega esta URL en tu archivo `.env` en la variable `DATABASE_URL`.

*(Nota: En `/api/config/postgres.js` y `mongo.js` el código ya está preparado para leer estas variables).*

---

## 3. Desplegar en Vercel

Vercel alojará tu Frontend (en `/public`) y tu Backend (en `/api`) de forma gratuita.

### Pasos previos (Subir el código a GitHub sin línea de comandos):
Para que Vercel funcione, tu código debe estar en [GitHub](https://github.com). Tienes dos formas fáciles y visuales de hacerlo sin tocar la línea de comandos:

**Opción A: Subir los archivos directamente por la página web (La más rápida)**
1. Entra a tu cuenta en [GitHub.com](https://github.com) y haz clic en el botón verde **"New"** (Nuevo repositorio).
2. Ponle nombre (ej. `travesia-pinolera`) y haz clic en **"Create repository"**.
3. En la siguiente pantalla, busca un enlace pequeño que dice **"uploading an existing file"** (subir un archivo existente) y haz clic ahí.
4. Abre la carpeta de tu proyecto (`travesia extras`) en tu computadora. **Selecciona todo el contenido** (las carpetas `public`, `api` y los archivos `package.json`, `vercel.json`, etc.) y **arrastra esos archivos/carpetas seleccionados** hacia la ventana del navegador. *(Importante: Arrastra el contenido, no la carpeta "travesia extras" principal, para que los archivos queden en la raíz del repositorio).*
5. Haz clic en el botón verde **"Commit changes"** para guardar.

**Opción B: Usar GitHub Desktop (Recomendado para proyectos serios)**
1. Descarga e instala [GitHub Desktop](https://desktop.github.com/).
2. Inicia sesión con tu cuenta de GitHub.
3. Arrastra la carpeta de tu proyecto hacia la ventana de GitHub Desktop.
4. Te preguntará si quieres "crear un repositorio", dile que sí y publícalo.

### Pasos en Vercel:
1. Ve a [Vercel](https://vercel.com) e inicia sesión con tu cuenta de GitHub.
2. Haz clic en **"Add New..." > "Project"**.
3. Importa el repositorio de `Travesia Pinolera` que acabas de subir a GitHub.
4. En la pantalla de configuración ("Configure Project"):
   - **Framework Preset**: Vercel detectará Node.js o lo dejará en "Other". Déjalo así, tu `vercel.json` ya se encarga del enrutamiento.
   - **Environment Variables**: ¡Paso crítico! Aquí debes pegar las variables de tu archivo `.env`:
     - **Name**: `MONGO_URI`, **Value**: `mongodb+srv://...`
     - **Name**: `DATABASE_URL`, **Value**: `postgresql://...`
5. Haz clic en **Deploy**.
6. Vercel comenzará a compilar (en este caso, solo preparará las funciones serverless). 
7. Cuando termine, te dará una URL (ej. `https://travesia-pinolera.vercel.app`).
8. ¡Listo! Tu proyecto ahora es un Fullstack funcionando con bases de datos en la nube.

---

## Próximos pasos en el desarrollo
Actualmente, el backend de la carpeta `/api/index.js` devuelve datos de prueba. Cuando hayas completado los pasos anteriores y verifiques que la base de datos conecta correctamente, deberás reemplazar el código de simulación (mock) por consultas reales a Mongoose y a pg (ej. `await Pool.query('SELECT * FROM vuelos')`).
