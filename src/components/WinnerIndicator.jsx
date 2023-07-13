import React from "react";

const WinnerIndicator = ({winner, gameEnded}) => {
    return (
        <div className="winnerIndicator">
            { winner === 1 && <h2>Player 1 won!</h2>}
            { winner === 2 && <h2>Player 2 won!</h2>}
            {(gameEnded && !winner) && <h2>It's a tie!</h2>}
        </div>
    )
}

export default WinnerIndicator;