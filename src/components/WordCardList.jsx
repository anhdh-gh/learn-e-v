import '../assets/styles/WordCardList.css'
import { AudioWord } from '../components'

const WordCardList = (props) => {
    const { wordCards } = props

    return <div className={`wordCards ${props?.className}`}>
        <div className="container-xl">
            <h4 className="info">Terms in this set ({wordCards.length})</h4>
            {
                wordCards.map((wordCard, index) =>
                    <div className="list white-space_pre-line" key={index}>
                        <div className="row">
                            <div className="col-sm-1 pb-sm-0 pb-2">
                                <div className="index">
                                    <div>{index + 1}</div>
                                </div>
                            </div>
                            <div className="col-sm-5 py-sm-0 py-2 tern-container flex-center-vertical justify-content-between">
                                <div className="term">
                                    {wordCard.key.text}
                                </div>

                                <AudioWord className="ps-2 align-self-start" word={{ ...wordCard.key, type: 'key' }} />
                            </div>
                            <div className="col-sm-6 pt-sm-0 pt-2 flex-center-vertical justify-content-between">
                                <div className="definition">
                                    {wordCard.value.text}
                                </div>

                                <AudioWord className="ps-2 align-self-start" word={{ ...wordCard.value, type: 'value' }} />
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    </div>
}

export default WordCardList