import React, {Component} from 'react'
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native'

import ToastNative from '../utils/NativeModules';

export default class Likes extends Component {
    state = {
        likes: 0,
    };
    onPress = () => {
        const {likes} = this.state;
        this.setState({
            likes: likes + 1,
        });
        // ToastNative.show("rn call native", 1);
        // ToastNative.showPopWindow();
    };

    render() {
        // const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.onPress()}>
                    <Image
                        style={styles.image}
                        source={{
                            uri: "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2807509578,211432801&fm=58",
                        }}
                    />
                </TouchableOpacity>
                <Text onPress={this.toast.bind(this)}>{this.state.likes}</Text>
            </View>
        );
    }

    //调用native方法
    toast() {
        ToastNative.show('rn call native', 1);
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    image: {
        width: 65,
        height: 65,
    },
})
