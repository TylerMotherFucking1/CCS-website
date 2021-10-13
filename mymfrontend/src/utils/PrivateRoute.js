import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthHandler from './AuthHandler'
import MainComponent from '../counselling-component/MainComponent'

export var PrivateRoute = ({ page, activepage, ...rest }) => {
    // make sure user is logged in to access web page
    console.log({...rest})
    return (
        <Route
            {...rest}
            // add props here allows variables to be passed to main component, 
            // so data can be passed to diff component/pages 
            render={(props) =>
                
                // for counselling page to load all the components
                <MainComponent page={page} activepage={activepage} {...props} /> }
        />
    )
}
