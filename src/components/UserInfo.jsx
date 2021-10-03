import '../assets/styles/UserInfo.css'
import { auth } from '../config/firebase'

const UserInfo = (props) => {

    const { trim } = props

    return <div className="user-info-container">
        <img src={auth.currentUser?.photoURL} alt='' className="avata"/>
        <div className="text-user-info">
            <p className="display-name">
                {
                    trim && auth.currentUser?.displayName.length > 15
                    ? auth.currentUser?.displayName.substr(0, 15).concat('...')
                    : auth.currentUser?.displayName
                }
            </p>
            <p className="email">
                {
                    trim && auth.currentUser?.email.length > 15
                    ? auth.currentUser?.email.substr(0, 15).concat('...')
                    : auth.currentUser?.email
                }
            </p>
        </div>
    </div>
}

export default UserInfo