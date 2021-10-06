import React from 'react'
import {
    HomePage,
    PageNotFound,
    StudySetPage,
    CreateStudySetPage,
    EditStudySetPage,
    ViewStudySetPage,
} from '../pages'
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
            main: () => <CreateStudySetPage/>
        },      
        
        {
            path: `${ROUTER_PATH.STUDY_SET_EDIT}/:idStudyset`,
            exact: true,
            main: () => <EditStudySetPage/>
        },  

        {
            path: `${ROUTER_PATH.STUDY_SET_VIEW}/:idAuthor/:idStudyset`,
            exact: true,
            main: () => <ViewStudySetPage/>
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