import '../assets/styles/WordCartSlide.css'
import ReactCardFlip from "react-card-flip"
import { useState } from "react"
import { Carousel } from "react-bootstrap"

const WordCartSlide = (props) => {
    const { wordCarts } = props
    const [ isFlipped, setIsFipped ] = useState(false)

    return <Carousel interval={null} variant="dark" className="WordCartSlide-container">
        {
            wordCarts.map((item, index) => 
                <Carousel.Item key={index} onClick={() => setIsFipped(!isFlipped)}>
                    <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
                        <div className="item-front">
                            <div>{item.key}</div>
                        </div>

                        <div className="item-back">
                            <div>{item.value}</div>
                        </div>
                    </ReactCardFlip>
                    <Carousel.Caption>
                        <h6>{isFlipped
                            ? "Defination"
                            : "Term"
                        }</h6>
                    </Carousel.Caption>
                </Carousel.Item>
            )
        }
    </Carousel>
}

export default WordCartSlide