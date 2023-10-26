import { useEffect, useState } from 'react';
import callToApi from '../services/api';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import '../styles/App.scss';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

function App() {
  const [availableDays, setAvailableDays] = useState([]);
  const localizer = momentLocalizer(moment);
  const today = new Date();
  const twoMonthsFromNow = moment().add(2, 'months').toDate();


  useEffect(() => {
    callToApi().then((data) => {
      setAvailableDays(data);
    });
  }, []);

  console.log(availableDays);
  const availableDaysList = availableDays.map(day => ({
    title: 'Reservar',
    start: new Date(day.time),
    end: new Date(day.time),
  }));

  return (
    <>
    <header className='header'><h1 className='header__title'>ClickFerry | 15 años</h1></header>
    <main className='main'>
      <h2 className='main__titleCalendar'>Reserva tu viaje con ClickFerry</h2>
      <div className='main__calendar'>
      <Calendar
        localizer={localizer}
        events={availableDaysList}
        defaultView="month"
        defaultDate={today}
        min={today} 
        max={twoMonthsFromNow} 
        style={{ height: 500 }} 
      />
      </div>
    </main>
    <footer className='footer'><span className='footer__text'>©CLICKFERRY,S.L. LCI:AN-293000-3 (on-line)</span></footer>
    </>
  );
}

export default App;
