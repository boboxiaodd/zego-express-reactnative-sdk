package im.zego.reactnative;

import android.opengl.GLES11;
import android.opengl.GLES11Ext;
import android.opengl.GLES20;
import android.os.Build;
import android.os.SystemClock;
import android.util.Log;

import com.faceunity.core.entity.FURenderInputData;
import com.faceunity.core.entity.FURenderOutputData;

import java.nio.ByteBuffer;
import java.util.Objects;
import java.util.concurrent.TimeUnit;

import im.zego.zegoexpress.ZegoExpressEngine;
import im.zego.zegoexpress.callback.IZegoCustomVideoProcessHandler;
import im.zego.zegoexpress.constants.ZegoPublishChannel;
import im.zego.zegoexpress.constants.ZegoVideoFrameFormat;
import im.zego.zegoexpress.entity.ZegoVideoFrameParam;

public class ZegoCustomVideoProcessManager {

    private static ZegoCustomVideoProcessManager singleton;

    private IZegoReactNativeCustomVideoProcessHandler mHandler;

    /**
     * Get the custom video capture manager instance
     */
    public static synchronized ZegoCustomVideoProcessManager getInstance() {
        if (singleton == null) {
            singleton = new ZegoCustomVideoProcessManager();
        }
        return singleton;
    }

    public void setCustomVideoProcessHandler(IZegoReactNativeCustomVideoProcessHandler handler) {
        mHandler = handler;
    }

    public IZegoCustomVideoProcessHandler rtcVideoProcessHandler = new IZegoCustomVideoProcessHandler() {
        private ByteBuffer byteBuffer;
        @Override
        public void onStart(ZegoPublishChannel channel) {
            super.onStart(channel);

            if (mHandler != null) {
                mHandler.onStart(channel.value());
            }
        }

        @Override
        public void onStop(ZegoPublishChannel channel) {
            super.onStop(channel);

            if (mHandler != null) {
                mHandler.onStop(channel.value());
            }
        }

        @Override
        public void onCapturedUnprocessedTextureData(int textureID, int width, int height, long referenceTimeMillisecond, ZegoPublishChannel channel) {
            super.onCapturedUnprocessedTextureData(textureID, width, height, referenceTimeMillisecond, channel);
            if (mHandler != null) {
                textureID = mHandler.onProcessImage(textureID, width, height);
            }
            ZegoExpressEngine.getEngine().sendCustomVideoProcessedTextureData(textureID, width, height, referenceTimeMillisecond, channel);
        }
    };
}
