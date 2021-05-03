import React from "react";
import "./App.css";

type PropsT = {};

type StateT = {
  words: string[];
  currentIndex: number;
  timeRemaining: number;
  score: number;
  guessedWords: string[];
  passedWords: string[];
  orientation: "center" | "top" | "bottom" | undefined;
};

class GameScreen extends React.Component<PropsT, StateT> {
  // TODO: play sound on action
  private static guessedWordAudio = new Audio("./correct.mp3");
  private static passedWordAudio = new Audio("./correct.mp3");

  private timerID: ReturnType<typeof setInterval> | undefined;

  constructor(props: PropsT) {
    super(props);

    this.state = {
      words: [],
      currentIndex: -1,
      timeRemaining: 60,
      score: 0,
      guessedWords: [],
      passedWords: [],
      orientation: undefined,
    };
  }

  componentDidMount() {
    // TODO: add state isLoading and loading screen when data is fetched
    fetch("https://random-word-api.herokuapp.com/word?number=100")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({
          words: data,
          currentIndex: -1,
        });
      });

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
    // TODO: Game over screen with guessed and passed words
    this.timerID = setInterval(
      () => this.setState({ timeRemaining: this.state.timeRemaining - 1 }),
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
    newGuessedWords.push(this.state.words[this.state.currentIndex]);

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
    newPassedWords.push(this.state.words[this.state.currentIndex]);

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
      // TODO: Loading screen and game over screen
      <div className="Game-screen">
        <p className="timer">{this.state.timeRemaining} sec</p>
        <p className="word">{this.state.words[this.state.currentIndex]}</p>
      </div>
    );
  }
}

export default GameScreen;
