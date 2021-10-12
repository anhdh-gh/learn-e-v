import { Button } from 'react-bootstrap'
import { SignIn } from '../components'

const RequirePage = (props) => {

    const { title, signInBt } = props

    return <div style={{ height: '100vh' }} className="d-flex">
        <div className="m-auto d-flex flex-column" style={{ height: 'fit-content' }}>
            <h3 className="text-center">{title}</h3>
            {signInBt && <Button className="m-auto p-0">
                <SignIn style={{ padding: ".375rem .75rem" }} />
            </Button>}
        </div>
    </div>
}

export default RequirePage