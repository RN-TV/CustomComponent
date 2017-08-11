package com.customcomponent;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;
import android.os.PersistableBundle;
import android.support.annotation.Nullable;
import android.util.Log;

import com.customcomponent.splash.SplashScreen;
import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity /*MrReactActivity*/ {

    private static final String TAG = MainActivity.class.toString();
    private BroadcastReceiver mBroadcastReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            String action = intent.getAction();

            Log.d(TAG, "onReceive: action=" + action);
            if (action.equals(Intent.ACTION_TIME_CHANGED)) {
                MainApplication.getReactPackage().getDataModule().sendEvent("hover");
            }
        }
    };

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
        super.onCreate(savedInstanceState);
        Log.d(TAG, "onCreate: ");
        registerBroadcast();
    }

    private void registerBroadcast() {
        IntentFilter filter = new IntentFilter("rn.action");
        filter.addAction(Intent.ACTION_TIME_CHANGED);
        registerReceiver(mBroadcastReceiver, filter);
    }
}
