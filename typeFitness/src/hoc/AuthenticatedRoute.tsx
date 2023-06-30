/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, ReactElement } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"


type ChildProp = {
    children: ReactElement;
}


export default function AuthenticatedRoute({ children } : ChildProp) {

    const { user } = useContext(AuthContext)
    const location: any = useLocation()

    if (user === null) return <Navigate to="/log-in" state={{ from: location.pathname }}></Navigate>

    return children
}
