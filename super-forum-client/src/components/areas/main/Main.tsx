import React, {JSX, useEffect, useState} from "react";
import MainHeader from "./MainHeader";
import { useParams } from "react-router-dom";
import ThreadCard from "./threadCard";
import { getThreadByCategory } from "../../../services/DataService";
import Category from "../../../models/Category";


const Main = () => {
    const {categoryId} =  (useParams());
    const [category, setCategory] = useState<Category |undefined>();
    const [threadCard, setThreadCard] =useState<Array<JSX.Element> |null>(null);
    useEffect(()=>{
        console.log("main categoryId", categoryId);
        if(categoryId && Number(categoryId) >0){
            getThreadByCategory(categoryId).then((threads)=>{
                const cards = threads.map((thread) => {
                    return <ThreadCard thread={thread} key={`thread-${thread.id}`}/> 
                });
                if (!category){
                    setCategory(threads[0].category)
                }
                setThreadCard(cards)
            });

        }
    }, [categoryId]);
    return (
        <main className="content">
            <MainHeader category={category}/>
            <div>
                {threadCard}
            </div>
        </main>
    )
};  
export default Main;