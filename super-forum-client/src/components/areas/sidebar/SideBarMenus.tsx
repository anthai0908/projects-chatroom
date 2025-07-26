import { UseDispatch, useSelector } from "react-redux";
import React, { useEffect, useState} from "react";
import { Appstate } from "../../../store/AppState";
import { useDispatch } from "react-redux";
import { UserProfileSetType } from "../../../store/user/Reducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRegistered, faSignIn, faSignInAlt, faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import Registration from "../../auth/Registration";
import "./SideBarMenus.css";
import Login from "../../auth/Login";
import { Logout } from "../../auth/Logout";
import { Link } from "react-router-dom";
const SideBarMenus = () => {
    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showLogout, setShowLogout] = useState(false);
    const onCLickToggleRegister = () =>{
        setShowRegister(!showRegister);
    }
    const OnclickToggleLogin = () => {
        setShowLogin(!showLogin)
    }
    const OnClickToggleLogOut = () => {
        setShowLogout(!showLogout)
    }

    const user = useSelector((state: Appstate) =>{return state.user});

   
    
    return (
        <React.Fragment>
            <ul >
                {
                    user?  (
                        <li>
                            <FontAwesomeIcon icon = {faUser}/>
                            <span className="menu-name">
                                <Link to = {`/userprofile/${user?.id}`}>
                                    {user?.userName}
                                </Link>
                            </span>
                        </li>
                    ) : null    
                }
                {
                    user? null : (
                         <li>
                            <FontAwesomeIcon icon = {faRegistered}/>
                            <span className="menu-name" onClick={onCLickToggleRegister}>Register</span>
                            <Registration isOpen ={showRegister} onClickToggle={onCLickToggleRegister}/>
                        </li>
                    ) 
                }
               {
                    user? null : (
                        <li>
                            <FontAwesomeIcon icon={faSignInAlt}/>
                            <span onClick={OnclickToggleLogin} className="menu-name">
                                Login
                            </span>
                            <Login isOpen = {showLogin} onClickToggle={OnclickToggleLogin}/>
                        </li>
                    )
               }
                {
                    user? (
                        <li>
                            <FontAwesomeIcon icon = {faSignOutAlt}/>
                            <span onClick={OnClickToggleLogOut} className="menu-name">
                                Logout
                            </span>
                            <Logout isOpen ={showLogout} onClickToggle={OnClickToggleLogOut}/>
                        </li>
                    ) : null
                }
                
            </ul>
        </React.Fragment>
    )
}
export default SideBarMenus;
