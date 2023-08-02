import logo from "./logo.svg";
import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/";
import Page1 from "./pages/Page1/Page1";
import axios from 'axios';
import React, { useState, useEffect } from "react";

const App = (props) => {
    const id = [1, 2]
    const news_response = {
        "news_id": []
    };
    const [news_id, setNews_id] = useState(['']);
    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:7000/news/id',
        })
            .then((result) => {
                setNews_id(result.data)
            })
            .catch((err) => { console.error(err) })
    }, [])
    news_id.forEach(function (item) {
        news_response["news_id"].push(item)
    });

     const pagesbar = (
            <Routes>
                <Route exact path="/" element={<Home />} />
             {news_response.news_id.map((post) =>
                 <Route path={"/" + post.toString()} element={<Page1 id={post}/>} />
                )}

            </Routes>
        );
     
  return (
    <HashRouter>
          {pagesbar}
    </HashRouter>
  );
};

export default App;
