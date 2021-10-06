import '../assets/styles/HomePage.css'
import { Header } from '../components'
import { Button } from 'react-bootstrap'


const HomePage = (props) => {

    return <>
        <Header hideUnder={true}/>
        <div className="homePage-container">
            <div className="header">
                <div className="container-xxl py-sm-5 py-3">
                    <div className="row">
                        <div className="col-sm-7">
                            <h1 className="fw-bold">Learn it. Own it.<br/>LearnEV.</h1>
                            <p className="m-0">Steady vocabulary, step by step.</p>
                        </div>
                        <div className="col-sm-5 d-sm-flex justify-content-sm-end align-items-sm-end">
                            <Button className="fw-bold btn btn-success mt-sm-0 mt-2">Get started</Button>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{height: '500px'}}></div>
        </div>        
    </>

}

export default HomePage