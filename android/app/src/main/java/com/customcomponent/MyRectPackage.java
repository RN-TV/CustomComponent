package com.customcomponent;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

/**
 * Created by pm on 17-7-19.
 */

public class MyRectPackage implements ReactPackage {

    private  DataModule mDataModule;

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> nativeModules = new ArrayList<>();
        nativeModules.add(new ToastNative(reactContext));
        nativeModules.add(new MyIntentModule(reactContext));
        mDataModule = new DataModule(reactContext);
        nativeModules.add(mDataModule);
        return nativeModules;
    }

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    public  DataModule getDataModule(){
        return this.mDataModule;
    }
}
