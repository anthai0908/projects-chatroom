import React, {FC, JSX, useEffect, useState} from "react";
import ThreadItem from "../../../models/ThreadItem";
import ThreadResponse from "./ThreadResponse";

interface ThreadResponseBuilderProps {
    threadItems?: Array<ThreadItem>,
    readOnly: boolean
    refreshThread: ()=>void;
}

const ThreadResponseBuilder : FC<ThreadResponseBuilderProps> = ({
    threadItems,
    readOnly, 
    refreshThread
}) => {
    const [responseElements, setResponseElements] = useState<JSX.Element | undefined>();

    useEffect(()=>{
        console.log("threadItems is", threadItems)
        if (threadItems) {
            const thResponses = threadItems.map((ti) =>{
                console.log(ti.body)
                return (
                    <li key = {`thr-${ti.id}`}>
                        <ThreadResponse
                        body={ti.body}
                        userName = {ti.user?.userName}
                        lastModifiedOn={ti.createdOn}
                        points = {ti.points}
                        readOnly = {readOnly}
                        threadItemId = {ti?.id || "0"}
                        threadId={ti.thread.id}
                        refreshThread={refreshThread}/>
                    </li>
                );
            });
            setResponseElements(<ul>{thResponses}</ul>);
        }
    }, [threadItems, readOnly])
    return(
        <div className="thread-body-container">
            <strong style = {{marginBottom: "0.75em"}}>Response</strong>
            {responseElements}
        </div>
    )
};
export default ThreadResponseBuilder;