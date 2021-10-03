const Utils = {
    convertDataSnapshotToObject: dataSnapshot => {
        const obj = {}
        dataSnapshot?.map(item => {
            obj[`${item.key}`] = item.val()
            return item
        })
        return obj
    },

    convertDataSnapshotToArray: object => {
        const obj = Utils.convertDataSnapshotToObject(object)
        return Object.keys(obj).map(key => ({id: key, ...obj[key]}))
    },

    filterUserObject: userObject => {
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
        return {
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
    }
}

export default Utils