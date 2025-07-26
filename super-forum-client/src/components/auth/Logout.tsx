import React, {FC} from "react";
import ReactModal from "react-modal";
import { ModalProps } from "../types/ModalProps";
import "./Logout.css";
import { gql, useMutation } from "@apollo/client";
import { useSelector } from "react-redux";
import { Appstate } from "../../store/AppState";
import UseRefreshReduxMe, { Me } from "../../hooks/useRefreshReduxMe";
const LogoutMutation = gql`
    mutation logout ($userName: String!){
        logout (userName: $userName)
    }
`;
export const Logout : FC<ModalProps> = ({isOpen, onClickToggle}) => {
    const user = useSelector((state: Appstate)=> {
        return state.user;
    });
    const [execlogout] = useMutation(LogoutMutation,
        {
            refetchQueries: [
                {
                    query: Me
                }
            ]
        }
    )
    const {execMe, deleteMe} = UseRefreshReduxMe();

    const onClickLogin = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=> {
        e.preventDefault();
        onClickToggle(e);
        await execlogout({
            variables:{
                userName: user?.userName ?? "",
            }
        })
        deleteMe();
    };

    const onClickCancel = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        onClickToggle(e);
    };

    return (
        <ReactModal 
        className="modal-menu"
        isOpen ={isOpen}
        onRequestClose={onClickToggle}
        shouldCloseOnOverlayClick= {true}>
            <form>
                <div
                className="logout-inputs">
                    Are you sure you want to logout?
                </div>
                <div
                className="form-buttons form-buttons-sm">
                    <div className="form-button-left">
                        <button style = {{marginLeft: "1.5em"}}
                        className="action-btn"
                        onClick={onClickLogin}>
                            Logout
                        </button>
                        <button style = {{marginLeft: "1.5em"}}
                        className = "cancel-btn"
                        onClick = {onClickCancel}>
                            Close
                        </button>
                    </div>
                </div>
            </form>
        </ReactModal>
    )
}