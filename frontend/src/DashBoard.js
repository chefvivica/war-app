import { useState, useEffect } from "react";
export function DashBoard() {
    const [dashBoard, setDashBoard] = useState([])
    useEffect(
        () => {
            fetch('http://localhost:8080/users')
                .then(res => res.json())
                .then(data => setDashBoard(data))
        }, []
    )


    console.log(dashBoard)
    return (
        <div className="GameOver">
            <h1> War game player dashboard </h1>
            {dashBoard?.map((user, index) => {
                return (
                    <div key={index}
                        style={{
                            "display": "inline-block",
                            "border": "solid",
                            "margin": "2px",
                            "height": "160px",
                            "width": "200px"
                        }}>
                        <li> Username: {user.username}</li>
                        <li>Win: {user.winCount}</li>
                        <li>Lose: {user.lostCount}</li>

                    </div>)
            })}
        </div>
    );
}
