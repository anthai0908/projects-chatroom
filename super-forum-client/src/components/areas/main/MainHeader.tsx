import React, {FC} from "react";
import Category from "../../../models/Category";
import "./MainHeader.css";

interface MainHeaderProps {
    category? : Category;
}

const MainHeader : FC<MainHeaderProps> = ({category}) => {
    return <div className="main-header">
                <div
                    className="title-bar">
                    <strong>{category?.name || "PlaceHolder"}</strong>
                </div>
            </div>
}

export default MainHeader;