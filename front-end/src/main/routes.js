import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import FilmList from '../pages/film-list/film-list-search'
import WatchList from '../pages/watch-list/watch-list-search'
import FilmListDetails from '../pages/film-list/film-list-details'
import WatchListDetails from '../pages/watch-list/watch-list-details'

function Routes() {
    return (
    <Switch>
        <Route exact path={"/film-list"} component={FilmList} ></Route>
        <Route exact path={"/watch-list"} component={WatchList}></Route>
        <Route exact path={"/film-list/film-details/:id"} component={FilmListDetails}></Route>
        <Route exact path={"/watch-list/film-details/:id"} component={WatchListDetails}></Route>
        <Redirect from="/" to ="/film-list"></Redirect>
    </Switch>
    )
}

export default Routes