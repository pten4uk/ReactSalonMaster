import React, {useState} from "react";
import {connect} from "react-redux";
import {
    ActivateBackground, SwapOrientationToBottom, SwapOrientationToTop,
} from "../../../../../redux/actions/Main/addClientWindow";
import {SwapToActive, SwapToInactive} from "../../../../../redux/actions/Main/masters";
import AddClientWindow from "./AddClientWindow/AddClientWindow";


function TableItem(props) {
    const currentItem = props.store.masters[props.master][props.index];

    let [underlineClass, setUnderlineClass] = useState('underline');

    function activateUnderline() {
        setUnderlineClass('underline active');
    }
    function deactivateUnderline() {
        setUnderlineClass('underline');
    }

    return (
        <>
            <div className={props.className}
                 onClick={(event) => activateWindow(event, props, props.index)}
                 onMouseEnter={activateUnderline} onMouseLeave={deactivateUnderline}/>
            {currentItem.active ? <AddClientWindow tableItem={currentItem}
                                                   master={props.master}
                                                   index={props.index}/> : ""}
            <hr className={underlineClass} style={{width: getUnderlineLength(props.store)}}/>
        </>
    )
}

export default connect(
    state => ({store: state.Main}),
    dispatch => ({
        ActivateBackground:
            () => dispatch(ActivateBackground()),
        SwapToActive:
            (i, name) => dispatch(SwapToActive(i, name)),
        SwapOrientationToTop:
            (top, left) => dispatch(SwapOrientationToTop(top, left)),
        SwapOrientationToBottom:
            (top, left) => dispatch(SwapOrientationToBottom(top, left)),
    })
)(TableItem);

function activateWindow(event, props, index) {
    event.clientY + 350 > window.innerHeight ?
       props.SwapOrientationToTop(event.target.offsetTop, event.target.offsetLeft) :
       props.SwapOrientationToBottom(event.target.offsetTop, event.target.offsetLeft);

    props.SwapToActive(
        index,
        props.master
    );
    props.ActivateBackground()
}

function getUnderlineLength(props) {
    return 15 + 222 * Object.keys(props.masters).length;
}