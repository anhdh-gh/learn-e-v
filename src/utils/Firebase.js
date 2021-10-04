import firebase, { auth, userDB, studySetDB } from '../config/firebase'
import { Utils } from './index.js'

const Firebase = {
    signInGoogle: async () => {
        try {
            const provider = new firebase.auth.GoogleAuthProvider()
            const res = await auth.signInWithRedirect(provider)
            const user = Utils.filterUserObject({ ...res.user, ...res.additionalUserInfo, ...res.additionalUserInfo.profile})
            userDB.child(user?.uid).set(user)   
            return true         
        }
        catch (error) {
            return false
        }
    },

    signOut: async () => {
        try {
            await auth.signOut()
            return true
        }
        catch (error) {
            return false
        }
    },

    addStudySet: (studyset) => {
        try {
            studySetDB.child(auth.currentUser.uid).push(studyset)
            return true
        }
        catch (error) {
            return false
        }
    },

    removeStudySet: id => {
        try {
            studySetDB.child(auth.currentUser.uid).child(id).remove()
            return true
        }
        catch (error) {
            return false
        }
    }
}

export default Firebase