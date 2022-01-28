import { useNavigate } from 'react-router-dom';
export function GameOver({ game }) {
    let nevigate = useNavigate()

    const handleScore = (e) => {
        nevigate('/dashboard')
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
