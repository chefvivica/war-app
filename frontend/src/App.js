import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { useState } from 'react';
import Start from './Start';
import { War } from './War';
import { Game } from './classContainer/Game';


function App() {
  const game = new Game()

  const [formValue, setFormValue] = useState('');


  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Start formValue={formValue} setFormValue={setFormValue} />} />
        <Route exact path="/war" element={<War
          formValue={formValue}
          game={game}
        />} />

      </Routes>
    </BrowserRouter>
  );
}


export default App;
