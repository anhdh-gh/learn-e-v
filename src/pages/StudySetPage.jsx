import '../assets/styles/StudySetPage.css'
import { Header, UserInfo, SearchBox, CardStudySet, Footer } from '../components'
import { Button } from 'react-bootstrap'
import { ROUTER_PATH } from '../constants'
import { NavLink } from "react-router-dom"
import { useList } from 'react-firebase-hooks/database'
import { auth, studySetDB } from '../config/firebase'
import { Utils } from '../utils'
import { useState } from "react"

const StudySetPage = (props) => {

    const [ studySetDataSnapshot ] = useList(
        auth.currentUser ? 
        studySetDB.child(auth.currentUser?.uid)
        : ''
    )

    const [ search, setSearch ] = useState('')

    const studyset = search
    ? Utils.convertDataSnapshotToArray(studySetDataSnapshot).filter(item => 
        item.title.trim().toLowerCase().includes(search.trim().toLowerCase())
        || item.description.trim().toLowerCase().includes(search.trim().toLowerCase())
        || ('' + item.wordCarts.length).trim().toLowerCase().includes(search.trim().toLowerCase())
    )
    : Utils.convertDataSnapshotToArray(studySetDataSnapshot)

    return  <>
        <Header hideUnder={true}/>
        <div className="study-set-page-container">

            {/* Phần các chức năng bên trên */}
            <div className="navigation">
                <div className="container-xl">
                    <div className="row">
                        <div className="col-md">
                            <UserInfo
                                photoURL={auth?.currentUser?.photoURL}
                                displayName={auth?.currentUser?.displayName}
                                email={auth?.currentUser?.email}
                            />
                        </div>
                        <div className="col-md d-flex align-items-end justify-content-between mt-4 mt-md-0">
                            <SearchBox placeholder="Search study set" value={search} onChange={e => setSearch(e.target.value)}/>
                            <NavLink to={ROUTER_PATH.STUDY_SET_CREATE}>
                                <Button style={{height: 'fit-content', fontWeight: 'bold'}}>Create</Button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>

            {/* Phần hiển thị các study set */}
            <div className="studysets py-5">
                <div className="container-xl">
                    <div className="row">
                    {
                        studyset.map((item, index) => 
                            <div className="col-md-6 col-lg-4 mb-3" key={item.id}>
                                <CardStudySet
                                    id={item.id}
                                    title={item.title}
                                    description={item.description}
                                    lengthWordCart={item.wordCarts.length}
                                    showFooter={true}
                                />
                            </div>                            
                        )
                    }
                    </div>
                </div>
            </div>
        </div>      
        <Footer/>  
    </>
}

export default StudySetPage