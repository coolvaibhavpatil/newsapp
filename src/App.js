import './App.css';
import NavBar from './Components/NavBar';
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar'
import React, { Component } from 'react'
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import { useState } from 'react';

const App = () => {
  const pageSize = 8;
  const apiKey = process.env.REACT_APP_NEWS_API;

  const [progress,setProgress] = useState(0)

    return (
      <div >
        <Router>
            <NavBar/>
            <LoadingBar
              color='#f11946'
              height ={3}
              progress={setProgress}
            />
            <Routes>
                <Route exact path="/" element = {<News setProgress = {setProgress} apiKey = {apiKey} key="general" pageSize = {pageSize} category = "general" country = "in"/>}></Route>
                <Route exact path="/technology" element = {<News setProgress = {setProgress} apiKey = {apiKey} key="technology" pageSize = {pageSize} category = "technology" country = "in"/>}></Route>
                <Route exact path="/business" element = {<News setProgress = {setProgress} apiKey = {apiKey} key="business" pageSize = {pageSize} category = "business" country = "in"/>}></Route>
                <Route exact path="/entertainment" element = {<News setProgress = {setProgress} apiKey = {apiKey} key="entertainment" pageSize = {pageSize} category = "entertainment" country = "in"/>}></Route>
                <Route exact path="/general" element = {<News setProgress = {setProgress} apiKey = {apiKey} key="general" pageSize = {pageSize} category = "general" country = "in"/>}></Route>
                <Route exact path="/health" element = {<News setProgress = {setProgress} apiKey = {apiKey} key="health" pageSize = {pageSize} category = "health" country = "in"/>}></Route>
                <Route exact path="/science" element = {<News setProgress = {setProgress} apiKey = {apiKey} key="science" pageSize = {pageSize} category = "science" country = "in"/>}></Route>
                <Route exact path="/sports" element = {<News setProgress = {setProgress} apiKey = {apiKey} key="sports" pageSize = {pageSize} category = "sports" country = "in"/>}></Route>
            </Routes>
        </Router>
      </div>
    )
} 

export default App