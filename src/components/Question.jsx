import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { AnswerButton } from "./AnswerButton";
import { generateRandomElements} from "../auxiliary/helperMethods";

export function Question({ questions }) {
    const [index, setIndex] = useState(0);
    const [points, setPoints] = useState(0);
    const [joker, setJoker] = useState(7);
    const [disabledAnswers, setDisabledAnswers] = useState([])

    // ** MANAGES ANSWERS AND POINTS
    const evaluateAnswer = (e) => {
        setPoints((prevState) =>
            e.target.value === questions[index].correct
                ? prevState + 100
                : (prevState - 150) > 0 ? prevState - 150 : 0
        );

        setIndex((prevState) => prevState + 1);
        setDisabledAnswers([])
    };

    // ** MANAGES JOKER USAGE

    
    const handleJokerClick = () => {
        let wrongElements = questions[index].options.filter(
            (answer) => answer !== questions[index].correct
        );

        if (disabledAnswers.length < 2 && joker > 0) {

            setJoker((prevState) => (prevState > 0 ? prevState - 1 : prevState));
            setDisabledAnswers(generateRandomElements(wrongElements))

        }
    };

    const resetGame = () => {
        setIndex(0)
        setPoints(0)
        setJoker(7)
        setDisabledAnswers([])
    }

    return (
        <div>
            <h2>{points} pontos</h2>

            {questions[index] !== undefined ? <h3>{questions[index]?.prompt}</h3> : <button onClick={resetGame}>Reiniciar</button>}

            <div>
                {questions[index]?.options.map((answer) => (
                    <AnswerButton
                        disabledAnswers={disabledAnswers}
                        key={uuidv4()}
                        option={answer}
                        checkAnswer={(e) => evaluateAnswer(e)} />
                ))}
            </div>

            <h5>Jokers disponíveis: {joker}</h5>


            <button onClick={() => handleJokerClick()}>Usar joker</button>
        </div>
    );
}
