package com.customcomponent;

import android.app.Activity;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;

import com.facebook.react.bridge.JSApplicationIllegalArgumentException;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by pm on 17-7-31.
 */

public class MyIntentModule extends ReactContextBaseJavaModule {
    private Context mContext;

    public MyIntentModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.mContext = reactContext;
    }

    @Override
    public String getName() {
        return "MyIntentModule";
    }


    @ReactMethod
    public void startActivityForName(String activityName, int requestCode) {
        try {
            Activity currentActivity = getCurrentActivity();
            if (null != currentActivity) {
                Class aimActivity = Class.forName(activityName);
                Intent intent = new Intent(currentActivity,aimActivity);
//                currentActivity.startActivityForResult(intent, requestCode);
                currentActivity.startActivity(intent);
//                String result=MyConstants.myBlockingQueue.take();
//                successCallback.invoke(result);
            }

        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            throw new JSApplicationIllegalArgumentException(
                    "Could not open the activity : " + e.getMessage());
        }
    }
    @ReactMethod
    public void startActivity(String pkg,String activityName,String action,int requestCode){
        Activity currentActivity = getCurrentActivity();
        if(currentActivity!=null){
            Intent intent=new Intent();
            intent.setAction(action);
            intent.setClassName(pkg,activityName);
            currentActivity.startActivity(intent);
        }
    }
}
