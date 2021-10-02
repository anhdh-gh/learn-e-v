import '../assets/styles/Textarea.css'
import autosize from "autosize"
import { useRef, useEffect, useState } from 'react'

const Textarea = (props) => {
    const { title, value, placeholder, maxLength, enter, onChange } = props
    const [ error, setError ] = useState(props.error)
    const texareaRef = useRef(null)

    useEffect(() => {
        autosize(texareaRef.current)
    }, [])

    const handleKeyPress = e => {
        if(enter === false && e.key === 'Enter')
            e.preventDefault()
    }

    const handeOnChange = e => {
        setError('')
        onChange(e)
    }

    return <div className="textarea-container" onClick={() => texareaRef.current.focus()}>
        <label className="textarea-label">{title}</label>
        <textarea 
            ref={texareaRef}
            className="textarea-input"
            value={value}
            placeholder={placeholder}
            rows={1}
            maxLength={maxLength}
            onKeyPress={handleKeyPress}
            onChange={handeOnChange}
        />
        <div className={`textarea-underline ${error ? 'underline-textarea-error' : ''}`}/>
        {error && <div className="error">{error}</div>}
    </div>
}

export default Textarea