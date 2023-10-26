# Calendar test

Este proyecto muestra un calendario con los días en los que los usuarios pueden reservar sus viajes en ferry. 

El servidor se encarga de llamar a la API 'https://tadpole.clickferry.app/departures?route=ALGECEUT' por única vez cuando se despliega la aplicación. Para esto se guardan los datos en una variable global. Se extraen solo los datos de los próximos 2 meses a partir del día actual. 

Desde el frontend se despliega un calendario que muestra aquellos días en los que el usuario puede reservar un viaje, diferenciando así los días que no están disponibles. Se presenta una maquetación inicial, con header, main y footer cuyos estilos están escritos con SASS (SCSS).

Debido al tamaño del proyecto no se han utilizado componentes, pero se ha preparado la estrucutura proyectando el futuro desarrollo de la página. 

## Stack tech 

-Node.js
-Express.js
-React.js
-SASS (SCSS)
-HTML5
-VSC
-GITHUB

## Requisitos Previos para ejecutar el proyecto de manera local

Instalar en el ordenador:
- Node.js y npm.
- Git.

## Clonar el Repositorio 

- git clone https://github.com/kathimansilla/calendar_test.git

### Configurar el backend

- npm i (en carpeta raíz: backend)
- npm run dev (Inicia el servidor. Este estará en funcionamiento en http://localhost:5173)

### Configurar el frontend

- cd frontend
- cd test_clickferry
- npm i
- npm run dev

### Uso

-Abrir navegador web en http://localhost:5173 para acceder a la aplicación.

#### Katherina Mansilla 👩🏻‍💻