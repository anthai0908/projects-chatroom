import {Dispatch} from "react";

export const allowSubmit = (
    dispatch : Dispatch<any>,
    msg: string,
    isSubmitDisabled: boolean
)=>{
    dispatch({type: "isSubmitDisabled", payload: isSubmitDisabled})
    dispatch({type: "resultMsg", payload : msg})
};