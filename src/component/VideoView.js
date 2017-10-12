/**
 * Created by pm on 17-8-17.
 */
import React, {Component, PropTypes}from 'react';
import {
    requireNativeComponent,
    View,
    UIManager,
    findNodeHandle,
}from 'react-native';

var RCT_VIDEO_REF = 'VideoView';

class VideoView extends Component {
    constructor(props) {
        super(props);
    }

    pause() {
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this.refs[RCT_VIDEO_REF]),
            UIManager.RV.Commands.pause,
            null
        );
    }

    start() {
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this.refs[RCT_VIDEO_REF]),
            UIManager.RV.Commands.start,
            null
        );
    }

    render() {
        return <RCTVideoView
            {...this.props}
            ref={RCT_VIDEO_REF}
        />;
    };
}
VideoView.propTypes = {
    style: View.propTypes.style,
    ...View.propTypes,
};

let RCTVideoView = requireNativeComponent('RV', VideoView, {
    nativeOnly: {onChange: true}
});
module.exports = VideoView;