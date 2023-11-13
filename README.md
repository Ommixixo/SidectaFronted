# React Mapa con Sidebar

Este proyecto fue creado utilizando [Create React App](https://github.com/facebook/create-react-app).

## Descripción del Proyecto

Este proyecto implementa un mapa interactivo con capacidades de dibujo de polígonos y un panel lateral (sidebar) que muestra una lista de polígonos guardados. Los polígonos pueden ser dibujados en el mapa y almacenados en un servicio REST.

## Inicio Rápido

1. Clona este repositorio:
      ```javascript
   git clone https://github.com/Ommixixo/SidectaFronted.git

   
2. Instala las dependencias usando Yarn (o NPM):

   ```javascript
   cd react-mapa-con-sidebar
   yarn install (npm install)


3. Inicia la aplicación en modo de desarrollo:

   ```javascript
   yarn start

La aplicación estará disponible en http://localhost:3000.

Scripts Disponibles
En el directorio del proyecto, puedes ejecutar los siguientes scripts:

   yarn start

Inicia la aplicación en modo de desarrollo.
Abre http://localhost:3000 para verla en tu navegador.

   yarn test

Lanza el corredor de pruebas en modo interactivo.
Consulta la sección sobre ejecutar pruebas para obtener más información.

   yarn build

Construye la aplicación para producción en el directorio build.
La aplicación se minificará y los nombres de archivo incluirán los hashes.
La aplicación estará lista para ser desplegada.

   yarn eject

Nota: ¡Esta operación es irreversible!

Si no estás satisfecho con la herramienta de construcción y las opciones de configuración, puedes ejectar el proyecto. Esto copiará todos los archivos de configuración y dependencias transitorias directamente a tu proyecto. A partir de este punto, estás por tu cuenta.

## Configuración del Backend

Este proyecto está diseñado para trabajar con un backend implementado en Laravel. Para conectar el frontend con el backend, sigue estos pasos:

1. Abre el archivo `src/config.js` en tu editor de código.

2. Busca la variable `API_BASE_URL` en este archivo.

3. Asigna la URL base de tu servidor Laravel a la variable `API_BASE_URL`. Por ejemplo:

   ```javascript
   const API_BASE_URL = 'http://localhost:8000'
   // Reemplaza con la URL de tu servidor Laravel


4. Asegúrate de que la URL apunte al servidor donde se ejecuta tu backend Laravel.

Guarda los cambios.

Con estos pasos, el frontend ahora debería estar configurado para comunicarse con tu backend Laravel. Asegúrate de que tu servidor Laravel esté en ejecución antes de utilizar la aplicación.

Para ejecutar el backend Laravel localmente, puedes usar el siguiente comando en la carpeta de tu proyecto Laravel:

   ```javascript
   php artisan serve
   // Reemplaza con la URL de tu servidor Laravel

Consulta la documentación de Laravel para obtener más detalles sobre cómo configurar y ejecutar tu backend
