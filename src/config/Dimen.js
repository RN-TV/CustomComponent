/**
 * Created by pm on 17-7-27.
 */
import {Dimensions} from "react-native";
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const dimen = {
    screenWidth: screenWidth,
    screenHeight: screenHeight,
    appWidth: screenWidth * (90 / 100),
    appHeight: 10,
    appDimen: {
        appStoreW: undefined,
        appStoreH: screenHeight * (50 / 100),
        localeAppW: screenWidth * (90 / 100),
        localeAppH: screenHeight * (30 / 100),
        favoriteAppW: (this.localeAppW) * (70 / 100),
        favoriteAppH: this.localeAppH,
        get getFavoriteAppW() {
            "use strict";
            return (this.localeAppW) * (85 / 100)
        },
        get getFavoriteAppH() {
            "use strict";
            return this.localeAppH;
        },
    },

    vodWidth: this.appWidth,
    vodHeight: this.appHeight,
};
export default dimen;