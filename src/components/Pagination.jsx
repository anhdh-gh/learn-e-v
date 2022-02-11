import { Pagination as RbPagination } from 'react-bootstrap'
import { useState } from "react"

const Pagination = (props) => {

    const items = props.children || []
    const numberItem  = props.number_item || 3
    const number_index = Math.ceil(items.length/numberItem)
    const [ currentIndex, setCurrentIndex ] = useState(1)

    console.log(currentIndex)

    return <div className={props.className}>
        {items.filter((item, index) => {
            const max = currentIndex * numberItem - 1
            const min = max - numberItem + 1
            return index >= min && index <= max
        })}

        <RbPagination className="mt-3 justify-content-center">
            <RbPagination.Prev disabled={currentIndex === 1} onClick={() => setCurrentIndex(currentIndex - 1)}/>
            <RbPagination.Next disabled={currentIndex === number_index} onClick={() => setCurrentIndex(currentIndex + 1)}/>
        </RbPagination>
    </div>
}


export default Pagination


/*
- Cách sử dụng
    <Pagination>
        {items.map => <>item</>}
    </Pagination>

    => props.children: Là mảng các item

- number_item: Số item hiển thị mỗi lần
*/