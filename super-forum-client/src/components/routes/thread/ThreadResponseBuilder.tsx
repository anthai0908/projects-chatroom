import React, {FC, JSX, useEffect, useState} from "react";
import ThreadItem from "../../../models/ThreadItem";
import ThreadResponse from "./ThreadResponse";

interface ThreadResponseBuilderProps {
    threadItems?: Array<ThreadItem>
}

const ThreadResponseBuilder : FC<ThreadResponseBuilderProps> = ({
    threadItems
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
                        userName = {ti.userName}
                        lastModifiedOn={ti.createdOn}
                        points = {ti.points}/>
                    </li>
                );
            });
            setResponseElements(<ul>{thResponses}</ul>);
        }
    }, [threadItems])
    return(
        <div className="thread-body-container">
            <strong style = {{marginBottom: "0.75em"}}>Response</strong>
            {responseElements}
        </div>
    )
};
export default ThreadResponseBuilder;