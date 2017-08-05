/**
 * Created by pm on 17-7-24.
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
    TouchableOpacity,
    TouchableHighlight,
} from 'react-native';
export default class Details extends Component {

    static navigationOptions = ({navigation}) => ({
        title: `${navigation.state.params.user}`,
    });

    render() {
        // The screen's current route is passed in to `props.navigation.state`:
        const {params} = this.props.navigation.state;
        return (
            <View>
                <Text>{params.user}</Text>
            </View>
        );
    }
}