import {inputsInformation} from "../inputsInformation";

export default function Form(props) {
    const inputs = inputsInformation.map(input => {
        const options = input.values.map(value => {
            return <div key={value} className={`option ${input.inputName} ${props.quizFormData[input.inputName] === value ? 'checked' : ''}`}>
                        <input
                            id={value} 
                            type='radio'
                            onChange={(event) => props.handleChange(event)}
                            name={input.inputName}
                            value={value}
                            checked={props.quizFormData[input.inputName] === value}
                        />
                        <label htmlFor={value}>{value}</label>
            </div>
        });
        return <div key={input.inputName} className='input'>
            <p>{input.description}</p>
            <div className='form-input-option-container'>
                {options}
            </div>
        </div>
    });

    return (
        <form onSubmit={(event) => props.startQuiz(event, props.quizFormData)}>
            {inputs}
            <button className='start-quiz'>Start Quiz</button>
        </form>
    );
};