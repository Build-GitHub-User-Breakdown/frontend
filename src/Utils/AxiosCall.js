import axios from "axios";
import React, { useState, useEffect } from "react";
import { withRouter } from 'react-router-dom';

export function getUserEvents(user, setter) {
    let events = [];
    collectEvents(user, setter);

    function collectEvents(user, setter, page = 0) {
        axios
            .get(`https://api.github.com/users/${user}/events?page=${page}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
            .then((res) => {
                console.log("GETTING ", res, page);
                events.push(res.data);
                collectEvents(user, setter, page + 1);
            })
            .catch((err) => {
                console.log("Done fetching user events", err);
                setter(events);
            })
    }
}

export function getUserAccount(user, setter) {
    axios
        .get(`https://api.github.com/users/${user}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

        .then((res) => {
            setter(res.data);
        })

}

export function getUserFollowers(user, setter) {
    axios
        .get(`https://api.github.com/users/${user}/followers?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

        .then((res) => {
            setter(res.data);
        })

}

export function getUserFollows(user, setter) {
    axios
        .get(`https://api.github.com/users/${user}/following?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

        .then((res) => {
            setter(res.data);
        })

}


export function getUserStarredRepos(user, setter) {
    axios
        .get(`https://api.github.com/users/${user}/starred?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

        .then((res) => {
            setter(res.data);
        })

}

export function getUserSubscriptions(user, setter) {
    axios
        .get(`https://api.github.com/users/${user}/subscriptions?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

        .then((res) => {
            setter(res.data);
        })
}

