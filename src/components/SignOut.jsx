import { Firebase, Notify } from '../utils'
import { ROUTER_PATH } from '../constants'
import { useHistory } from 'react-router'

const SignOut = (props) => {

    const history = useHistory()

    const handleSignOut = async () => {
        const res = await Firebase.signOut()
        if(res) {
            Notify.success('Sign out successful!')
            history.replace(ROUTER_PATH.HOME)
        }
        else Notify.error('Logout failed!')        
    }

    return <div onClick={handleSignOut}><i className="fas fa-sign-out-alt" /> Sign out</div>
}

export default SignOut