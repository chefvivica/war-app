import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Start({ formValue, setFormValue }) {

  let navigate = useNavigate();
  const [allUsers, setUsers] = useState([]);


  const handleClick = (e) => {
    e.preventDefault()
    fetch('http://localhost:8080/user', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({ "username": formValue })
    })
    navigate('/war')
  }


  return (
    <div className="App">
      <header className="App-header">

        <h1>
          Welcome to War-App
        </h1>
        <form onSubmit={handleClick}>
          <label>
            Name:
            <input type="text"
              name="name"
              // onChange={(e) => setFormValue(e.target.value)}
              onChange={e => setFormValue(e.target.value)}
              value={formValue} />
          </label>
          <input type="submit" value="Submit" />
        </form>

      </header>
    </div>
  );
}

export default Start;
