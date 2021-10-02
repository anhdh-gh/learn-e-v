import { Firebase, Notify } from '../utils'

const SignIn = (props) => {

    const { signInRef } = props

    const handleSignIn = async () => {
        const res = await Firebase.signInGoogle()
        if(res) Notify.success('Logged in successfully!')
        else Notify.error('Login failed!')
    }

    return <div ref={signInRef} onClick={handleSignIn}><i className="fab fa-google"></i> Sign in</div>
}

export default SignIn