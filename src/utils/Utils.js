const Utils = {
    convertDataSnapshotToObject: dataSnapshot => {
        const obj = {}
        dataSnapshot?.map(item => {
            obj[`${item.key}`] = item.val()
            return item
        })
        return obj
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
    }
}

export default Utils