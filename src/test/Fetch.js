/**
 * Created by pmcho on 2017/7/17.
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
    ListView
} from 'react-native';
const data = {
    "country": "中国",
    "country_id": "CN",
    "area": "华北",
    "area_id": "100000",
    "region": "北京市",
    "region_id": "110000",
    "city": "北京市",
    "city_id": "110100",
    "county": "",
    "county_id": "-1",
    "isp": "方正网络",
    "isp_id": "100063",
    "ip": "59.108.51.32"
};
/*const Fetch = React.createClass({
    getInitialState: function () {
        var source = ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {dataSource: source.cloneWithRows(data)};
    },

    render: function () {
        "use strict";
        return (
            <View style={styles.container}>
                <ListView dataSource={this.state.dataSource}
                          renderRow={this.item()}
                />
            </View>
        );
    },

    item: function (course) {
        "use strict";
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    {course.country}
                </Text>
                <Image style={styles.icons}
                       source={{uri: "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1598552568,4236159349&fm=58"}}>
                </Image>
                <Text style={styles.time}>
                    {course.ip}
                </Text>
            </View>
        );
    }
});*/
class Fetch extends Component {

    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(data),
        };
    }

    render() {
        "use strict";
        return (
            <View style={styles.container}>
                <ListView dataSource={this.state.dataSource}
                          renderRow={this.item()}
                />
            </View>
        );
    }

    item(course) {
        "use strict";
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    {course.country}
                </Text>
                <Image style={styles.icons}
                       source={{uri: "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1598552568,4236159349&fm=58"}}>
                </Image>
                <Text style={styles.time}>
                    {course.ip}
                </Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    icons: {
        width: 50,
        height: 50,
    },
    title: {
        fontSize: 16,
        color: "#2bb2ff"
    },
    time: {
        fontSize: 16,
        color: "#85ff23"
    }
});
export default Fetch;
// initialListSize={}
// onEndReachedThreshold={}
// pageSize={}
// renderScrollComponent={}
// scrollRenderAheadDistance={}
// stickyHeaderIndices={}