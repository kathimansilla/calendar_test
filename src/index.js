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

const getAvailablesDays = async () => {
let availableDaysObj = [];

for (let month = 10; month <= 12; month++) {
  if (month === 10) {
    for (let day = 25; day <= 31; day++) {
      const url = `https://tadpole.clickferry.app/departures?route=ALGECEUT&time=2023-${month}-${day}`;
      const response = await axios.get(url);
      if (response.data.length > 0 && response.status === 200) {
        availableDaysObj.push(response.data[0]);

      }
    }
  } else if (month === 11) {
    for (let day = 1; day <= 30; day++) {
      const url = `https://tadpole.clickferry.app/departures?route=ALGECEUT&time=2023-${month}-${day}`;
      const response = await axios.get(url);
      if (response.data.length > 0 && response.status === 200) {
        availableDaysObj.push(response.data[0]);
      }
    }
  } else if (month === 12) {
    for (let day = 1; day < 26; day++) {
      const url = `https://tadpole.clickferry.app/departures?route=ALGECEUT&time=2023-${month}-${day}`;
      const response = await axios.get(url);
      if (response.data.length > 0 && response.status === 200) {
        availableDaysObj.push(response.data[0]);
        console.log(response.data[0]);
      }
    }
  }
}

return availableDaysObj;
};

server.get('/available-days', async (req, res) => {
  try {
    if (cachedData) {
      res.json(cachedData);
      console.log('caché');
    } else {
      //Suponiendo que el usuario hace una búsqueda para la ruta ALGECEUT
      const datesObj = await getAvailablesDays();   
      cachedData = datesObj;
      res.json(datesObj);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al llamar a la API');
  }
});
