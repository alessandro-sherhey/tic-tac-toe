import React from "react";

const WinnerIndicator = ({winner}) => {
    return (
        <div className="winnerIndicator">
            { winner === 1 && <h2>Player 1 won!</h2>}
            { winner === 2 && <h2>Player 2 won!</h2>}
        </div>
    )
}

export default WinnerIndicator;