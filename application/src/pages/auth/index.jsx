import {Route} from "react-router-dom";
import React from "react";
import {LoginOut} from "./loginOut";
import Login from "./login";


/**
 * 授权相关
 */
export function Auth () {
    return (
        <React.Fragment>
            <Route exact path='/auth/login' component={Login}/>
            <Route path='/auth/loginOut' component={LoginOut}/>
        </React.Fragment>
    )
}
