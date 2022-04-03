import {useState} from 'react';
import StartQuizPage from './components/StartQuizPage'
import Quiz from './components/Quiz'
import React from 'react';

export default function App() {
    const [onStartPage, setOnStartPage] = useState(true);
    const [formData, setFormData] = useState(null);

    function startQuiz() {
        setOnStartPage(false)
    }

    function submitQuizFormData(event, formData) {
        event.preventDefault();
        startQuiz();
        setFormData(formData);
    }

    function goToStartPage() {
        setOnStartPage(true);
    }

    return (
        <>
            {
            onStartPage ? 
                <StartQuizPage 
                    startQuiz = {submitQuizFormData}
                /> :
                <Quiz 
                    formData={formData}
                    goToStartPage={goToStartPage}
                />
            }
        </>
    );
};