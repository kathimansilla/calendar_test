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

  loadMonth(10, 25, 31, availableDaysObj);
  loadMonth(11, 1, 30, availableDaysObj);
  loadMonth(12, 1, 27, availableDaysObj);

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

async function loadMonth(month, dayStart, dayEnd, targetArray) {
    for (let day = dayStart; day <= dayEnd; day++) {
    const url = `https://tadpole.clickferry.app/departures?route=ALGECEUT&time=2023-${month}-${day.toString().padStart(2, "0")}`;
    const response = await axios.get(url);
    if (response.data.length > 0 && response.status === 200) {
      targetArray.push(response.data[0]);
    }
  }
}