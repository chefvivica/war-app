import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Game } from "./classContainer/Game";
import Card from "./Card"
function War({ formValue }) {

    const game = new Game();




    const [userCards, setUserCards] = useState([])
    const [botCards, setBotCards] = useState([])

    function handleStartButton() {
        game.startGame()
        setUserCards(game.user.hand)
        setBotCards(game.bot.hand)
    }

    function handlePlayButton() {


    }

    return (
        <>
            <button onClick={handleStartButton}>
                Start Game
            </button>
            {userCards?.map((card, index) => {
                return (<span key={index} style={{ "margin": "4px" }}>
                    {card.value}
                </span>
                )
            })}
            <div>
                <button>Next</button>

            </div>
        </>
    )

}

export default War;
