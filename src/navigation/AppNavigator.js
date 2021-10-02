import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import routes from './routes'
import PrivateRoute from './PrivateRoute'

const AppNavigator = () => {
    return <Router>
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