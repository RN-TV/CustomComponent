package com.customcomponent.video;

import android.content.ComponentName;
import android.content.Context;
import android.media.MediaPlayer;
import android.net.Uri;
import android.util.AttributeSet;
import android.view.SurfaceHolder;
import android.view.SurfaceView;

import java.io.IOException;

import static com.facebook.react.bridge.UiThreadUtil.runOnUiThread;

/**
 * Created by pm on 17-8-17.
 */

public class Video extends SurfaceView implements SurfaceHolder.Callback2 {
    private Context mContext;

    private MediaPlayer player;
    String strUrl = "http://42.7.24.132/topvideo/d4d304215a078744c3c0b87bb90d7eae.mp4?sn=___SN___";
    SurfaceHolder holder;

    public Video(Context context) {
        super(context);
        init(context);
    }

    public Video(Context context, AttributeSet attrs) {
        super(context, attrs);
        init(context);

       /* try {
            player.setDataSource(context, Uri.parse(uri));
            holder=this.getHolder();
            holder.addCallback(this);
            player.prepare();
            player.setOnPreparedListener(new MediaPlayer.OnPreparedListener() {
                @Override
                public void onPrepared(MediaPlayer mp) {
                    player.start();
                    player.setLooping(true);
                }
            });
        } catch (IOException e) {
            e.printStackTrace();
        }*/
    }

    public Video(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init(context);

    }

    /*public Video(Context context, AttributeSet attrs, int defStyleAttr, int defStyleRes) {
        super(context, attrs, defStyleAttr, defStyleRes);
        init(context);
    }*/

    private void init(Context context) {
        this.mContext = context;
        holder=getHolder();
        holder.addCallback(this);
//        play();
    }

    public void restart() {
        player.start();
    }

    public void pause() {
        player.pause();
    }

    @Override
    public void surfaceRedrawNeeded(SurfaceHolder holder) {

    }

    @Override
    public void surfaceCreated(SurfaceHolder holder) {
        if(false){
            return;
        }
        if (player == null) {
            player = new MediaPlayer();
//            Uri uri = Uri.parse("android.resource://" + getPackageName() + "/" + R.raw.video_test);
            Uri uri = Uri.parse(strUrl);
            //拿到SurfaceView的控制器
            player.reset();//重置MediaPlayer到尚未初始化状态
            try {
                player.setDataSource(mContext, uri);
                player.setDisplay(holder);
                player.prepare();//准备播放
                player.start();
//                player.seekTo(currentPosition);//接着上一次退出时的位置播放

            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public void surfaceChanged(SurfaceHolder holder, int format, int width, int height) {

    }

    @Override
    public void surfaceDestroyed(SurfaceHolder holder) {
        //销毁时停止播放，同时记录当前播放的位置
        if (player != null) {
//            currentPosition = player.getCurrentPosition();
            player.stop();
            player.release();
            player = null;
        }
    }

    private void play() {
        new Thread() {
            @Override
            public void run() {
                /*
                1.首先等待一段时间，等待SurfaceView可见
                 */
                try {
                    Thread.sleep(200);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }

                //在UI线程中执行
                runOnUiThread(new Runnable() {

                    @Override
                    public void run() {
//                        Uri uri = Uri.parse("android.resource://" + getPackageName() + "/" + R.raw.video_test);
                        Uri uri = Uri.parse(strUrl);
                        //拿到SurfaceView的控制器
                        player = new MediaPlayer();
                        player.reset();//重置MediaPlayer到尚未初始化状态
                        try {
                            player.setDataSource(mContext, uri);
                            player.setDisplay(holder);
                            player.prepare();//准备播放
                            player.start();

                        } catch (IOException e) {
                            e.printStackTrace();
                        }

                    }
                });

            }
        }.start();
    }
}
