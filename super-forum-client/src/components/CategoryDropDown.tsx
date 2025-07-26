import { useSelector } from "react-redux";
import Category from "../models/Category";
import { FC } from "react";
import { Appstate } from "../store/AppState";
import { useState, useEffect } from "react";
import { Option } from "react-dropdown";
import { useNavigate } from "react-router-dom";
import DropDown from "react-dropdown";
const defaultLabel = "Select a category";
const defaultOption = {
    value: "0",
    label: defaultLabel,
};
class CategoryDropdownProps{
    sendOutSelectedCategory?: (cat: Category) => void;
    navigate?: boolean = false;
    preselectedCategory?: Category;
}

const CategoryDropDown : FC<CategoryDropdownProps> = ({
    sendOutSelectedCategory,
    navigate,
    preselectedCategory,
}) => {
    const categories = useSelector((state: Appstate)=> {
        return state.categories;
    });
    const [categoryOptions, setCategoryOptions] = useState<Array<string |Option>>([defaultOption]);
    const [selectedOption, setSelectedOption] = useState<Option>(defaultOption);
    const usenavigate = useNavigate();
    useEffect(
        () => {
            if(categories){
                const catOptions: Array<Option> = categories.map((cat: Category)=> {
                    return {
                        value: cat.id,
                        label: cat.name,
                    };
                });
                setCategoryOptions(catOptions);
                setSelectedOption({
                    value: preselectedCategory? preselectedCategory.id : "0",
                    label: preselectedCategory? preselectedCategory.name : defaultLabel
                });
            }            
        }
    , [categories, preselectedCategory]);
    const onChangeDropDown = (selected: Option) =>{
        setSelectedOption(selected);
        if(sendOutSelectedCategory){
            sendOutSelectedCategory(new Category(selected.value, selected.label?.valueOf().toString()?? ""))
        }
        if(navigate){
            usenavigate(`/categoryThreads/${selected.value}`);
        }
    };
    return (
            <DropDown className="thread-category-dropdown"
                      options={categoryOptions}
                      onChange={onChangeDropDown}
                      value={selectedOption}
                      placeholder = {defaultLabel}
            />
        );
}
export default CategoryDropDown;