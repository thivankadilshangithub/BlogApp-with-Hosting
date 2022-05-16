import './App.css';
import Header from './components/Header';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Auth from './components/Auth';
import Blogs from './components/Blogs';
import UserBlog from './components/UserBlog';
import BlogDetail from './components/BlogDetail';
import AddBlog from './components/AddBlog';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { authActions } from './store';
import Home from './components/Home';

function App() {

  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state=> state.isLoggedIn);
  console.log(isLoggedIn);

  useEffect(() => {
    if(localStorage.getItem("userId"))
    {
        dispatch(authActions.login());
    }
  }, [dispatch]);

  return (
    <React.Fragment>
      <header>
      <Header />
      </header>
   
    <main>
    <Routes>
     {  !isLoggedIn ? <> <Route path='/auth' element={<Auth />} />
     <Route path='/' element={<Home />} /> </>
     :
     <>
      <Route path='/blogs' element={<Blogs />} />
      <Route path='/blogs/add' element={<AddBlog />} />
      <Route path='/myBlogs' element={<UserBlog />} />
      <Route path='/myBlogs/:id' element={<BlogDetail />} /> 
      <Route path='/api' element={<Home />} />
    </>
     }
     </Routes>
    </main>
    </React.Fragment>
  )
}

export default App;
