import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect, withRouter } from 'react-router-dom'
import SearchForm from "./SearchForm";
import ListSearchResults from "./ListSearchResults";

function Search(props) {

    console.log("New search page searching for term ", props.match.params.searchTerm);

    const [searchTerm, setSearchTerm] = useState(props.match.params.searchTerm);

    useEffect(() => {
        setSearchTerm(props.match.params.searchTerm);
    }, [props.match.params.searchTerm])

    return (
        <div className="home">
            <SearchForm />
            <ListSearchResults searchTerm={searchTerm} />
        </div>
    );
}

export default withRouter(Search);
