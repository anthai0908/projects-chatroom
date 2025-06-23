import React, {useState} from "react";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUmbrellaBeach } from "@fortawesome/free-solid-svg-icons";
import "./Nav.css"
import ReactModal from "react-modal";
import SideBarMenus from "./sidebar/SideBarMenus";
const Nav = () => {
    const[showMenu, setShowMenu] = useState<boolean>(false);
    const {width} = useWindowDimensions();
    const getMobileMenu = (()=> {
        if(width <= 768){
            return <FontAwesomeIcon icon = {faBars} size="lg" className="nav-mobile-menu" onClick={onclickToggle}></FontAwesomeIcon>
        };
        return null;
    });
    const onclickToggle = (e: React.MouseEvent<Element, MouseEvent>) =>{
        setShowMenu(!showMenu);
    };
    const onRequestClose = (e: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>) =>{
        setShowMenu(false);
    };
    return (<React.Fragment>
         <ReactModal
            className="modal-menu"
            isOpen = {showMenu}
            onRequestClose={onRequestClose}
            shouldCloseOnOverlayClick = {true}
            >
            <SideBarMenus/>
        </ReactModal>
        <nav className="navigation">
            {getMobileMenu()}
            <span>
                <strong>SuperForum</strong>
            </span>
        </nav>
    </React.Fragment>
       );
};
export default Nav;
