import React, { useEffect, useState } from "react";
import MainHeader from "./MainHeader";
import { useNavigate, useParams } from "react-router-dom";
import ThreadCard from "./threadCard";
import Category from "../../../models/Category";
import Thread from "../../../models/Thread";
import { gql, useLazyQuery } from "@apollo/client";
import { useWindowDimensions } from "../../../hooks/useWindowDimensions";

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
`;

const GetThreadsByCategoryId = gql`
  query getThreadsByCategoryId($categoryId: ID!) {
    getThreadsByCategoryId(categoryId: $categoryId) {
      ... on EntityResult {
        messages
      }
      ... on ThreadArray {
        threads {
          id
          title
          body
          views
          points
          user {
            userName
          }
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
`;

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
          points
          user {
            userName
          }
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
`;

const Main = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState<Category | undefined>();
  const [threads, setThreads] = useState<Thread[]>([]);
  const [execGetThreadsByCat, { data: threadsByCatData, refetch: refetchByCat }] = useLazyQuery(GetThreadsByCategoryId);
  const [execGetThreadsLatest, { data: threadsLatestData, refetch: refetchLatest }] = useLazyQuery(GetThreadsLatest);

  const refreshThreadList = async () => {
  if (categoryId && Number(categoryId) > 0) {
    const { data } = await refetchByCat?.({ categoryId }); 
    const threads = data?.getThreadsByCategoryId?.threads ?? [];
    setThreads(threads.map((t : Thread) => ({ ...t }))); 
  } else {
    const { data } = await refetchLatest?.();
    const threads = data?.getThreadsLatest?.threads ?? [];
    setThreads(threads.map((t : Thread) => ({ ...t })));
  }
};
const navigate = useNavigate();
  useEffect(() => {
    if (categoryId && Number(categoryId) > 0) {
      execGetThreadsByCat({ variables: { categoryId } });
    } else {
      execGetThreadsLatest();
    }
  }, [categoryId, ]);

  useEffect(() => {
    if (threadsByCatData?.getThreadsByCategoryId?.threads) {
      const threads = threadsByCatData.getThreadsByCategoryId.threads;
      setCategory(threads[0]?.category);
      setThreads([...threads]);
    } else if (categoryId) {
      setCategory(new Category(categoryId, "This category has no thread"));
      setThreads([]);
    }
  }, [threadsByCatData]);

  useEffect(() => {
    if (threadsLatestData?.getThreadsLatest?.threads) {
      const threads = threadsLatestData.getThreadsLatest.threads;
      setCategory(new Category("0", "Latest"));
      setThreads([...threads]);
    }
  }, [threadsLatestData]);
  const onclickPostThread = ()=> {
    navigate("/thread");

  }
  return (
    <main className="content">
      <button className="action-btn" style= {{marginLeft: "0.5em"}}onClick={onclickPostThread}>
        Post
      </button>
      <MainHeader category={category} />
      <div>
        {threads.map((thread) => (
          <ThreadCard 
            key={`thread-${thread.id}-${thread.points}`} 
            thread={thread} 
            onRefreshList={refreshThreadList}
          />
        ))}
      </div>
    </main>
  );
};

export default Main;