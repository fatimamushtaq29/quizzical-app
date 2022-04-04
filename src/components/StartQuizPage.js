import { useState } from "react";
import Form from "./Form";

export default function StartQuizPage(props) {
    const [quizFormData, setQuizFormData] = useState({
        amount: '5',
        difficulty: 'easy'
    });

    function handleChange(event) {
        const {name, value} = event.target;
        setQuizFormData(prevQuizFormData => {
            return {
                ...prevQuizFormData,
                [name]: value
            }
        });
    };
    
    return (
        <section className='main-page'>
            <h1>Quizzical</h1>
            <p className='description'>Let's see how good you are in General Knowledge. Good luck!</p>
            <Form 
                startQuiz={props.startQuiz}
                quizFormData={quizFormData}
                handleChange={handleChange}
            />
        </section>
    );
};