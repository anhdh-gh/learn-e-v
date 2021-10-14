import { Firebase, Notify } from '../utils'

const SignIn = (props) => {

    const { style } = props

    const handleSignIn = async () => {
        const res = await Firebase.signInGoogle()
        if(res) Notify.success('Logged in successfully!')
        else Notify.error('Login failed!')
    }

    return <div onClick={handleSignIn} style={{...style, cursor: 'pointer'}}>
        <i className="fab fa-google"/> Sign in
    </div>
}

export default SignIn