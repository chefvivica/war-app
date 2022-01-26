import { useEffect, useState } from 'react';

export function GameOver({ formValue, game }) {
    useEffect(
        () => console.log(formValue)
        , []
    )
    return (
        <div className="GameOver">

            <h1> Game Over </h1>
            {/* <h3>{formValue} score: {game.user.won}</h3> */}
            {/* <h3>Bot: score: {game.bot.won}</h3> */}
        </div>
    );
}
