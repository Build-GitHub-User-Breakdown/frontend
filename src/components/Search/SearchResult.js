import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
const { Meta } = Card;

function SearchResult(props) {

    console.log("SearchResult", props.result)

    return (
        <div className="individualSearchResult">
            <Link to={"/user/" + props.result.login}>
                {/* <img src={props.result.avatar_url} />
                <p>{props.result.login}</p> */}
                <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src={props.result.avatar_url} />}
                >
                    <Meta title={props.result.login} />
                </Card>
            </Link>
        </div>
    );
}

export default SearchResult;
