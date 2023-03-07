## 主要改动是集成 faceunity 

1、增加 `initBeauty` 初始化美颜参数 参数是 
```js
{
    heavyBlur:1,
    blurType:2,
    faceShapeLevel:0.5,
    //...
}
```
2、增加 `setBeauty` 设置美颜参数 , 
```js
setBeauty('faceShapeLevel',0.5);
```
iOS 第二参数类型是 `Any`

Android 第二个参数是`Double`，还根据参数类型不一样，增加两个方法 `setBeautyInt` 和 `setBeautyString`
```js
import { NativeModules } from 'react-native';
const { ZegoExpressNativeModule } = NativeModules;

export function isInteger(obj) {
    return (obj | 0) === obj
}
export function  setBeauty(key,value){
    if(Platform.OS === 'android'){
        if(typeof(value) === "string"){
            ZegoExpressNativeModule.setBeautyString(key,value);
        }else if(isInteger(value)){
            ZegoExpressNativeModule.setBeautyInt(key,value);
        }else{
            ZegoExpressNativeModule.setBeauty(key, value);
        }
    }else{
        ZegoExpressNativeModule.setBeauty(key, value);
    }
}
```

3、集成方式：`FURenderKit` + `IZegoCustomVideoProcessHandler`

这种方式最简单，无需自定义摄像头采集。



4、更改原生代码 获取 View 的方式，因为 `findNodeHandle` 即将弃用，并且在函数组件中不稳定（会多次调用set ref）

iOS：

```objectivec
NSNumber *rootTag = [RCTConvert NSNumber:view[@"rootTag"]];
NSString *nativeID = [RCTConvert NSString:view[@"nativeID"]];
UIView *uiView = [self.bridge.uiManager viewForNativeID:nativeID withRootTag:rootTag];
```

Android:

```java
final String nativeID = view.getString("nativeID");
View nativeView = ReactFindViewUtil.findView(reactContext.getCurrentActivity().getWindow().getDecorView().getRootView(), nativeID);
```


# zego-express-engine-reactnative

[English](https://github.com/zegoim/zego-express-reactnative-sdk/blob/master/README.md) | [中文](https://github.com/zegoim/zego-express-reactnative-sdk/blob/master/README_zh.md)

ZegoExpressEngine Audio/Video ReactNative SDK is a react-native wrapper based on [ZegoExpressEngine](https://doc-en.zego.im/en/693.html) native Android / iOS SDK, providing live video and real-time audio/video services. It only needs 4 lines of code and can be easily accessed in 30 minutes.

Learn more about the solution: [https://www.zego.im](https://www.zego.im)

## 1️⃣ Apply for ZEGO AppID

Log in to [ZEGO Official Website](https://www.zego.im) to register an account, select a scenario according to your actual business needs, and obtain AppID and App Sign for initializing the SDK.

## 2️⃣ Import `zego-express-engine-reactnative` (only support react-native >= 0.60)

In your project, you can type in:

`npm install zego-express-engine-reactnative --save`

or

`yarn add zego-express-engine-reactnative`

Next, In **iOS**, you should `cd` to `ios` folder, and execute this command:

`pod install`

Now, you can use `zego-express-engine-reactnative` module in your project by using javascript or typescript(recommended)

## 3️⃣ Add device permissions

### Android

Open the file `app/src/main/AndroidManifest.xml`, and add the following contents:

```xml
    <!-- Permissions required by the SDK -->
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
    <uses-permission android:name="android.permission.RECORD_AUDIO" />
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.BLUETOOTH" />
    <uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    <!-- Permissions required by the App -->
    <uses-permission android:name="android.permission.READ_PHONE_STATE" />
    <uses-permission android:name="android.permission.WAKE_LOCK" />

    <uses-feature
        android:glEsVersion="0x00020000"
        android:required="true" />

    <uses-feature android:name="android.hardware.camera" />
    <uses-feature android:name="android.hardware.camera.autofocus" />
```

> Note: Because Android 6.0 requires dynamic permissions for some of the more important permissions, you cannot apply for static permissions only through the `AndroidMainfest.xml` file. Therefore, you need to refer to the following code

```javascript
import {PermissionsAndroid} from 'react-native';

const granted = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA,
                                        PermissionsAndroid.RECORD_AUDIO);
granted.then((data)=>{

        if(!data) {
            const permissions = [PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, PermissionsAndroid.PERMISSIONS.CAMERA];
            PermissionsAndroid.requestMultiple(permissions);
        }
    }).catch((err)=>{
    console.log(err.toString());
    })
}
```

### iOS

Choose the option TARGETS -> Info -> Custom iOS Target Properties

![Add iOS Privacy](https://storage.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/Common/privacy-description.png)

Click the + Add button to add camera and microphone permissions.

1. `Privacy - Camera Usage Description`

2. `Privacy - Microphone Usage Description`

After adding permissions, it will be as shown:

![Add iOS Privacy Done](https://storage.zego.im/sdk-doc/Pics/iOS/ZegoExpressEngine/Common/privacy-description-done.png)

## 4️⃣ Init SDK

```javascript
import React, { Component } from 'react';
import ZegoExpressEngine from 'zego-express-engine-reactnative';

export default class App extends Component<{}> {

    componentDidMount() {
        ZegoExpressEngine.createEngineWithProfile({appID: 1234567890, scenario: ZegoScenario.General}).then((engine) => {
            if(engine != undefined)
                console.log("init sdk success");
            else
                console.log("init sdk failed");
        });
    }
}
```

## 5️⃣ FAQ

### 1. Can I integrate SDK with versions below 0.60?

No. `zego-express-engine-reactnative` only supports ReactNative versions of 0.60 or above, otherwise, please upgrade your project version.

### Do I need a manual link this native module?

No. Automatic Link is supported in versions 0.60 or above, so you **don't need** to execute this command:

`react-native link zego-express-engine-reactnative`
