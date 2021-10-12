import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import routes from './routes'
import PrivateRoute from './PrivateRoute'
import PrivateOperatorRoute from './PrivateOperatorRoute'
import { ScrollToTop, Header } from '../components'

const AppNavigator = () => {
    return <Router>
        <ScrollToTop/>
        <Header/>
        <Switch>
            {routes.privateOperatorRoute.map((route, index) => <PrivateOperatorRoute
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.main}
            />)}


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