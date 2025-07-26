
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import React, {FC} from "react";
import { faHeart, faReplyAll, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import {gql, useMutation} from "@apollo/client";

const UpdateThreadPoint = gql`
    mutation UpdateThreadPoint(
        $userId: ID!
        $threadId: ID!
        $increment: Boolean!
    ){
        updateThreadPoint(
            userId: $userId
            threadId: $threadId
            increment: $increment
        )
    }
`;
export class ThreadPointsBarProps {
    points?: number = 0;
    responseCount?: number;
    userId?: string;
    threadId?: string;
    allowUpdatePoints?: boolean = false;
    refreshThread?: ()=> void;
}

const ThreadPointsBar : FC<ThreadPointsBarProps> = ({
    points = 0,
    responseCount,
    userId,
    threadId,
    allowUpdatePoints = true,
    refreshThread

}) => {
    const {width} = useWindowDimensions();
    console.log("User Id in thread points bar is: ", userId)
    const [execUpdateThreadPoint] = useMutation(UpdateThreadPoint);
    const onClickIncThreadPoint = (e: React.MouseEvent<SVGSVGElement, MouseEvent>)=>{
        e.preventDefault();
        execUpdateThreadPoint({
            variables : {
                userId,
                threadId,
                increment: true
            }
        });
        refreshThread && refreshThread();
    };

    const onClickDecThreadPoint = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) =>{
        e.preventDefault();
        execUpdateThreadPoint({
            variables: {
                userId,
                threadId,
                increment: false
            }
        });
        refreshThread && refreshThread();
    }
    if(width > 768) {
        return (
            <div className ="threadcard-points">
                <div className="threadcard-points-item">
                    <div
                        className="threadcard-points-item-btn"
                        style={{display: `${allowUpdatePoints ? "block" : "none"}`}}
                        >
                        <FontAwesomeIcon icon={faChevronUp} className="point-icon" onClick={onClickIncThreadPoint}/>
                    </div>
                    {points|| 0}
                    <div
                        className="threadcard-points-item-btn"
                        style={{display: `${allowUpdatePoints ? "block" : "none"}`}}
                        >
                        <FontAwesomeIcon icon={faChevronDown} className="point-icon" onClick={onClickDecThreadPoint}/>
                    </div>
                    <br></br>
                    <FontAwesomeIcon icon ={faHeart} className="points-icon"/>
                </div>
                <div 
                className="threadcard-points-item"
                style ={{marginBottom: "0.75em"}}>
                    {responseCount}
                    <br/>
                    <FontAwesomeIcon icon = {faReplyAll} className="points-icon"/>
                </div>
            </div>
        );
    }
    return null;
}
export default ThreadPointsBar;