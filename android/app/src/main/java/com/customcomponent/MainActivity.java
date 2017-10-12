package com.customcomponent;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;
import android.os.PersistableBundle;
import android.support.annotation.Nullable;
import android.util.Log;
import android.view.KeyEvent;
import android.view.MotionEvent;

import com.customcomponent.splash.SplashScreen;
import com.facebook.react.ReactActivity;
import com.facebook.react.bridge.ReactApplicationContext;

public class MainActivity extends ReactActivity /*MrReactActivity*/ {

    private static final String TAG = MainActivity.class.toString();
    private BroadcastReceiver mBroadcastReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            String action = intent.getAction();

            Log.d(TAG, "onReceive: action=" + action);
            if (action.equals(Intent.ACTION_TIME_CHANGED)) {
                mDataModule.sendEvent("hover");
            }
        }
    };
    private DataModule mDataModule;

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "CustomComponent";
//        return ReactPreLoader.getRecatInfo().getMainComponentName();
    }

    /*@Override
    public ReactInfo getReactInfo() {
        return ReactPreLoader.getRecatInfo();
    }*/

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        SplashScreen.show(this,true);
        ReactPreLoader.init(this, new ReactInfo("RN", null));

        super.onCreate(savedInstanceState);
        Log.d(TAG, "onCreate: ");
        mDataModule = MainApplication.getReactPackage().getDataModule();

        registerBroadcast();
    }

    private void registerBroadcast() {
        IntentFilter filter = new IntentFilter();
        filter.addAction(Intent.ACTION_TIME_CHANGED);
        registerReceiver(mBroadcastReceiver, filter);
    }

    @Override
    public boolean dispatchGenericMotionEvent(MotionEvent ev) {
        int action = ev.getAction();
//        Log.d(TAG, "dispatchGenericMotionEvent: action="+action);
        MainApplication.getReactPackage().getDataModule().sendEvent(String.valueOf(action));
        return super.dispatchGenericMotionEvent(ev);
    }

    @Override
    public boolean dispatchKeyEvent(KeyEvent event) {
        int keyCode = event.getKeyCode();
        Log.d(TAG, "dispatchKeyEvent: keyCode="+keyCode);
        MainApplication.getReactPackage().getDataModule().sendEvent(String.valueOf(keyCode));
        return super.dispatchKeyEvent(event);
    }

    @Override
    public boolean dispatchTouchEvent(MotionEvent ev) {
        return super.dispatchTouchEvent(ev);
    }

    @Override
    protected void onDestroy() {
        unregisterReceiver(mBroadcastReceiver);
        super.onDestroy();
    }
}
