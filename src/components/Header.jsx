import '../assets/styles/Header.css'
import { Navbar, Container, Nav, NavDropdown, Placeholder, Badge } from 'react-bootstrap'
import { NavLink } from "react-router-dom"
import _ from 'lodash'
import { ROUTER_PATH } from '../constants'
import { useList } from 'react-firebase-hooks/database'
import { auth, userDB, rulesDB } from '../config/firebase'
import { Utils } from '../utils'
import { useLocation } from "react-router-dom"
import { UserInfo, SignIn, SignOut } from './index'

const Header = (props) => {

    const { pathname } = useLocation()

    const [userDataSnapshot, loading] = useList(
        auth.currentUser ?
            userDB.child(auth.currentUser?.uid)
            : ''
    )
    const user = Utils.convertDataSnapshotToObject(userDataSnapshot)
    const [operatorDatasnapshot, loadingOperator] = useList(user?.uid ? rulesDB.child(user?.uid) : '')
    const position = Utils.convertDataSnapshotToObject(operatorDatasnapshot)

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
                    <Nav.Link href={ROUTER_PATH.HOME} as="span" active="active">
                        <NavLink to={ROUTER_PATH.HOME}>
                            {
                                pathname === ROUTER_PATH.HOME
                                    ? <Badge pill bg="primary">Home</Badge>
                                    : 'Home'
                            }
                        </NavLink>
                    </Nav.Link>

                    <Nav.Link href={ROUTER_PATH.STUDY_SET} as="span" active="active">
                        <NavLink to={ROUTER_PATH.STUDY_SET}>
                            {
                                pathname === ROUTER_PATH.STUDY_SET
                                    ? <Badge pill bg="primary">Study set</Badge>
                                    : 'Study set'
                            }
                        </NavLink>
                    </Nav.Link>

                    {loadingOperator ?
                        <Placeholder as={Nav.Link} animation="glow">
                            <Placeholder xs={6} style={{ width: '100px' }} />
                        </Placeholder>

                        : !_.isEmpty(operatorDatasnapshot) && (position?.admin || position?.collaborator) && 

                        <NavDropdown title="Dashboard" className="dashboard-dropdown" active="active">
                            <NavDropdown.Item as="span" className="fw-bold">
                                <NavLink to={ROUTER_PATH.DASHBOARD_USERS}>
                                    <i className="fas fa-user"/> Users
                                </NavLink>
                            </NavDropdown.Item>
                            <NavDropdown.Item as="span" className="fw-bold">
                                <NavLink to={ROUTER_PATH.DASHBOARD_STUDYSET}>
                                    <i className="fas fa-book-open"/> Study sets
                                </NavLink>
                            </NavDropdown.Item>
                        </NavDropdown>
                    }

                </Nav>

                <Nav className="ms-auto my-2 my-sm-0 user-droplist">
                    {loading ?
                        <Placeholder as={Nav} animation="glow">
                            <Placeholder xs={6} style={{ width: '100px' }} />
                        </Placeholder>
                        : _.isEmpty(user) ?
                            <Nav className="my-2 my-sm-0">
                                <Nav.Link active="active"><SignIn /></Nav.Link>
                            </Nav>
                            :
                            <NavDropdown active="active" id="navbarScrollingDropdown" align="end" className="header-user-dropList"
                                title={
                                    <span className="header-user-title">
                                        <img src={user?.photoURL} alt='' className="d-sm-block d-none me-2" />
                                        <span>
                                            {
                                                user?.given_name.length > 15
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
                                <NavDropdown.Item><SignOut /></NavDropdown.Item>
                            </NavDropdown>
                    }
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
}

export default Header