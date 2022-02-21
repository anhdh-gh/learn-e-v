import '../assets/styles/Audio.css'
import { useSpeechSynthesis } from 'react-speech-kit'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

const AudioWord = (props) => {

    const { word } = props
    const { speak, cancel, speaking, supported, voices } = useSpeechSynthesis()

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

    const filterVoice = (lang) => {
        const voicesFilter = voices.filter(voice => voice.lang.trim().toLowerCase().includes(lang.trim().toLowerCase()))
        return voicesFilter && voicesFilter.length > 0 ? voicesFilter[0] : voices[0]
    }

    const handleClickAudio = e => {
        e.stopPropagation()

        if (word.audio)
            word.audio.play()
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
                ${speaking && 'audio-play'}`} onClick={handleClickAudio}
            ><i className="fas fa-volume-up"></i></span>
        </OverlayTrigger>
}

export default AudioWord