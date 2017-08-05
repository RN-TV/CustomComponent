/**
 * Created by pm on 17-8-1.
 */
const ACTIVITY = {
    weather: {
        pkg: "",
        activityName: "",
        action: "",
    },
    kidsmode: {
        pkg: "com.lenovo.nova.childrencontrol",
        activityName: "com.lenovo.nova.childrencontrol.MainActivity",
        action: "",
    },
    userspace: {
        pkg: "com.lenovo.userspace",
        activityName: "com.lenovo.userspace.WelcomeActivity",
        action: "",
    },
    netWork: {
        pkg: "com.lenovo.nova.settings",
        activityName: "com.lenovo.nova.settings.MainActivity",
        action: "android.settings.NETWORK_SETTINGS",
    },
    localeApp:{
        pkg: "com.lenovo.nebula.app",
        activityName: "com.lenovo.nebula.app.NebulaAppActivity",
        action: "lenovo.action.app_list.nebula",
    }
};

export default ACTIVITY;