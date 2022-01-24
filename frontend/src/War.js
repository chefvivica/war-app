import {  useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Deck, Hand } from "./classContainer/Game";
import Card from "./Card"
function War({ formValue }) {

    const deck = new Deck();
    // const hand1 = new Hand();
    // hand1.username = formValue
    // const hand2 = new Hand();
    // hand2.username = "bot"

    // console.log("hand1", hand1, "hand2", hand2)

    const [cards, setCards] = useState([])

    function handleShuffleButton(){
        deck.shuffle()
        setCards(deck.cards)
    }

    return (
        <>
            <button onClick={handleShuffleButton}>
                Shuffle
            </button>
            <div>
                <h3>Here are your cards</h3>
                {cards.map((card,i)=>{
                    return (
                        <span key={`card${i}`}>{card}</span>
                    )
                })   }

            </div>
        </>
    )

}

export default War;
