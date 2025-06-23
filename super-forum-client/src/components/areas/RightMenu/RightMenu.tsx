import React, {useState, useEffect, JSX} from "react";
import { useWindowDimensions } from "../../../hooks/useWindowDimensions";
import { getTopCategories } from "../../../services/DataService";
import TopCategory from "./TopCategory";
import { groupBy } from "lodash";
import "./RightMenu.css";

const RightMenu = () => {
    const {width} = useWindowDimensions();
    const [topCategories, setTopCategories] = useState<Array<JSX.Element> | undefined>();
    useEffect(()=>{
        getTopCategories().then((res)=>{
            const TopCatThreads = groupBy(res, "category");
            const TopElemenst = [];
            for (let key in TopCatThreads){
                const currentTop = TopCatThreads[key];
                TopElemenst.push(<TopCategory key = {key} topCategories={currentTop}/>);
            }
            setTopCategories(TopElemenst);
        });
    }, [])
    if(width < 768){
        return null;
    }
    return <div className="rightmenu rightmenu-container ">{topCategories}</div>;
};

export default RightMenu;