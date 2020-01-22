import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom'
import Search from "./Search";

function SearchForm() {

    const [search, setSearch] = useState("");

    return (
        <div className="searchForm">
            <form onSubmit={(e) => {
                e.preventDefault();
                console.log("Searching for user ", search);
                return <Redirect to={"/search/" + search} />
            }}>
                <input
                    type="text"
                    name="search"
                    value={search}
                    onChange={(e) => { setSearch(e.target.value) }}
                />
                <Link to={"/search/" + search}>Search</Link>
            </form>
        </div>
    );
}

export default SearchForm;
