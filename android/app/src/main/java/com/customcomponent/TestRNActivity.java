package com.customcomponent;

import android.content.BroadcastReceiver;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.graphics.Color;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

public class TestRNActivity extends MrReactActivity {
    private static final String TAG = TestRNActivity.class.toString();


//    @Override
//    protected void onCreate(Bundle savedInstanceState) {
//        super.onCreate(savedInstanceState);
//        setContentView(R.layout.activity_test_rn);
//        final TextView textView = (TextView) findViewById(R.id.textView);
//        textView.setOnHoverListener(new View.OnHoverListener() {
//            @Override
//            public boolean onHover(View v, MotionEvent event) {
//                textView.setBackgroundColor(Color.RED);
//                return false;
//            }
//        });
//
//    }

    @Override
    protected String getMainComponentName() {
        return ReactPreLoader.getReactInfo().getMainComponentName();
    }

    @Override
    public ReactInfo getReactInfo() {
        return ReactPreLoader.getReactInfo();
    }
}
