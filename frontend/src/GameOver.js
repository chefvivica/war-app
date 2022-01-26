import { useEffect, useState } from 'react';

export function GameOver({ formValue, game }) {
    const increasor = undefined;


    useEffect(
        () => {
            if (game.user.score == 1) {

            }
            fetch(`http://localhost:8080/users/${formValue}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({ "username": formValue, "winCount": 0, "lostCount": 1 })
            })
        }
        , [game.user.score]
    )


    const handleScore = (e) => {
        console.log("clicked")
    }


    return (
        <div className="GameOver">

            <h1> Game Over </h1>
            <h3>{game.user.message}</h3>
            <h3> User Score: {game.user.score}</h3>
            <h3> Bot Score: {game.bot.score}</h3>

            <button onClick={handleScore}>Check Score DashBoard</button>
        </div>
    );
}
