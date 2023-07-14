import React from "react";

const TurnIndicator = ({turn, gameEnded, humanPlayers}) => {
    const circleClass = () => {
        switch (turn) {
            case 1:
                return 'turn1'
            case 2:
                return 'turn2'
        }
    }

    { (!gameEnded && (turn === 1 && humanPlayers === 2)) && (
            <div className="turnIndicator">
                <h2>
                    <span className={`turnCircle ${circleClass()}`}>⬤</span>
                    "Player 1 turn!"
                </h2>
            </div>
    )}

    { (!gameEnded && (turn === 2 && humanPlayers === 2)) && (
        <div className="turnIndicator">
            <h2>
                <span className={`turnCircle ${circleClass()}`}>⬤</span>
                "Player 2 turn!"
            </h2>
        </div>
    )}

    { (!gameEnded && humanPlayers === 1) && (
        <div className="turnIndicator">
            <h2>
                <span className={`turnCircle ${circleClass()}`}>⬤</span>
                "Your turn!"
            </h2>
        </div>
    )}

    return (
        <div className="turnIndicator">
            {(!gameEnded && humanPlayers === 1) && (
                    <h2>
                        <span className={`turnCircle ${circleClass()}`}>⬤</span>
                        Your turn!
                    </h2>
            )}
            {(!gameEnded && (turn === 1 && humanPlayers === 2)) && (
                    <h2>
                        <span className={`turnCircle ${circleClass()}`}>⬤</span>
                        Player 1 turn!
                    </h2>
            )}
            {(!gameEnded && (turn === 2 && humanPlayers === 2)) && (
                    <h2>
                        <span className={`turnCircle ${circleClass()}`}>⬤</span>
                        Player 2 turn!
                    </h2>
            )}
        </div>
    )

        // { !gameEnded && ()
        // <div className="turnIndicator">
             
        //         <h2>
        //             <span className={`turnCircle ${circleClass()}`}>⬤</span>
        //             { turn === 1 && "Player 1 turn!" }
        //             { (turn === 2 && humanPlayers === 2) ? "Player 2 turn!" : null}
        //         </h2>
            
        // </div>
}

export default TurnIndicator;