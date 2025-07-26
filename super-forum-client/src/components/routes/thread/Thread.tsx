import React, {useEffect, useState, useReducer} from "react";
import {useParams} from "react-router-dom";
import "./Thread.css";
import ThreadHeader from "./ThreadHeader";
import ThreadCategory from "./ThreadCategory";
import ThreadTitle from "./ThreadTitle";
import ThreadModel from "../../../models/Thread";
import { getThreadById } from "../../../services/DataService";
import Nav from "../../areas/Nav";
import ThreadBody from "./ThreadBody";
import ThreadResponseBuilder from "./ThreadResponseBuilder";
import ThreadPointsBar from "../../points/ThreadPointsBar";
import Category from "../../../models/Category";
import { useSelector } from "react-redux";
import { Appstate } from "../../../store/AppState";
import { gql, useLazyQuery } from "@apollo/client";
const GetThreadById = gql`
    query GetThreadById($id: ID!){
        getThreadById(id: $id){
            ... on EntityResult{
                messages
            }
            ... on Thread {
                id
                user {
                    id
                    userName
                }
                lastModifiedOn
                title
                body
                points
                category {
                    id
                    name
                }
                threadItems {
                    id
                    body
                    points
                    user {
                        id
                        userName
                    }
                }
            }
        }
    }
`
const threadReducer = (state: any, action: any)=>{
    switch (action.type){
        case "userId":
            return {...state, userId: action.payload};
        case "category":
            return {...state, category: action.payload};
        case "title":
            return {...state, title: action.payload};
        case"body":
            return {...state, body: action.payload};
        case "bodyNode":
            return {...state, bodyNode: action.payload};
        default: 
            throw new Error("Unknown action type");
    }
}

const Thread = ()=> {
    const [execGetThreadById, {data: threadData}] = useLazyQuery(GetThreadById,{
        fetchPolicy: "no-cache",
    });
    const [thread, setThread] = useState<ThreadModel | undefined>();
    const [readOnly, setReadOnly] = useState(false);
    const refreshThread = async () =>{
        if(id && Number(id)> 0){
            await execGetThreadById({
                variables: {
                    id,
                }
            })
        }
    }
    const {id} = useParams();
    const user = useSelector((state: Appstate)=> {
        return state.user;
    })
    const [{userId, category, title, bodyNode }, threadReduceDispatch] = useReducer(threadReducer, {
        userId: user? user.id : "0",
        category: undefined, 
        title: "",
        body: "",
        bodyNode: undefined



    })
    const receiveSelectedCategory = (cat: Category) =>{
        threadReduceDispatch({
            type: "category",
            payload: cat
        })
    }
    useEffect(() => {
        if (id && Number(id) >0){
            execGetThreadById({
                variables: {
                    id,
                },
            })
        }
    }, [id, execGetThreadById]);

    useEffect(()=>{
        if (threadData && threadData.getThreadById){
            console.log("thread is", threadData.getThreadById)
            setThread(threadData.getThreadById);
            setReadOnly(true);
        }
        else{
            setThread(undefined);
            setReadOnly(false);
        }
    })
    return (
        <div className="screen-root-container">
            <div className="thread-nav-container">
                <Nav/>
            </div>
            <div className="thread-content-container">
                <div className="thread-content-post-container">
                    <ThreadHeader 
                    userName={thread?.user.userName} 
                    lastModifiedOn={thread?thread.lastModifiedOn: new Date()}
                    title = {thread?.title}/>

                    <ThreadCategory
                    category = {thread?.category}
                    sendOutSelectedCategory = {receiveSelectedCategory}/>

                    <ThreadTitle title = {thread?.title}/>
                    <ThreadBody body = {thread?.body} readOnly = {readOnly}/>
               </div>
                <div className="thread-content-points-container">
                    <ThreadPointsBar
                    points = {thread?.points || 0}
                    responseCount = {thread && thread.threadItems && thread.threadItems.length}
                    userId= {thread?.user.id || "0"}
                    threadId={thread?.id || "0"}
                    allowUpdatePoints = {true}
                    refreshThread={refreshThread}/>
                </div>
            </div>
            
            <div className="thread-content-response-container">
                <hr className="thread-section-divider"></hr>
                <ThreadResponseBuilder threadItems= {thread?.threadItems} readOnly = {readOnly}/>
            </div>
            
        </div>
    );
};
export default Thread;