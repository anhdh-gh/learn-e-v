import '../assets/styles/CardStudySet.css'
import { Card, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { ROUTER_PATH } from '../constants'
import { ModalConfirm, UserInfo } from './index'
import { useState } from 'react'
import { Notify, Firebase } from '../utils'
import { useHistory } from 'react-router'

const CardStudySet = (props) => {
    const history = useHistory()

    const {
        idAuthor,
        idStudyset,
        title,
        description,
        lengthwordCard,
        showHeader,
        showFooter,
        photoURL,
        displayName,
        email
    } = props
    const [ showModel, setShowModel ] = useState(false)

    const handleRemove = ()=> {
        const res = Firebase.removeStudySet(idStudyset, idAuthor)
        if(res) Notify.success('Successful removal!')
        else Notify.error('Error, try again!')
        setShowModel(false)
    }   

    return <>
        <Card className="card-study-set-container">
            {showHeader && <Card.Header>
                <UserInfo
                    trim={true}
                    photoURL={photoURL}
                    displayName={displayName}
                    email={email}
                />
            </Card.Header>}

            <Card.Body onClick={() => history.push(`${ROUTER_PATH.STUDY_SET_VIEW}/${idAuthor}/${idStudyset}`)}>
                <Card.Title className="title">
                    {
                        title.length > 50
                        ? title.substr(0, 50).concat('...')
                        : title
                    }
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    <Badge pill bg="warning" text="dark">Terms: {lengthwordCard}</Badge>
                </Card.Subtitle>
                <Card.Text>
                    {
                        description.length > 50
                        ? description.substr(0, 50).concat('...')
                        : description
                    }
                </Card.Text>
            </Card.Body>

            {showFooter && <Card.Footer className="d-flex justify-content-between">
                <OverlayTrigger placement="bottom" overlay={<Tooltip>Edit</Tooltip>}>
                    <Badge bg="primary" onClick={() => history.push(`${ROUTER_PATH.STUDY_SET_EDIT}/${idAuthor}/${idStudyset}`)}>
                        <i className="fas fa-edit fs-6"/>
                    </Badge>                          
                </OverlayTrigger>

                <OverlayTrigger placement="bottom" overlay={<Tooltip>Remove</Tooltip>}>
                    <Badge bg="danger" onClick={() => setShowModel(true)}>
                        <i className="fas fa-trash-alt fs-6"/>
                    </Badge>            
                </OverlayTrigger>
            </Card.Footer>}
        </Card>    

        <ModalConfirm
            show={showModel}
            setShow={setShowModel}
            title="Confirm"
            message={`Are you sure you want to delete study set "${title}"?`}
            handleNo={() => setShowModel(false)}
            handleYes={handleRemove}
        />
    </> 
}

export default CardStudySet