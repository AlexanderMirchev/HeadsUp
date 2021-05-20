import React from "react";

type PropsT = {
    score: number
    guessedWords: string[]
    passedWords: string[]
    onTryAgainClicked: () => void
}

export class GameOverScreen extends React.Component<PropsT> {

    convertList = (list: string[]) => {
        return list.map(s => <li key={s}>{s}</li>)
    }

    render() {
        return (
            <div className="game-over-screen">
                <h1>Time's up</h1>
                <p>Your score is {this.props.score}</p>
                <div className="results">
                    <div className="wordList">
                        <p>Guessed words: {this.props.guessedWords.length}</p>
                        <ul>{this.convertList(this.props.guessedWords)}</ul>
                    </div>
                    <div className="wordList">
                        <p>Passed words: {this.props.passedWords.length} </p>
                        <ul>{this.convertList(this.props.passedWords)}</ul>
                    </div>
                </div>
                <button onClick={this.props.onTryAgainClicked}>Try again</button>
            </div>
        )
    }
}