# RollingVet Backend - Sistema de Veterinaria con Node.js, Express y MongoDB

¡Bienvenido al repositorio del backend de RollingVet! Este proyecto es el backend de una aplicación de veterinaria que utiliza Node.js y el framework Express, junto con MongoDB como base de datos. RollingVet proporciona una plataforma para administrar diferentes aspectos de una clínica veterinaria, incluyendo la gestión de turnos, registros de usuarios y mascotas, y otros datos relevantes.

## Características del Backend

- **Express Framework:** El backend de RollingVet está construido utilizando el framework Express, que simplifica el desarrollo de aplicaciones web y APIs en Node.js. Express facilita la creación de rutas, middleware y el manejo de solicitudes y respuestas.

- **API RESTful:** El backend expone una API RESTful que permite a la aplicación de frontend interactuar con los datos y realizar diversas acciones, como la creación de turnos, la gestión de usuarios y mascotas, y la obtención de información relevante.

- **Conexión a MongoDB:** Utiliza MongoDB, una base de datos NoSQL, para almacenar y administrar los datos del sistema. La información sobre turnos, usuarios, mascotas y otros aspectos de la clínica se almacena de manera estructurada en la base de datos.

- **Autenticación y Autorización:** Proporciona autenticación segura y manejo de sesiones para los usuarios. Implementa sistemas de autorización para garantizar que solo los usuarios autorizados puedan acceder a determinados recursos.

## Requisitos del Sistema

Asegúrate de tener las siguientes herramientas instaladas en tu sistema antes de ejecutar el proyecto:

- [Node.js](https://nodejs.org) (versión recomendada)
- [npm](https://www.npmjs.com/get-npm) o [Yarn](https://yarnpkg.com/getting-started/install)
- [MongoDB](https://www.mongodb.com/) (instalado y en funcionamiento)

## Configuración del Proyecto

1. Clona este repositorio en tu máquina local:

   ```bash
   git clone https://github.com/msaez85/RollingVet-backend.git
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd RollingVet-backend
   ```

3. Instala las dependencias del proyecto:

   ```bash
   npm install
   # O con Yarn
   yarn
   ```

4. Configuración de la Base de Datos: Asegúrate de que MongoDB esté en funcionamiento y configura la conexión a la base de datos en el archivo de configuración correspondiente.

## Ejecutar el Backend

1. Inicia el servidor del backend:

   ```bash
   npm start
   # O con Yarn
   yarn start
   ```

2. El servidor estará en funcionamiento en el puerto configurado. Por defecto, puede accederse en `http://localhost:8080`.

## Estructura del Proyecto

  - `controllers/`: Controladores para gestionar las operaciones relacionadas con los recursos.
  - `models/`: Definiciones de modelos para interactuar con la base de datos.
  - `routes/`: Rutas que definen los endpoints de la API.
  - `middlewares/`: Middleware para la autenticación y autorización.
  - `database/`: Archivos de configuración para la base de datos y otros parámetros.
  - `helpers/`: módulos auxiliares q para realizar tareas específicas de manera modular y reutilizable
    

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para obtener más información.

---

Gracias por tu interés en el backend de RollingVet. 
