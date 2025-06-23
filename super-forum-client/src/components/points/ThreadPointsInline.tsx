import React, {FC} from "react";
import Thread from "../routes/thread/Thread";
import { ThreadPointsBarProps } from "./ThreadPointsBar";
import { point } from "slate";
import { FontAwesomeIcon,  } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
export const ThreadPointsInline : FC<ThreadPointsBarProps> = ({points}) => {
            const {width} = useWindowDimensions();
            if (width < 768){
                return (
                    <label style={{
                     marginRight: "0.75em",
                     marginTop: "0.25em",
                    }}>
                     {points || 0}
                     <FontAwesomeIcon icon = {faHeart} className="points-icon" style={{marginLeft: "0.2em"}}/> 
                    </label>
                 );
            }
            return null;
        }

export default ThreadPointsInline;