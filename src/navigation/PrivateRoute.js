import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../config/firebase'
import { RequireLoginPage } from '../pages'
import { Route } from 'react-router-dom'

function PrivateRoute({ component: Component, ...rest }) {
    const [ user ] = useAuthState(auth)

    return (
        <Route
            {...rest}
            render={(props) => user ? <Component {...props} /> : <RequireLoginPage/>}
        />
    )
}

export default PrivateRoute