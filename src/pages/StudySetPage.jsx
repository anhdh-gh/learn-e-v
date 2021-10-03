import '../assets/styles/StudySetPage.css'
import { Header, UserInfo, SearchBox, CardStudySet, ModalConfirm } from '../components'
import { Button } from 'react-bootstrap'
import { useState } from 'react'
import { ROUTER_PATH } from '../constants'
import { NavLink } from "react-router-dom"

const StudySetPage = (props) => {

    const [ showModalRemove , setShowModalRemove ] = useState(false)

    return <>
        <Header/>
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
                                <Button style={{height: 'fit-content', fontWeight: 'bold'}}><i className="fas fa-plus"></i> Create</Button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>

            {/* Phần hiển thị các study set */}
            <div className="studysets pt-5">
                <div className="container-xl">
                    <div className="row">

                        <div className="col-md-6 col-lg-4 mb-3">
                                <CardStudySet
                                    title="Animals"
                                    subtitle="Số thuật ngữ: 13"
                                    text="Đây là các từ mô tả về động vật Đây là các từ mô tả về động vật Đây là các từ mô tả về động vật Đây là các từ mô tả về động vật"
                                />
                        </div>

                        <div className="col-md-6 col-lg-4 mb-3">
                                <CardStudySet
                                    title="Animals"
                                    subtitle="Số thuật ngữ: 13"
                                    text="Đây là các từ mô từ mô tả về động vật Đây là các từ mô tả về động vật"
                                />
                        </div>
                        
                        <div className="col-md-6 col-lg-4 mb-3">
                                <CardStudySet
                                    title="Animals"
                                    subtitle="Số thuật ngữ: 13"
                                    text="Some quick example text to build on the card title and make up the bulk of the card's content."
                                    handleRemove={() => setShowModalRemove(true)}
                                />
                        </div>

                    </div>
                </div>
            </div>


            {/* Phần modal xác nhận xóa học phần */}
            <ModalConfirm
                show={showModalRemove}
                setShow={setShowModalRemove}
                title="Confirm"
                message="Are you sure you want to delete this study set?"
                handleNo={() => setShowModalRemove(false)}
                handleYes={() => setShowModalRemove(false)}
            />
        </div>        
    </>
}

export default StudySetPage