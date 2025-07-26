import React, {FC} from "react";
import Thread from "../routes/thread/Thread";
import { ThreadPointsBarProps } from "./ThreadPointsBar";
import { point } from "slate";
import { FontAwesomeIcon,  } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import "./ThreadPointsInline.css"
import { gql, useMutation } from "@apollo/client";

const UpdateThreadItemPoint = gql`
    mutation UpdateThreadItemPoint(
        $userId: ID!
        $threadItemId: ID!
        $increment: Boolean!
    ){
        updateThreadItemPoint(
            userId: $userId
            threadItemID: $threadItemId
            increment: $increment
        )    
    }
`;

class ThreadPointsInlineProps{
    points : number = 0;
    userId?: string;
    threadId?: string;
    threadItemId?: string;
    allowUpdatePoints?: boolean ;
    refreshThread?: ()=>void;

}
export const ThreadPointsInline : FC<ThreadPointsInlineProps> = ({
    points = 0,
    userId,
    threadId,
    threadItemId,
    allowUpdatePoints =true,
    refreshThread, 
}) => {
        const [execThreadItemPoint] = useMutation(UpdateThreadItemPoint);
        const onClickIncThreadItemPoint = async (
            e: React.MouseEvent<SVGSVGElement, MouseEvent>
        ) =>{
            e.preventDefault();
            await execThreadItemPoint({
                variables: {
                    userId,
                    threadItemId,
                    increment: true,
                }
            });
            refreshThread && refreshThread();
        };

        const onClickDecThreadItemPoint = async(
            e: React.MouseEvent<SVGSVGElement, MouseEvent>
        )=>{
            e.preventDefault();
            await execThreadItemPoint({
                variables:{
                    userId,
                    threadItemId,
                    increment: false,
                }
            });
            refreshThread && refreshThread();
        }
        const {width} = useWindowDimensions();
        return (
            <span className="threadpointsinline-item">
                <div
                className="threadpointsinline-item-btn"
                style = {{display: `${allowUpdatePoints? "block" : "none"}`}}>
                    <FontAwesomeIcon 
                        icon = {faChevronUp}
                        className = "point-icon"
                        onClick={onClickIncThreadItemPoint}
                    />
                </div>
                {points}
                <div 
                className = "threadpointsinline-item-btn"
                style={{display : `${allowUpdatePoints? "block" : "none"}`}}
                >
                    <FontAwesomeIcon
                    icon = {faChevronDown}
                    className="point-icon"
                    onClick = {onClickDecThreadItemPoint}
                    />
                </div>
                <div className="threadpointsinline-item-btn">
                    <FontAwesomeIcon
                    icon = {faHeart}
                    className="points-icon"
                    />
                </div>
            </span>
        )
    }

export default ThreadPointsInline;