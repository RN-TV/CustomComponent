/**
 * Created by pm on 17-7-24.
 */
import React from "react";
import {StackNavigator} from "react-navigation";

import App from "./App";
import Details from "./Details";
import VodList from "./VodList";
import AppDetails from "./AppDetails";

const Main = StackNavigator({
    App: {screen: App},
    Details: {screen: Details},
    VodList: {screen: VodList},
    AppDetails: {screen: AppDetails},
}, {
    initialRouteName: 'App',
    headerMode: 'screen'
});

export default Main;