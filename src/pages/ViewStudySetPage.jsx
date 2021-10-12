import '../assets/styles/ViewStudySetPage.css'
import { Footer, WordCartSlide, UserInfo } from '../components'
import { useParams, useHistory } from 'react-router'
import { userDB, studySetDB } from '../config/firebase'
import { useList } from 'react-firebase-hooks/database'
import { Utils, Notify } from "../utils"
import { PageNotFound } from './index'
import _ from "lodash"
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { ROUTER_PATH } from '../constants'

const ViewStudySetPage = (props) => {
    const history = useHistory()

    const { idAuthor, idStudyset } = useParams()

    const [ userDataSnapshot, loadingUser ] = useList(idAuthor ? userDB.child(idAuthor) : '')

    const author = Utils.convertDataSnapshotToObject(userDataSnapshot)    

    const [ studysetDataSnapshot, loadingStudyset ] = useList(
        idStudyset && author?.uid
        ? studySetDB.child(author?.uid).child(idStudyset)
        : ''
    )

    const studyset = Utils.convertDataSnapshotToObject(studysetDataSnapshot)

    return loadingUser || loadingStudyset ? <></> :
    _.isEmpty(author) ? <PageNotFound/> :
    studysetDataSnapshot === undefined && _.isEmpty(studyset) ? <></> :
    _.isEmpty(studyset) ? <PageNotFound/> :
    <>
        <div className="ViewStudySetPage-container mt-5">

            <div className="container-xl">
                <p className="title">{studyset.title}</p>

                <div className="row flex-column-reverse flex-md-row">
                    <div className="col-md-2">
                        <div className="func d-flex d-md-block justify-content-between mt-3 mt-0">

                            <CopyToClipboard
                                text={window.location.href}
                                onCopy = {(text, result) => 
                                    result
                                    ? Notify.success("Copy to clipboard")
                                    : Notify.error("Error, try again")
                                }
                            >
                                <div className="share">
                                    <i className="fas fa-share-square"/> Share
                                </div>                                
                            </CopyToClipboard>

                            <div className="test" onClick={() => history.push(`${ROUTER_PATH.STUDY_SET_TEST}/${idAuthor}/${idStudyset}`)}>
                                <i className="fas fa-pencil-ruler"/> Test
                            </div>   
                        </div>
                    </div>
                    <div className="col-md-10">
                        <WordCartSlide wordCarts={studyset.wordCarts}/>
                    </div>
                </div>

                <div className="border-top mt-4 py-4 author">
                    <UserInfo
                        photoURL={author.photoURL}
                        displayName={author.displayName}
                        email="Author"
                    />
                    <div className="description mt-3">{studyset.description}</div>
                </div>
            </div>

            <div className="wordCarts">
                <div className="container-xl">
                    <h4 className="info">Terms in this set ({studyset.wordCarts.length})</h4>
                    {
                        studyset.wordCarts.map((item, index) => 
                            <div className="list" key={index}>
                                <div className="row">
                                    <div className="col-sm-1 pb-sm-0 pb-2">
                                        <div className="index">
                                            <div>{index+1}</div>
                                        </div>
                                    </div>
                                    <div className="col-sm-5 py-sm-0 py-2 tern-container">
                                        <div className="term">
                                            {item.key}
                                        </div>
                                    </div>
                                    <div className="col-sm-6 pt-sm-0 pt-2">
                                        <div className="definition">
                                            {item.value}
                                        </div>
                                    </div>
                                </div>
                            </div>                              
                        )
                    }
                </div>
            </div>
        </div>
        <Footer/>
    </>
}

export default ViewStudySetPage