/**
 * Created by pm on 17-7-31.
 */
import React, {
    NetInfo
} from 'react-native';



const NOT_NETWORK = "网络不可用，请稍后再试";
const TAG_NETWORK_CHANGE = "NetworkChange";
/***
 * 检查网络链接状态
 * @param callback
 */
const checkNetworkState = () => {
    const isConnected = NetInfo.isConnected.fetch().done(
        // (isConnected) => {
        //     callback(isConnected);
        // }

        (status)=> {
            console.log('Status:' + status);
        }
    );
    return isConnected;
};

/***
 * 移除网络状态变化监听
 * @param tag
 * @param handler
 */
const removeEventListener = (tag, handler) => {
    NetInfo.isConnected.removeEventListener(tag, handler);
};

/***
 * 添加网络状态变化监听
 * @param tag
 * @param handler
 */
const addEventListener = (tag, handler) => {
    NetInfo.isConnected.addEventListener(tag, handler);
};


export default{
    checkNetworkState,
    addEventListener,
    removeEventListener,
    NOT_NETWORK,
    TAG_NETWORK_CHANGE,
}