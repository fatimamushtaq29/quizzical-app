import { decode } from 'html-entities';

export default function Question(props) {

    const options = props.options.map(option => {
        return <div
            className={`option ${props.quizEnded ? 'quiz-ended' : ''} ${option.isSelected ? 'selected' : ''} ${option.isCorrect ? 'correct' : ''}`} 
            key={option.id} 
            onClick={() => props.selectOption(props.questionId, option.id)}
            // style={{
            //     backgroundColor: props.quizEnded ? 
            //                         (option.isCorrect ? 
            //                             "#94D7A2" : 
            //                             (option.isSelected ? 
            //                                 "#F8BCBC" : 
            //                                 "transparent")) :
            //                             (option.isSelected ? "#D6DBF5" : "transparent"),
            //     opacity: props.quizEnded ? (option.isCorrect ? 1 : 0.5) : 1,
            //     boxShadow: props.quizEnded ? 
            //                     (option.isSelected || option.isCorrect ? 
            //                         "none" : 
            //                         "inset 0px 0px 0px 0.05rem #293264") : 
            //                     "inset 0px 0px 0px 0.05rem #293264"              
            // }}
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