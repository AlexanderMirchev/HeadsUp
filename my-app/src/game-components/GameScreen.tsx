import React from "react";
import "../App.css";

type PropsT = {
  words: string[]
  onTimeUp: (guessed: string[], passed: string[], score: number) => void
};

type StateT = {
  currentIndex: number
  timeRemaining: number
  score: number
  guessedWords: string[]
  passedWords: string[]
  orientation: "center" | "top" | "bottom" | undefined
};

export class GameScreen extends React.Component<PropsT, StateT> {
  // TODO: play sound on action
  private static guessedWordAudio = new Audio("./correct.mp3");
  private static passedWordAudio = new Audio("./correct.mp3");

  private timerID: ReturnType<typeof setInterval> | undefined;

  constructor(props: PropsT) {
    super(props);

    this.state = {
      currentIndex: -1,
      timeRemaining: 60,
      score: 0,
      guessedWords: [],
      passedWords: [],
      orientation: undefined,
    };
  }

  componentDidMount() {
    // TODO: handle other orientations (fixed landscape?)
    window.addEventListener(
      "deviceorientation",
      (event) => {
        if (event.gamma != null && Math.abs(event.gamma) < 15) {
          if (this.state.orientation === "center") {
            if (event.gamma < 0) {
              this.guessedWord();
            } else {
              this.passedWord();
            }
          }
        } else if (
          event.gamma != null &&
          Math.abs(event.gamma) >= 45 &&
          this.state.orientation !== "center"
        ) {
          this.nextWord();
        }
      },
      true
    );
    this.timerID = setInterval(
      () => {
        if (this.state.timeRemaining === 0) {
          this.props.onTimeUp(this.state.guessedWords, this.state.passedWords, this.state.score)
        }
        else {
          this.setState({ timeRemaining: this.state.timeRemaining - 1 })
        }
      },
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID!!);
  }

  guessedWord() {
    const guessedWordAudio = new Audio("./correct.mp3");
    guessedWordAudio.play()?.then(() => {
      console.log("Guessed word");
    });

    const newGuessedWords = this.state.guessedWords;
    newGuessedWords.push(this.props.words[this.state.currentIndex]);

    this.setState({
      orientation: "bottom",
      score: this.state.score + 1,
      guessedWords: newGuessedWords,
    });
    console.log("bottom");
  }

  passedWord() {
    GameScreen.passedWordAudio.play();

    const newPassedWords = this.state.passedWords;
    newPassedWords.push(this.props.words[this.state.currentIndex]);

    this.setState({
      orientation: "top",
    });
    console.log("top");
  }

  nextWord() {
    this.setState({
      orientation: "center",
      currentIndex: this.state.currentIndex + 1,
    });
    console.log("center");
  }

  render() {
    return (
      <div className="Game-screen">
        <p className="timer">{this.state.timeRemaining} sec</p>
        <p className="word">{this.props.words[this.state.currentIndex]}</p>
      </div>
    );
  }
}
