import '../assets/styles/StudySetPage.css'
import { Header, UserInfo, SearchBox, CardStudySet, ModalConfirm, Footer } from '../components'
import { Button } from 'react-bootstrap'
import { useState } from 'react'
import { ROUTER_PATH } from '../constants'
import { NavLink } from "react-router-dom"
import { useList } from 'react-firebase-hooks/database'
import { auth, studySetDB } from '../config/firebase'
import { Utils, Notify, Firebase } from '../utils'

const StudySetPage = (props) => {

    const [ showModalRemove , setShowModalRemove ] = useState(false)
    const [ itemRE, setItemRE ] = useState({id: '', title: ''})

    const [ studySetDataSnapshot, loading ] = useList(
        auth.currentUser ? 
        studySetDB.child(auth.currentUser?.uid)
        : ''
    )

    const studyset = Utils.convertDataSnapshotToArray(studySetDataSnapshot)

    const handleRemove = ()=> {
        const res = Firebase.removeStudySet(itemRE.id)
        if(res) Notify.success('Successful removal!')
        else Notify.error('Error, try again!')
        setShowModalRemove(false)
    }   

    return <>
        <Header hideUnder={true}/>
        <div className="study-set-page-container">

            {/* Phần các chức năng bên trên */}
            <div className="navigation">
                <div className="container-xl">
                    <div className="row">
                        <div className="col-md">
                            <UserInfo/>
                        </div>
                        <div className="col-md d-flex align-items-end justify-content-between mt-4 mt-md-0">
                            <SearchBox placeholder="Search study set"/>
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
                                {
                                    loading
                                    ? <CardStudySet/>
                                    : <CardStudySet
                                        title={item.title}
                                        subtitle={`Terms: ${item.wordCarts.length}`}
                                        text={item.description}
                                        handleRemove={() => {
                                            setItemRE({id: item.id, title: item.title})
                                            setShowModalRemove(true)
                                        }}
                                    />
                                }

                            </div>                            
                        )
                    }
                    </div>
                </div>
            </div>


            {/* Phần modal xác nhận xóa học phần */}
            <ModalConfirm
                show={showModalRemove}
                setShow={setShowModalRemove}
                title="Confirm"
                message={`Are you sure you want to delete study set "${itemRE.title}"?`}
                handleNo={() => setShowModalRemove(false)}
                handleYes={handleRemove}
            />
        </div>      
        <Footer/>  
    </>
}

export default StudySetPage