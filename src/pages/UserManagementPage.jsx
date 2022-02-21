import '../assets/styles/UserManagementPage.css'
import { UserInfo, SearchBox, Footer, ModalConfirm, Sider, Pagination } from '../components'
import { Card, Badge, OverlayTrigger, Tooltip, Offcanvas, Form, Button } from 'react-bootstrap'
import { useState } from "react"
import { useList } from 'react-firebase-hooks/database'
import { Utils, Firebase, Notify } from '../utils'
import { auth, userDB, rulesDB } from '../config/firebase'
import { ROUTER_PATH } from '../constants'
import { NavLink } from "react-router-dom"

const UserManagementPage = (props) => {

    const [showModel, setShowModel] = useState({ show: false })
    const [search, setSearch] = useState('')
    const [showVEUser, setShowVEUser] = useState({ show: false })
    const [update, setUpdate] = useState('')

    const [rulesDataSnapshot] = useList(rulesDB)
    const [userDataSnapshot] = useList(userDB)

    const rules = Utils.convertDataSnapshotToObject(rulesDataSnapshot)
    const userList = Utils.convertDataSnapshotToArray(userDataSnapshot).map(user => ({ ...user, ...rules[user?.uid] }))

    const users = search
        ? userList.filter(item =>
            item.displayName.trim().toLowerCase().includes(search.trim().toLowerCase())
            || item.email.trim().toLowerCase().includes(search.trim().toLowerCase()))
        : userList

    const myRules = rules[auth?.currentUser?.uid]

    const handleReset = () => {
        const res = Firebase.resetUser(showModel?.userReset?.id)
        if (res) Notify.success('Successful removal!')
        else Notify.error('Error, try again!')
        setShowModel({ show: false })
    }

    const handleUpdate = () => {
        const res = Firebase.updateRule(showVEUser.uid, update)
        if (res) Notify.success('Update successful!')
        else Notify.error('Error, try again!')  
        setShowVEUser({ show: false })
    }

    return <>
        <Sider siderItems={[
            {
                icon: 'fas fa-user',
                name: 'Users',
                route: ROUTER_PATH.DASHBOARD_USERS
            },
            {
                icon: 'fas fa-book-open',
                name: 'Study sets',
                route: ROUTER_PATH.DASHBOARD_STUDYSET
            },
        ]}>
            <div className="UserManagementPage-container">

                {/* Phần các chức năng bên trên */}
                <div className="func">
                    <div className="container-xl">
                        <div className="row">
                            <div className="col-md">
                                <UserInfo
                                    photoURL={auth?.currentUser?.photoURL}
                                    displayName={auth?.currentUser?.displayName}
                                    email={auth?.currentUser?.email}
                                />
                            </div>
                            <div className="col-md d-flex align-items-end justify-content-between mt-4 mt-md-0">
                                <SearchBox placeholder="Search" value={search} onChange={e => setSearch(e.target.value)}/>
                                <NavLink to={ROUTER_PATH.HOME}>
                                    <Button style={{height: 'fit-content', fontWeight: 'bold'}}>Home</Button>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="content pb-3">
                    <div className="container-xl">
                        <Pagination className="row" numberItem={8}>
                            {
                                users?.map(user => <div key={user?.uid} className="col-sm-6 col-md-4 col-lg-3 mt-3">
                                    <Card className="card-user">
                                        <Card.Img variant="top" src={user?.photoURL} onClick={() => setShowVEUser({ type: 'view', ...user, show: true })}/>
                                        <Card.Body onClick={() => setShowVEUser({ type: 'view', ...user, show: true })}>
                                            <Card.Title className="title">{user?.displayName}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">
                                                <Badge pill bg="warning" text="dark">
                                                    {
                                                        user?.admin
                                                            ? 'Admin'
                                                            : user?.collaborator
                                                                ? 'Collaborator'
                                                                : 'User'
                                                    }
                                                </Badge>
                                            </Card.Subtitle>
                                            <Card.Text>{user?.email}</Card.Text>
                                        </Card.Body>

                                        {myRules?.admin && <Card.Footer className="d-flex justify-content-between">
                                            <OverlayTrigger placement="bottom" overlay={<Tooltip>Edit</Tooltip>}>
                                                <Badge bg="primary" 
                                                    onClick={() => {
                                                        setShowVEUser({ ...user, show: true, type: 'update' })
                                                        setUpdate(user?.admin ? 'Admin' : user?.collaborator ? 'Collaborator' : 'User')
                                                    }}>
                                                    <i className="fas fa-edit fs-6" />
                                                </Badge>
                                            </OverlayTrigger>

                                            <OverlayTrigger placement="bottom" overlay={<Tooltip>Reset</Tooltip>}>
                                                <Badge bg="danger"
                                                    onClick={() => setShowModel({
                                                        show: true,
                                                        userReset: { id: user?.uid, displayName: user?.displayName }
                                                    })}>
                                                    <i className="fas fa-trash-alt fs-6" />
                                                </Badge>
                                            </OverlayTrigger>
                                        </Card.Footer>}

                                    </Card>
                                </div>)
                            }                                
                        </Pagination>
                    </div>
                </div>

                <ModalConfirm
                    show={showModel.show}
                    setShow={() => setShowModel({ show: false })}
                    title="Confirm"
                    message={`Are you sure you want to reset user: "${showModel?.userReset?.displayName}"?`}
                    handleNo={() => setShowModel({ show: false })}
                    handleYes={handleReset}
                />

                {/* Update user */}
                {showVEUser?.show && <Offcanvas placement="end" show={showVEUser?.show} onHide={() => setShowVEUser({ show: false })}>
                    <Offcanvas.Header closeButton className="border-bottom">
                        <Offcanvas.Title>
                            {showVEUser?.type === 'update' ? 'Update user' : 'View user'}
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <img src={showVEUser?.photoURL} alt="avata" className="w-100" />
                        <table className="table table-bordered table-container">
                            <thead className="title-table align-middle">
                                <tr>
                                    <th scope="col" colSpan="2">User information</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="fw-bold">
                                    <td>Uid</td>
                                    <td>{showVEUser?.uid}</td>
                                </tr>
                                <tr className="fw-bold">
                                    <td>Display name</td>
                                    <td>{showVEUser?.displayName}</td>
                                </tr>
                                <tr className="fw-bold">
                                    <td>Email</td>
                                    <td>{showVEUser?.email}</td>
                                </tr>
                                <tr className="fw-bold">
                                    <td>Position</td>
                                    <td>
                                        {showVEUser?.type === 'update' && myRules?.admin
                                            ? <Form.Select style={{cursor: 'pointer'}} onChange={e => setUpdate(e.target.value)} size="sm" defaultValue={showVEUser?.admin ? 'Admin' : showVEUser?.collaborator ? 'Collaborator' : 'User'}>
                                                <option value="Admin">Admin</option>
                                                <option value="Collaborator">Collaborator</option>
                                                <option value="User">User</option>
                                            </Form.Select>
                                            : showVEUser?.admin
                                                ? 'Admin'
                                                : showVEUser?.collaborator
                                                    ? 'Collaborator'
                                                    : 'User'
                                        }
                                    </td>
                                </tr>
                                <tr className="fw-bold">
                                    <td>Family name</td>
                                    <td>{showVEUser?.family_name}</td>
                                </tr>
                                <tr className="fw-bold">
                                    <td>Given name</td>
                                    <td>{showVEUser?.given_name}</td>
                                </tr>
                                <tr className="fw-bold">
                                    <td>Locale</td>
                                    <td>{Utils.capitalizeFirstLetter(showVEUser?.locale)}</td>
                                </tr>
                                <tr className="fw-bold">
                                    <td>Is anonymous</td>
                                    <td>{Utils.capitalizeFirstLetter(showVEUser?.isAnonymous.toString())}</td>
                                </tr>
                                <tr className="fw-bold">
                                    <td>Is newUser</td>
                                    <td>{Utils.capitalizeFirstLetter(showVEUser?.isNewUser.toString())}</td>
                                </tr>
                                <tr className="fw-bold">
                                    <td>Verified email</td>
                                    <td>{Utils.capitalizeFirstLetter(showVEUser?.verified_email?.toString())}</td>
                                </tr>
                            </tbody>
                        </table>
                        {showVEUser?.type === 'update' && 
                            <Button 
                                onClick={handleUpdate}
                                className="btn btn-primary w-100 fw-bold mt-3">
                            Update</Button>}
                    </Offcanvas.Body>
                </Offcanvas>}
            </div>
        </Sider>
        <Footer />
    </>
}

export default UserManagementPage