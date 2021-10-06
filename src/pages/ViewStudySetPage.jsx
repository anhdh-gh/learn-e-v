import '../assets/styles/ViewStudySetPage.css'
import { Header, Footer, WordCartSlide, UserInfo } from '../components'
import { useParams } from 'react-router'
import { userDB, studySetDB } from '../config/firebase'
import { useList } from 'react-firebase-hooks/database'
import { Utils } from "../utils"
import { PageNotFound } from './index'
import _ from "lodash"

const ViewStudySetPage = (props) => {
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
    _.isEmpty(author) || _.isEmpty(studyset) ? <PageNotFound/> :
    <>
        <Header/>
        <div className="ViewStudySetPage-container">

            <div className="container-xl">
                <p className="title">{studyset.title}</p>
                <WordCartSlide wordCarts={studyset.wordCarts}/>

                <div className="border-top mt-5 py-4">
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
                                <div className="index">{index+1}</div>
                                <div className="term">{item.key}</div>
                                <div className="definition">{item.value}</div>
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