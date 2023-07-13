import React from "react";

const TurnIndicator = ({turn, gameEnded}) => {
    const circleClass = () => {
        switch (turn) {
            case 1:
                return 'turn1'
            case 2:
                return 'turn2'
        }
    }

    return (
        <div className="turnIndicator">
            { !gameEnded && (
                <h2>
                    <span className={`turnCircle ${circleClass()}`}>⬤</span>
                    { turn === 1 && "Player 1 turn!" }
                    { turn === 2 && "Player 2 turn!" }
                </h2>
            )}
        </div>
    )
}

export default TurnIndicator;