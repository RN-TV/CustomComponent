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
    ImageBackground,
    TouchableOpacity,
} from 'react-native';
export default class ItemPoster extends Component {
    render() {
        const {image, onPress} = this.props;
        return (
            <TouchableOpacity
                style={styles.root}
                onPress={onPress}>
                <Image style={styles.icons}
                       source={require('../res/mipmap-mdpi/preview3.jpg')}>
                    <Text style={styles.title}>侠盗飞车</Text>
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
        width: 250,
        height: 350,
        marginHorizontal: 15,
        elevation: 50,
    },
    icons: {
        transform: [{translate: [0, 0, 30]}],
        zIndex: 20,
        justifyContent: 'flex-end',
        alignItems: 'center',
        resizeMode: 'center',

    },
    title: {
        zIndex: 30,
        color: '#ff0000',
        marginBottom: 100,
        fontSize: 26,
    }
});