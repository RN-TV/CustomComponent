/**
 * Created by pm on 17-7-24.
 */
import React from "react";
import {StackNavigator} from "react-navigation";

import App from "./App";
import Details from "./Details";
import Likes from "./test/Likes";

const Main = StackNavigator({
    App: {screen: App},
    Details: {screen: Details},
}, {
    initialRouteName: 'App',
    headerMode: 'screen'
});

export default Main;