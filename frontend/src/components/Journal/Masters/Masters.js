import React from "react";
import {connect} from "react-redux";

import Master from "./Master";


function Masters({responseLoaded, setResponseLoaded, workDayMastersList, ...props}) {

    return (
        <>
            <div className="masters-line"/>
            <section className="masters">
                {workDayMastersList.map((masterVisit) => <Master key={masterVisit.master.pk}
                                                                 masterData={masterVisit}/>)}
            </section>
        </>

    )
}

export default connect(
    state => ({store_calendar: state.calendar}),
    dispatch => ({})
)(Masters);
