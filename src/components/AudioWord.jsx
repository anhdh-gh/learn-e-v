import '../assets/styles/Audio.css'
import { useSpeechSynthesis } from 'react-speech-kit'
import { useState, useEffect } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

const AudioWord = (props) => {

    const { word } = props
    const { speak, cancel, speaking, supported, voices } = useSpeechSynthesis()
    const [wordAuidoSpeeking, setWordAuidoSpeeking] = useState(false)

    if (word.info && word.info instanceof Promise) {
        // Trích xuất audio
        word.info.then(info => {
            word.audio = info?.map(info => info.phonetics)
                .reduce((array, phonetic) => {
                    array.push(...phonetic)
                    return array
                }, [])
                .map(phoneticItem => phoneticItem.audio)
                .filter(audio => audio)
                .reduce((array, audio) => {
                    if (audio.includes('-us.mp3'))
                        return [audio].concat(array)
                    else array.push(audio)
                    return array
                }, [])
                .map(audio => new Audio(audio))
                .shift()
        })

        // Trích xuất phiên âm
        word.info.then(info => {
            word.phonetic = info?.map(info => info.phonetics)
                .reduce((array, phonetic) => {
                    array.push(...phonetic)
                    return array
                }, [])
                .map(phoneticItem => phoneticItem.text)
                .filter(phonetic => phonetic)
                .shift()
        })
    }

    useEffect(() => {
        if (word.audio)
            word.audio.addEventListener('ended', () => setWordAuidoSpeeking(false))
    }, [word.audio])

    useEffect(() => {
        if (word.audio && wordAuidoSpeeking)
            word.audio.play()
    }, [wordAuidoSpeeking, word.audio])

    const filterVoice = (lang) => {
        const voicesFilter = voices.filter(voice => voice.lang === lang)
        return voicesFilter && voicesFilter.length > 0 ? voicesFilter[0] : voices[0]
    }

    const handleClickAudio = e => {
        e.stopPropagation()

        if (word.audio)
            setWordAuidoSpeeking(true)
        else
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
        : <OverlayTrigger placement="bottom" overlay={word.phonetic ? <Tooltip>{word.phonetic}</Tooltip> : <></>}>
            <span className={`audio cursor-pointer
                ${props.className} 
                ${(speaking || (word.audio && wordAuidoSpeeking)) && 'audio-play'}`} onClick={handleClickAudio}
            ><i className="fas fa-volume-up"></i></span>
        </OverlayTrigger>
}

export default AudioWord

/**
 * const { voices } = useSpeechSynthesis()
 * voices[2]: "en-US"
 * voices[93]: "vi-VN"
*/