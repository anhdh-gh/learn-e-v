import '../assets/styles/UserInfo.css'
import { auth } from '../config/firebase'

const UserInfo = (props) => {

    const { className } = props

    return <div className={`user-info-container ${className}`}>
        <img src={auth.currentUser?.photoURL} alt='' className="avata"/>
        <div className="text-user-info">
            <p className="display-name">{auth.currentUser?.displayName}</p>
            <p className="email" >{auth.currentUser?.email}</p>
        </div>
    </div>
}

export default UserInfo