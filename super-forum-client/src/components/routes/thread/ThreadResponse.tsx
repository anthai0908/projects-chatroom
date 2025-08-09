import React, {FC, useEffect, useState} from "react";
import RichEditor from "../../editor/RichTextEditor";
import ThreadPointsInline from "../../points/ThreadPointsInline";
import UserNameAndTime from "./UserNameAndTime";
import { gql, useMutation } from "@apollo/client";
import { useSelector } from "react-redux";
import { Appstate } from "../../../store/AppState";
import {Node} from "slate";
const CreateThreadItem = gql`
    mutation createThreadItem($userId: ID!, $threadId: ID!, $body: String!){
        createThreadItem(userId: $userId, threadId: $threadId, body: $body){
            messages
        }
    }
`;
interface ThreadResponseProps {
    body?: string,
    userName?: string,
    lastModifiedOn? : Date,
    points: number,
    readOnly: boolean,
    threadItemId: string,
    threadId: string,
    refreshThread: () => void;
}

const ThreadResponse : FC <ThreadResponseProps> = ({
    body,
    userName,
    lastModifiedOn,
    points,
    readOnly, 
    threadItemId,
    threadId,
    refreshThread

}) => {
    const user = useSelector((state: Appstate)=> state.user);
    const [execCreateThreadItem] = useMutation(CreateThreadItem);
    const [postMsg, setPostMsg ] = useState("");
    const  [bodyToSave, setBodyToSave] = useState("");

    useEffect(()=> {
        if(body){
            setBodyToSave(body);
        };
    }, [body]);

    const onClickPost = async(
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) =>{
        e.preventDefault();

        if(!user){
            setPostMsg("Please login before adding a respones");
        }
        else if(!threadId){
            setPostMsg("A parent thread must exist before a response can be posted");
        }
        else if(!bodyToSave){
            setPostMsg("Please enter some text");
        }
        else{
            await execCreateThreadItem({
                variables :{
                    userId: user? user.id : "0",
                    threadId,
                    body: bodyToSave
                }
            })
            refreshThread && refreshThread();
        }
    }

    const receiveBody = (body: Node[])=>{
        const newBody = JSON.stringify(body);
        if(bodyToSave!=newBody){
            setBodyToSave(newBody);
        }
    }
    return (
        <div> 
            <div>
                <UserNameAndTime userName= {userName} lastModifiedOn={lastModifiedOn}/>
                {threadItemId}
                {readOnly? (
                    <span style={{marginLeft: "1em", display: "inline-block"}}>
                    <ThreadPointsInline points={points} threadItemId = {threadItemId} refreshThread={refreshThread} allowUpdatePoints = {true} />
                </span>
                ) : null
                }
            </div>
            <div className = "thread-body-editor">
                <RichEditor existingBody={body} readOnly = {readOnly} sendOutBody={receiveBody}/> 
            </div>
            {!readOnly && threadId ? (
                <>
                    <div style={{
                        marginTop: "0.5em"
                    }}>
                        <button className = "action-btn" onClick = {onClickPost}>
                            Post Response
                        </button>
                    </div>
                </>
            ) : null

            }
        </div>
        
    )
};
export default ThreadResponse;