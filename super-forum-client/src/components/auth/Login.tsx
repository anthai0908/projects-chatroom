import React, {FC, useReducer, useEffect} from "react";
import ReactModal from "react-modal";
import { ModalProps } from "../types/ModalProps";
import userReducer from "./common/UserReducer";
import { allowSubmit } from "./common/Helper";
import { useDispatch } from "react-redux";
import { UserProfileSetType } from "../../store/user/Reducer";

const Login : FC<ModalProps> = ({isOpen, onClickToggle}) => {
    const [{userName, password, resultMsg, isSubmitDisabled}, dispatch] = useReducer(userReducer, {
        userName: "",
        password: "",
        resultMsg: "",
        isSubmitDisabled: true
    });
    const reduxDispatch = useDispatch();
    
    /*
    useEffect(() => {
        try {
            reduxDispatch({
                type: UserProfileSetType,
                payload: {
                    id: 1,
                    username: "testUser",
                }
            });
            console.log("Dispatched successfully!");
        } catch (error) {
            console.error("Redux dispatch failed:", error);
        }
    }, []);
    */
    const onChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({type: "userName", userName : e.target.value});
        if(!e.target.value){
            allowSubmit(dispatch, "Username cannot be empty", true);
        }
        else{
            allowSubmit(dispatch, "", false);
        }
    }

    const onchangePassword = (e:React.ChangeEvent<HTMLInputElement>) => {
        dispatch({type : "password", payload : e.target.value});
        if(!e.target.value){
            allowSubmit(dispatch, "Password cannot be emppty", true);
        }
        else{
            allowSubmit(dispatch, "", false);
        };
    };

    const onClickLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault();
        onClickToggle(e);
    };

    const onClickCancel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        onClickToggle(e);
    };

    return (
        <ReactModal
        className= "modal-menu"
        isOpen = {isOpen}
        onRequestClose={onClickToggle}>
            <form>
                <div className="req-inputs">
                    <div>
                        <label>
                            username
                        </label>
                        <input type="text" placeholder="Username" value={userName} onChange={onChangeUserName}/>
                    </div>
                    <div>
                        <label>
                            password
                        </label>
                        <input type = "password" value = {password} placeholder="Password" onChange={onchangePassword}/>
                    </div>
                </div>
                <div className="form-buttons form-button-sm">
                    <div className="form-btn-left">
                        <button style={{marginLeft: "1.5em"}} className="action-btn" disabled = {isSubmitDisabled} onClick = {onClickLogin}>
                            Login
                        </button>
                        <button style = {{marginLeft : "1.5em"}} className = "cancel-btn"  onClick={onClickCancel}>
                            Close
                        </button>
                    </div>
                    <span className="form-btn-left" style={{marginLeft : "1.5em"}}>
                        <strong>{resultMsg}</strong>
                    </span>
                </div>
            </form>
        </ReactModal>
    )
}
export default Login;
    