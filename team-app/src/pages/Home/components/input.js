import React, { Component, useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import $ from 'jquery';
import InputBase from '@mui/material/InputBase';

const AutoComplete = () => {
    const [SearchWords, setSearchWords] = useState("");
    const [SuggsKeywords, setSuggsKeywords] = useState("");
    const [Suggs, setSuggs] = useState([]);
    const [ShowSuggestions, setShowSuggestions] = useState(false);

    useEffect(() => {
        document.addEventListener('mousedown', handleMouseDown);
        return (() => {
            document.removeEventListener('mousedown', handleMouseDown);
        });
    }, [])
    function handleMouseDown(event) {

        let x = $(document).scrollLeft() + event.clientX; // event.offsetX
        let y = $(document).scrollTop() + event.clientY; // event.offsetY

        // did not click on the search input or the suggestion list
        if (ShowSuggestions && !checkXYInElement(x, y, '.searcher-suggs') && !checkXYInElement(x, y, '.searcher-input')) {
            setShowSuggestions(false);
        }
    }
    function checkXYInElement(x, y, className) {
        let elem = $(className);
        if (elem.length == 0) {
            return false;
        }

        let rect = { x: elem.offset().left, y: elem.offset().top, w: elem.outerWidth(), h: elem.outerHeight() };

        if (x < rect.x || y < rect.y || x > (rect.x + rect.w) || y > (rect.y + rect.h)) {
            return false;
        }

        return true;
    }
    function checkSuggsKeywords(keywords) {
        if (SuggsKeywords == encodeURIComponent(keywords.toLowerCase())) {
            return true;

        }
        else {
            return false;
        }
    }

    // check and send request to google for suggestions
    // the request will not send if the input was the same as the suggsKeywords
    // or length equals to 0
    function RequestSuggestions(keywords) {
        // current suggs was request with the input keywords
        // no need to send again
        if (checkSuggsKeywords(keywords)) {
            return;
        }

        // empty keywords just reset the suggsKeywords and suggs
        if (keywords.length == 0) {

            setSuggsKeywords("");
            setSuggs([]);
            return;
        }
        let urlKeywords = encodeURIComponent(keywords.toLowerCase());
        console.log(urlKeywords);
        setSuggsKeywords(urlKeywords);
        console.log('SuggsKeywords0', SuggsKeywords);

        setSuggs([]);

        let url = 'https://suggestqueries.google.com/complete/search?output=chrome&q=' + urlKeywords;
        // use JSONP (issue: http://security.stackexchange.com/questions/23438/security-risks-with-jsonp/23439#23439)
        // just for CORS trick
        $.ajax({
            url: url,
            dataType: 'jsonp',
            type: 'GET',
            success: function (data, textStatus, jqXHR) {
                // data[0] was the keywords to search
                // data[1] was the array of the google suggestion keywords
                //console.log(data);
                setSuggs(data[1]);
            }

        });

    }
    function handleSearcherInputChange(event) {
        let newSearchWords = event.target.value;

        setSearchWords(newSearchWords);
        setShowSuggestions(true);
        RequestSuggestions(newSearchWords);
    }

    // handle user click on the list of the suggestions
    function handleClickSuggetionsKeywords(event) {

        setSearchWords(event.target.textContent);
        setShowSuggestions(false);
        RequestSuggestions(event.target.textContent);
    }

    // handle the onFocus event of the search input
    function handleFocusSearcherInput(event) {
        setShowSuggestions(true);
    }

    // handel the key down event of the search input
    function handleSearcherInputKeyDown(event) {
        if (ShowSuggestions) {
            // use keyboard to select the suggesions
            handleSelectSuggestions(event);
        } else {
            // just show the suggestions list
            setShowSuggestions(true);
        }
    }

    // use use keyboards to select the suggestions
    function handleSelectSuggestions(event) {
        let li = $('.searcher-suggs-word.selected');
        // 40 => down, 38 => up
        if (event.keyCode == 40 || event.keyCode == 38) {
            event.preventDefault();
            if (li.length == 0) {
                $('.searcher-suggs-word:first-child').toggleClass('selected');
            } else if (event.keyCode == 40) {
                li.removeClass('selected');
                li.next().toggleClass('selected');
            } else {
                li.removeClass('selected');
                li.prev().toggleClass('selected');
            }
        } else {
            // 13 => enter
            if (event.keyCode == 13) {
                event.preventDefault();

                if (li.length > 0) {
                    setSearchWords(li.text());
                    setShowSuggestions(false);

                    RequestSuggestions(li.text());
                } else {
                    setShowSuggestions(false);
                }
            }
        }
    }

    // hover event on the suggestions list
    function handleHoverSearcherSuggestions(event) {
        $('.searcher-suggs-word.selected').removeClass('selected');
        $('.searcher-suggs-word:hover').addClass('selected');
    }


    let suggestions = null;
    // we should also check the input search was the same as the suggertions keywords
    if (ShowSuggestions && checkSuggsKeywords(SearchWords)) {
        suggestions = Suggs.map(function (value, index) {
            return (<li key={index} className="searcher-suggs-word" onClick={handleClickSuggetionsKeywords} onMouseOver={handleHoverSearcherSuggestions}>{value}</li>);
        }.bind(this));
    }
    return (
        <div>
            <InputBase
                id="searcher" className="searcher-input" onChange={handleSearcherInputChange} onFocus={handleFocusSearcherInput} onKeyDown={handleSearcherInputKeyDown} value={SearchWords} placeholder="search here..."

            />
            <ul className="searcher-suggs">
                {suggestions}
            </ul>
        </div>
    );

}
export default AutoComplete;