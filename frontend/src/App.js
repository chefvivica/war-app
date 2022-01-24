import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [formValue, setFormValue] = useState('');
  useEffect(
    () =>console.log(formValue)
    ,[formValue]
    )


  const handleClick = (e) => {
    e.preventDefault()
    fetch('http://localhost:8080/user',{
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({"username": formValue})
    })
    .then(res => res.json())
    .then(response => {
      console.log(response)
    })
    setFormValue('')

  }


  return (
    <div className="App">
      <header className="App-header">

        <h1>
          Welcome to War-App
        </h1>

        <form  onSubmit={handleClick}>
          <label>
            Name:
            <input type="text" name="name" onChange= {(e)=> setFormValue(e.target.value)} value = {formValue} />
          </label>
          <input type="submit" value="Submit" />
        </form>

      </header>
    </div>
  );
}

export default App;
