import { Firebase, Notify } from '../utils'

const SignOut = (props) => {

    const handleSignOut = async () => {
        const res = await Firebase.signOut()
        if(res) Notify.success('Sign out successful!')
        else Notify.error('Logout failed!')        
    }

    return <div onClick={handleSignOut}><i className="fas fa-sign-out-alt" /> Sign out</div>
}

export default SignOut