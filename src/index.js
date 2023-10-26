const express = require('express');
const cors = require('cors');
const axios = require('axios');

const server = express();

server.use(cors());
server.use(express.json({ limit: '25mb' }));

const serverPort = 5173;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

//
let cachedData = null;

server.get('/available-days', async (req, res) => {
  try {
    if (cachedData) {
      res.json(cachedData);
      console.log('caché');
    } else {
    //Suponiendo que el usuario hace una búsqueda para la ruta ALGECEUT
      const response = await axios.get(
        'https://tadpole.clickferry.app/departures?route=ALGECEUT'
      );
      const data = response.data;
      const first67Objects = data.slice(0, 67);
      cachedData = first67Objects;
      res.json(cachedData);
      console.log('no cache');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al llamar a la API');
  }
});
