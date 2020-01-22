import React, { useEffect } from 'react';
import Favorite from "./Favorite.js";
import { connect } from "react-redux";
import { getFavorites } from "../../actions/actions";
import { Alert, Skeleton, Typography } from 'antd';
import { getUserAccount } from "../../Utils/AxiosCall.js";
const { Title } = Typography;

function ListFavorites(props) {

    useEffect(() => {
        props.getFavorites(props.userID);
    }, [])

    if (props.error) return (<Alert message="Error getting favorites, please reload page." type="error" showIcon />)//TODO: Reload page automatically

    if (props.isFetching) return (<Skeleton active />)

    if (props.favorites.length <= 0) return (
        <Alert
            message="You have no favorite users yet"
            type="info"
            showIcon
        />
    )

    return (
        <div className="favoriteResults">
            <Title level={2}>Favorites</Title>
            <div className="favoriteCards">
                {props.favorites.map((favorite) => {
                    return <Favorite favorite={favorite} getUser={getUserAccount} />
                })}
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    userID: state.userID,
    favorites: state.favorites,
    error: state.error,
    isFetching: state.isFetchingFavorites
});

export default connect(
    mapStateToProps,
    { getFavorites }
)(ListFavorites);
