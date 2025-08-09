import React, {useEffect, useState, useReducer} from "react";
import {useNavigate, useParams} from "react-router-dom";
import "./Thread.css";
import ThreadHeader from "./ThreadHeader";
import ThreadCategory from "./ThreadCategory";
import ThreadTitle from "./ThreadTitle";
import ThreadModel from "../../../models/Thread";

import Nav from "../../areas/Nav";
import ThreadBody from "./ThreadBody";
import ThreadResponseBuilder from "./ThreadResponseBuilder";
import ThreadPointsBar from "../../points/ThreadPointsBar";
import Category from "../../../models/Category";
import { useSelector } from "react-redux";
import { Appstate } from "../../../store/AppState";
import { gql, useLazyQuery } from "@apollo/client";
import ThreadPointsInline from "../../points/ThreadPointsInline";
import { useWindowDimensions } from "../../../hooks/useWindowDimensions";
import { useMutation } from "@apollo/client";
import { Node } from "slate";
import { getTextFromNodes } from "../../editor/RichTextEditor";
import ThreadResponse from "./ThreadResponse";
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
                    thread{
                        id
                    }
                }
            }
        }
    }
`
const CreateThread = gql`
    mutation createThread($userId: ID!, $categoryId: ID!, $title: String!, $body: String!){
        createThread(
            userId: $userId
            categoryId: $categoryId
            title: $title
            body: $body
        ){
            messages    
        }
    }
`;
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
    const {width} = useWindowDimensions();
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
    const [{userId, category, title, body, bodyNode }, threadReduceDispatch] = useReducer(threadReducer, {
        userId: user? user.id : "0",
        category: undefined, 
        title: "",
        body: "",
        bodyNode: undefined


    
    })
    const [postMsg, setPostMsg] = useState("");
    const [execCreateThread] = useMutation(CreateThread);
    const navigate = useNavigate();
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
        threadReduceDispatch({
            type: "userId",
            payload: user? user.id : "0"
        })
    }, [user]);
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
    }, [threadData]);
    const receiveTitle = (updatedTitle: string) => {
        threadReduceDispatch({
            type: "title", 
            payload: updatedTitle
        })
    }

    const receiveBody = (body: Node[])=>{
        threadReduceDispatch({
            type: "bodyNode",
            payload: body
        });
        threadReduceDispatch({
            type: "body",
            payload: getTextFromNodes(body)
        })
    }
    const onClickPost = async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault();
        if(!userId || userId === "0"){
            setPostMsg("You must be logged in before you can post.");
        }
        else if(!category){
            setPostMsg("Please select a category for your post");
        }
        else if(!title){
            setPostMsg("Please enter a title");
        }
        else if(!bodyNode){
            setPostMsg("Please select a category for your post");
        }
        else{
            setPostMsg("");
            const newThread = {
                userId,
                categoryId: category?.id,
                title,
                body: JSON.stringify(bodyNode), /// check whether to remove or not
            };
            const {data: createThreadMsg} = await execCreateThread({
            variables: newThread,
            });
            if(
                createThreadMsg.createThread && createThreadMsg.createThread.messages && !isNaN(createThreadMsg.createThread.messages[0])){
                    setPostMsg("Thread posted successfully.");
                    navigate(`/thread/${createThreadMsg.createThread.messages[0]}`);

                }
            else {
                setPostMsg(createThreadMsg.createThread.messages[0]);
            } 
        };
        
    }
    return (
        <div className="screen-root-container">
            <div className="thread-nav-container">
                <Nav/>
            </div>
            <div className="thread-content-container">
                    <div className="thread-content-post-container">
                        {width <=768 && thread ? (
                            <ThreadPointsInline threadId = {thread?.id} points={Number(thread?.points) || 0} refreshThread = {refreshThread} allowUpdatePoints = {true}/>
                        ) : null}
                        

                        <ThreadHeader 
                        userName={thread?.user.userName} 
                        lastModifiedOn={thread?thread.lastModifiedOn: new Date()}
                        title = {thread?.title}/>

                        <ThreadCategory
                        category = {thread?.category}
                        sendOutSelectedCategory = {receiveSelectedCategory}/>

                        <ThreadTitle title = {title || thread?.title || ""} readOnly = {thread? readOnly : false} sendOutTitle={receiveTitle}/>
                        <ThreadBody body = {thread?.body} readOnly = {readOnly} sendOutBody={receiveBody}/>
                        {thread?null : (
                            <>
                                <div style={{marginTop: ".5em"}}>
                                    <button className= "action-btn" onClick={onClickPost}>
                                        Post
                                    </button>
                                </div>
                                <strong>{postMsg}</strong>
                            </>
                        )}
                    </div>
                <div className="thread-content-points-container">
                    <ThreadPointsBar
                    points = {thread?.points || 0}
                    responseCount = {thread && thread.threadItems && thread.threadItems.length}
                    threadId={thread?.id || "0"}
                    allowUpdatePoints = {true}
                    refreshThread={refreshThread}/>
                </div>
            </div>
            {thread? (
                <div className="thread-content-response-container">
                    <hr className="thread-section-divider"/>
                    <div style = {{marginBottom : "0.5em"}}>
                        <strong> Post Response</strong>
                    </div>
                    <ThreadResponse 
                        body=""
                        userName={user?.userName}
                        lastModifiedOn={new Date()}
                        points = {0}
                        readOnly = {false}
                        threadItemId={"0"}
                        threadId = {thread.id}
                        refreshThread={refreshThread}/>
                </div>
            ) : null}
            <div className="thread-content-response-container">
                <hr className="thread-section-divider"></hr>
                <ThreadResponseBuilder threadItems= {thread?.threadItems} readOnly = {readOnly} refreshThread={refreshThread}/>
            </div>
            
        </div>
    );
};
export default Thread;