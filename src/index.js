/**
 * Created by pmcho on 2017/7/9.
 */
import { AppRegistry } from 'react-native';
import App from './App';
import Main from './Main';
import MyText from './MyText';
import Fetch from './test/Fetch';
import Likes from './test/Likes';
import CountDown from './test/CountDown';
import PanResponderExample from './test/PanResponderExample';
import ViewPage from './test/ViewPage';
import CourseType from './test/CourseType';



if (!__DEV__) {
    global.console = {
        info: () => {},
        log: () => {},
        warn: () => {},
        error: () => {},
    };
}

AppRegistry.registerComponent('CustomComponent', () => Main);