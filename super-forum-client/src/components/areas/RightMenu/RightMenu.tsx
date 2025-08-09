import React, {useState, useEffect, JSX} from "react";
import { useWindowDimensions } from "../../../hooks/useWindowDimensions";
import { getTopCategories } from "../../../services/DataService";
import TopCategory from "./TopCategory";
import { groupBy } from "lodash";
import { gql, useQuery } from "@apollo/client";
import "./RightMenu.css";
const GetTopCategoryThread = gql`
  query getTopCategoryThread {
    getTopCategoryThread {
      threadId
      categoryId
      categoryName
      title
    }
  }
`;
const RightMenu = () => {
    const {width} = useWindowDimensions();
    const {data: categoryThreadData} = useQuery(GetTopCategoryThread);
    const [topCategories, setTopCategories] = useState<Array<JSX.Element> | undefined>();
    useEffect(()=>{
        if(categoryThreadData && categoryThreadData.getTopCategoryThread){

            const TopCatThreads = groupBy(categoryThreadData.getTopCategoryThread, "categoryName");
            const TopElemenst = [];
            for (let key in TopCatThreads){
                const currentTop = TopCatThreads[key];
                TopElemenst.push(<TopCategory key = {key} topCategories={currentTop}/>);
            }
            setTopCategories(TopElemenst);
            console.log("Top elements: ", {TopElemenst})
        }

    }, [])
    if(width < 768){
        return null;
    }
    return <div className="rightmenu rightmenu-container ">{topCategories}</div>;
};

export default RightMenu;