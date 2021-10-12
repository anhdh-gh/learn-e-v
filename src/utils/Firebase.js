import firebase, { auth, userDB, studySetDB, rulesDB } from '../config/firebase'
import { Utils } from './index.js'

const Firebase = {
    signInGoogle: async () => {
        try {
            const provider = new firebase.auth.GoogleAuthProvider()
            const res = await auth.signInWithPopup(provider)
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
    },

    updateStudySet: (id, studyset) => {
        try {
            studySetDB.child(auth.currentUser.uid).child(id).update(studyset)
            return true
        }
        catch (error) {
            return false
        }
    },

    removeUser: (idUser) => {
        try {
            userDB.child(idUser).remove()
            studySetDB.child(idUser).remove()
            rulesDB.child(idUser).remove()
            return true
        }
        catch (error) {
            return false
        }
    },

    updateRule: (idUser, rule) => {
        try {
            if(rule === 'Admin')
                rulesDB.child(idUser).set({admin: true}) 
            else if(rule === 'Collaborator')
                rulesDB.child(idUser).set({collaborator: true}) 
            return true
        }
        catch (error) {
            return false
        }
    }
}

export default Firebase