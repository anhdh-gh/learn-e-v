import '../assets/styles/Audio.css'
import { useSpeechSynthesis } from 'react-speech-kit'
import { useState, useEffect } from 'react'

const AudioWord = (props) => {
    
    const { word } = props
    const { speak, cancel, speaking, supported, voices } = useSpeechSynthesis()
    const [ wordAuidoSpeeking, setWordAuidoSpeeking ] = useState(false)

    // Trích xuất audio
    if(word.info && word.info instanceof Promise) 
        word.info.then(info => {
            word.audio = info?.map(info => info.phonetics)
            .reduce((array, phonetic) => { 
                array.push(...phonetic)
                return array 
            }, [])
            .map(phoneticItem => phoneticItem.audio)
            .filter(audio => audio)
            .reduce((array, audio) => { 
                if(audio.includes('-us.mp3'))
                    return [audio].concat(array)
                else array.push(audio)
                return array
            }, [])
            .map(audio => new Audio(audio))
            .shift()
        })


    useEffect(() => {
        if(word.audio)
            word.audio.addEventListener('ended', () => setWordAuidoSpeeking(false))
    }, [word.audio])

    useEffect(() => {
        if(word.audio && wordAuidoSpeeking)
            word.audio.play()
    }, [wordAuidoSpeeking, word.audio])

    const handleClickAudio = e => {
        e.stopPropagation()

        if(word.audio)
            setWordAuidoSpeeking(true)
        else 
            if(speaking)
                cancel()
            else 
                speak({ text: word.text, voice: word.type === 'key' ? voices[2] : voices[93]})
    }

    return !supported
        ? <></>
        : <span className={`audio cursor-pointer
            ${props.className} 
            ${(speaking || (word.audio && wordAuidoSpeeking)) && 'audio-play'}`} onClick={handleClickAudio}
        ><i className="fas fa-volume-up"></i></span>
}

export default AudioWord

/**
 * const { voices } = useSpeechSynthesis()
 * voices[2]: "en-US"
 * voices[93]: "vi-VN"
*/