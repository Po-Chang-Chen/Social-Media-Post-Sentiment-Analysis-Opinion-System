import React, { Component, useState ,useEffect} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Liquid from './image/Liquid.png'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { fontSize } from '@mui/system';
import $ from 'jquery';
import './components/input.js';
import AutoComplete from './components/input.js';
import List from './components/list.js';
import axios from 'axios';




const Home = (props) => {
    const news_response = {
        "news_id": [],
        "news_title": [],
        "news_content": []
    };
    const [title, setNews_title] = useState(['']);
    const [news_id, setNews_id] = useState(['']);
    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:7000/news/title',
        })
            .then((result) => {
                setNews_title(result.data)
            })
            .catch((err) => { console.error(err) })
    }, [])
    title.forEach(function (item) {
        news_response["news_title"].push(item)
    });
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

    const navigate = useNavigate();
    const StyleSheet = {
        width: "800px",
        height: "50px",
        position: "fixed",
        top: "100px",
        left: "450px",



    }
    function News(props) {
        const titlebar = (
            <ul style={{position:'absolute',left:'-50pt',top:'0pt'}}>
                <h1 style={{ color: "white", display: "inline", fontSize: "30pt"}}>Ptt八卦版熱搜 </h1>
                {props.posts.map((post) =>
                    <nav style={{  fontSize: "20pt"}}>
                        <Link to={"/" + post.toString()} style={{ color: "white" }}>{news_response.news_title[post-1]}</Link>
                       <span style={{ color: "white",fontWeight:"bold" }}>&#95; </span> 
                </nav>
                        )}
                
            </ul>
        );
        return (
            <div>
                {titlebar}
            </div>
        );
    }


    return (

        <div style={StyleSheet}>
            <img src={Liquid} alt="Liquid" style={{ position: "absolute", weight: "200px", height: "200px", top: -70, left: -300 }} />
            <News posts={news_response.news_id} />
            
        </div>
    )
}
export default Home;

