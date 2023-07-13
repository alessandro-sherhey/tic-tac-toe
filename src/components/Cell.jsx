import React, { useEffect } from "react";

const Cell = (data) => {
    const updateCells = data.updateCells;

    const textToShow = () => {
        const selectedBy = data.selectedBy;
        switch (selectedBy) {
            case null: 
                return '';
            case "p1":
                return 'X';
            case "p2":
                return 'O';
            default:
                return '';
        }
    }

    return (
        <div 
            className="cell"
            onClick={() => updateCells(data.id)}>
            {textToShow()}
        </div>
    )
}

export default Cell;