import React, { useEffect } from "react";

const Settings = ({
    humanPlayers, 
    setHumanPlayers, 
    player1Color, 
    player2Color, 
    setPlayer1Color, 
    setPlayer2Color, 
    animations, 
    setAnimations,
    resetGame,
    ai,
    setAi
}) => {
    useEffect(() => {
        document.addEventListener("keypress", (e) => {
            if (e.key === 'r') {
                resetGame();
            }
        })

        return () => {
            document.removeEventListener("keypress", (e) => {
            if (e.key === 'r') {
                resetGame();
            }
            })
        }
    }, [])

    useEffect(() => {
        document.addEventListener("keypress", (e) => {
            if (e.key === 'g') {
                window.location.href = 'https://github.com/alessandro-sherhey/tic-tac-toe';
            }
        })

        return () => {
            document.removeEventListener("keypress", (e) => {
                if (e.key === 'g') {
                    window.location.href = 'https://github.com/alessandro-sherhey/tic-tac-toe';
                }
            })
        }
    }, [])

    return (
        <div className="settings">
            <div className="setting">
                <h3>Players</h3>
                <div className="settingsGroup">
                    <button 
                        onClick={() => setHumanPlayers(1)}
                        className={humanPlayers === 1 ? 'selected' : null}
                    >1</button>
                    <button 
                        onClick={() => setHumanPlayers(2)}
                        className={humanPlayers === 2 ? 'selected' : null}
                    >2</button>
                </div>
            </div>
            <div className="setting">
                <h3>Game</h3>
                <div className="settingsGroup">
                    <button
                        onClick={() => resetGame()}
                    >Reset</button>
                </div>
            </div>
            <div className="setting">
                <h3>AI <span className="betaWarning">BETA</span></h3>
                <div className="settingsGroup">
                    <button
                        onClick={() => setAi(true)}
                        className={ai ? 'selected' : null}
                    >On</button>
                    <button
                        onClick={() => setAi(false)}
                        className={!ai ? 'selected' : null}
                    >Off</button>
                </div>
            </div>
            {/* <div className="setting">
                <h3>Colors</h3>
                <div className="settingsGroup">
                    <div>
                        <h4>Player 1</h4>
                        <input 
                            type="color" 
                            value={player1Color}
                            onChange={e => setPlayer1Color(e.target.value)}
                        />
                    </div>
                    <div>
                        <h4>Player 2</h4>
                        <input 
                            type="color" 
                            value={player2Color}
                            onChange={e => setPlayer2Color(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className="setting">
                <h3>Animations</h3>
                <div className="settingsGroup">
                    <button 
                        onClick={() => setAnimations(true)}
                        className={animations ? 'selected' : null}
                    >Enable</button>
                    <button 
                        onClick={() => setAnimations(false)}
                        className={!animations ? 'selected' : null}
                    >Disable</button>
                </div>
            </div> */}
        </div>
    )
}

export default Settings;