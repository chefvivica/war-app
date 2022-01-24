import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { useState } from 'react';
import Start from './Start';
import War from './War';


function App() {

  const [formValue, setFormValue] = useState('');


  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Start formValue={formValue} setFormValue={setFormValue} />}/>
        <Route exact path="/war" element={<War formValue={formValue} />}/>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
