import '../assets/styles/Sider.css'
import { Nav, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import useResizeAware from 'react-resize-aware'
import { useHistory, useLocation } from "react-router"

const Sider = (props) => {
    const history = useHistory()
    const { pathname } = useLocation()
    const { siderItems } = props

    const [ resizeListener, sizes] = useResizeAware()
    const [ zoom, setZoom ] = useState(window.innerWidth >= 786 ? true : false)
    const [ mobile, setMobile ] = useState(window.innerWidth < 576 ? true : false)

    useEffect(()=> {
        window.addEventListener('resize', () => {
            if(window.innerWidth < 576) {
                setZoom(false)
                setMobile(true)
            }
            else setMobile(false)
        })
    }, [mobile])

    return <>
        <div className={`sider-container mt-5 pt-2 ${mobile && !zoom ? 'd-none' : ''}`}>
            {resizeListener}
            <Nav className="sider-nav">
                <Nav.Item>
                    {
                        siderItems.map((item, index) =>
                        <OverlayTrigger overlay={!zoom ? <Tooltip>{item.name}</Tooltip> : <></>} placement="right" key={index}> 
                            <Nav.Link 
                                className={`item ${pathname === item.route && 'bg-danger'}`} 
                                onClick={() => history.push(item.route)}
                            >
                                <i className={`${item.icon} ${zoom && `pe-2`}`}/>
                                {zoom && `${item.name}`}
                            </Nav.Link>
                        </OverlayTrigger>
                        )
                    }                 
                </Nav.Item>
            </Nav>   
        </div>

        <div
            className="zoom"
            onClick={e => setZoom(!zoom)}
            style={{
                width: mobile ? '3rem' : sizes.width - 1,
                left: mobile && zoom ? sizes.width-1 : '0',
                borderTopRightRadius: mobile && '.5rem',
                boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
            }}
        >
            {
                zoom
                ? <i className="fas fa-chevron-left"/>
                : <i className="fas fa-chevron-right"/>
            }
        </div>

        <div style={{
            marginLeft: mobile ? 0 : sizes.width
        }}>{props.children}</div>
    </>
}

export default Sider