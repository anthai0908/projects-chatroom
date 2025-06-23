import React, {FC} from "react";
import RichEditor from "../../editor/RichTextEditor";
import ThreadPointsInline from "../../points/ThreadPointsInline";
import UserNameAndTime from "./UserNameAndTime";
interface ThreadResponseProps {
    body?: string,
    userName: string,
    lastModifiedOn? : Date,
    points: number;
}

const ThreadResponse : FC <ThreadResponseProps> = ({
    body,
    userName,
    lastModifiedOn,
    points,
}) => {
    return (
        <div> 
            <div>
                <UserNameAndTime userName= {userName} lastModifiedOn={lastModifiedOn}/>
                <ThreadPointsInline points={points} />
            </div>
            <div>
                <div className = "thread-body-container">
                    <RichEditor existingBody={body} /> 
                </div>
            </div>
        </div>
        
    )
};
export default ThreadResponse;