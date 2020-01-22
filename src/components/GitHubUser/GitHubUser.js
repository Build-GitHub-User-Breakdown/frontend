import React, { useEffect, useState } from "react";
import axios from "axios";
import { getUserAccount, getUserEvents, getUserFollowers, getUserStarredRepos, getUserSubscriptions, getUserFollows } from "../../Utils/AxiosCall.js";
import { withRouter } from "react-router-dom";
import { Descriptions, Anchor, Typography, Skeleton } from 'antd';
import Notes from '../Notes/NotesContainer';
import ToggleFavoriteButton from "../Favorites/ToggleFavoriteButton.js";
const { Link } = Anchor;
const { Title } = Typography;

// avatar_url: "https://avatars3.githubusercontent.com/u/17069338?v=4"
// bio: "Just a person."
// blog: ""
// company: null
// created_at: "2016-02-04T16:47:20Z"
// email: "trtld2@gmail.com"
// events_url: "https://api.github.com/users/Turtled/events{/privacy}"
// followers: 0
// followers_url: "https://api.github.com/users/Turtled/followers"
// following: 0
// following_url: "https://api.github.com/users/Turtled/following{/other_user}"
// gists_url: "https://api.github.com/users/Turtled/gists{/gist_id}"
// gravatar_id: ""
// hireable: null
// html_url: "https://github.com/Turtled"
// id: 17069338
// location: null
// login: "Turtled"
// name: "Daniel F"
// node_id: "MDQ6VXNlcjE3MDY5MzM4"
// organizations_url: "https://api.github.com/users/Turtled/orgs"
// public_gists: 0
// public_repos: 47
// received_events_url: "https://api.github.com/users/Turtled/received_events"
// repos_url: "https://api.github.com/users/Turtled/repos"
// site_admin: false
// starred_url: "https://api.github.com/users/Turtled/starred{/owner}{/repo}"
// subscriptions_url: "https://api.github.com/users/Turtled/subscriptions"
// type: "User"
// updated_at: "2019-10-17T23:03:50Z"
// url: "https://api.github.com/users/Turtled"

//PROMISING API THINGS
// login: "Turtled" *********************
// avatar_url: "https://avatars3.githubusercontent.com/u/17069338?v=4"*****************************
// bio: "Just a person." *****************
// created_at: "2016-02-04T16:47:20Z" *********
// email: "trtld2@gmail.com" ****************
// html_url: "https://github.com/Turtled" ******************
// name: "Daniel F" *****************
// followers: 0 ********************
// followers_url: getUserFollowers()
// following: 0 *********************
// following_url: getUserFollows()
// public_repos: 47 *************************
// starred_url: getUserStarredRepos()
// subscriptions_url: getUserSubscriptions()

