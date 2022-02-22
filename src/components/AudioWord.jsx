import '../assets/styles/Audio.css'
import { useSpeechSynthesis } from 'react-speech-kit'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useState, useEffect } from 'react'

const AudioWord = (props) => {

    const { word } = props
    const { speak, cancel, speaking, supported, voices } = useSpeechSynthesis()
    const [phonetic, setPhonetic] = useState()

    useEffect(() => {
        if (word.info && word.info instanceof Promise) {
            // Trích xuất phiên âm
            word.info.then(info => {
                setPhonetic(info?.map(info => info.phonetics)
                    .reduce((array, phonetic) => {
                        array.push(...phonetic)
                        return array
                    }, [])
                    .map(phoneticItem => phoneticItem.text)
                    .filter(phonetic => phonetic)
                    .shift())
            })
        }
    }, [word])

    const filterVoice = (lang) => {
        const voicesFilter = voices.filter(voice => voice.lang.trim().toLowerCase().includes(lang.trim().toLowerCase()))
        return voicesFilter && voicesFilter.length > 0 ? voicesFilter[0] : voices[0]
    }

    const handleClickAudio = e => {
        e.stopPropagation()

        if (speaking)
            cancel()
        else
            speak({
                text: word.text,
                voice: word.type === 'key'
                    ? filterVoice("en-US")
                    : filterVoice("vi-VN")
            })
    }

    return !supported
        ? <></>
        : <OverlayTrigger placement="bottom" overlay={phonetic ? <Tooltip>{phonetic}</Tooltip> : <></>}>
            <span className={`audio cursor-pointer
                ${props.className} 
                ${speaking && 'audio-play'}`} onClick={handleClickAudio}
            ><i className="fas fa-volume-up"></i></span>
        </OverlayTrigger>
}

export default AudioWord