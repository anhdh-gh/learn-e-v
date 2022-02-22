import firebase, { auth, userDB, studySetDB, rulesDB } from '../config/firebase'
import { Utils } from './index.js'

const Firebase = {
    signInGoogle: async () => {
        try {
            const provider = new firebase.auth.GoogleAuthProvider()
            const res = await auth.signInWithPopup(provider)
            const user = Utils.filterUserObject({ ...res.user, ...res.additionalUserInfo, ...res.additionalUserInfo.profile})
            userDB.child(user?.uid).set(user)   
            if(user?.isNewUser) rulesDB.child(user?.uid).set({user: true}) 
            return true         
        }
        catch (error) {
            return false
        }
    },

    signOut: async () => {
        try {
            userDB.child(auth.currentUser?.uid).off('value')
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

    removeStudySet: (idStudyset, idAuthor = auth?.currentUser?.uid) => {
        try {
            studySetDB.child(idAuthor).child(idStudyset).remove()
            return true
        }
        catch (error) {
            return false
        }
    },

    updateStudySet: (idAuthor = auth?.currentUser?.uid, id, studyset) => {
        try {
            studySetDB.child(idAuthor).child(id).update(studyset)
            return true
        }
        catch (error) {
            return false
        }
    },

    removeUser: (idUser) => {
        try {
            studySetDB.child(idUser).remove()
            rulesDB.child(idUser).remove()
            userDB.child(idUser).remove()
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
            else if(rule === 'User')
                rulesDB.child(idUser).set({user: true}) 
            return true
        }
        catch (error) {
            return false
        }
    }
}

export default Firebase