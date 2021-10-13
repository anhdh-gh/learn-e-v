import { Footer, CeStudySet } from '../components'
import { useParams } from 'react-router'
import { auth, studySetDB, rulesDB } from '../config/firebase'
import { useList } from 'react-firebase-hooks/database'
import { Utils } from "../utils"
import { PageNotFound } from './index'
import _ from "lodash"

const EditStudySetPage = (props) => {
    const { idAuthor, idStudyset } = useParams()

    const [ operatorDatasnapshot, loadingOperator ] = useList(auth?.currentUser ? rulesDB.child(auth?.currentUser?.uid) : '')
    const position = Utils.convertDataSnapshotToObject(operatorDatasnapshot)

    const allow = idAuthor === auth?.currentUser?.uid || (!_.isEmpty(operatorDatasnapshot) && (position?.admin || position?.collaborator))

    const [ studysetDataSnapshot, loading] = useList(
        idAuthor && idStudyset
        ? studySetDB.child(idAuthor).child(idStudyset)
        : ''
    )

    const studyset = Utils.convertDataSnapshotToObject(studysetDataSnapshot)

    return loadingOperator || loading ? <></> :
    !allow ? <PageNotFound/> :
    _.isEmpty(studyset) ? <PageNotFound/> :
    <>
        <CeStudySet idAuthor={idAuthor} id={idStudyset} studysetProp={studyset}/>
        <Footer/>
    </>
}

export default EditStudySetPage