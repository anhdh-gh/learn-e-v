import '../assets/styles/TestStudySetPage.css'
import { Footer, UserInfo, MultipleChoiceTest } from '../components'
import { useParams } from 'react-router'
import { userDB, studySetDB } from '../config/firebase'
import { useList } from 'react-firebase-hooks/database'
import { Utils } from "../utils"
import { PageNotFound } from './index'
import _ from "lodash"

const TestStudySetPage = (props) => {
    const { idAuthor, idStudyset } = useParams()

    const [ userDataSnapshot, loadingUser ] = useList(idAuthor ? userDB.child(idAuthor) : '')

    const author = Utils.convertDataSnapshotToObject(userDataSnapshot)    

    const [ studysetDataSnapshot, loadingStudyset ] = useList(
        idStudyset && author?.uid
        ? studySetDB.child(author?.uid).child(idStudyset)
        : ''
    )

    const studyset = Utils.convertDataSnapshotToObject(studysetDataSnapshot)

    const test = Utils.convertWordCartsToTest(studyset.wordCarts)

    return loadingUser || loadingStudyset ? <></> :
    _.isEmpty(author) ? <PageNotFound/> :
    studysetDataSnapshot === undefined && _.isEmpty(studyset) ? <></> :
    _.isEmpty(studyset) ? <PageNotFound/> :
    <>
        <div className="TestStudySetPage-container mt-5">

            <div className="container-xl info">

                <p className="title">{`Test: ${studyset.title}`}</p>

                <div className="border-top mt-4 py-4 author">
                    <UserInfo
                        photoURL={author.photoURL}
                        displayName={author.displayName}
                        email="Author"
                    />
                    <div className="description mt-3 text-break">{studyset.description}</div>
                </div>              

            </div>

            <div className="content py-3 py-md-4">
                <div className="container-xl test">
                    <MultipleChoiceTest test={test}/>
                </div>
            </div>
        </div>
        <Footer/>
    </>
}

export default TestStudySetPage