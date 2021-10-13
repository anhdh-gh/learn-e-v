import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, rulesDB } from '../config/firebase'
import { RequirePage } from '../pages'
import { Route } from 'react-router-dom'
import { useList } from 'react-firebase-hooks/database'
import _ from 'lodash'
import { Utils } from '../utils'

function PrivateOperatorRoute({ component: Component, ...rest }) {
    const [ user ] = useAuthState(auth)
    const [ operatorDatasnapshot, loading ] = useList(user ? rulesDB.child(user?.uid) : '')    
    const position = Utils.convertDataSnapshotToObject(operatorDatasnapshot)

    return (
        <Route
            {...rest}
            render={(props) => 
                !user
                ? <RequirePage
                    title="Opps! You need to login"
                    signInBt={true}
                />
                : loading
                    ? <></>
                    : _.isEmpty(operatorDatasnapshot)
                        ? <RequirePage title="You are not an operator. Re-login!"/>
                        : position?.admin || position?.collaborator
                            ? <Component {...props}/> 
                            : <RequirePage title="You are not an operator. Re-login!"/>
            }
        />
    )
}

export default PrivateOperatorRoute