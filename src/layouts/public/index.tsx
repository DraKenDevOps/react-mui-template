import React from 'react'
import { Outlet } from 'react-router-dom'

interface Props {

}

const PublicLayout: React.FC<Props> = () => {
    return (
        <>
            <Outlet />
        </>
    )
}

export default PublicLayout
