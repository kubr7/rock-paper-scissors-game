import React, { Component } from "react";
import { Link } from "react-router-dom";
import './Game.css';
import './Home.css';

const CHOICES = ["✊", "🖐️", "✌"];
// const CHOICES = ["ROCK", "PAPER", "SCISSORS"];

class Home extends Component {
     constructor(props) {
          super(props);
          this.state = {
               playerVal: "-",
               computerVal: "-",
               playerScore: 0,
               compScore: 0,
               gameOver: false,
               showContent: true
          };
     }

     startGame = () => {
          // clearInterval(this.timer);
          this.setState({
               playerScore: 0, // Reset scores here
               compScore: 0,   // Reset scores here
               gameOver: false
          });

     };

     logic = (playerVal, computerVal) => {
          // Define the mapping of choices to numerical values
          const choicesMap = { '✊': 0, '🖐️': 1, '✌': 2 };
          // const choicesMap = { ROCK: 0, PAPER: 1, SCISSORS: 2 };

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
          const compChoice = CHOICES[Math.floor(Math.random() * CHOICES.length)];
          const val = this.logic(playerChoice, compChoice);
          this.setState(() => ({
               playerVal: playerChoice,
               computerVal: compChoice,
               playerScore: (val === 1 ? 1 : 0),
               compScore: (val === -1 ? 1 : 0),
               gameOver: true,
          }));
     };

     render() {
          const { playerVal, computerVal, playerScore, compScore, gameOver, showContent } = this.state;
          const winner = playerScore > compScore ? "You Won" : playerScore < compScore ? "Computer Won" : "It's a Draw";
          return (
               <div className="home-container container">
                    <div className="cover shadow">
                         <span className="heading-text">Welcome to</span>
                         <span className="game-name">Rock, Paper, Scisssors!</span>
                    </div>
                    <div className="cover">
                         <div className="content shadow">
                              <div className="result-box">
                                   <div className="choices">
                                        <div className="player-choice player">
                                             <span>Player's choice:</span>
                                             <span className="choice">{playerVal}</span>
                                        </div>
                                        <div className="computer-choice computer">
                                             <span>Computer's choice:</span>
                                             <span className="choice">{computerVal}</span>
                                        </div>
                                   </div>
                                   <div className="scores">
                                        <div className="player-score player">
                                             <span>Player's score:</span>
                                             <span>{playerScore}</span>
                                        </div>
                                        <div className="computer-score computer">
                                             <span>Computer's score:</span>
                                             <span>{compScore}</span>
                                        </div>
                                   </div>
                              </div>
                         </div>
                         {/* Display winner */}
                         <div className="winner-message">
                              {gameOver && showContent && <p>{winner}</p>}
                         </div>
                         <div className="button-box shadow">
                              <div className="label-text">
                                   <span>click to start game</span>
                              </div>
                              <div>
                                   {CHOICES.map((choice) => (
                                        <button key={choice} className={`${choice.toLowerCase()}-button`} onClick={() => { this.decision(choice); }}>
                                             <i className={`fas fa-hand-${choice.toLowerCase()}`} /> {choice}
                                        </button>
                                   ))}
                                   {/* {CHOICES.map((choice) => (
                                        <button key={choice.name} className={`${choice.name.toLowerCase()}-button`} onClick={() => { this.decision(choice.name); }}>
                                             <span>{choice.emoji}</span> {choice.name}
                                        </button>
                                   ))} */}
                                   {/* {CHOICES.map((choice) => (
                                        <button key={choice.name} className={`${choice.name.toLowerCase()}-button`} onClick={() => { this.decision(choice.name); }}>
                                             <span role="img" aria-label={choice.name}>{choice.emoji}</span> {choice.name}
                                        </button>
                                   ))} */}
                                   {/* {CHOICES.map((choice) => (
                                        <button key={choice.name} className={`${choice.name.toLowerCase()}-button`} onClick={() => { this.decision(choice.name); }}>
                                             <span role="img" aria-label={choice.name}>{choice.emoji}</span>
                                             <span>{choice.name}</span>
                                        </button>
                                   ))} */}
                                   {/* {CHOICES.map((choice) => (
                                        <button key={choice.name} className={`${choice.name.toLowerCase()}-button`} onClick={() => { this.decision(choice.name); }}>
                                             <span role="img" aria-label={choice.name}>{choice.emoji} {choice.name}</span>
                                        </button>
                                   ))} */}


                              </div>
                         </div>
                         <div className="button-box">
                              <Link to="/game">
                                   <button onClick={this.startGame}>Start Game</button>
                              </Link>
                         </div>
                    </div>
               </div>
          );
     }
}

export default Home;





