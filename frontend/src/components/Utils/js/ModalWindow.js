import React from "react";
import {connect} from "react-redux";
import {SetActiveModalWindow} from "../redux/modalWindow/modalWindowAction";
import Loader from "./Loader";


function ModalWindow({styleBody, onCancel, buttonText, onConfirm, loading, ...props}) {
    let windowActive = props.modalWindow.active

    function onClose() {
        if (onCancel) onCancel()
        props.SetActiveModalWindow(false)
    }

    if (!windowActive) return <></>
    return (
        <div className='modal-window'>
            <div className="modal-window__wrapper">

                {loading && <Loader size={10} top={15} left={15}/>}
                <div className="close" onClick={onClose}>Закрыть</div>

                <div className="modal-window__body">
                    <div className="modal-window__content" style={{...styleBody}}>
                        {props.children}
                    </div>
                </div>

                <button className='modal-window__confirm' onClick={onConfirm}>
                    {buttonText || 'Подтвердить'}
                </button>

            </div>
        </div>
    )
}

export default connect(
    state => ({modalWindow: state.Header.modalWindow}),
    dispatch => ({
        SetActiveModalWindow: (active) => dispatch(SetActiveModalWindow(active))
    })
)(ModalWindow);
