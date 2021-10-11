import { Button } from 'react-bootstrap'
import { Header, SignIn } from '../components'

const RequireLoginPage = (props) => {

    return <>
        <Header hideUnder={true}/>
        <div style={{height: '100vh'}} className="d-flex">
            <div className="m-auto d-flex flex-column" style={{height: 'fit-content'}}>
                <h3>Opps! You need to login</h3>
                <Button className="m-auto p-0">
                    <SignIn style={{padding: ".375rem .75rem"}}/>
                </Button>                
            </div>
        </div>
    </>
}

export default RequireLoginPage