import React , {FC} from "react";
import "./ThreadCard.css";
import Thread from "../../../models/Thread";
import {Link, useNavigate} from "react-router-dom";
import { faEye, faHeart, faReplyAll } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useWindowDimensions } from "../../../hooks/useWindowDimensions";
import ThreadPointsBar from "../../points/ThreadPointsBar";
import ThreadPointsInline from "../../points/ThreadPointsInline";
interface ThreadCardProps{
    thread: Thread;
}

const ThreadCard : FC<ThreadCardProps> = ({thread}) => {
    const navigate = useNavigate();
    const {width} = useWindowDimensions();
    const onClickShowThread = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        navigate("/thread/" +thread.id);
    };
    const getResponse = (thread: Thread) => {
        if (width <=768){
            return (
                <label style={{marginRight : "0.5em"}}>
                    {thread && thread.threadItems && thread.threadItems.length}
                    <FontAwesomeIcon 
                    icon={faReplyAll}
                    className="points-icon"
                    style={{
                        marginLeft: "0.25em",
                        marginRight: "-0.25em"
                    }}
                    />
                </label>
            )
        }
        return null;
    }
    
    return (
        <section className="panel threadcard-container">
            <div className="threadcard-text-container">
                <div className="content-header">
                    <Link 
                    to={`categorythreads/${thread.category.id}`}
                    className="link-txt">
                        <strong>{thread.category.name}</strong>
                    </Link>
                    <span className="username-header" style = {{marginLeft: "0.5em"}}>
                        {thread.user?.userName}
                    </span>
                </div>
                <div className="question">
                    <div
                    onClick={onClickShowThread}
                    data-thread-id = {thread.id}
                    style={{marginBottom: "0.4em"}}>
                        <strong>{thread.title}</strong>
                    </div>
                    <div
                    className="threadcard-body"
                    onClick = {onClickShowThread}
                    data-thread-id = {thread.id}>
                        <div>{thread.body}</div>
                    </div>
                    <div
                    className="threadcard-footer">
                        <span style={{marginRight: "0.5em"}}>
                            <label>
                                {thread.views}
                                <FontAwesomeIcon 
                                icon={faEye}
                                className="icon-lg"/>
                            </label>
                        </span>
                        <span>
                            <ThreadPointsInline points={thread.points}/>
                            {getResponse(thread)}                    
                        </span>
                    </div>
                </div>
            </div>
            <ThreadPointsBar points={thread.points} responseCount={thread.threadItems.length}/>
        </section>
    );
};
export default ThreadCard;