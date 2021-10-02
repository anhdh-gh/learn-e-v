import { Button } from 'react-bootstrap'
import { Header, SignIn } from '../components'
import { useRef } from 'react'

const RequireLoginPage = (props) => {

    const signInRef = useRef(null)

    return <>
        <Header hideUnder={true}/>
        <div style={{height: '100vh'}} className="d-flex">
            <div className="m-auto d-flex flex-column" style={{height: 'fit-content'}}>
                <h3>Opps! You need to login</h3>
                <Button className="m-auto" onClick={() => signInRef.current.click()}>
                    <SignIn signInRef={signInRef}/>
                </Button>                
            </div>
        </div>
    </>
}

export default RequireLoginPage