/**
 * Created by pm on 17-7-31.
 */
import React, {
    NetInfo
} from 'react-native';


const NOT_NETWORK = "网络不可用，请稍后再试";
const TAG_NETWORK_CHANGE = "NetworkChange";
const TAG_NETWORK_IS_CONNECT = "NetworkIsConnect";
/***
 * 检查网络是否连接
 * @param callback
 */
const checkNetworkIsConnected = (callback) => {
    const isConnected = NetInfo.isConnected.fetch().done(
        (isConnected) => {
            callback(isConnected);
        }

        // (status) => {
        //     console.log('Status:' + status);
        // }
    );
    return isConnected;
};

/**
 * 检查网络链接状态
 * checkNetworkState
 */
const checkNetworkState = (callback) => {
    NetInfo.fetch().done(
        (connectionInfo) => {
            callback(connectionInfo);
        }
    );
}

/***
 * 移除网络连接的监听
 * @param tag
 * @param handler
 */
const removeIsConnectedListener = (tag, handler) => {
    NetInfo.isConnected.removeEventListener(tag, handler);
};

/**
 * 移除网络状态变化监听
 * @param tag
 * @param handler
 */
const removeStatusChangeListener = (tag, handler) => {
    NetInfo.removeEventListener(tag, handler)
};

/***
 * 添加网络连接监听
 * @param tag
 * @param handler
 */
const addIsConnectedListener = (tag, handler) => {
    NetInfo.isConnected.addEventListener(tag, handler);
};

/**
 * 添加网络状态变化监听
 * @param tag
 * @param handler
 */
const addStatusChangeListener = (tag, handler) => {
    NetInfo.addEventListener(tag, handler);
};


export default{
    checkNetworkIsConnected,
    checkNetworkState,
    addIsConnectedListener,
    addStatusChangeListener,
    removeIsConnectedListener,
    removeStatusChangeListener,
    NOT_NETWORK,
    TAG_NETWORK_CHANGE,
    TAG_NETWORK_IS_CONNECT,
}