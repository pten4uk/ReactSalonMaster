import React, {useEffect} from "react";

import Header from "./Header";
import Main from "./Main";
import {connect} from "react-redux";


function App(props) {
    return (
        <div className="wrapper">
            <Header/>
            <Main/>
        </div>
    )
}

export default App;
