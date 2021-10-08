import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import routes from './routes'
import PrivateRoute from './PrivateRoute'
import { ScrollToTop } from '../components'

const AppNavigator = () => {
    return <Router>
        <ScrollToTop/>
        <Switch>
            {routes.privateRoute.map((route, index) => <PrivateRoute
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.main}
            />)}

            {routes.publicRoute.map((route, index) => <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.main}
            />)}
        </Switch>
    </Router>
}

export default AppNavigator