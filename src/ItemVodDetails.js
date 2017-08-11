/**
 * Created by sunny on 18/03/2017.
 */
/**
 * Created by tdzl2003 on 12/17/16.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const thirdWidth = width / 3;

const imageWidth = 400;

const imageHeight = 200;

const styles = StyleSheet.create({
    root: {
        marginTop: 20,
        width: imageWidth,
        marginHorizontal: 10,
    },
    image: {
        width: imageWidth,
        height: imageHeight,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 5,
    },
});

const Item = (props) => {
    const {title, image, onPress, loading} = props;
    return (
        <TouchableOpacity style={styles.root} onPress={onPress}>
            <Image
                // source={{uri: image}}
                source={loading ? require("../res/mipmap-mdpi/gameapp_bg_4.png") : {uri: image}}
                style={styles.image}
            />
            <Text
                numberOfLines={1}
                style={styles.title}
            >
                {loading ? null : title}
            </Text>
            {/*{renderStars(stars)}*/}
        </TouchableOpacity>
    );
};

export default Item
