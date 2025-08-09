import React, {useReducer, useEffect, useState, JSX} from "react";
import PasswordComparison from "../../auth/common/PasswordComparison";
import userReducer from "../../auth/common/UserReducer";
import "./UserProfile.css";
import Nav from "../../areas/Nav";
import { UseSelector } from "react-redux";
import { Appstate } from "../../../store/AppState";
import { Link } from "react-router-dom";
import ThreadItem from "../../../models/ThreadItem";
import { useSelector } from "react-redux";
import Thread from "../../../models/Thread";
import { gql, useMutation } from "@apollo/client";
const changePassword = gql`
mutation changePassword($newPassword: String!){
    changePassword(newPassword: $newPassword)
}
`
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
    const [execChangePassword] = useMutation(changePassword);
    function getTextFromNodes(nodes: any): string {
        if (!nodes) return '';
        if (Array.isArray(nodes)) return nodes.map(getTextFromNodes).join('');
        if (typeof nodes === 'object') {
          if (typeof nodes.text === 'string') return nodes.text;
          if (Array.isArray(nodes.children)) return nodes.children.map(getTextFromNodes).join('');
        }
        return '';
    }

function safeParseMaybeSlate(input: unknown): any | null {
  if (typeof input !== 'string') return input as any;
  const s = input.trim();

  try { return JSON.parse(s); } catch {}

  try {
    const once = JSON.parse(s);
    if (typeof once === 'string') {
      return JSON.parse(once);
    }
  } catch {}

  return null;
}

function extractBodyText(body: unknown): string {
  const parsed = safeParseMaybeSlate(body);
  if (parsed == null) return String(body ?? '');
  return getTextFromNodes(parsed);
}
    useEffect(()=>{
        console.log("user", user);
        if(user){
            dispatch({
                type: "userName",
                payload: user.userName,
            });
            const threadList = user.threads?.map((thr: Thread) =>{
                return (
                    <li key = {`user-th-${thr.id}`}>
                        <Link to = {`/thread/${thr.id}`} className ="userprofile-link">
                        {thr.title}
                        </Link>
                    </li>
                );
            });
            setThreads(!user.threads || user.threads.length ===0 ? undefined : <ul>{threadList}</ul>);
                const threadItemList = user.threadItems?.map((ti: ThreadItem) => {
                  const bodyText = extractBodyText(ti.body);
                  const preview = bodyText.length <= 40 ? bodyText : bodyText.slice(0, 40) + '…';

                  return (
                    <li key={`user-th-${ti.thread.id}`}>
                      <Link to={`/thread/${ti.thread.id}`} className="userporfile-link">
                        {preview}
                      </Link>
                    </li>
                  );
                });
              
                setThreadItems(<ul>{threadItemList}</ul>);
        }
    }, [user])
    const onClickChangePassword = async(
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        const {data: changePasswordData} = await execChangePassword({
            variables : {
                newPassword: password
            }
        });
        dispatch({
            type: "resultMsg",
            payload: changePasswordData? changePasswordData.changePassword : ""
        });
    };
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
                        <button className ="action-btn" disabled = {isSubmitDisabled} onClick={onClickChangePassword}>
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