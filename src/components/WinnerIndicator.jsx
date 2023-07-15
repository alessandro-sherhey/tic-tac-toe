import React from "react";

const WinnerIndicator = ({winner, gameEnded, humanPlayers}) => {
    return (
        <div className="winnerIndicator">
            {(winner === 1 && humanPlayers === 1) && <h2 className="player1">You won!</h2>}
            {(winner === 2 && humanPlayers === 1) && <h2 className="player2">AI won!</h2>}
            {(winner === 1 && humanPlayers === 2) && <h2 className="player1">Player 1 won!</h2>}
            {(winner === 2 && humanPlayers === 2) && <h2 className="player2">Player 2 won!</h2>}
            {(gameEnded && !winner) && <h2>It's a tie!</h2>}
        </div>
    )
}

export default WinnerIndicator;