import { Header, Footer, CeStudySet, Loader } from '../components'
import { useParams } from 'react-router'
import { auth, studySetDB } from '../config/firebase'
import { useList } from 'react-firebase-hooks/database'
import { Utils } from "../utils"
import { PageNotFound } from './index'
import _ from "lodash"

const EditStudySetPage = (props) => {
    const { slug } = useParams()

    const [ studysetDataSnapshot, loading] = useList(
        slug && auth.currentUser
        ? studySetDB.child(auth.currentUser?.uid).child(slug)
        : ''
    )

    const studyset = Utils.convertDataSnapshotToObject(studysetDataSnapshot)

    return loading ? <Loader/> :
    _.isEmpty(studyset) ? <PageNotFound/> :
    <>
        <Header/>
        <CeStudySet id={slug} studysetProp={studyset}/>
        <Footer/>
    </>
}

export default EditStudySetPage