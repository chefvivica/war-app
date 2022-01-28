import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { useState } from 'react';
import Start from './Start';
import { War } from './War';
import { DashBoard } from './DashBoard';
import { Game } from './classContainer/Game';


function App() {
  const [formValue, setFormValue] = useState('');
  const game = new Game(formValue)

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Start
          formValue={formValue}
          setFormValue={setFormValue}
        />} />
        <Route exact path="/war" element={<War
          formValue={formValue}
          game={game}
        />} />
        <Route exact path="/dashboard" element={<DashBoard
          formValue={formValue}
          game={game}
        />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
