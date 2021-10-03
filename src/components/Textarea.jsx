import '../assets/styles/Textarea.css'
import autosize from "autosize"
import { useRef, useEffect } from 'react'

const Textarea = (props) => {
    const { title, value, placeholder, maxLength, enter, onChange, error } = props
    const texareaRef = useRef(null)

    useEffect(() => {
        autosize(texareaRef.current)
    }, [])

    const handleKeyPress = e => {
        if(enter === false && e.key === 'Enter')
            e.preventDefault()
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
            onChange={onChange}
        />
        <div className={`textarea-underline ${error ? 'underline-textarea-error' : ''}`}/>
        {error && <div className="error">{error}</div>}
    </div>
}

export default Textarea