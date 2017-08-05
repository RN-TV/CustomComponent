/**
 * Created by pm on 17-7-28.
 */
import React, {Component} from "react";
import {Dimensions, Text, View,StyleSheet} from "react-native";

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const element_width = screenWidth * (90 / 100);
const recommend_height = screenHeight * (40 / 100);
const list_height = screenHeight * (30 / 100);
const classsification_height = screenHeight * (10 / 100);
const TAG = "TvContent:";
export default class TvContent extends Component {

    componentWillMount() {
        console.log(TAG + "componentWillMount");
    }

    componentDidMount() {
        console.log(TAG + "componentDidMount");
    }

    componentWillReceiveProps() {
        console.log(TAG + "componentWillReceiveProps");
    }

    shouldComponentUpdate() {
        console.log(TAG + "shouldComponentUpdate");
        return false;
    }

    componentWillUpdate() {
        console.log(TAG + "componentWillUpdate");
    }

    componentDidUpdate() {
        console.log(TAG + "componentDidUpdate");
        this.completeRender = true;
    }

    componentWillUnmount() {
        console.log(TAG + "componentWillUnmount");
    }

    render() {
        return (
            <View style={styles.tv_content}>
                <Text style={{color: "#ffffff"}}>Video</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tv_content:{
        backgroundColor: '#000000',
        width: element_width,
        height: recommend_height,
    }
});