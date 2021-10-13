import '../assets/styles/MultipleChoiceTest.css'
import { useState } from 'react'
import { MultipleChoiceQuestion } from './index'
import { Button, ProgressBar, OverlayTrigger, Tooltip } from 'react-bootstrap'

const MultipleChoiceTest = (props) => {
    const { test } = props
    const [ showResult, setShowResult ] = useState(false)

    const showTestScore = e => {
        setShowResult([
            test.reduce((acc, item) => item.choice === '' ? acc + 1 : acc, 0), // Số câu không làm
            test.reduce((acc, item) => item.choice !== item.correct && item.choice !== '' ? acc + 1 : acc, 0), // Số câu sai
            test.reduce((acc, item) => item.choice === item.correct ? acc + 1 : acc, 0) // Số câu đúng
        ])
    }

    return <div className="MultipleChoiceTest-container p-2 p-sm-3 p-md-4">
        <h5 className="fw-bold pb-3 border-4 border-bottom border-danger d-inline-block">{`Multiple choice questions (${test.length})`}</h5>
        {
            test.map((item, index) =>
                <MultipleChoiceQuestion
                    testItem={item}
                    showResult={showResult}
                    key={item.id}
                />
            )
        }

        {!showResult && <Button onClick={showTestScore} className="w-100 fw-bold">Check answers</Button>}

        {showResult && <ProgressBar className="fs-6 fw-bold">
            <ProgressBar max={test.length} variant="danger" now={showResult[0]} 
                label={<OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip>Empty</Tooltip>}
            ><span>{`${showResult[0]}/${test.length}`}</span></OverlayTrigger>}/>
            
            <ProgressBar max={test.length} variant="warning" now={showResult[1]} 
                label={<OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip>Incorrect</Tooltip>}
            ><span>{`${showResult[1]}/${test.length}`}</span></OverlayTrigger>}/>

            <ProgressBar max={test.length} variant="success" now={showResult[2]} 
                label={<OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip>Correct</Tooltip>}
            ><span>{`${showResult[2]}/${test.length}`}</span></OverlayTrigger>}/>
        </ProgressBar>} 
    </div>
}

export default MultipleChoiceTest