import React from 'react'
import { HomePage, PageNotFound, StudySetPage, CEstudySetPage } from '../pages'
import { ROUTER_PATH } from '../constants'

const routes = {
    privateRoute: [
        {
            path: `${ROUTER_PATH.STUDY_SET}`,
            exact: true,
            main: () => <StudySetPage/>
        },

        {
            path: `${ROUTER_PATH.STUDY_SET_CREATE}`,
            exact: true,
            main: () => <CEstudySetPage/>
        },      
        
        {
            path: `${ROUTER_PATH.STUDY_SET_EDIT}/:slug`,
            exact: true,
            main: () => <CEstudySetPage/>
        },  
    ],

    publicRoute: [
        {
            path: ROUTER_PATH.HOME,
            exact: true,
            main: () => <HomePage />
        },

        {
            path: ROUTER_PATH.PAGE_NOT_FOUND, // Không match với path nào ở phía trên (luôn đặt ở cuối cùng)
            exact: false,
            main: () => <PageNotFound />
        },    
    ]
}

export default routes