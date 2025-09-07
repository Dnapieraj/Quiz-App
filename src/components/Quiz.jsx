import { useState, useCallback } from 'react'
import QUESTIONS from '../questions.js'
import Question from './Question.jsx'
import Summary from './Summary.jsx'
export default function Quiz() {
	const [isStarted, setIsStarted] = useState(false)
	const [userAnswers, setUserAnswers] = useState([])

	const activeQuestionIndex = userAnswers.length
	const quizIsComplete = activeQuestionIndex === QUESTIONS.length

	const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
		setUserAnswers(prevUserAnswers => {
			return [...prevUserAnswers, selectedAnswer]
		})
	}, [])

	const handleSkipAnswer = useCallback(() => {
		handleSelectAnswer(null), [handleSelectAnswer]
	})

	if (!isStarted) {
		return (
			<div id="start-screen">
				<h2>Are you ready to start the quiz?</h2>
				<button onClick={() => setIsStarted(true)}>Yes</button>
			</div>
		)
	}

	if (quizIsComplete) {
		return <Summary userAnswers={userAnswers} />
	}

	return (
		<div id="quiz">
			<Question
				key={activeQuestionIndex}
				onSelectAnswer={handleSelectAnswer}
				onSkipAnswer={handleSkipAnswer}
				index={activeQuestionIndex}
			/>
		</div>
	)
}
