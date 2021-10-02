import React from 'react'
import { HomePage, PageNotFound, CeStudySetPage } from '../pages'
import { ROUTER_PATH } from '../constants'

const routes = [
    {
        path: ROUTER_PATH.HOME,
        exact: true,
        main: () => <HomePage />
    },

    {
        path: ROUTER_PATH.STUDY_SET,
        exact: true,
        main: () => <CeStudySetPage/>
    },

    {
        path: ROUTER_PATH.PAGE_NOT_FOUND, // Không match với path nào ở phía trên (luôn đặt ở cuối cùng)
        exact: false,
        main: () => <PageNotFound />
    },    
]

export default routes