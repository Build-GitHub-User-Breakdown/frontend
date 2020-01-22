import axios from "axios";
import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { postFavorite, deleteFavorite, getFavorites } from "../../actions/actions";

function ToggleFavoriteButton(props) {//props will need the username of the GitHub user
    //example data: (favorites is what githubUser gets set to I think) 
    // {
    //     "favorites": "jtmccutcheon",
    //     "notes": ""
    // }

    const [favorited, setFavorited] = useState(false);

    useEffect(() => {
        console.log("Updating favorited state", favorited);
        console.log("STATE AFTER FAVORITE UPDATE", props.state);
        console.log("should become true if " + JSON.stringify(props.favorites) + " contains " + props.username);
        console.log("IF THIS VALUE IS GREATER THAN 0 IT SHOULD BE WORKING AHHHHHHHHH", props.favorites.filter((favorite) => { return favorite.favorites === props.username }).length);
        setFavorited(props.favorites.filter((favorite) => { console.log("Why isn't this true?", favorite.favorites === props.username); return favorite.favorites === props.username }).length > 0);//basically if favorites contains props.username
    }, [, props.favorites])//Once at the start, and when favorites is updated, we want to check whether or not the user in props.username is favorited or not

    useEffect(() => {
        console.log("favorited updated", favorited);
    }, [favorited])

    let favSrc = "https://image.flaticon.com/icons/svg/149/149220.svg";
    if (favorited) favSrc = "https://image.flaticon.com/icons/svg/148/148839.svg";

    return (
        <div>
            {/* decide which data we want to show in a Favorite (probably not too detailed since it's in a list but enough to keep up with your favorites at a glance) */}

            <img className="favoriteButton" src={favSrc} onClick={(e) => {
                e.preventDefault();
                console.log("TOGGLE FAV ON CLICK");
                if (!props.isPostingFavorite && !props.isDeletingFavorite) {//in case the user clicks the favorite button rapidly while still setting favorite 
                    console.log("TOGGLE FAV NOT CURRENTLY POSTING OR DELETING FAV");
                    if (!favorited) {
                        console.log("POSTING FAV");
                        //post fav
                        props.postFavorite(props.userID, { favorites: props.username, notes: "" })
                    }
                    else {
                        console.log("DELETING FAV with ID, fullOBJECT", props.favorites.find((favorite) => { return favorite.favorites === props.username }).id, props.favorites.find((favorite) => { return favorite.favorites === props.username }));
                        //delete fav
                        props.deleteFavorite(props.favorites.find((favorite) => { return favorite.favorites === props.username }).id, props.userID)//find the favoriteID of props.username in favorites, then deleteFavorite(with that ID)
                    }
                }
            }}></img>
        </div>
    );
}

const mapStateToProps = state => ({
    userID: state.userID,
    favorites: state.favorites,
    isPostingFavorite: state.isPostingFavorite,
    isDeletingFavorite: state.isDeletingFavorite,
    state: state
});

export default connect(
    mapStateToProps,
    { postFavorite, deleteFavorite, getFavorites }
)(ToggleFavoriteButton);

