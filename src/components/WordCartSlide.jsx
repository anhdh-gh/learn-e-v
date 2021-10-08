import '../assets/styles/WordCartSlide.css'
import ReactCardFlip from "react-card-flip"
import { useState } from "react"
import { Carousel } from "react-bootstrap"

const WordCartSlide = (props) => {
    const { wordCarts } = props
    const [ isFlipped, setIsFipped ] = useState(false)
    const [ index, setIndex ] = useState(0)

    return <div className="WordCartSlide-container">
        <Carousel controls={false} indicators={false} interval={null} activeIndex={index} variant="dark" className="cart">
            {
                wordCarts.map((item, index) => 
                    <Carousel.Item key={index} onClick={() => setIsFipped(!isFlipped)}>
                        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                            <div className={
                                `item-front
                                ${item.key.length < 20
                                  ? 'fs-1'
                                  : item.key.length < 40
                                  ? 'fs-2'
                                  : item.key.length < 60
                                  ? 'fs-3'
                                  : item.key.length < 80
                                  ? 'fs-4'
                                  : item.key.length < 100
                                  ? 'fs-5'
                                  : 'fs-6'
                                }
                            `}>
                                <div>{item.key}</div>
                            </div>

                            <div className={
                                `item-back
                                ${item.value.length < 20
                                    ? 'fs-1'
                                    : item.value.length < 40
                                    ? 'fs-2'
                                    : item.value.length < 60
                                    ? 'fs-3'
                                    : item.value.length < 80
                                    ? 'fs-4'
                                    : item.value.length < 100
                                    ? 'fs-5'
                                    : 'fs-6'
                                  }
                            `}>
                                <div>{item.value}</div>
                            </div>
                        </ReactCardFlip>
                    </Carousel.Item>
                )
            }
        </Carousel>      

        <div className="control">
            <i className="fas fa-chevron-left px-4" onClick={() => setIndex((index - 1 + wordCarts.length)%wordCarts.length)}/>
            <span>{isFlipped ? `Defination (${index + 1})` : `Term (${index + 1})`}</span>
            <i className="fas fa-chevron-right px-4" onClick={() => setIndex((index + 1)%wordCarts.length)}/>
        </div>  
    </div>

}

export default WordCartSlide