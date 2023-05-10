export function AnswerButton({disabledAnswers, option, checkAnswer}) {
    console.log(disabledAnswers)
    return (
        <button
            disabled={disabledAnswers.includes(option)}
            value={option}
            onClick={(e) => checkAnswer(e)}
        >
            {option}
        </button>
    )
}