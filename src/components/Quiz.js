import axios from 'axios';
import { nanoid } from 'nanoid';
import {useState, useEffect} from 'react';
import Question from './Question';

export default function Quiz(props) {
    const [quizData, setQuizData] = useState(null);
    const [endQuiz, setEndQuiz] = useState([false, {score: 0}]);

    useEffect(() => {
        const loadAPI = async () => {
            const baseUrl = 'https://opentdb.com/api.php?';
            const queryString = new URLSearchParams({
                category: 9,
                type: 'multiple',
                amount: props.formData.amount,
                difficulty: props.formData.difficulty
            });
            const res = await axios.get(`${baseUrl}${queryString.toString()}`);
            setQuizData(res.data.results.map(question => {
                return {
                    ...question,
                    id: nanoid(),
                    shuffledOptions: shuffleOptions([...question.incorrect_answers.map(option => {
                        return {
                            option: option,
                            id: nanoid(),
                            isSelected: false,
                            isCorrect: false
                        };
                    })], {
                        option: question.correct_answer,
                        id: nanoid(),
                        isSelected: false,
                        isCorrect: true
                    })
                };
            }));
        };
        loadAPI();
    }, [props.formData]);

    if (!quizData) return null;

    function shuffleOptions(incorrectAnswersArray, correctAnswer) {
        const randomIndex = Math.floor(Math.random() * incorrectAnswersArray.length + 1);
        const shuffledArray = incorrectAnswersArray.map(option => option);
        shuffledArray.splice(randomIndex, 0, correctAnswer);
        return shuffledArray;    
    }
    
    function selectOption(questionId, optionId) {
        if (!endQuiz[0]) {
            setQuizData(oldQuizData => oldQuizData.map(question => {
                return questionId === question.id ? {
                    ...question,
                    shuffledOptions: question.shuffledOptions.map(option => {
                        return optionId === option.id ? {
                            ...option,
                            isSelected: true
                        } : {
                            ...option,
                            isSelected: false
                        }
                    })    
                } : {
                    ...question
                };
            }));
        };  
    };

    function checkAnswers() {
        if (!endQuiz[0]) {
            let score = 0;
            for (let question of quizData) {
                for (let option of question.shuffledOptions) {
                    if (option.isSelected && option.isCorrect) {
                        score++;
                    };
                };
            };
            setEndQuiz(prevState => [prevState[0] = true, prevState[1] = {score: score}]);
        } else {
            setEndQuiz(prevState => [prevState[0] = false, prevState[1] = {score: 0}]);
            props.goToStartPage();
        };           
    };

    const questions = quizData.map(question => 
        <Question
            key={question.id}
            questionId={question.id}
            question={question.question}
            options={question.shuffledOptions}
            selectOption={selectOption}
            quizEnded={endQuiz[0]}
        />
    );
    
    return (
        <div className='quiz-page'>
            {endQuiz[0] && <p className='result'>You answered <span>{endQuiz[1].score}</span> out of <span>{quizData.length}</span> questions correctly.</p>}
            <div className='questions-container'>
                {questions}
            </div>
            <button type='button' onClick={checkAnswers}>{endQuiz[0] ? 'Play Again' : 'Check Answers'}</button>
        </div>
    );
};