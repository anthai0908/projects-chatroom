import React, { JSX, useEffect, useState } from "react";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import Category from "../../models/Category";
import { getCategories } from "../../services/DataService";
import {gql, useQuery} from "@apollo/client"
import { Link } from "react-router-dom";
import "./LeftMenu.css"
const GetAllCategories = gql`
    query getAllCategories{
    getAllCategories{
    id
    name
    }
}
`;
const LeftMenu = () => {
    const {loading, error, data} = useQuery(GetAllCategories);
    const {width} = useWindowDimensions();
    const [categories, setCategories] = useState<JSX.Element>(
        <div>Left Menu</div>
    );
   

    useEffect(()=>{
        if(loading){
            setCategories(<span>Loading...</span>);
        }
        else if(error){
            setCategories(<span>Error occurred loading categories...</span>);
        }
        else{
            if (data && data.getAllCategories){
                console.log("data is ",data.getAllCategories)
            const cats = data.getAllCategories.map((cat: any) => {
                    return <li className="category-list" key = {cat.id}>
                        <Link to={`/categoryThreads/${cat.id}`}>
                            {cat.name}
                        </Link>
                    </li>
                });
                setCategories(<ul className="category">{cats}</ul>);
            }
        }
    }, [data]);
    if (width < 768){
        return null;
    }
    return <div className="leftmenu">{categories}</div>;
};

export default LeftMenu;