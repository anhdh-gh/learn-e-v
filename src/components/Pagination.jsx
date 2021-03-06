import { Pagination as RbPagination } from 'react-bootstrap'
import { useState, useEffect } from "react"

const Pagination = (props) => {

    const items = props.children || []
    const numberItem  = props.numberItem || 3
    const [ numberIndex, setNumberIndex ] = useState(Math.ceil(items.length/numberItem))
    const [ currentIndex, setCurrentIndex ] = useState(1)

    useEffect(() => {
        setNumberIndex(Math.ceil(items.length/numberItem))
    }, [items.length, numberItem])


    return <div className={props.className}>
        {items.filter((item, index) => {
            const max = currentIndex * numberItem - 1
            const min = max - numberItem + 1
            return (numberIndex === 1) || (index >= min && index <= max)
        })}

        {
            items.length > numberItem &&
            <RbPagination className="mt-3 justify-content-center">
                <RbPagination.Prev disabled={currentIndex === 1 || numberIndex === 1} onClick={() => setCurrentIndex(currentIndex - 1)}/>
                <RbPagination.Item onClick={() => numberIndex === 1 ? setNumberIndex(Math.ceil(items.length/numberItem)) : setNumberIndex(1)}>{numberIndex === 1 ? <i className="fas fa-eye-slash text-danger"></i> : <i className="fas fa-eye text-success"></i>}</RbPagination.Item>
                <RbPagination.Next disabled={currentIndex === numberIndex || numberIndex === 1} onClick={() => setCurrentIndex(currentIndex + 1)}/>
            </RbPagination>
        }
    </div>
}


export default Pagination


/*
- Cách sử dụng
    <Pagination className="" numberItem={number}>
        {items.map => <>item</>}
    </Pagination>

    => props.children: Là mảng các item

- numberItem: Số item hiển thị mỗi lần
- numberIndex: Số trang được phân ra
- currentIndex: Chỉ số của trang hiện tại
*/