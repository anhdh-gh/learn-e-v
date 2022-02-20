import '../assets/styles/WordCardSlide.css'
import ReactCardFlip from "react-card-flip"
import { useState } from "react"
import { Carousel } from "react-bootstrap"
import { AudioWord } from '.'

const WordCardSlide = (props) => {
    const { wordCards } = props
    const [ isFlipped, setIsFipped ] = useState(false)
    const [ index, setIndex ] = useState(0)

    return <div className="WordCardSlide-container white-space_pre-line">
        <Carousel controls={false} indicators={false} interval={null} activeIndex={index} variant="dark" className="cart">
            {
                wordCards.map((wordCard, index) => 
                    <Carousel.Item key={index} onClick={() => setIsFipped(!isFlipped)}>
                        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                            <div className={
                                `item-front
                                ${wordCard.key.text.length < 20
                                  ? 'fs-1'
                                  : wordCard.key.text.length < 40
                                  ? 'fs-2'
                                  : wordCard.key.text.length < 60
                                  ? 'fs-3'
                                  : wordCard.key.text.length < 80
                                  ? 'fs-4'
                                  : wordCard.key.text.length < 100
                                  ? 'fs-5'
                                  : 'fs-6'
                                }
                            `}>
                                <div className="w-100 text-center">{wordCard.key.text}</div>
                                <AudioWord 
                                    className="fs-4 ps-2 align-self-start" 
                                    word={{...wordCard.key, type: 'key', text: wordCard.key.text}}
                                />
                            </div>

                            <div className={
                                `item-back
                                ${wordCard.value.text.length < 20
                                    ? 'fs-1'
                                    : wordCard.value.text.length < 40
                                    ? 'fs-2'
                                    : wordCard.value.text.length < 60
                                    ? 'fs-3'
                                    : wordCard.value.text.length < 80
                                    ? 'fs-4'
                                    : wordCard.value.text.length < 100
                                    ? 'fs-5'
                                    : 'fs-6'
                                  }
                            `}>
                                <div className="w-100 text-center">{wordCard.value.text}</div>
                                <AudioWord 
                                    className="fs-4 ps-2 align-self-start" 
                                    word={{text: wordCard.value.text, type: 'value'}}
                                />
                            </div>
                        </ReactCardFlip>
                    </Carousel.Item>
                )
            }
        </Carousel>      

        <div className="control">
            <i className="fas fa-chevron-left px-4" onClick={() => setIndex((index - 1 + wordCards.length)%wordCards.length)}/>
            <span>{isFlipped ? `Definition (${index + 1}/${wordCards.length})` : `Term (${index + 1}/${wordCards.length})`}</span>
            <i className="fas fa-chevron-right px-4" onClick={() => setIndex((index + 1)%wordCards.length)}/>
        </div>  
    </div>

}

export default WordCardSlide