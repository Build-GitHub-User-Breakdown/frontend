import React, { useState, useEffect } from 'react';
import axios from "axios";
import SearchResult from "./SearchResult";

function ListSearchResults(props) {

    const [results, setResults] = useState([]);

    useEffect(() => {
        axios
            .get(`https://api.github.com/search/users?q=${props.searchTerm}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
            .then((res) => {
                console.log("Successfully got search results", res.data);
                setResults(res.data.items);
            })
            .catch((err) => {
                console.error("Could not get search results", err)
                return;
            })
    }, [props.searchTerm])

    return (
        <div className="searchResults">
            {results.map((result) => {
                return <SearchResult result={result} />
            })}
        </div>
    );
}

export default ListSearchResults;
