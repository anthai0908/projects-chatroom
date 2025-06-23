import { FC, useReducer, useState, useEffect} from "react";
import { isPasswordValid, PasswordTestResult } from "../../common/validators/PassWordValidator";
import ReactModal from "react-modal";
import "./Registration.css"
import { ModalProps } from "../types/ModalProps";
import userReducer from "./common/UserReducer";
import { allowSubmit } from "./common/Helper";
import PasswordComparison from "./common/PasswordComparison"

const Registration : FC<ModalProps> = ({isOpen, onClickToggle}: ModalProps) =>{
    const [{userName, password, passwordConfirm, email, resultMsg, isSubmitDisabled}, dispatch ] = useReducer(userReducer, {
        userName : "dave",
        password: "",
        email: "admin@dzhaven.com",
        passwordConfirm: "",
        resultMsg: "",
        isSubmitDisabled: true,
    });
    

    const onChangeUserName= (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({type: "userName", payload: e.target.value});
        if (!e.target.value) allowSubmit(dispatch, "Username cannot be empty", true);
        else allowSubmit(dispatch, "", false);
    };    
    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({type: "email", payload: e.target.value});
        if (!e.target.value){
            allowSubmit(dispatch,"Email cannot be empty", true);
        }
        else{
            allowSubmit(dispatch, "", false);
        };
    }

    const onClickRegister= (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=> {
        e.preventDefault();
        onClickToggle(e);
    }

    const onClickCancel = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        onClickToggle(e);
    }
    return (
        <ReactModal 
            className="modal-menu"
            isOpen = {isOpen}
            onRequestClose={onClickToggle}
            shouldCloseOnOverlayClick={true}>
        <form>
            <div className="req-inputs">
                <div>
                    <label>username</label>
                    <input type="text" value = {userName} onChange={onChangeUserName}></input>
                </div>
                <div>
                    <label>email</label>
                    <input type="text" value ={email} onChange ={onChangeEmail}></input>
                </div>
                <PasswordComparison dispatch={dispatch} password={password} passwordConfirm={passwordConfirm}/>
                <div className="req-buttons">
                    <div className="req-btn-left">
                        <button
                        style={{marginLeft: "0.5em"}}
                        className="action-btn"
                        disabled = {isSubmitDisabled}
                        onClick = {onClickRegister}>
                            Register
                        </button>
                        <button 
                        style={{marginLeft : "0.5em"}}
                        className="cancel-btn"
                        onClick={onClickCancel}>
                            Close
                        </button>
                    </div>
                    <span className="req-btn-right">
                        <strong>{resultMsg}</strong>
                    </span>
                </div>
            </div>
        </form>
        </ReactModal>
    )
}
export default Registration;