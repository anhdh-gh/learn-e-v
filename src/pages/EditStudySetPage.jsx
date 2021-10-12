import { Footer, CeStudySet } from '../components'
import { useParams } from 'react-router'
import { auth, studySetDB } from '../config/firebase'
import { useList } from 'react-firebase-hooks/database'
import { Utils } from "../utils"
import { PageNotFound } from './index'
import _ from "lodash"

const EditStudySetPage = (props) => {
    const { idStudyset } = useParams()

    const [ studysetDataSnapshot, loading] = useList(
        idStudyset && auth.currentUser
        ? studySetDB.child(auth.currentUser?.uid).child(idStudyset)
        : ''
    )

    const studyset = Utils.convertDataSnapshotToObject(studysetDataSnapshot)

    return loading ? <></> :
    _.isEmpty(studyset) ? <PageNotFound/> :
    <>
        <CeStudySet id={idStudyset} studysetProp={studyset}/>
        <Footer/>
    </>
}

export default EditStudySetPage