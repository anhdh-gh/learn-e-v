import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import routes from './routes'

const AppNavigator = () => {
    return <Router>
        <Switch>
            {routes.map((route, index) => <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.main}
            />)}
        </Switch>
    </Router>
}

export default AppNavigator