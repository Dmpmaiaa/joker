import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

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
                : prevState - 150
        );

        setIndex((prevState) => prevState + 1);
    };

    // ** MANAGES JOKER USAGE

    const generateRandomElements = (arr) => {
        const randomIndex1 = Math.floor(Math.random() * arr.length);
        const randomIndex2 =
            (randomIndex1 + Math.floor(Math.random() * (arr.length - 1) + 1)) %
            arr.length;

        const randomElements = arr
            .splice(randomIndex1, 1)
            .concat(
                arr.splice(
                    randomIndex2 > randomIndex1
                        ? randomIndex2 - 1
                        : randomIndex2,
                    1
                )
            );

        return randomElements;
    };

    const handleJokerClick = () => {
        let wrongElements = questions[index].options.filter(
            (answer) => answer !== questions[index].correct
        );

        setDisabledAnswers(generateRandomElements(wrongElements))
        
        setJoker((prevState) => (prevState > 0 ? prevState - 1 : prevState));


    };

    return (
        <div>
            <h2>{points} pontos</h2>
            <h3>{questions[index]?.prompt}</h3>

            <div>
                {questions[index]?.options.map((answer, idx) => (
                    <button
                        disabled={disabledAnswers.includes(answer)}
                        key={uuidv4()}
                        value={answer}
                        onClick={(e) => evaluateAnswer(e)}
                    >
                        {answer}
                    </button>
                ))}
            </div>

            <h5>Jokers disponíveis: {joker}</h5>
            <button onClick={() => handleJokerClick()}>Usar joker</button>
        </div>
    );
}
