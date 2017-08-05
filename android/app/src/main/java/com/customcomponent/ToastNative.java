package com.customcomponent;

import android.content.Context;
import android.graphics.drawable.BitmapDrawable;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.PopupWindow;
import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by pm on 17-7-19.
 */

public class ToastNative extends ReactContextBaseJavaModule {
    private Context mContext;
    public ToastNative(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext=reactContext;

    }

    @Override
    public String getName() {
        return "ToastNative";
    }

    @ReactMethod
    public void show(String message, int duration) {
        Toast.makeText(getReactApplicationContext(), message, Toast.LENGTH_LONG).show();
    }
    @ReactMethod
    public void showPopWindow(){
        View view = LayoutInflater.from(mContext).inflate(R.layout.weather_layout, null);
        PopupWindow popupWindow=new PopupWindow(view);
        popupWindow.setHeight(370);
        popupWindow.setWidth(650);
        popupWindow.setBackgroundDrawable(new BitmapDrawable());
        popupWindow.setFocusable(true);
        popupWindow.showAtLocation(view, Gravity.LEFT | Gravity.TOP, 40, 60);
    }
}
