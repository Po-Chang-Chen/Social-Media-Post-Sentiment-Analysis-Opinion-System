import React, { useState,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import "./page1.css";
const Page1 = ({ id}) => {
    const comment_response = {
        "commnent_id": [],
        "label": [],
        "comment_content": []
    }
    const news_response = {
        "news_id": [],
        "news_title": [],
        "news_content": []
    };
    var votes = {"0":[50,40,60,40,20],"1":[30,20,30,45,50],"2":[20,40,10,15,30]}
    const navigate = useNavigate();
    const [label, setLabel] = useState(['']);
    const [title, setNews_title] = useState(['']);
    const [news_content, setNews_content] = useState(['']);
    const [news_id, setNews_id] = useState(['']);
    var p = (votes["0"][id-1] / (votes["0"][id-1]+ votes["1"][id-1]+votes["2"][id-1])) * 100;
    var n = (votes["1"][id-1] / (votes["0"][id-1] + votes["1"][id-1] + votes["2"][id-1])) * 100;
    var m = (votes["2"][id - 1] / (votes["0"][id - 1] + votes["1"][id - 1] + votes["2"][id - 1])) * 100;
    var c = 50;
    var b = 40;
    let a;
    if (p > n && n>m) { a = "正面"; }
    else if (p > n && n == m) { a = "正面"; }
    else if (p == n && n> m) { a = "中立"; }
    else if (p == m && m> n) { a = "正面"; }
    else if (p > m && m> n) { a = "正面"; }
    else if (n > p && p> m) { a = "反面"; }
    else if (n > m && m> p) { a = "反面";; }
    else if (n == m  && m > p) { a = "反面";; }
    else if (n > p && p== m) { a = "反面";; }
    else if (m > p && p> n) { a = "中立"; }
    else if (m > n && n> p) { a = "中立"; }
    else if (m > p && p== n) { a = "中立"; }
  
    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:7000/comments/label',
        })
            .then((result) => {setLabel(result.data)
            })
            .catch((err) => { console.error(err) })
    }, [])
    label.forEach(function (item) {
        comment_response["label"].push(item)
    });
    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:7000/news/content',
        })
            .then((result) => {
                setNews_content(result.data)
            })
            .catch((err) => { console.error(err) })
    }, [])
    news_content.forEach(function (item) {
        news_response["news_content"].push(item)
    });
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
   const titlebar = (
          < div >
           <div class="left">
               <h1>{news_response.news_title[id - 1]}</h1>
           </div>
           <div class="right">
               <p>{news_response.news_content[id - 1]}</p>
           </div>

         </div >
      );
 
  const StyleSheet = {
    width: "100%",
    height: "200px",
    backgroundColor: "black",
  
  };
    return (
        <div style={StyleSheet}>
            
            {titlebar}
            <h1 style={{ color: "white", fontFamily: "Microsoft JhengHei",position: "absolute", top: "200px", left: "195px", zIndex: 3}}>
                {a}
            </h1>
            <button onClick={() => navigate(-1)} style={{ position:"absolute",top:"300px",left:"200px",zIndex:3}}>回首頁</button>
            <body style={{ backgroundColor: "black", color: "white", position: "absolute", top: "350px", left: "120px", zIndex: 3 }}>
                <label for="file">正面</label>
                <progress id="file" value={String(votes["0"][id - 1])} max="100" >  </progress>
                <label for="file">{p}%</label>
            </body>
            <body style={{ backgroundColor: "black", color: "white", position: "absolute", top: "400px", left: "120px", zIndex: 3  }}>
                <label for="file">反面</label>
                <progress id="file" value={String(votes["1"][id - 1])} max="100" >  </progress>
                <label for="file">{n}%</label>
            </body>
            <body style={{ backgroundColor: "black", color: "white", position: "absolute", top: "450px", left: "120px", zIndex: 3  }}>
                <label for="file">中立</label>
                <progress id="file" value={String(votes["2"][id - 1])} max="100" >  </progress>
                <label for="file">{m}%</label>
            </body>
        </div>
       
  );
};

export default Page1;
//result.data.forEach(function (result) { comment_response["label"].push(result.data); });
//<p>{comment_response["label"][0]}</p>
//    <p>{news_response["news_title"][0]}</p>
//    <p>{news_response["news_content"][0]}</p>
//<p style={{ color: "white" }}>{news_response.news_title[id - 1]}</p>
//    <p style={{ color: "white" }}>{news_response.news_content[id - 1]}</p>style={{ zIndex: 2 }}      display: "flex",
/* 水平置中 */
//justifyContent: "center",
    /* 垂直置中 */
  //  alignItems: " center"