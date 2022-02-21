import '../assets/styles/Header.css'
import { Navbar, Container, Nav, NavDropdown, Placeholder, Badge } from 'react-bootstrap'
import _ from 'lodash'
import { ROUTER_PATH } from '../constants'
import { useList } from 'react-firebase-hooks/database'
import { auth, userDB, rulesDB } from '../config/firebase'
import { Utils } from '../utils'
import { useHistory, useLocation } from "react-router"
import { UserInfo, SignIn, SignOut } from './index'

const Header = (props) => {
    const history = useHistory()
    const { pathname } = useLocation()

    const [userDataSnapshot, loading] = useList(
        auth.currentUser ?
            userDB.child(auth.currentUser?.uid)
            : ''
    )
    const user = Utils.convertDataSnapshotToObject(userDataSnapshot)
    const [operatorDatasnapshot, loadingOperator] = useList(user?.uid ? rulesDB.child(user?.uid) : '')
    const position = Utils.convertDataSnapshotToObject(operatorDatasnapshot)

    return <Navbar collapseOnSelect expand="sm" variant="dark" fixed="top" className="header-container">
        <Container fluid>
            <Navbar.Brand 
                className="fw-bold"
                onClick={() => history.push(ROUTER_PATH.HOME)}
                style={{cursor: 'pointer'}}
            >
                <i className="fas fa-book-reader" /> Learn EV
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="navbarScroll" />

            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="my-2 my-sm-0">
                    
                    <Nav.Link
                        style={{cursor: 'pointer'}}
                        as="span"
                        href="#"
                        active="active"
                        onClick={() => history.push(ROUTER_PATH.HOME)}
                    >
                        {pathname === ROUTER_PATH.HOME
                            ? <Badge pill bg="primary">Home</Badge>
                            : 'Home'
                        }
                    </Nav.Link>

                    <Nav.Link
                        style={{cursor: 'pointer'}}
                        as="span"
                        href="#"
                        active="active"
                        onClick={() => history.push(ROUTER_PATH.STUDY_SET)}                    
                    >
                        {pathname === ROUTER_PATH.STUDY_SET
                            ? <Badge pill bg="primary">Study set</Badge>
                            : 'Study set'
                        }
                    </Nav.Link>

                    {loadingOperator ?
                        <Placeholder as={Nav.Link} animation="glow">
                            <Placeholder xs={6} style={{ width: '100px' }} />
                        </Placeholder>

                        : !_.isEmpty(operatorDatasnapshot) && (position?.admin || position?.collaborator) && 

                        <Nav.Link
                            style={{cursor: 'pointer'}}
                            as="span"
                            href="#"
                            active="active"
                            onClick={() => history.push(ROUTER_PATH.DASHBOARD_USERS)}                    
                        >
                            {pathname.includes('/dashboard/')
                                ? <Badge pill bg="primary">Dashboard</Badge>
                                : 'Dashboard'
                            }
                        </Nav.Link>
                    }

                </Nav>

                <Nav className="ms-auto my-2 my-sm-0 user-droplist">
                    {loading ?
                        <Placeholder as={Nav} animation="glow">
                            <Placeholder xs={6} style={{ width: '100px' }} />
                        </Placeholder>
                        : _.isEmpty(user) ?
                            <Nav className="my-2 my-sm-0">
                                <Nav.Link 
                                    as="span"
                                    active="active"
                                    href="#"
                                ><SignIn /></Nav.Link>
                            </Nav>
                            :
                            <NavDropdown active="active" id="navbarScrollingDropdown" align="end" className="header-user-dropList"
                                title={
                                    <span className="header-user-title">
                                        <img src={user?.photoURL} alt='' className="d-sm-block d-none me-2" />
                                        <span>
                                            {
                                                user?.given_name?.length > 15
                                                    ? user?.given_name.substr(0, 15).concat('...')
                                                    : user?.given_name
                                            }
                                        </span>
                                    </span>
                                }>
                                <NavDropdown.Item disabled>
                                    <UserInfo
                                        trim={true}
                                        photoURL={user?.photoURL}
                                        displayName={user?.given_name}
                                        email={user?.email}
                                    />
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#" as="span"><SignOut /></NavDropdown.Item>
                            </NavDropdown>
                    }
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
}

export default Header