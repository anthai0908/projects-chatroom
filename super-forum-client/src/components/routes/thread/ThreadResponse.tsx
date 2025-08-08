import React, {FC} from "react";
import RichEditor from "../../editor/RichTextEditor";
import ThreadPointsInline from "../../points/ThreadPointsInline";
import UserNameAndTime from "./UserNameAndTime";
import { gql } from "@apollo/client";

interface ThreadResponseProps {
    body?: string,
    userName: string,
    lastModifiedOn? : Date,
    points: number;
    readOnly: boolean
    userId: string;
    threadItemId: string;
}

const ThreadResponse : FC <ThreadResponseProps> = ({
    body,
    userName,
    lastModifiedOn,
    points,
    readOnly, 
    userId,
    threadItemId

}) => {
    return (
        <div> 
            <div>
                <UserNameAndTime userName= {userName} lastModifiedOn={lastModifiedOn}/>
                {threadItemId}
                <span style={{marginLeft: "1em"}}>
                    <ThreadPointsInline points={points} threadItemId = {threadItemId} />
                </span>
            </div>
            <div className = "thread-body-editor">
                <RichEditor existingBody={body} readOnly = {readOnly} /> 
            </div>
        </div>
        
    )
};
export default ThreadResponse;