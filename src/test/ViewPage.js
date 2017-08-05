/**
 * Created by pm on 17-7-19.
 */
import React, {Component} from 'react';
import {
    BackAndroid,
    AppState,
    StyleSheet,
    View,
    Navigator,
    ToastAndroid,
    Text,
    Image,
    Dimensions,
    FlatList,
    ViewPagerAndroid,
} from 'react-native';

export default class ViewPage extends Component {
    render() {
        return (
            <ViewPagerAndroid
                initialPage={1}

                style={[styles.flex, styles.viewpager]}>


                <View style={styles.center}><Text style={[{fontSize: 12}, {color: 'red'}]}>第一个页面</Text></View>
                <View style={styles.center}><Text style={{fontSize: 20}}>第二个页面</Text></View>
                <View style={styles.center}><Text style={{fontSize: 30}}>第三个页面</Text></View>


            </ViewPagerAndroid>
        );
    }
}

const styles = StyleSheet.create({


    flex: {
        flexDirection: 'column',
    },

    viewpager: {
        height: 200,
    },

    center: {
        justifyContent: 'center',
        alignItems: 'center',

    },


});