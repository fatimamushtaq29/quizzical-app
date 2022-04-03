import { useState } from "react"

export default function StartQuizPage(props) {
    const [quizFormData, setQuizFormData] = useState({
        amount: '5',
        difficulty: 'easy'
    })

    function handleChange(event) {
        const {name, value} = event.target;
        setQuizFormData(prevQuizFormData => {
            return {
                ...prevQuizFormData,
                [name]: value
            }
        })
    }

    return (
        <section className='main-page'>
            <h1>Quizzical</h1>
            <p className='description'>Let's see how good you are in General Knowledge. Good luck!</p>
            <form onSubmit={(event) => props.startQuiz(event, quizFormData)}>
                <div className="input">
                    <p className='input-title'>Number of questions</p>
                    <div className='form-input-option-container'>
                        <div className={`option amount ${quizFormData.amount === '5' ? 'checked' : ''}`}>
                            <input
                                id='5' 
                                type='radio'
                                onChange={handleChange}
                                name='amount'
                                value='5'
                                checked={quizFormData.amount === '5'}
                            />
                            <label htmlFor='5'>5</label>
                        </div>
                        <div className={`option amount ${quizFormData.amount === '10' ? 'checked' : ''}`}>
                            <input
                                id='10' 
                                type='radio'
                                onChange={handleChange}
                                name='amount'
                                value='10'
                                checked={quizFormData.amount === '10'}
                            />
                            <label htmlFor='10'>10</label>
                        </div>
                        <div className={`option amount ${quizFormData.amount === '15' ? 'checked' : ''}`}>
                            <input
                                id='15' 
                                type='radio'
                                onChange={handleChange}
                                name='amount'
                                value='15'
                                checked={quizFormData.amount === '15'}
                            />
                            <label htmlFor='15'>15</label>
                        </div>
                    </div>
                </div>
                <div className="input">
                    <p className='input-title'>Difficulty level</p>
                    <div className='form-input-option-container'>
                        <div className={`option difficulty ${quizFormData.difficulty === 'easy' ? 'checked' : ''}`}>
                            <input
                                id='easy' 
                                type='radio'
                                onChange={handleChange}
                                name='difficulty'
                                value='easy'
                                checked={quizFormData.difficulty === 'easy'}
                            />
                            <label htmlFor='easy'>easy</label>
                        </div>
                        <div className={`option difficulty ${quizFormData.difficulty === 'medium' ? 'checked' : ''}`}>
                            <input
                                id='medium' 
                                type='radio'
                                onChange={handleChange}
                                name='difficulty'
                                value='medium'
                                checked={quizFormData.difficulty === 'medium'}
                            />
                            <label htmlFor='medium'>medium</label>
                        </div>
                        <div className={`option difficulty ${quizFormData.difficulty === 'hard' ? 'checked' : ''}`}>
                            <input
                                id='hard' 
                                type='radio'
                                onChange={handleChange}
                                name='difficulty'
                                value='hard'
                                checked={quizFormData.difficulty === 'hard'}
                            />
                            <label htmlFor='hard'>hard</label>
                        </div>
                    </div>
                </div>
                <button className='start-quiz'>Start Quiz</button>
            </form>

        </section>
    )
}