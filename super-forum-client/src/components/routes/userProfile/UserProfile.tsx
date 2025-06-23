import React, {useReducer, useEffect, useState, JSX} from "react";
import PasswordComparison from "../../auth/common/PasswordComparison";
import userReducer from "../../auth/common/UserReducer";
import "./UserProfile.css";
import Nav from "../../areas/Nav";
import { UseSelector } from "react-redux";
import { Appstate } from "../../../store/AppState";
import { getUserThreads } from "../../../services/DataService";
import { Link } from "react-router-dom";
import ThreadItem from "../../../models/ThreadItem";
import { useSelector } from "react-redux";
import Thread from "../../../models/Thread";

const UserProfile = () => {
    const [
        {
            userName, password, passwordConfirm, resultMsg, isSubmitDisabled}, dispatch
        ] 
        = useReducer(userReducer, 
            {
                userName : "",
                password: "*********",
                passwordConfirm : "*********",
                resultMsg: "",
                isSubmitDisabled: true,
            });
    const user = useSelector((state: Appstate) => state.user);
    const [thread, setThreads] = useState<JSX.Element | undefined>();
    const [threadItems, setThreadItems] = useState<JSX.Element | undefined>();

    useEffect(()=>{
        console.log("user", user);
        if(user){
            dispatch({
                type: "userName",
                payload: user.username,
            });
            getUserThreads(user.id).then((items)=>{
                const threadItemsInThreadList : Array<ThreadItem> = [];
                const threadList = items.map((thr: Thread) =>{
                    for(let i = 0; i <thr.threadItems.length; i++){
                        threadItemsInThreadList.push(thr.threadItems[i])
                    }
                    return (
                        <li key = {`user-th-${thr.id}`}>
                            <Link to = {`/thread${thr.id}`} className ="userprofile-link">
                            {thr.title}
                            </Link>
                        </li>
                    );
                });
                setThreads(<ul>{threadList}</ul>);

                const threadItemList = threadItemsInThreadList.map((ti: ThreadItem) =>{
                    return(
                        <li key = {`user-th-${ti.threadId}`}>
                            <Link to = {`thread/${ti.threadId}`} className = "userporfile-link">
                            {ti.body}
                            </Link>
                        </li>
                    )
                });
                setThreadItems(<ul>{threadItemList}</ul>);
            })
        }
    }, [user])
    return (
        <div className="screen-root-container">
            <div className="thread-nav-container">
                <Nav/>
            </div>
            <form className="userprofile-content-container">
                <div>
                    <strong>User Profile</strong>
                    <label style ={{marginLeft: "0.75em"}}>
                        {userName}
                    </label>
                </div>
                <div className="userprofile-password">
                    <div>
                        <PasswordComparison
                        dispatch={dispatch} 
                        password= {password}
                        passwordConfirm={passwordConfirm}/>
                        <button className ="action-btn" disabled = {isSubmitDisabled}>
                        Change Password
                        </button>
                    </div>
                    <div style ={{marginTop : "0.5em"}}>
                        <label>
                            {resultMsg}
                        </label>
                    </div>
                </div>
                <div className="userprofile-posting">
                    <hr className="thread-section-divider"/>
                    <div className="userprofile-threads">
                        <strong>Threads Posted</strong>
                        {thread}
                    </div>
                    <div className="userprofile-threadItems">
                        <strong>ThreadItems Posted</strong>
                        {threadItems}
                    </div>
                </div>
            </form>
        </div>
    )

};

export default UserProfile;