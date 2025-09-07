import { useState, useCallback } from 'react'
import QUESTIONS from '../questions.js'
import quizComppleteImg from '../assets/quiz-complete.png'
import Question from './Question.jsx'
export default function Quiz() {
	const [isStarted, setIsStarted] = useState(false)
	const [answerState, setAnswerState] = useState('')
	const [userAnswers, setUserAnswers] = useState([])

	const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length - 1
	const quizIsComplete = activeQuestionIndex === QUESTIONS.length

	const handleSelectAnswer = useCallback(
		function handleSelectAnswer(selectedAnswer) {
			setAnswerState('answered')
			setUserAnswers(prevUserAnswers => {
				return [...prevUserAnswers, selectedAnswer]
			})
			setTimeout(() => {
				if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
					setAnswerState('correct')
				} else {
					setAnswerState('wrong')
				}

				setTimeout(() => {
					setAnswerState('')
				}, 2000)
			}, 1000)
		},
		[activeQuestionIndex]
	)

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
		return (
			<div id="summary">
				<img src={quizComppleteImg} alt="Quiz complete" />
				<h2>Quiz completed</h2>
			</div>
		)
	}

	return (
		<div id="quiz">
			<Question
				key={activeQuestionIndex}
				questionText={QUESTIONS[activeQuestionIndex].text}
				answers={QUESTIONS[activeQuestionIndex].answers}
				answerState={answerState}
				selectedAnswer={userAnswers[userAnswers.length - 1]}
				onSelectAnswer={handleSelectAnswer}
				onSkipAnswer={handleSkipAnswer}
			/>
		</div>
	)
}
