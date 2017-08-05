/**
 * Created by pm on 17-7-28.
 */
/**
 * Created by pm on 17-7-18.
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
    TouchableOpacity,
} from 'react-native';
export default class ItemFavoriteApp extends Component {
    render() {
        const {image, onPress} = this.props;
        return (
            <TouchableOpacity
                style={styles.root}
                onPress={onPress}>
                <Image style={styles.icons}
                       source={require('../res/mipmap-mdpi/icon_default.png')}>
                </Image>
            </TouchableOpacity>
        );
    }
}
const styles = StyleSheet.create({
    root: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ecebff',
        // width: 150,
        // height: 150,
        marginHorizontal: 20,
        marginTop:10,
        // elevation:50,
        zIndex:5,
    },
    icons: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        resizeMode: 'center',

    },
});