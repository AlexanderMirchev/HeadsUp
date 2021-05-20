import React from "react";
import { GameOverScreen } from "./GameOverScreen";
import { GameScreen } from "./GameScreen";
import { TitleScreen } from "./TitleScreen";
import "./Game.css"

type PropsT = {};

type StateT = {
    gameState: "title"
} | {
    gameState: "in-game"
    words: string[]
} | {
    gameState: "game-over"
    lastGameResult: {
        score: number;
        guessedWords: string[];
        passedWords: string[];
    }
}

export class Game extends React.Component<PropsT, StateT> {
    constructor(props: PropsT) {
        super(props);
        this.state = {
            gameState: "title"
        }
    }

    startGame = () => {
        fetch("https://random-word-api.herokuapp.com/word?number=100")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                this.setState({
                    gameState: "in-game",
                    words: data
                });
            });
    }

    onTimeUp = (guessed: string[], passed: string[], score: number) => {
        this.setState({
            gameState: "game-over",
            lastGameResult: {
                score: score,
                guessedWords: guessed,
                passedWords: passed
            }
        })
    }

    render() {
        switch (this.state.gameState) {
            case "title": return (
                <TitleScreen
                    onStartClicked={this.startGame}
                />
            )
            case "in-game": return (
                <GameScreen
                    words={this.state.words}
                    onTimeUp={this.onTimeUp}
                />
            )
            case "game-over": {
                return (
                    <GameOverScreen
                        score={this.state.lastGameResult.score}
                        passedWords={this.state.lastGameResult.passedWords}
                        guessedWords={this.state.lastGameResult.guessedWords}
                        onTryAgainClicked={this.startGame}
                    />
                )
            }
        }
    }
}
