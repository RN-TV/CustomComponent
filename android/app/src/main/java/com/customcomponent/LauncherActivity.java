package com.customcomponent;

import android.animation.ObjectAnimator;
import android.content.Intent;
import android.graphics.Color;
import android.support.v4.view.PagerAdapter;
import android.support.v4.view.ViewPager;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.LinearLayout;

import com.customcomponent.pager.DepthPageTransformer;
import com.customcomponent.pager.ZoomOutPageTransformer;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.views.viewpager.ReactViewPager;

import java.util.ArrayList;
import java.util.List;

public class LauncherActivity extends AppCompatActivity implements View.OnClickListener {

    private static final String TAG = LauncherActivity.class.toString();
    private int[] images = {R.mipmap.ic_launcher, R.mipmap.launcher_bj, R.mipmap.ic_launcher};
    private List<ImageView> totalList = new ArrayList<ImageView>();// viewpager的数据源
    private Button mBtnLeft;
    private Button mBtnRight;
    private ViewPager mViewPager;

    int initPosition = 0;
    private int currentPosition = initPosition;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        mViewPager = new ViewPager(this);
        mViewPager.setBackgroundColor(Color.RED);
        setContentView(R.layout.launcher_activity);
        LinearLayout layout = (LinearLayout) findViewById(R.id.ll_container);
        mBtnLeft = (Button) findViewById(R.id.btn_left);
        mBtnRight = (Button) findViewById(R.id.btn_right);
        registerListener();


        layout.addView(mViewPager, 1);

        mViewPager.setOffscreenPageLimit(1);// 设置viewpager中左右各自预加载的页码
        // step2：提供数据源：要展示的所有的view，放到数据源：List<ImageView>
        for (int i = 0; i < images.length; i++) {
            // A:创建ImgageView
            ImageView imageView = new ImageView(this);
            // B:设置图片
            imageView.setImageResource(images[i]);
            // C:添加到lsit中
            totalList.add(imageView);
        }
        // step3：创建适配器
        MyPagerAdapter adapter = new MyPagerAdapter();
        // step4：设置适配器
        mViewPager.setAdapter(adapter);
        // step5：添加监听，当viewpager中的page页改变的时候
        mViewPager.addOnPageChangeListener(new ViewPager.OnPageChangeListener() {
            /**
             * 当前的viewpager中的某一个page页被选中，就会执行此方法
             *
             * @param position
             */
            @Override
            public void onPageSelected(int position) {
                Log.i("tag", "==onPageSelected:postion:" + position);
            }

            /**
             * 当前viewpager发生滑动的时候，执行的回调方法；
             *
             * @param position 正在滑动的pager页的下标
             *            ：
             * @param positionOffset
             *            ：当前正在滑动的page页，距离屏幕左边或右边的偏移量：[0,1)
             * @param positionOffsetPixels 当前正在滑动的page页
             *            ，距离屏幕左边或者右边的偏移量的像素。 :
             */
            @Override
            public void onPageScrolled(int position, float positionOffset,
                                       int positionOffsetPixels) {
                Log.i("tag", "===onPageScrolled:postion:" + position
                        + ",positionOffset:" + positionOffset
                        + ",positionOffsetPixels" + positionOffsetPixels);
            }

            /**
             * 当page页滑动状态被改变的时候执行的方法。点击屏幕，也能够监听到。
             *
             * @param state
             */
            @Override
            public void onPageScrollStateChanged(int state) {
                switch (state) {
                    case ViewPager.SCROLL_STATE_IDLE:
                        // 停止拖拽
                        Log.i("tag",
                                "===========onPageScrollStateChanged,SCROLL_STATE_IDLE"
                                        + ViewPager.SCROLL_STATE_IDLE);
                        break;

                    case ViewPager.SCROLL_STATE_DRAGGING:
                        // 正在拖拽
                        Log.i("tag",
                                "=========onPageScrollStateChanged,SCROLL_STATE_DRAGGING"
                                        + ViewPager.SCROLL_STATE_DRAGGING);
                        break;
                    case ViewPager.SCROLL_STATE_SETTLING:
                        // 最后在落在某一个page页上。
                        Log.i("tag",
                                "===========onPageScrollStateChanged,SCROLL_STATE_SETTLING"
                                        + ViewPager.SCROLL_STATE_SETTLING);
                        break;
                }
            }
        });
        
