import React, {FC, JSX, useEffect, useState} from "react";
import ThreadItem from "../../../models/ThreadItem";
import ThreadResponse from "./ThreadResponse";

interface ThreadResponseBuilderProps {
    threadItems?: Array<ThreadItem>,
    readOnly: boolean
}

const ThreadResponseBuilder : FC<ThreadResponseBuilderProps> = ({
    threadItems,
    readOnly
}) => {
    const [responseElements, setResponseElements] = useState<JSX.Element | undefined>();

    useEffect(()=>{
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
                        userId = {ti?.user.id || "0"}
                        threadItemId = {ti?.id || "0"}/>
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