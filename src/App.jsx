import 'bootstrap/dist/css/bootstrap.min.css'
import "react-toastify/dist/ReactToastify.css"
import '@fortawesome/fontawesome-free/css/all.min.css'
import AppNavigator from './navigation/AppNavigator'
import { Toast, Loader } from './components'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, userDB } from './config/firebase'
import { useEffect } from 'react'
import { Utils } from './utils'

const App = (props) => {
  const [ user, loading ] = useAuthState(auth)

  useEffect(() => {
    if(user && !loading)
      userDB.child(user?.uid).on('value', snapshot => {
        const data = snapshot.val()
        userDB.child(user?.uid).set(Utils.filterUserObject({...data, ...user}))
      })
  }, [user, loading])
  
  return <div className="App">
      {
        loading ? <Loader/> :
        <>
          <Toast/>
          <AppNavigator/> 
        </>
      }
    </div>
}

export default App
