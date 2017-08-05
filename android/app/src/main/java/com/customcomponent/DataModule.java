package com.customcomponent;

import android.os.Build;
import android.support.annotation.Nullable;
import android.util.ArrayMap;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.IllegalViewOperationException;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by pm on 17-8-4.
 */

public class DataModule extends ReactContextBaseJavaModule {
    private Map<String, String> map;
    private DeviceEventManagerModule.RCTDeviceEventEmitter emitter;
    private final String[] url = {
            "http://img.lenovomm.com/s3/img/app/app-img-lestore/6414-2017-07-14023234-1500013954113.jpg",
            "http://img.lenovomm.com/s3/img/app/app-img-lestore/6733-2017-08-02043725-1501663045154.jpg",
            "http://img.lenovomm.com/s3/img/app/app-img-lestore/5304-2017-06-28043821-1498639101734.jpg"
    };

    public DataModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "DataModule";
    }

    @ReactMethod
    public void getAppScreenImageUrl(Callback callback) {
        /*if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            map = new ArrayMap<String, String>();
        } else {
            map = new HashMap<String, String>();
        }
        map.put("AppStoreRecommend", url[0]);
        map.put("AppStoreSubject1", url[1]);
        map.put("AppStoreSubject2", url[2]);*/
        callback.invoke(url[0],url[1],url[2]);
    }

    //
    @ReactMethod
    public void getTitleUrl(Callback callback) {
        callback.invoke("无法获取天气信息");
    }

    @ReactMethod
    public void getVideoUrl(String barcodeData) {

    }


    @ReactMethod
    public void measureLayout(
            int tag,
            int ancestorTag,
            Promise promise) {
        try {
            WritableMap map = Arguments.createMap();
            map.putDouble("relativeX", 1);
            map.putDouble("relativeY", 1);
            map.putDouble("width", 2);
            map.putDouble("height", 3);

            promise.resolve(map);
        } catch (IllegalViewOperationException e) {
            promise.reject(e);
        }
    }

    public void sendEvent(String hover){
        WritableMap params = Arguments.createMap();
        params.putString("result", hover);
        getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("hoverEvent", params);
    }

}
