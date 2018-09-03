/* eslint-disable */

import React from "react";
import ReactDOM from "react-dom";
import CSSModules from "react-css-modules";

import style from "./react-app.scss";

const App = ()=> <h1 styleName="title">This is the react app</h1>;

const StyledApp = CSSModules(App, style);

ReactDOM.render(
    <StyledApp/>,
    document.getElementById("react-app")
);
