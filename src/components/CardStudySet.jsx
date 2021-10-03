import '../assets/styles/CardStudySet.css'
import { Card, Placeholder, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap'

const CardStudySet = (props) => {
    const { title, subtitle, text, handleRemove } = props

    return <Card className="card-study-set-container">
        {/* <Card.Header>Header</Card.Header> */}

        <Card.Body>
            {
                title
                ? <Card.Title className="fw-bold">{title}</Card.Title>
                : <Placeholder as={Card.Title} animation="glow"><Placeholder xs={6} /></Placeholder>
            }
            
            {
                subtitle
                ? <Card.Subtitle className="mb-2 text-muted">
                    <Badge pill bg="warning" text="dark">
                        {subtitle}
                    </Badge>
                </Card.Subtitle>
                : <Placeholder as={Card.Subtitle} animation="glow"><Placeholder xs={5} /></Placeholder>
            }

            {
                text
                ? <Card.Text>{text}</Card.Text>
                : <Placeholder as={Card.Text} animation="glow">
                    <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                    <Placeholder xs={6} /> <Placeholder xs={8} />
                </Placeholder>  
            }
        </Card.Body>

        <Card.Footer className="d-flex justify-content-between">
            <OverlayTrigger placement="bottom" overlay={<Tooltip>Edit</Tooltip>}>
                <Badge bg="primary">
                    <i className="fas fa-edit fs-6"/>
                </Badge>            
            </OverlayTrigger>

            <OverlayTrigger placement="bottom" overlay={<Tooltip>Remove</Tooltip>}>
                <Badge bg="danger" onClick={handleRemove}>
                    <i className="fas fa-trash-alt fs-6"/>
                </Badge>            
            </OverlayTrigger>
        </Card.Footer>
    </Card>
}

export default CardStudySet