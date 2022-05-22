import React, { Component } from 'react';

type propback={
    scrollStepInPx:any;
    delayInMs:any
}
type stateback={
    intervalId:any
}
class BackToTop extends Component<propback,stateback> {
    constructor(props) {
        super(props);
        this.state = {
            intervalId: 0,
        };
    }
    handleBackToTop = () => {};

    scrollStep() {
        if (process.browser) {
            if (window.pageYOffset === 0) {
                clearInterval(this.state.intervalId);
            }
            window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
        }
    }

    scrollToTop() {
        let intervalId = setInterval(
            this.scrollStep.bind(this),
            this.props.delayInMs
        );
        //console.log(intervalId)
        this.setState({ intervalId: intervalId });
    }

    render() {
        return (
            <>
            {/* <div className="back-top" id="back-top"  onClick={e => this.scrollToTop()}>
                <div className="back-top-content">
                    <div className="back-top-icon"></div>
                </div>
             </div> */}

            <div
                id="back2top"
                className="ps-btn--back-to-top"
                onClick={e => this.scrollToTop()}>
                <i className="icon-chevron-up"></i>
            </div> 
            </>
        );
    }
}

export default BackToTop;