import axios from "axios";
import React, { useState, useEffect } from 'react';
import { Alert, Skeleton } from 'antd';
import { Link } from 'react-router-dom';
import { Card } from 'antd';


const { Meta } = Card;

function Favorite(props) {

  const [user, setUser] = useState();

  useEffect(() => {
    props.getUser(props.favorite.favorites, setUser);
  }, [])

  if (!user) return (<Skeleton active />)

  return (
    <div className="individualFavorite">
      <Link to={"/user/" + user.login}>
        {/* <img src={props.result.avatar_url} />
        <p>{props.result.login}</p> */}
        <Card
          hoverable
          style={{ width: 240 }}
          cover={<img alt="example" src={user.avatar_url} />}
        >
          <Meta title={props.favorite.favorites} />
        </Card>
      </Link>
    </div>
  );
}

export default Favorite;
