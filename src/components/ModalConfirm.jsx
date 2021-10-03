import { Button, Modal } from 'react-bootstrap'

const ModalConfirm = (props) => {
    const { show, setShow, title, message, handleNo, handleYes } = props

    return <Modal show={show} onHide={() => setShow(false)} backdrop="static">
        <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
            <Button variant="danger" onClick={handleYes}>Yes</Button>
            <Button variant="primary" onClick={handleNo}>No</Button>
        </Modal.Footer>
    </Modal>
}

export default ModalConfirm