        /*reactViewPager.setPageTransformer(true, new ViewPager.PageTransformer() {
            @Override
            public void transformPage(View page, float position) {
                Log.d(TAG, "transformPage: position="+position);
                if(page instanceof ImageView){
                    Log.d(TAG, "transformPage: ImageView");
                }

//                float curTranslationX = page.getTranslationX();
//                ObjectAnimator animator = ObjectAnimator.ofFloat(page, "translationX", curTranslationX, -500f, curTranslationX);
//                animator.setDuration(5000);
//                animator.start();

                float alpha = 0.0f;
                if (0.0f <= position && position <= 1.0f) {
                    alpha = 1.0f - position;
                } else if (-1.0f <= position && position < 0.0f) {
                    alpha = position + 1.0f;
                }
                page.setAlpha(alpha);
            }
        });*/
        mViewPager.setPageTransformer(true, new DepthPageTransformer());
    }

    private void registerListener() {
        mBtnLeft.setOnClickListener(this);
        mBtnRight.setOnClickListener(this);
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.btn_left:
                move(-1);
                break;
            case R.id.btn_right:
                move(1);
                break;
        }
    }

    private void move(int positon) {
        currentPosition = currentPosition + positon;
        if (currentPosition < 0) {
            currentPosition = 2;
            mViewPager.setCurrentItem(currentPosition, true);
        } else if (currentPosition > 2) {
            currentPosition = initPosition;
            mViewPager.setCurrentItem(currentPosition, true);
        } else {
            mViewPager.setCurrentItem(currentPosition, true);
        }
    }

    // 创建一个子类，继承PagerAdapter
    class MyPagerAdapter extends PagerAdapter {
        /**
         * 当前加载到adapter中的item的个数。要展示的是view的总个数，其实就是数据源大大小。
         */
        @Override
        public int getCount() {
            return totalList.size();
        }

        /**
         * 根据位置，实例化要展示的item项。viewpager中要展示的view
         * <p>
         * 第一个参数：ViewGroup container，被实例化的view，的容器。此处就是viewPager。
         * <p>
         * 第二个参数：int position,当时实例化的item的下标。
         * <p>
         * 返回值：就是实例化的item。
         */
        @Override
        public Object instantiateItem(ViewGroup container, int position) {
            // Log.i("tag", "===instantiateItem,position:" + position);
            // A:根据位置获取到要展示的view，从数据源中获取
            ImageView imageView = totalList.get(position);
            // B:将根据位置，从数据源中获取到的view，添加到viewpager中。--->container.
            container.addView(imageView);
            // C:返回该view对象即可。
            return imageView;
        }

        /**
         * 此方法，其实是安全验证：viewpager中加载的view，是否是instantiateItem()中的返回值，
         * 就是实例化出的的object
         */
        @Override
        public boolean isViewFromObject(View arg0, Object arg1) {
            return arg0 == arg1;
        }

        /**
         * 根据postion销毁item：销毁viewpager中不用的item
         * <p>
         * 第一个参数：ViewGroup container，表示当前要移除pager页的控件，此处就是viewpager
         * <p>
         * 第二个参数：int position，要移除的item的下标
         * <p>
         * 第三个参数：Object object，要被销毁的对象
         */
        @Override
        public void destroyItem(ViewGroup container, int position, Object object) {
            // Log.i("tag", "===destroyItem,position:" + position);
            // super.destroyItem(container, position, object);最好删除，否则容易异常
            // 将container中不要的pager页移除
            // 方法一：根据位置删除
            container.removeView(totalList.get(position));
            // 方法二：根据对象
            // container.removeView((ImageView) object);
        }

    }


    @Override
    protected void onResume() {
        super.onResume();
    }
}