function GitHubUser(props) {

    const [userAccount, setUserAccount] = useState();
    const [userEvents, setUserEvents] = useState();

    useEffect(() => {
        getUserAccount(props.match.params.username, setUserAccount)
        getUserEvents(props.match.params.username, setUserEvents)
    }, [])

    useEffect(() => {
        if (userEvents) {
            getMostUsedLanguage();
            console.log("Most common day of push ", getMostCommonDay())
            console.log("Most common hour of push ", getMostCommonHour())
        }
    }, [userEvents])

    console.log("User Data", userAccount, userEvents);

    function getMostUsedLanguage() {

        let languages = {};

        userEvents.forEach((eventPage) => {
            eventPage.forEach((event) => {
                if (event.type === "PullRequestEvent") {
                    if (languages.hasOwnProperty(event.payload.pull_request.head.repo.language)) {
                        languages[event.payload.pull_request.head.repo.language] = languages[event.payload.pull_request.head.repo.language] + 1;
                    } else {
                        languages[event.payload.pull_request.head.repo.language] = 1;
                    }
                }
            })
        })

        console.log("Languages: ", languages);

        let mostCommon = "None";
        let languageCount = 0;

        for (let lang in languages) {
            if (languages[lang] > languageCount && lang != null) {
                mostCommon = lang;
                languageCount = languages[lang];
            }
        }

        return mostCommon;
    }

    function getMostCommonDay() {

        let days = {};

        userEvents.forEach((eventPage) => {
            eventPage.forEach((event) => {
                if (event.type === "PushEvent") {
                    let date = new Date(event.created_at)
                    let day = date.getDay();

                    if (days.hasOwnProperty(day)) {
                        days[day] = days[day] + 1;
                    } else {
                        days[day] = 1;
                    }

                }
            })
        })

        console.log("Days: ", days);

        let mostCommon = 7;
        let dayCount = 0;

        for (let day in days) {
            if (days[day] > dayCount && day != null) {
                mostCommon = day;
                dayCount = days[day];
            }
        }

        return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "None"][mostCommon];

    }

    function getMostCommonHour() {

        let hours = {};

        userEvents.forEach((eventPage) => {
            eventPage.forEach((event) => {
                if (event.type === "PushEvent") {
                    let date = new Date(event.created_at);
                    let hour = date.getHours();

                    if (hours.hasOwnProperty(hour)) {
                        hours[hour] = hours[hour] + 1;
                    } else {
                        hours[hour] = 1;
                    }

                }
            })
        })

        console.log("Hours: ", hours);

        let mostCommon = "None";
        let hourCount = 0;

        for (let hour in hours) {
            if (hours[hour] > hourCount && hour != null) {
                mostCommon = hour;
                hourCount = hours[hour];
            }
        }

        if (mostCommon === 0) {
            return "12:00am";
        } else if (mostCommon > 0 && mostCommon < 12) {
            return `${mostCommon}:00am`;
        } else if (mostCommon === 12) {
            return "12:00pm";
        }
        else if (isNaN(mostCommon % 12)) {
            return "None";
        }
        else {
            return `${mostCommon % 12}:00pm`;
        }

    }

    if (!userAccount || !userEvents) return (
        <div className="userLoading">
            <Title level={2}>Loading...</Title>
            <Skeleton avatar paragraph={{ rows: 4 }} />
        </div>
    );

    return (
        <div className="gitHubUser">
            <div className="userInfo">
                <img src={userAccount.avatar_url} />
                <div className="userDescription">
                    <ToggleFavoriteButton username={userAccount.login} />
                    <Descriptions title={userAccount.login}>
                        {/* <a href={userAccount.html_url}><h1>{userAccount.login}</h1></a> */}
                        <Descriptions.Item label="Name">{userAccount.name}</Descriptions.Item>
                        <Descriptions.Item label="Email">{userAccount.email}</Descriptions.Item>
                        <Descriptions.Item label="Bio">{userAccount.bio}</Descriptions.Item>
                        <Descriptions.Item label="Created On"> {userAccount.created_at.substring(0, 10)}</Descriptions.Item>
                        <Descriptions.Item label="Public Repositories">{userAccount.public_repos}</Descriptions.Item>
                        <Descriptions.Item label="Followers">{userAccount.followers}</Descriptions.Item>
                        <Descriptions.Item label="Following">{userAccount.following}</Descriptions.Item>
                        <Descriptions.Item label="Most Common Language">{getMostUsedLanguage()}</Descriptions.Item>
                        <Descriptions.Item label="Most Common Day Of Commit">{getMostCommonDay()}</Descriptions.Item>
                        <Descriptions.Item label="Most Common Hour Of Commit">{getMostCommonHour()}</Descriptions.Item>
                    </Descriptions>
                </div>
                <Anchor affix={false}><Link href={userAccount.html_url} title={`GitHub Profile: /${userAccount.login}`} target="_blank" /></Anchor>
            </div>
            <div className="userNotes">
                <Notes username={userAccount.login} />
            </div>
        </div>
    );
};

export default withRouter(GitHubUser);
