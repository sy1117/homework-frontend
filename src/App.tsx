import React from 'react';
import ControlView from './Components/ControlView';
import CalendarView from './Components/CalendarView';
import './App.css'

const App = () => {

  const now = new Date();
  return (
    <div>
      <CalendarView date={now}/>
    </div>
  )
}

export default App;
