import React, { Component } from "react";
import './Game.css';

const CHOICES = ["ROCK", "PAPER", "SCISSORS"];
const DEFAULT_DURATION = 10;

class Game extends Component {
     constructor(props) {
          super(props);
          this.state = {
               playerVal: "-",
               computerVal: "-",
               playerScore: 0,
               compScore: 0,
               gameDuration: DEFAULT_DURATION,
               timeRemaining: DEFAULT_DURATION,
               gameOver: false,
               showGameContent: true // New state variable to control visibility of game content buttons
          };
          this.timer = null;
     }

     componentDidMount() {
          // this.startGame(DEFAULT_DURATION);
     }

     componentWillUnmount() {
          clearInterval(this.timer);
     }

     startGame = (duration) => {
          clearInterval(this.timer);
          this.setState({
               gameDuration: duration,
               timeRemaining: duration,
               playerScore: 0, // Reset scores here
               compScore: 0,   // Reset scores here
               gameOver: false,
               showGameContent: true // Hide game content buttons when game starts
          });
          this.timer = setInterval(this.tick, 1000);
     };

     tick = () => {
          this.setState((prevState) => ({
               timeRemaining: prevState.timeRemaining - 1
          }), () => {
               if (this.state.timeRemaining <= 0) {
                    clearInterval(this.timer);
                    this.setState({
                         gameOver: true,
                         showGameContent: true
                    });
               }
          });
     };

     logic = (playerVal, computerVal) => {
          // Define the mapping of choices to numerical values
          const choicesMap = { ROCK: 0, PAPER: 1, SCISSORS: 2 };

          // Get numerical values for player and computer choices
          const playerChoice = choicesMap[playerVal];
          const compChoice = choicesMap[computerVal];

          // Calculate the result based on the difference of choices
          const result = (playerChoice - compChoice + 3) % 3;

          // Determine the outcome based on the result
          if (result === 0) {
               // Draw
               return 0;
          } else if (result === 1) {
               // Player wins
               return 1;
          } else {
               // Computer wins
               return -1;
          }
     };

     decision = (playerChoice) => {
          if (!this.timer) {
               this.startGame(DEFAULT_DURATION);
          }

          if (this.state.timeRemaining <= 0) {
               return;
          }
          const compChoice = CHOICES[Math.floor(Math.random() * CHOICES.length)];
          const val = this.logic(playerChoice, compChoice);
          this.setState((prevState) => ({
               playerVal: playerChoice,
               computerVal: compChoice,
               playerScore: prevState.playerScore + (val === 1 ? 1 : 0),
               compScore: prevState.compScore + (val === -1 ? 1 : 0),
               showGameContent: true
          }));
     };

     render() {
          const { playerVal, computerVal, playerScore, compScore, timeRemaining, gameOver, showGameContent } = this.state;
          const winner = playerScore > compScore ? "You Won" : playerScore < compScore ? "Computer Won" : "It's a Draw";
          return (
               <div className="game-container container">
                    <div className="game-box">
                         {showGameContent && <div className="button-box">
                              <div className="label-text">
                                   <p>Select game duration:</p>
                              </div>
                              <div>
                                   <button onClick={() => { this.startGame(15); }}>15 Sec</button>
                                   <button onClick={() => { this.startGame(30); }}>30 Sec</button>
                                   <button onClick={() => { this.startGame(60); }}>60 Sec</button>
                              </div>
                         </div>}
                         {<div className="content shadow">
                              <div className="result-box shadow">
                                   {!gameOver && <div className="choices">
                                        <div className="player-choice player">
                                             <span>Player's choice:</span>
                                             <span>{playerVal}</span>
                                        </div>
                                        <div className="computer-choice computer">
                                             <span>Computer's choice:</span>
                                             <span>{computerVal}</span>
                                        </div>
                                   </div>}
                                   <div className="scores">
                                        <div className="player-score player">
                                             <span>Player's score:</span>
                                             <span>{playerScore} </span>
                                        </div>
                                        <div className="computer-score computer">
                                             <span>Computer's score:</span>
                                             <span>{compScore}</span>
                                        </div>
                                   </div>
                              </div>
                              {/* Display winner */}
                              <div className="winner-message">
                                   {gameOver && <p>{winner}</p>}
                              </div>
                              <div className="info">
                                   {gameOver && <span><h2>Game Over! Time's up.</h2></span>}
                                   {!gameOver && <span>Time Remaining: {timeRemaining} seconds</span>}
                              </div>
                         </div>}
                         {!gameOver && timeRemaining > 0 && ( // Show game content buttons if showGameContent is true
                              <div className="button-box shadow">
                                   {!showGameContent && <div className="label-text">
                                        <span>click to start game</span>
                                   </div>}
                                   <div>
                                        {CHOICES.map((choice) => (
                                             <button key={choice} className={`${choice.toLowerCase()}-button`} onClick={() => { this.decision(choice); }}>
                                                  <i className={`fas fa-hand-${choice.toLowerCase()}`} /> {choice}
                                             </button>
                                        ))}
                                   </div>
                              </div>
                         )}
                    </div>
                    {gameOver && (
                         <div className="button-box">
                              <button onClick={() => this.startGame(this.state.gameDuration)}>Restart Game</button>
                         </div>
                    )}


               </div>
          );
     }
}

export default Game;
