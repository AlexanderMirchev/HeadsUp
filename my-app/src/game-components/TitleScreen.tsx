import React from "react"

type PropsT = {
    onStartClicked: () => void
}

type StateT = {}

export class TitleScreen extends React.Component<PropsT, StateT> {
    render() {
        return (
            <div className="title-screen">
                <h1>Heads up game</h1>
                <p>Guess as many words as you can in under a minute.</p>
                <p>Tilt phone down to mark word as guessed and tilt it up to move on to the next</p>
                <button onClick={this.props.onStartClicked} >Start game</button>
            </div>
        )
    }
}