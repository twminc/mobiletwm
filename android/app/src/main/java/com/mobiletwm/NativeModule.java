package com.mobiletwm;

import android.util.Log;

public class NativeModule {

    static {
        try {
            System.loadLibrary("cpp-code");
            Log.d("TWM", "-------- libcpp-code: loaded");

        } catch (Exception e){
            Log.d("TWM", "-------- libcpp-code: not loaded");
        }
    }



    public static native int createWallet(String str);
}
