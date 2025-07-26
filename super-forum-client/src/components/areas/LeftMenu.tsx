import React, { JSX, useEffect, useState } from "react";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import Category from "../../models/Category";
import { getCategories } from "../../services/DataService";
import {gql, useQuery} from "@apollo/client"
import { Link } from "react-router-dom";
import "./LeftMenu.css"
import { useSelector } from "react-redux";
import { Appstate } from "../../store/AppState";

const LeftMenu = () => {
    const categoriesState = useSelector((state: Appstate)=> {
        return state.categories;
    }) 
    const {width} = useWindowDimensions();
    const [categories, setCategories] = useState<JSX.Element>(
        <div>Left Menu</div>
    );
   

    useEffect(()=>{
        if (categoriesState){
            const cats = categoriesState.map((cat: any) => {
                return <li className="category-list" key = {cat.id}>
                    <Link to={`/categoryThreads/${cat.id}`}>
                        {cat.name}
                    </Link>
                </li>
            });
            setCategories(<ul className="category">{cats}</ul>);
        }
        
    }, [categoriesState]);
    if (width < 768){
        return null;
    }
    return <div className="leftmenu">{categories}</div>;
};

export default LeftMenu;