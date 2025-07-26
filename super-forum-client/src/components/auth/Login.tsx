import React, {FC, useReducer, useEffect} from "react";
import ReactModal from "react-modal";
import { ModalProps } from "../types/ModalProps";
import userReducer from "./common/UserReducer";
import { allowSubmit } from "./common/Helper";
import { useDispatch } from "react-redux";
import { UserProfileSetType } from "../../store/user/Reducer";
import { useMutation, gql } from "@apollo/client";
import { Me } from "../../hooks/useRefreshReduxMe";
import UseRefreshReduxMe from "../../hooks/useRefreshReduxMe";
const LoginMutation = gql`
    mutation Login($userName: String!, $password: String!){
        login(userName: $userName, password: $password)
    }
`;
const Login : FC<ModalProps> = ({isOpen, onClickToggle}) => {
    const [execLogin] = useMutation(LoginMutation, {
        refetchQueries: [
            {
                query: Me,
            },
        ],
    })
    const [{userName, password, resultMsg, isSubmitDisabled}, dispatch] = useReducer(userReducer, {
        userName: "test1",
        password: "Test123!@#",
        resultMsg: "",
        isSubmitDisabled: false
    });
    
    const {execMe, updateMe} = UseRefreshReduxMe();

    const onChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
        dispatch({type: "userName", payload : e.target.value});
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

    const onClickLogin = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault();
        onClickToggle(e);
        const result = await execLogin({
            variables: {
                userName,
                password
            }
        });
        execMe();
        updateMe();
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
    