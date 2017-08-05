package com.customcomponent;

import android.app.Activity;
import android.view.ViewParent;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactRootView;

/**
 * Created by pm on 17-8-1.
 */

public class RNCacheViewManager {
    private static ReactRootView mRootView = null;
    private static ReactInstanceManager mManager = null;

    public static ReactRootView getRootView() {
        return mRootView;
    }

    protected static ReactNativeHost getReactNativeHost(Activity activity) {
        return ((ReactApplication) activity.getApplication()).getReactNativeHost();
    }

    public static void init(Activity activity) {
        if (mManager == null) {
            mManager = getReactNativeHost(activity).getReactInstanceManager();
        }
        mRootView = new ReactRootView(activity);
        mRootView.startReactApplication(mManager, "CustomComponent", null);
    }

    public static void onDestroy() {
        try {
            ViewParent parent = getRootView().getParent();
            if (parent != null) {
                ((android.view.ViewGroup) parent).removeView(getRootView());
            }
        } catch (Throwable e) {
            e.printStackTrace();
        }
    }

}