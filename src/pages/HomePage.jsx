import { Header } from '../components'
import { Textarea } from '../components'
import { useState } from 'react'

const HomePage = (props) => {

    const [ value, setValue ] = useState('')

    return <div className="homePage-container">
        <Header/>
        
        <div style={{marginTop: '100px'}}></div>

        <Textarea
            title="TIÊU ĐỀ"
            value={value}
            placeholder="Nhập tiêu đề"
            error="Lỗi rồi bạn ơi"
            maxLength="255"
            enter={true}
            onChange={e => setValue(e.target.value)}
        />
    </div>
}

export default HomePage