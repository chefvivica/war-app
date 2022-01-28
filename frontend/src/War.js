import { useState } from 'react';
import { GameOver } from "./GameOver"
export function War({ formValue, game }) {


    game.user.username = formValue
    const [showWelcome, setWelcome] = useState(true)
    const [showDeal, setDeal] = useState(false)
    const [userHand, setUserHand] = useState([])
    const [botHand, setBotHand] = useState([])
    const [message, setMessage] = useState("")// each battle winner
    const [tableCards, setTableCards] = useState([...game.tableCards])
    const [endGame, setEndGame] = useState(false)
    const [timeToPlay, setTimeToPlay] = useState(true)//toggle play and clear button

    function handleStartButton() {
        game.startGame();
        setWelcome(false)
        setDeal(true)
        setBotHand(game.bot.hand)
        setUserHand(game.user.hand)

    }

    //after each round clear the table
    function clearTable() {
        game.clearTable()
        setTableCards([])
        if (game.status !== "Over") {
            setTimeToPlay(true)
        } else {
            setEndGame(true)
        }

    }

    //main function for game
    function handlePlay() {
        game.playTopCard()
        game.compareCards()
        setTableCards([...game.tableCards])
        setBotHand([...game.bot.hand])
        setUserHand([...game.user.hand])
        if (game.status === "User Won") {
            setMessage("You win")
        } else if (game.status === "Bot Won") {
            setMessage("You lost")
        } else if (game.status === "War") {
            setMessage("It is war")
        } else if (game.status === "Over") {
            setEndGame(true)
            if (game.user.score === 1) {
                fetch(`http://localhost:8080/users/${formValue}/winIncrease`)

            } else if (game.user.score === 0) {
                fetch(`http://localhost:8080/users/${formValue}/lostIncrease`)

            }
        }
        setTimeToPlay(false)
    }

    return (
        < >
            {!endGame
                ? <div className='AllowPlay'>
                    {/* ############################## */}
                    {/*         welcome section        */}
                    {/* ############################## */}
                    {(showWelcome) ?
                        <div>
                            <h3>Hi {formValue}, Welcome to War_app, click start to start the game</h3>
                            <button onClick={handleStartButton}> Start </button>
                        </div>
                        : null}

                    <p style={{
                        "color": '#00004d',
                        "fontSize": "48px",
                        "width": "200px"
                    }}>
                        {message}</p>



                    {/* ############################## */}
                    {/*           user section         */}
                    {/* ############################## */}

                    {(showDeal) ?
                        <div className='user-hand'>
                            <h2>Player: {formValue}'s card</h2>
                            {userHand?.map((card, index) => {
                                return (<div key={index}
                                    style={{
                                        "margin": "4px",
                                        "background": " #e7e7e7",
                                        "width": "70px",
                                        "height": "70px",
                                        "display": "inline-block"
                                    }}>
                                    <p>{card.face}</p>
                                </div>
                                )
                            })}
                        </div>
                        : null}


                    {/* ################################################################*/}
                    {/* #   divider, above are user's card, below are bot's card       #*/}
                    {/* ################################################################*/}


                    {!(showWelcome) ?
                        <div style={{ "margin": "20px" }}>
                            {timeToPlay
                                ? <button onClick={handlePlay}>Play</button>// click to countiue to play next round
                                : <button onClick={clearTable}>Clear</button>// click clear table
                            }
                        </div>
                        : null}
                    {/* display instructions */}
                    <div>
                        {tableCards?.map((card, index) => {
                            return (<div key={index}
                                style={{
                                    "margin": "4px",
                                    "background": "#E0FFFF",
                                    "width": "70px",
                                    "height": "70px",
                                    "display": "inline-block"
                                }}
                            >
                                <p> {card.face}</p>
                            </div>)
                        })}

                    </div>


                    {/* ###################*/}
                    {/* #  bot section    #*/}
                    {/* ###################*/}

                    {(showDeal) ?
                        <div className='bot-hand'>
                            <h2>Player: Bot's card</h2>
                            {botHand?.map((card, index) => {
                                return (<div key={index}
                                    style={{
                                        "margin": "4px",
                                        "background": "#e7e7e7",
                                        "width": "70px",
                                        "height": "70px",
                                        "display": "inline-block"
                                    }}>
                                    <p>{card.face}</p>
                                </div>
                                )
                            })}
                        </div>
                        : null}
                </div>
                : <GameOver formValue={formValue} game={game} />
            }
        </>
    )

}
