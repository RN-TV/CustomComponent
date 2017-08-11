/**
 * Created by pm on 17-8-9.
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

import ItemVodDetails from "./ItemVodDetails";
import movies from "../assests/movies.json";


export default class VodList extends Component {

    static navigationOptions = ({navigation}) => ({
        title: `${navigation.state.params.screen}`,
    });

    constructor(props) {
        super(props);
    }

    // static navigationOptions = {
    //     title: null,
    //     header: null,
    // };

    params = this.props.navigation.state.params;

    state = {
        movies: [],
        refreshing: false,
        loading: true,
        childState: '',
    };

    /* toolbarActions = [
     {title: 'Create', icon: require('../res/mipmap-mdpi/search.png'), show: 'always'},
     {title: 'Filter'},
     {title: 'Settings', icon: require('../res/mipmap-mdpi/search.png'), show: 'always'},
     ];*/

    isRefreshing = false;
    start = 0;
    count = 16;
    urlList = [];

    fetchBaseUrl = () => {
        return fetch(`${this.params.url}`)
            .then((response) => {
                let text = response.text();
                return text;
            })
            .then((responseText) => {
                const json = JSON.parse(responseText);
                // this.setState({
                //     // movies: json.subjects,
                //     refreshing: false,
                // });
                return json;
            })
            .catch((error) => {
                console.error(error);
            })
    };

    fetchData = async () => {
        const baseUrl = await this.fetchBaseUrl();
        this.urlList = baseUrl;
        console.log("baseUrl=" + this.urlList[0].url);

        if (this.isRefreshing) {
            return;
        }
        this.setState({
            refreshing: true,
        });
        this.isRefreshing = true;

        return fetch(`${this.urlList[0].url}`)
            .then((response) => {
                let text = response.text();
                return text;
            })
            .then((responseText) => {
                const json = JSON.parse(responseText);
                // this.setState({
                //     // movies: json.subjects,
                //     refreshing: false,
                // });
                this.isRefreshing = false;
                return json;
            })
            .catch((error) => {
                console.error(error);
            })
    };


    refreshData = async () => {
        const json = await this.fetchData();
        this.setState({
            movies: json.objects,
        });
    };
    fetchMore = async () => {
        const json = await this.fetchData(this.start, this.count);
        /*if (json) {
         this.start += this.count - 1;
         this.setState({
         movies: this.state.movies.concat(json.objects),
         });
         }*/
        this.setState({
            movies: json.objects,
        })
    };

    async componentDidMount() {
        await this.fetchMore();
        this.setState({
            loading: false,
        });
    }

    render() {
        // The screen's current route is passed in to `props.navigation.state`:
        const {params} = this.props.navigation.state;
        const {navigate} = this.props.navigation;
        const {movies, refreshing, loading} = this.state;
        return (
            <ImageBackground style={styles.rootContainer}
                             source={require("../res/mipmap-mdpi/launcher_bj.png")}>
                {/*<ToolbarAndroid
                 style={styles.toolbar}
                 title={"Toolbar"}
                 subtitle="副标题"
                 actions={this.toolbarActions}
                 navIcon={require('../res/mipmap-mdpi/search.png')}
                 logo={require('../res/mipmap-mdpi/search.png')}/>*/}
                <View style={{height: 5, width: 1920, backgroundColor: "#ffffff"}}/>

                <View style={styles.content}>
                    {!loading ?
                        <FlatList
                            // style={styles.row}
                            initialNumToRender={12}
                            showsVerticalScrollIndicator={false}
                            numColumns={4}
                            keyExtractor={item => item.item_pk}
                            data={movies}
                            onRefresh={this.refreshData}
                            onEndReached={this.fetchMore}
                            onEndReachedThreshold={0}
                            refreshing={refreshing}
                            ListFooterComponent={() => {
                                return refreshing &&
                                    <ActivityIndicator size="large"/>
                            }}
                            renderItem={({item}) => {

                                return (
                                    <ItemVodDetails
                                        title={item.title}
                                        image={item.image}
                                        loading={false}
                                        onPress={() => navigate('Detail', {
                                            screen: 'Detail',
                                            id: item.id,
                                            callback: (data) => {
                                                this.setState({
                                                    childState: data
                                                })
                                            }
                                        })}
                                    />)
                            }
                            }
                        />
                        :

                        <ActivityIndicator size="large" style={styles.loading}/>
                    }
                </View>

            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    rootContainer: {
        justifyContent: "flex-start",
        alignItems: "center",
        flex: 1,
    },
    toolbar: {
        backgroundColor: '#1a28ed',
        height: 56,
    },
    loading: {
        marginTop: 100,
    },
    content: {
        marginVertical: 40,
        width: "90%",
        height: "85%",
        justifyContent: "center",
        alignItems: "center",
    },
});