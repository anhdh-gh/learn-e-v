import '../assets/styles/Header.css'
import { Navbar, Container, Nav, NavDropdown, Placeholder } from 'react-bootstrap'
import { NavLink } from "react-router-dom"
import _ from 'lodash'
import { ROUTER_PATH } from '../constants'
import { useList } from 'react-firebase-hooks/database'
import { auth, userDB } from '../config/firebase'
import Utils from '../utils/Utils'

const Header = (props) => {

    const [ userDataSnapshot, loading ] = useList(userDB.child(auth.currentUser.uid))
    const user = Utils.convertDataSnapshotToObject(userDataSnapshot)

    return <Navbar expand="sm" variant="dark" fixed="top" className="header-container">
        <Container fluid>
            <Navbar.Brand className="fw-bold">
                <NavLink to={ROUTER_PATH.HOME}>
                    <i className="fas fa-book-reader" /> Learn EV
                </NavLink>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="navbarScroll" />

            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="my-2 my-sm-0">
                    <Nav.Link active="active" as="span">
                        <NavLink to={ROUTER_PATH.HOME}>Home</NavLink>
                    </Nav.Link>
                </Nav>

                <Nav className="ms-auto my-2 my-sm-0 user-droplist">
                    {loading ?
                        <Placeholder as={Nav} animation="glow">
                            <Placeholder xs={6} style={{width: '100px'}}/>
                        </Placeholder>
                    : _.isEmpty(user) ?
                        <Nav className="my-2 my-sm-0" onClick={() => console.log('')}>
                            <Nav.Link active="active">
                                <i className="fas fa-sign-in-alt" /> Sign in
                            </Nav.Link>
                        </Nav>
                        :
                        <NavDropdown active="active" id="navbarScrollingDropdown" align="end" className="header-user-dropList"
                            title={
                                <span className="header-user-title">
                                    <img src={user.photoURL} alt='' className="d-sm-block d-none me-2" />
                                    <span>{user.given_name}</span>
                                </span>
                            }>
    
                            <NavDropdown.Item className="overflow-hidden d-flex align-items-center" disabled>
                                <img src={user.photoURL} alt='' className="avata-user-infor" />
                                <div className="d-inline-block ms-2">
                                    <p className="text-user-info">{user.displayName}</p>
                                    <p className="m-0" style={{ fontSize: '14px' }}>{user.email}</p>
                                </div>
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={() => console.log('')}><i className="fas fa-sign-out-alt" /> Sign out</NavDropdown.Item>
                        </NavDropdown>
                    }
                </Nav>                    
            </Navbar.Collapse>
        </Container>
    </Navbar>
}

export default Header