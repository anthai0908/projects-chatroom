
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import React, {FC} from "react";
import { faHeart, faReplyAll } from "@fortawesome/free-solid-svg-icons";

export interface ThreadPointsBarProps {
    points?: number;
    responseCount?: number;
}

const ThreadPointsBar : FC<ThreadPointsBarProps> = ({
    points,
    responseCount,
}) => {
    const {width} = useWindowDimensions();
    if(width > 768) {
        return (
            <div className ="threadcard-points">
                <div className="threadcard-points-item">
                    {points|| 0}
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