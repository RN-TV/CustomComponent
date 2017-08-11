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
    Dimensions,
    FlatList,
    TouchableHighlight,
    ScrollView,
} from 'react-native';
import {
    MyIntentModule,
    ToastNative,
    DataModule,
} from './utils/NativeModules';
import StatusBar from './StatusBar';
import Item from './Item';
import ItemClassification from './ItemClassification';
import movies from '../assests/movies.json';
import hot from '../assests/hot.json';
import classification from '../assests/classification.json';
import TouchableItem from "../node_modules/react-navigation/lib/views/TouchableItem";

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const element_width = screenWidth * (90 / 100);
const recommend_height = screenHeight * (40 / 100);
const list_height = screenHeight * (30 / 100);
const classsification_height = screenHeight * (10 / 100);
const ITEM_HEIGHT = 100;
const TAG = "VodContent:";
const initViewPosition = 0;
var currentViewPosition = initViewPosition;
var tagIndex = 1;
export default class VodContent extends Component {

    constructor(props) {
        super(props);

    }

    navigate = this.props.navigation;

    componentWillMount() {
        console.log(TAG + "componentWillMount");
        DataModule.getTitleUrl((msg) => {
            console.log("msg=" + msg);
        })
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

    scroll = () => {
        // this._flatList.scrollToEnd();
        this._flatList.scrollToIndex({viewPosition: currentViewPosition, index: tagIndex});
        currentViewPosition++;
        tagIndex++;
        // this._flatList.scrollToOffset({animated: true, offset: 2000});
    };

    render() {
        // const {navigate} = this.props.navigation;
        return (
            <View style={styles.vod_content}>
                <View style={styles.recommend}>

                    <TouchableHighlight style={styles.preview_video}
                                        onPress={() => this.props.onPress()}
                                        title="VodDetails">
                        <Image
                            source={require('../res/mipmap-mdpi/video_default_bg.png')}/>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => this.props.onPress()}
                                        title="VOD">
                        <Image style={styles.topic_image}
                               source={{uri: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1794894692,1423685501&fm=117&gp=0.jpg'}}>
                            <Text style={styles.topic_title}>暑期过把隐</Text>
                        </Image>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => this.props.onPress()}
                                        title="VOD">
                        <Image style={styles.topic_image}
                               source={{uri: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1794894692,1423685501&fm=117&gp=0.jpg'}}>
                            <Text style={styles.topic_title}>暑期过把隐</Text>
                        </Image>
                    </TouchableHighlight>

                </View>

                <View style={styles.list}>
                    <FlatList style={{flex: 1}}
                              showsHorizontalScrollIndicator={false}
                              horizontal={true}
                              keyExtractor={item => item.key}
                              data={hot.hotlist}
                              renderItem={({item}) => {
                                  return (<Item image={item.img}
                                                onPress={() => this.props.onPress()}/>);
                              }

                              }
                    />
                </View>

                <View style={styles.classification}>
                    <TouchableHighlight onPress={this.scroll}>
                        <Image style={styles.category_icon}
                               source={require('../res/mipmap-mdpi/category_left_normal.png')}/>
                    </TouchableHighlight>
                    <View style={styles.category}>
                        <FlatList style={{
                            flex: 1
                        }}
                                  ref={(flatList) => this._flatList = flatList}
                                  showsHorizontalScrollIndicator={false}
                                  horizontal={true}
                                  keyExtractor={item => item.key}
                                  data={classification.classification_list}
                                  renderItem={({item}) => {

                                      return (
                                          <ItemClassification
                                              label={item.title}
                                              onPress={() => this.navigate('VodList', {
                                                  screen: item.title,
                                                  url: item.url
                                              })}/>);
                                  }
                                  }
                                  initialNumToRender={5}
                                  getItemLayout={(data, index) => (
                                      {length: ITEM_HEIGHT, offset: (ITEM_HEIGHT + 2) * index, index}
                                  ) }
                                  ItemSeparatorComponent={() => <View
                                      style={{width: 2, height: 50, backgroundColor: 'white'}}/>}

                        />
                    </View>

                    <TouchableHighlight onPress={this.scroll}>
                        <Image style={styles.category_icon}
                               source={require('../res/mipmap-mdpi/category_right_normal.png')}/>
                    </TouchableHighlight>
                </View>
            </View>

        );
    }
}
const styles = StyleSheet.create({
    vod_content: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    recommend: {
        width: element_width,
        height: recommend_height,
        flexDirection: 'row',
        backgroundColor: '#2f25ff',
    },

    preview_video: {
        marginHorizontal: 40,
        width: 920,
        height: 400,
        backgroundColor: "#a0ff23",
    },
    topic_image: {
        marginHorizontal: 40,
        width: 420,
        height: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    topic_title: {
        fontSize: 24,
        fontStyle: 'normal',
        marginBottom: 50,
        color: "#ff0000"
    },

    list: {
        height: list_height,
        backgroundColor: "#ff1a9e",
        width: element_width,
        // flexDirection: 'row',
        // justifyContent: 'space-around'
    },
    list_image: {
        width: 250,
        height: 300,
        resizeMode: 'center',
    },

    classification: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        width: element_width,
        height: classsification_height,
        backgroundColor: '#caffd0',
    },
    category: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
        width: 1500,
        backgroundColor: '#fffc89',

    },
    category_icon: {
        width: 100,
        height: 200,
        resizeMode: 'center',
    },
    text: {
        width: 100,
        fontSize: 24,
        textAlign: 'center',
        color: '#333333',
        marginHorizontal: 20,
    },
});