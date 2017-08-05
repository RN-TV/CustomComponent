/**
 * Created by pmcho on 2017/7/15.
 */
import React, {Component,ReactDOM} from 'react';
import {
    BackAndroid,
    AppState,
    StyleSheet,
    View,
    Navigator,
    ToastAndroid,
    Text
} from 'react-native';
export default class MyText extends Component{
    constructor(props) {
        super(props);
        this.state = { showText: true };
    }

    componentDidMount() {

        // 每1000毫秒对showText状态做一次取反操作
        /*setInterval(() => {
            this.setState(previousState => {
                return { showText: !previousState.showText };
            });
        }, 1000);*/
    }

    render() {
        // 根据当前showText的值决定是否显示text内容
        let display = this.state.showText ? this.props.text : '';
        return (
            <Text style={styles.text}>{display}</Text>
        );
    }

    componentWillUnmount() {
        // clearInterval(this.timer);
    }
}
const styles = StyleSheet.create({
    root:{
        flex:1,
    },
    text:{
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color:"#39ff1d",
    }
});
