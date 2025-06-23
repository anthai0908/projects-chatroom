    import React, {FC} from "react";
    import { allowSubmit } from "./Helper";
    import { PasswordTestResult } from "../../../common/validators/PassWordValidator"; 
    import{ isPasswordValid } from "../../../common/validators/PassWordValidator";
    
    interface PasswordComparisonProps {
        dispatch: React.Dispatch<any>;
        password: string;
        passwordConfirm: string,
    }
    
    const PasswordComparison : FC<PasswordComparisonProps> = ({
        dispatch,
        password,
        passwordConfirm,
    }) => {
        const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch({type: "password", payload: e.target.value});
            const passwordCheck: PasswordTestResult = isPasswordValid(e.target.value);
            if(!passwordCheck.isvalid){
                 allowSubmit(dispatch, passwordCheck.message, true);
                 return;
            }
            passwordSame(passwordConfirm, e.target.value);
        };
        const onChangePasswordConfirm = (e:React.ChangeEvent<HTMLInputElement>) => {
            dispatch({type: "passwordConfirm", payload: e.target.value});
            passwordSame(password, e.target.value);
        }
        const passwordSame = (passwordVal: string, passwordConfirmVal: string) =>{
            if (passwordVal !== passwordConfirmVal){
                allowSubmit(dispatch, "Password do not match", true)
                return false;
            }
            else{
                allowSubmit(dispatch, "", false);
                return true;
            }
        }
        return (
            <React.Fragment>
                <div>
                    <label>password</label>
                    <input type = "password" placeholder="Password" value = {password} onChange={onChangePassword}></input>
                </div>
                <div>
                    <label>password confirmation</label>
                    <input type="password" value = {passwordConfirm} placeholder="Password Confirmation " onChange = {onChangePasswordConfirm}></input>
                </div>
            </React.Fragment>
        )
    }
    
    
export default PasswordComparison;
    