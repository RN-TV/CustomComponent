package com.customcomponent;

import android.content.ContentResolver;
import android.content.Context;
import android.database.Cursor;
import android.net.Uri;
import android.os.Build;
import android.support.annotation.Nullable;
import android.util.ArrayMap;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.IllegalViewOperationException;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by pm on 17-8-4.
 */

public class DataModule extends ReactContextBaseJavaModule {
    private static final String TAG = DataModule.class.toString();
    private Context mContext;
    private Map<String, String> map;
    private DeviceEventManagerModule.RCTDeviceEventEmitter emitter;
    private final String[] url = {
            "http://img.lenovomm.com/s3/img/app/app-img-lestore/6414-2017-07-14023234-1500013954113.jpg",
            "http://img.lenovomm.com/s3/img/app/app-img-lestore/6733-2017-08-02043725-1501663045154.jpg",
            "http://img.lenovomm.com/s3/img/app/app-img-lestore/5304-2017-06-28043821-1498639101734.jpg"
    };

    public static final String HOME_URI = "content://com.lenovo.dll.nebula.vod.service.content/";
    public static final String RECOMMENDATION_URI = HOME_URI + "recommendation";
    public static final String CATEGORY_URI = HOME_URI + "category";
    public static final String TRAILER_URI = HOME_URI + "trailer";

    private static final String[] RECOMMENDATION_PROJECTION = new String[]{
            "media_id", "title", "pic_bit", "type", "rated"
    };
    private static final String[] CATEGORY_PROJECTION = new String[]{
            "category_code", "category_name", "category_url", "template", "icon_url",
            "icon_focus_url"
    };
    private static final String[] TRAILER_PROJECTION = new String[]{
            "title", "image", "video_url", "category_channel", "category_name", "category_url",
            "category_template", "video_id", "pause_time"
    };
    private ContentResolver mContentResolver;

    public DataModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.mContext = reactContext;
        mContentResolver = mContext.getContentResolver();
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
//        callback.invoke(url[0], url[1], url[2]);
        callback.invoke(url);
    }

    //
    @ReactMethod
    public void getTitleUrl(Callback callback) {
        callback.invoke("无法获取天气信息。。。");
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

    public void sendEvent(String hover) {
        WritableMap params = Arguments.createMap();
        params.putString("result", hover);
        getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("hoverEvent", params);
    }

    @ReactMethod
    public void getTrailer() {
        Log.d(TAG, "getTrailer: ");
       doQuery(TRAILER_URI, TRAILER_PROJECTION);
        WritableArray array = Arguments.createArray();
//        callback.invoke(array);
    }

    @ReactMethod
    public void getCategory() {
        Log.d(TAG, "getCategory: ");
       doQuery(CATEGORY_URI, CATEGORY_PROJECTION);
    }

    @ReactMethod
    public void getRecommendation() {
        Log.d(TAG, "getRecommendation: ");
        doQuery(RECOMMENDATION_URI, RECOMMENDATION_PROJECTION);
//        callback.invoke(objects);
    }

    private void doQuery(String strUri, String[] projection) {
        Uri uri = Uri.parse(strUri);
        Cursor cursor = mContentResolver.query(uri, projection, null, null, null);
        if (cursor != null) {
            int columnCount = cursor.getColumnCount();
            int count = cursor.getCount();
            Log.d(TAG, "doQuery: columnCount=" + columnCount + "\tcount=" + count);

            if (cursor.moveToFirst()) {

                do {
                    Object[] values = getValues(cursor, projection);
                    for (Object object : values) {
                        Log.d(TAG, "doQuery: object=" + object);
                    }

                } while (cursor.moveToNext());
            }
        }
        cursor.close();
    }

    private Object[] getValues(Cursor cursor, String[] columnNames) {
        int length = columnNames.length;
        Object[] values=new Object[length];
        WritableMap map = Arguments.createMap();
        for (int i = 0; i < length; ++i) {
            int columnIndex = cursor.getColumnIndex(columnNames[i]);
            switch (cursor.getType(columnIndex)) {
                case Cursor.FIELD_TYPE_STRING:
                    values[i] = cursor.getString(columnIndex);
                    map.putString(columnNames[i],cursor.getString(columnIndex));
                    break;
                case Cursor.FIELD_TYPE_BLOB:
                    values[i] = cursor.getBlob(columnIndex);
                    break;
                case Cursor.FIELD_TYPE_INTEGER:
                    values[i] = cursor.getInt(columnIndex);
                    break;
                case Cursor.FIELD_TYPE_FLOAT:
                    values[i] = cursor.getFloat(columnIndex);
                    break;
            }
        }

        return values;
    }

}
