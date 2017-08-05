package com.customcomponent;

import android.content.ComponentName;
import android.content.Intent;
import android.graphics.Color;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.MotionEvent;
import android.view.View;
import android.widget.TextView;

public class TestRNActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_test_rn);
        final TextView textView = (TextView) findViewById(R.id.textView);
        textView.setOnHoverListener(new View.OnHoverListener() {
            @Override
            public boolean onHover(View v, MotionEvent event) {
                textView.setBackgroundColor(Color.RED);
                return false;
            }
        });

        textView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent();

                intent.setComponent(new ComponentName("com.lenovo.userspace", "com.lenovo.userspace.WelcomeActivity"));
                startActivity(intent);

            }
        });
    }
}
