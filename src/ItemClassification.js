/**
 * Created by pm on 17-7-26.
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
export default class ItemClassification extends Component {
    render() {
        const {label, onPress} = this.props;
        return (
            <TouchableOpacity
                style={styles.root}
                onPress={onPress}>
                <Text style={styles.title}>{label}</Text>
            </TouchableOpacity>
        );
    }
}
const styles = StyleSheet.create({
    root: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ecebff',
        width: 200,
        height: 50,
        marginHorizontal: 15,
    },
    title: {
        color: '#ff0000',
        fontSize: 26,
    }
});