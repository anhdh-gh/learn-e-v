import { Form } from 'react-bootstrap'

const MultipleChoiceQuestion = (props) => {

    const { id, question, correct, answers } = props.testItem
    const { showResult } = props

    return <div className="mb-3">
        <Form>
            <p className={`fw-bold ${
                showResult
                    ? correct === props.testItem.choice
                        ? 'text-success'
                        : 'text-danger'
                    : ''                
            }`}>{`${id + 1}. ${question}`}</p>
            {
                answers.map((answer, index) =>
                    <Form.Check
                        key={`answer-${id}-${index}`}
                        id={`answer-${id}-${index}`}
                    >
                        <Form.Check.Input
                            type="radio"
                            name={`answer-${id}`}
                            onChange={e => props.testItem.choice = answer}
                            disabled={showResult}
                            style={{ cursor: 'pointer', opacity: '1'}}
                            className="text-primary"
                        />
                        <Form.Check.Label
                            className={`ms-3 ${
                                showResult
                                ? answer === props.testItem.choice
                                    ? correct === props.testItem.choice
                                        ? 'text-success'
                                        : 'text-danger'
                                    : answer === correct
                                        ? 'text-success'
                                        : ''
                                : ''
                                }`}
                            htmlFor={`answer-${id}-${index}`}
                            style={{ cursor: 'pointer', opacity: '1'}}
                        >{answer}</Form.Check.Label>
                    </Form.Check>)
            }
        </Form>
    </div>
}

export default MultipleChoiceQuestion