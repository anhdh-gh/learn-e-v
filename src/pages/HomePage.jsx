import '../assets/styles/HomePage.css'
import { Footer, CardStudySet, UserInfo } from '../components'
import { Button } from 'react-bootstrap'
import { Utils } from '../utils'
import { useList } from 'react-firebase-hooks/database'
import { userDB, studySetDB } from '../config/firebase'
import { Carousel } from "react-bootstrap"
import { useHistory } from 'react-router'
import { ROUTER_PATH } from '../constants'

const HomePage = (props) => {
    const history = useHistory()

    const [ userDataSnapshot, loadingUser ] = useList(userDB)
    const [ studySetDataSnapshot, loadingStudyset ] = useList(studySetDB)

    const users = Utils.convertDataSnapshotToArray(userDataSnapshot)

    const studysets = Utils
    .convertDataSnapshotToArray(studySetDataSnapshot)
    .map(item => Utils.filterStudySet(users, item))
    .reduce((acc, item) => { item.forEach(i => acc.push(i)); return acc}, [])

    return <>
        <div className="homePage-container">

            <div className="header">
                <div className="container-xxl py-sm-5 py-3">
                    <div className="row">
                        <div className="col-sm-7">
                            <h1 className="fw-bold">Learn it. Own it.<br/>LearnEV.</h1>
                            <p className="m-0">Steady vocabulary, step by step.</p>
                        </div>
                        <div className="col-sm-5 d-sm-flex justify-content-sm-end align-items-sm-end">
                            <Button onClick={() => history.push(ROUTER_PATH.STUDY_SET)} className="fw-bold btn btn-success mt-sm-0 mt-2">Get started</Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="main">
                <div className="container-xl">
                    <h4 className="fw-bold mb-5 pb-3 border-4 border-bottom border-danger d-inline-block">Outstanding study sets</h4>
                    <div className="row">
                    {!loadingUser && !loadingStudyset && 
                        studysets.map((item, index) => 
                        <div className="col-md-6 col-lg-4 mb-3" key={item.idStudyset}>
                            <CardStudySet
                                idAuthor={item.uid}
                                idStudyset={item.idStudyset}
                                title={item.title}
                                description={item.description}
                                lengthWordCart={item.wordCarts.length}
                                showHeader={true}
                                photoURL={item.photoURL}
                                displayName={item.given_name}
                                email={item.email}
                            />
                        </div>                            
                        )
                    }
                    </div>

                    <h4 className="fw-bold my-5 pb-3 border-4 border-bottom border-danger d-inline-block">Regular users</h4>
                    <Carousel interval={1000} variant="dark" controls={false} indicators={false}>
                        {
                            users.map((user, index) => <Carousel.Item key={user.uid}>
                                <UserInfo
                                    className="justify-content-center"
                                    photoURL={user.photoURL}
                                    displayName={user.displayName}
                                    email={user.email}
                                />
                            </Carousel.Item>
                            )
                        }
                    </Carousel>
                </div>
            </div>
        </div>    
        <Footer/>    
    </>

}

export default HomePage