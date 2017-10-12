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
    AppRegistry,
} from 'react-native';

import ItemVodDetails from "./ItemVodDetails";
import movies from "../assests/movies.json";


const api = 'https://api.douban.com/v2/movie/in_theaters';

export default class Details extends Component {

    // static navigationOptions = ({navigation}) => ({
    //     title: `${navigation.state.params.screen}`,
    // });

    constructor(props) {
        super(props);
    }

    // static navigationOptions = {
    //     title: null,
    //     header: null,
    // };

    // params = this.props.navigation.state.params;

    state = {
        movies: movies.subjects,
        refreshing: false,
        loading: true,
        childState: '',
    };

    /* toolbarActions = [
     {title: 'Create', icon: require('../res/mipmap-mdpi/search.png'), show: 'always'},
     {title: 'Filter'},
     {title: 'Settings', icon: require('../res/mipmap-mdpi/search.png'), show: 'always'},
     ];*/

    refreshing = false;
    start = 0;
    count = 8;


    fetchData = (start = 0, count = 8) => {
        if (this.refreshing) {
            return;
        }
        this.setState({
            refreshing: true,
        });
        this.refreshing = true;
        return fetch(`${api}?start=${start}&count=${count}`)
            .then((response) => {
                let text = response.text();
                return text;
            })
            .then((responseText) => {
                const json = JSON.parse(responseText);
                this.setState({
                    // movies: json.subjects,
                    refreshing: false,
                });
                this.refreshing = false;
                return json;
            })
            .catch((error) => {
                console.error(error);
            })
    };


    refreshData = async () => {
        const json = await this.fetchData();
        this.setState({
            movies: json.subjects,
        });
    };
    fetchMore = async () => {
        const json = await this.fetchData(this.start, this.count);
        if (json) {
            this.start += this.count - 1;
            this.setState({
                movies: this.state.movies.concat(json.subjects),
            });
        }
    };

    async componentDidMount() {
        await this.fetchMore();
        this.setState({
            // loading: false,
        });
    }

    render() {
        // The screen's current route is passed in to `props.navigation.state`:
        // const {params} = this.props.navigation.state;
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
                        <FlatList
                            // style={styles.row}
                            initialNumToRender={16}
                            showsVerticalScrollIndicator={false}
                            numColumns={4}
                            keyExtractor={item => item.id}
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
                                        image={item.images.medium}
                                        loading={loading}
                                        onPress={() => navigate('Detail', {
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

AppRegistry.registerComponent('RN', () => Details);