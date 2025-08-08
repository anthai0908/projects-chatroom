import React, {useEffect} from 'react';
import Nav from './components/areas/Nav';
import SideBar from './components/areas/sidebar/SideBar';
import LeftMenu from './components/areas/LeftMenu';
import Main from './components/areas/main/Main';
import RightMenu from './components/areas/RightMenu/RightMenu';
import './App.css';
import Home from './components/routes/Home';
import { Routes, Route } from 'react-router-dom';
import { useWindowDimensions } from './hooks/useWindowDimensions';
import Thread from './components/routes/thread/Thread';
import { UserProfileSetType } from './store/user/Reducer';
import UserProfile from './components/routes/userProfile/UserProfile';
import { useDispatch } from 'react-redux';
import { gql, useQuery } from '@apollo/client';
import { ThreadCategoriesType } from './store/categories/Reducer';
import UseRefreshReduxMe from './hooks/useRefreshReduxMe';

const GetAllCategories = gql`
  query getAllCategories{
    getAllCategories {
      id
      name
    }
  }
` 
function App() {
  const {data: categoriesData} = useQuery(GetAllCategories);
  const {execMe, updateMe} = UseRefreshReduxMe();
  const dispatch = useDispatch();
  useEffect(() =>{
    execMe();
    
  }, [execMe]);
  useEffect(()=>{
    updateMe();
  }, [updateMe])
  useEffect(()=>{
    if (categoriesData && categoriesData.getAllCategories){
      dispatch({
        type: ThreadCategoriesType,
        payload: categoriesData.getAllCategories,
      })
    }
  }, [dispatch, categoriesData])
  const RenderUserProfile = (props:any) => <UserProfile {...props}/>;
  const RenderHome = (props: any) => <Home {...props} />;
  const RenderThread = (props: any) => <Thread {...props}/>
  return (
    <Routes>
      <Route path="/" element={<RenderHome/>} />
      <Route path ="/categoryThreads/:categoryId" element ={<RenderHome/>}/>
      <Route path = "/thread/:id?" element = {<RenderThread/>}/>
      <Route path = "/userprofile/:id" element = {<RenderUserProfile/>}/>
    </Routes>
  );
}

export default App;
