/**
 * Created by pm on 17-7-20.
 */
import React, {Component} from "react";
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    FlatList,
    View,
    ViewPagerAndroid,
    TouchableHighlight,
    TouchableOpacity,
    DeviceEventEmitter,
} from "react-native";
import {
    MyIntentModule,
    ToastNative,
    DataModule,
} from './utils/NativeModules';
import Dimen from "./config/Dimen";
import Activity from "./config/Activity";
import Swiper from "./component/Swiper";
import Button from "./test/Button";
import favorite from '../assests/favorite.json';
import ItemFavoriteApp from "./ItemFavoriteApp";

let startRender, stopRender;
const TAG = "AppContent:";
export default class AppContent extends Component {

    imageUri = {
        appStoreSubjectUri2: {},
        appStoreSubjectUri2: {},
        appStoreSubjectUri2: {}
    };
    appStoreSubjectUri1;

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            animationsAreEnabled: true,//动画是否开启
        };
        this.appStoreRecommendUri;
        this.appStoreSubjectUri1="http://img.lenovomm.com/s3/img/app/app-img-lestore/6733-2017-08-02043725-1501663045154.jpg";
        this.appStoreSubjectUri2="http://img.lenovomm.com/s3/img/app/app-img-lestore/5304-2017-06-28043821-1498639101734.jpg";


    }

    async test() {
        try {
            var {
                relativeX,
                relativeY,
                width,
                height,
            } = await DataModule.measureLayout(100, 100);

            console.log(relativeX + ':' + relativeY + ':' + width + ':' + height);
        } catch (e) {
            console.error(e);
        }
    }

    componentWillMount() {
        console.log(TAG + "componentWillMount");
        startRender = Date.now();
        //图片预加载
        var prefetchTask = Image.prefetch('https://facebook.github.io/react/img/logo_og.png');
        prefetchTask.then(() => {
            //此处可设置状态，显示Image组件。此时组件会使用预加载的图片信息。而不用再次加载
            console.log('加载图片成功')
        }, error => {
            console.log('加载图片失败')
        })
        DataModule.getAppScreenImageUrl((msg1, msg2, msg3) => {
            this.appStoreRecommendUri = msg1;
            this.appStoreSubjectUri1 = msg2;
            this.appStoreSubjectUri2 = msg3;
            console.log("appStoreRecommendUri=" + this.appStoreRecommendUri);

        });
        console.log("appStoreSubjectUri1=" + this.appStoreSubjectUri1);
        console.log("appStoreSubjectUri2=" + this.appStoreSubjectUri2);
    }

    async componentDidMount() {
        stopRender = Date.now();
        const number = stopRender - startRender;
        console.log(TAG + "componentDidMount" + "\trender time=" + number);
        this.timer = setInterval(() => {
            // this.move(1);
        }, 5000);
        await this.test();
        /*this.subscription = */DeviceEventEmitter.addListener('hoverEvent', (event) => {
           console.log("enevt="+event.result);
        })
    }

    componentWillReceiveProps() {
        console.log(TAG + "componentWillReceiveProps");
    }

    shouldComponentUpdate() {
        console.log(TAG + "shouldComponentUpdate");
        return true;
    }

    componentWillUpdate() {
        console.log(TAG + "componentWillUpdate");
    }

    componentDidUpdate() {
        console.log(TAG + "componentDidUpdate");
    }
    componentWillUnmount(){
        clearInterval(this.timer);
        // this.subscription.remove();
        console.log(TAG+"componentWillUnmount");
    }
    move(delta) {
        let page = this.state.page + delta;
        if (this.state.animationsAreEnabled) {
            this.viewPager.setPage(page);
        } else {
            this.viewPager.setPageWithoutAnimation(page);
        }
        //刷新了
        this.setState({page});
    }

    render() {
        return (
            <View style={styles.app_content}>
                <View style={styles.app_store_container}>
                    <View style={styles.app_store_recommend}>
                        {/*<ViewPagerAndroid*/}
                        {/*style={{flex: 1}}*/}
                        {/*initialPage={this.state.page}>*/}
                        {/*<View style={styles.app_store_spoon}>*/}
                        {/*<Text style={styles.slide}>Video</Text>*/}
                        {/*</View>*/}
                        {/*<View style={styles.app_store_spoon}>*/}
                        {/*<Text style={styles.slide}>Video</Text>*/}
                        {/*</View>*/}
                        {/*<View style={styles.app_store_spoon}>*/}
                        {/*<Text style={styles.slide}>Video</Text>*/}
                        {/*</View>*/}
                        {/*</ViewPagerAndroid>*/}

                        <Swiper width={920} height={500} horizontal={true} autoplay>
                            <View style={styles.app_store_spoon}>
                                <Text style={styles.slide}>Hello Swiper</Text>
                            </View>
                            <View style={styles.app_store_spoon}>
                                <Text style={styles.slide}>Beautiful</Text>
                            </View>
                            <View style={styles.app_store_spoon}>
                                <Text style={styles.slide}>And simple</Text>
                            </View>
                        </Swiper>
                    </View>


                    <View style={styles.app_store_right}>
                        <TouchableHighlight onPress={() => this.props.onPress()}
                                            title="APP">
                            <Image style={styles.topic_image}
                                   source={{uri: this.appStoreSubjectUri1}}>
                            </Image>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => this.props.onPress()}
                                            title="APP">
                            <Image style={styles.topic_image}
                                   source={{uri: this.appStoreSubjectUri2}}>
               </Image>

                        </TouchableHighlight>
                    </View>
                </View>

                <View style={styles.locale_app_container}>
                    <TouchableOpacity style={styles.more_app}
                                      onPress={() => MyIntentModule.startActivity(Activity.localeApp.pkg, Activity.localeApp.activityName, Activity.localeApp.action, 100)}>
                        <Image source={require("../res/mipmap-mdpi/app_more.png")}/>
                    </TouchableOpacity>
                    <View style={styles.favorite_app}>
                        <FlatList style={{
                            flex: 1
                        }}
                                  showsVerticalScrollIndicator={false}
                                  numColumns={6}
                                  horizontal={false}
                                  keyExtractor={item => item.key}
                                  data={favorite.favorite}
                                  renderItem={({item}) => {
                                      return (<ItemFavoriteApp
                                          onPress={() => this.props.onPress()}/>);
                                  }
                                  }
                        />
                    </View>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    app_content: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    app_store_container: {
        height: Dimen.appDimen.appStoreH,
        flexDirection: 'row',
        // backgroundColor: '#2f25ff',
        width: Dimen.appWidth,
    },

    app_store_recommend: {
        marginHorizontal: 40,
        width: 920,
        height: 500,
        backgroundColor: '#ff0000',
    },
    app_store_spoon: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 920,
        height: 400,
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },
    app_store_right: {
        justifyContent: 'center',
        height: 400,
    },
    topic_image: {
        width: 500,
        height: 250,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginVertical: 20,
        zIndex: 100,
        // position: 'absolute'
    },

    locale_app_container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: Dimen.appWidth,
        height: Dimen.appDimen.localeAppH,
    },
    more_app: {
        justifyContent: 'center',
        alignItems: 'center',
        // elevation: 40,
        zIndex: 100,
        transform: [],
    },
    favorite_app: {
        width: Dimen.appDimen.getFavoriteAppW,
        height: Dimen.appDimen.getFavoriteAppH,
        // width:600,
        // height: 200,
        flex: 1,
        marginHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#a0ff23",
        zIndex: 1,
    },
});