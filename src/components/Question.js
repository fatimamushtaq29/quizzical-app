import { decode } from 'html-entities';

export default function Question(props) {

    const options = props.options.map(option => {
        return <div
            className={`option ${props.quizEnded ? 'quiz-ended' : ''} ${option.isSelected ? 'selected' : ''} ${option.isCorrect ? 'correct' : ''}`} 
            key={option.id} 
            onClick={() => props.selectOption(props.questionId, option.id)}
        >
            {decode(option.option)}
        </div>
    });
    return (
        <div className='question-container'>
            <p className='question'>{decode(props.question)}</p>
            <div className='options-container'>
                {options}
            </div>
            
        </div>
        
    );
};