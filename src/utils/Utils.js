import { API_ENDPOINT } from '../constants'
import axios from 'axios'

const Utils = {
    convertDataSnapshotToObject: dataSnapshot => {
        const obj = {}
        dataSnapshot?.map(item => {
            obj[`${item.key}`] = item.val()
            return item
        })
        return obj
    },

    getInforWord: async (word) => {
        try {
            const res = await axios.get(`${API_ENDPOINT.FREE_DICTIONARY_API}/${word}`)
            return res.data
        } 
        catch (err) {
            if(err.response) {
                const { status } = err.response
                switch(status) {
                    case 404:
                        console.clear()
                        break;
                    default:
                        console.log(err)
                }
            }
        }
    },

    // Lấy toàn bộ thông tin của các key và value (bao gồm nghĩa, phát âm, từ loại,... ) thông qua api
    getInforStudyset: studyset => {
        if(studyset.wordCards)
            studyset.wordCards = studyset.wordCards?.map(wordCard => ({
                key: {
                    text: wordCard.key,
                    info: Utils.getInforWord(wordCard.key)
                },
                value: {
                    text: wordCard.value,
                    info: Utils.getInforWord(wordCard.value)
                }
            }))

        return studyset
    },

    convertDataSnapshotToArray: (object) => {
        const obj = Utils.convertDataSnapshotToObject(object)
        return Object.keys(obj).map(key => ({id: key, ...obj[key]}))
    },

    filterStudySet: (users, studysetsUser) => {
        const { id, ...studysets } = studysetsUser
        const [ user ] = users.filter(user => user.id === id) 
        return Object.keys(studysets).map(key => ({...user, idStudyset: key, ...studysets[key]}))
    },

    filterUserObject: (userObject) => {
        const {
            displayName,
            email,
            emailVerified,
            family_name,
            given_name,
            isNewUser,
            locale,
            phoneNumber,
            photoURL,
            uid,
            verified_email,
            isAnonymous
        } = userObject

        const obj = {
            displayName,
            email,
            emailVerified,
            family_name,
            given_name,
            isNewUser,
            locale,
            phoneNumber,
            photoURL,
            uid,
            verified_email,
            isAnonymous
        }

        Object.keys(obj).forEach(key => obj[key] === undefined ? delete obj[key] : {})

        return obj
    },

    convertwordCardsToTest: wordCards => {
        if(wordCards !== undefined) {
            const numberOfAnswers = (wordCards.length < 4) ? wordCards.length : 4
            const test = wordCards.map((item, index) => ({
                id: index,
                question: item.key,
                correct: item.value,
                choice: '',
                answers: Utils.shuffle([
                    item.value,
                    ...Utils.getRandom_K_number_unique(0, wordCards.length-1, numberOfAnswers-1, [index], Utils.getRandomIntInclusive)
                    .map(item => wordCards[item].value)
                ]) 
            }))
            return test            
        }
    },

    // Random số thực [min, max)
    getRandomArbitrary: (min, max) => Math.random() * (max - min) + min,

    // Random số nguyên [min, max) 
    getRandomInt: (min, max) => {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min) + min)
    },

    getRandomIntInclusive: (min, max) => {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min + 1) + min)
    },

    // Random k số không lặp trong một khoảng cho trước (k nguyên)
    // arr là mảng các số không được chứa trong mảng kết quả => Random nhưng trừ các số trong mảng này ra
    // getRandom là chọn 1 trong 3 hàm trên: getRandomArbitrary, getRandomInt, getRandomIntInclusive
    getRandom_K_number_unique: (min, max, k, arr, getRandom) => {
        const result = []
        while(result.length < k) {
            const r = getRandom(min, max)
            if(result.indexOf(r) === -1 && arr.indexOf(r) === -1) result.push(r)
        }
        return result
    },

    shuffle: array => {
        let currentIndex = array.length,  randomIndex
        while (currentIndex-- !== 0) {
            randomIndex = Utils.getRandomInt(0, currentIndex)
            Utils.swapElementArray(array, currentIndex, randomIndex)
        }
        return array
    },

    swapElementArray: (array, index1, index2) => {
        const temp = array[index1]
        array[index1] = array[index2]
        array[index2] = temp
    },

    capitalizeFirstLetter: string => string?.charAt(0)?.toUpperCase() + string?.slice(1),
}

export default Utils