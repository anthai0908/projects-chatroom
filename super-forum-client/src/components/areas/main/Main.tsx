import React, {JSX, useEffect, useState} from "react";
import MainHeader from "./MainHeader";
import { useParams } from "react-router-dom";
import ThreadCard from "./threadCard";
import { getThreadByCategory } from "../../../services/DataService";
import Category from "../../../models/Category";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { string } from "slate";
const GetThreadsByCategoryId = gql`
    query getThreadsByCategoryId($categoryId: ID!){
        getThreadsByCategoryId(categoryId: $categoryId){
            ... on EntityResult{
                messages
            }
            ... on ThreadArray{
                threads{
                    id
                    title
                    body 
                    views
                    threadItems{
                        id
                    }
                    category {
                        id
                        name
                    }
                }
            }
        }
    }
`
const GetThreadsLatest = gql`
    query getThreadsLatest {
        getThreadsLatest {
            ... on EntityResult {
                messages
            }
            ... on ThreadArray {
                threads {
                    id
                    title
                    body
                    views
                    threadItems {
                        id
                    }
                    category {
                        id
                        name
                    }
                }
            }
        }
    }
`
const Main = () => {
    const [execGetThreadsByCat, {data: threadsByCatData}] = useLazyQuery(GetThreadsByCategoryId);
    const [execGetThreadsLatest, {data: threadsLatestData}] = useLazyQuery(GetThreadsLatest); 
    const {categoryId} =  (useParams());
    console.log("categoryId is: ", categoryId)
    const [category, setCategory] = useState<Category |undefined>();
    const [threadCard, setThreadCard] =useState<Array<JSX.Element> |null>(null);
    useEffect(()=>{
        if(categoryId && Number(categoryId) >0){
            console.log("data is", threadsByCatData)
            execGetThreadsByCat({
                variables:{
                    categoryId,
                }
            });
        }
        else{
            execGetThreadsLatest();
        }
    }, [categoryId]);
    useEffect(()=>{
        if(
            threadsByCatData &&
            threadsByCatData.getThreadsByCategoryId && 
            threadsByCatData.getThreadsByCategoryId.threads
        ){
            const threads = threadsByCatData.getThreadsByCategoryId.threads;
            if(threads){
                const cards = threads.map((th: any)=> {
                return <ThreadCard key = {`thread-${th.id}`} thread={th}/>;
                });
                setCategory(threads[0].category);
                setThreadCard(cards);
            }
        }
        else{
            setCategory(new Category(categoryId!, "This category has no thread"))
            setThreadCard([]);
        }
    }, [threadsByCatData]);
    useEffect(()=>{
        if(
            threadsLatestData && 
            threadsLatestData.getThreadsLatest && 
            threadsLatestData.getThreadsLatest.threads
        ){
            const threads = threadsLatestData.getThreadsLatest.threads;
            console.log("latest threads is: ", threads);
            const cards = threads.map((th: any) => {
                return <ThreadCard key={`thread-${th.id}`} thread={th}/>;
            });
            setCategory(new Category("0", "Latest"));
            setThreadCard(cards);
        }
    }, [threadsLatestData])
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