/**
 * Created by pm on 17-8-16.
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
    ToolbarAndroid,
    ImageBackground,
    ActivityIndicator,
} from 'react-native';
export default class VodDetails extends Component {

    static navigationOptions = ({navigation}) => ({
        title: `${navigation.state.params.screen}`,
    });
    renderView=()=>{
        return(
            <View>
                <Text>
                    Hello
                </Text>
            </View>
        );
    };
    render(){
        return this.renderView();
    }
}