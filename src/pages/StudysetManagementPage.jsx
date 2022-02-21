import '../assets/styles/StudysetManagementPage.css'
import { UserInfo, Footer, SearchBox, CardStudySet, Sider, Pagination } from '../components'
import { useState } from "react"
import { Utils } from '../utils'
import { useList } from 'react-firebase-hooks/database'
import { auth, userDB, studySetDB } from '../config/firebase'
import { ROUTER_PATH } from '../constants'
import { NavLink } from "react-router-dom"
import { Button } from 'react-bootstrap'

const StudysetManagementPage = (props) => {
    const [search, setSearch] = useState('')

    const [userDataSnapshot ] = useList(userDB)
    const [studySetDataSnapshot ] = useList(studySetDB)

    const users = Utils.convertDataSnapshotToArray(userDataSnapshot)

    const studysetList = Utils
        .convertDataSnapshotToArray(studySetDataSnapshot)
        .map(item => Utils.filterStudySet(users, item))
        .reduce((acc, item) => { item.forEach(i => acc.push(i)); return acc }, [])

    const studysets = search
        ? studysetList.filter(item =>
            item.title.trim().toLowerCase().includes(search.trim().toLowerCase())
            || item.description.trim().toLowerCase().includes(search.trim().toLowerCase())
            || ('' + item.wordCards.length).trim().toLowerCase().includes(search.trim().toLowerCase())
        )
        : studysetList

    return <>
        <Sider siderItems={[
            {
                icon: 'fas fa-user',
                name: 'Users',
                route: ROUTER_PATH.DASHBOARD_USERS
            },
            {
                icon: 'fas fa-book-open',
                name: 'Study sets',
                route: ROUTER_PATH.DASHBOARD_STUDYSET
            },
        ]}>
            <div className="StudysetManagementPage-container">

                {/* Phần các chức năng bên trên */}
                <div className="func">
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
                                <SearchBox placeholder="Search" value={search} onChange={e => setSearch(e.target.value)}/>
                                <NavLink to={ROUTER_PATH.HOME}>
                                    <Button style={{height: 'fit-content', fontWeight: 'bold'}}>Home</Button>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="content py-3">
                    <div className="container-xl">
                        <Pagination className="row" numberItem={6}>
                            {
                                studysets?.map((item, index) =>
                                    <div className="col-md-6 col-lg-4 mb-3" key={item?.idStudyset}>
                                        <CardStudySet
                                            idAuthor={item.uid}
                                            idStudyset={item.idStudyset}
                                            title={item.title}
                                            description={item.description}
                                            lengthwordCard={item.wordCards.length}
                                            photoURL={item.photoURL}
                                            displayName={item.given_name}
                                            email={item.email}
                                            showFooter={true}
                                            showHeader={true}
                                        />
                                    </div>
                                )
                            }
                        </Pagination>
                    </div>
                </div>
            </div>            
        </Sider>

        <Footer />
    </>
}

export default StudysetManagementPage