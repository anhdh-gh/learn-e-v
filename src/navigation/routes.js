import React from 'react'
import {
    HomePage,
    PageNotFound,
    StudySetPage,
    CreateStudySetPage,
    EditStudySetPage,
    ViewStudySetPage,
    TestStudySetPage,
    UserManagementPage,
    StudysetManagementPage,
} from '../pages'
import { ROUTER_PATH } from '../constants'

const routes = {
    privateOperatorRoute: [
        {
            path: `${ROUTER_PATH.DASHBOARD_USERS}`,
            exact: true,
            main: () => <UserManagementPage/>
        },
        {
            path: `${ROUTER_PATH.DASHBOARD_STUDYSET}`,
            exact: true,
            main: () => <StudysetManagementPage/>
        },
    ],

    privateRoute: [
        {
            path: `${ROUTER_PATH.STUDY_SET}`,
            exact: true,
            main: () => <StudySetPage/>
        },

        {
            path: `${ROUTER_PATH.STUDY_SET_CREATE}`,
            exact: true,
            main: () => <CreateStudySetPage/>
        },      
        
        {
            path: `${ROUTER_PATH.STUDY_SET_EDIT}/:idAuthor/:idStudyset`,
            exact: true,
            main: () => <EditStudySetPage/>
        },  
    ],

    publicRoute: [
        {
            path: ROUTER_PATH.HOME,
            exact: true,
            main: () => <HomePage />
        },

        {
            path: `${ROUTER_PATH.STUDY_SET_VIEW}/:idAuthor/:idStudyset`,
            exact: true,
            main: () => <ViewStudySetPage/>
        },  

        {
            path: `${ROUTER_PATH.STUDY_SET_TEST}/:idAuthor/:idStudyset`,
            exact: true,
            main: () => <TestStudySetPage/>
        }, 

        {
            path: ROUTER_PATH.PAGE_NOT_FOUND, // Không match với path nào ở phía trên (luôn đặt ở cuối cùng)
            exact: false,
            main: () => <PageNotFound />
        },    
    ]
}

export default routes