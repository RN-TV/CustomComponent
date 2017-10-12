package com.customcomponent.video;

import android.support.annotation.Nullable;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;

import java.util.Map;

/**
 * Created by pm on 17-8-17.
 */

public class ReactVideo extends SimpleViewManager<Video> {
    private static final int COMMAND_PAUSE_ID = 1;
    private static final String COMMAND_PAUSE_NAME = "pause";
    private static final int COMMAND_START_ID = 2;
    private static final String COMMAND_START_NAME = "start";

    @Override
    public String getName() {
        return "RV";
    }

    @Override
    protected Video createViewInstance(ThemedReactContext reactContext) {
        Video view = new Video(reactContext);
        return view;
    }

    @Nullable
    @Override
    public Map<String, Integer> getCommandsMap() {
        return MapBuilder.of(
                COMMAND_PAUSE_NAME, COMMAND_PAUSE_ID,
                COMMAND_START_NAME, COMMAND_START_ID
        );
    }

    @Override
    public void receiveCommand(Video root, int commandId, @Nullable ReadableArray args) {
        switch (commandId) {
            case COMMAND_PAUSE_ID:
                root.pause();
                break;
            case COMMAND_START_ID:
                root.restart();
                break;
            default:
                break;
        }
    }
}
