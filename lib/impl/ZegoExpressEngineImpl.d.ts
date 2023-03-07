import * as zego from "../ZegoExpressDefines";
import { ZegoEventListener, ZegoMediaPlayerListener, ZegoAudioEffectPlayerListener } from '../ZegoExpressEventHandler';
import type {EventSubscription} from "react-native/Libraries/vendor/emitter/EventEmitter";
declare type ZegoAnyCallback = (...args: any[]) => any;
export declare class ZegoExpressEngineImpl {
    static _listeners: Map<string, Map<ZegoAnyCallback, ZegoAnyCallback>>;
    static _mediaPlayerMap: Map<number, zego.ZegoMediaPlayer>;
    static _audioEffectPlayerMap: Map<number, zego.ZegoAudioEffectPlayer>;
    static getInstance(): ZegoExpressEngineImpl;
    static createEngine(appID: number, appSign: string, isTestEnv: boolean, scenario: zego.ZegoScenario): Promise<ZegoExpressEngineImpl>;
    static createEngineWithProfile(profile: zego.ZegoEngineProfile): Promise<ZegoExpressEngineImpl>;
    static destroyEngine(): Promise<void>;
    static setEngineConfig(config: zego.ZegoEngineConfig): Promise<void>;
    static setRoomMode(mode: zego.ZegoRoomMode): Promise<void>;
    static getVersion(): Promise<string>;
    getVersion(): Promise<string>;
    uploadLog(): Promise<void>;
    callExperimentalAPI(params: string): Promise<string>;
    on<EventType extends keyof ZegoEventListener>(event: EventType, callback: ZegoEventListener[EventType]): EventSubscription;
    off<EventType extends keyof ZegoEventListener>(event: EventType, callback?: ZegoEventListener[EventType]): void;
    loginRoom(roomID: string, user: zego.ZegoUser, config?: zego.ZegoRoomConfig): Promise<zego.ZegoRoomLoginResult>;
    logoutRoom(roomID?: string): Promise<zego.ZegoRoomLogoutResult>;
    switchRoom(fromRoomID: string, toRoomID: string, config?: zego.ZegoRoomConfig): Promise<void>;
    renewToken(roomID: string, token: string): Promise<void>;
    setRoomExtraInfo(roomID: string, key: string, value: string): Promise<zego.ZegoRoomSetRoomExtraInfoResult>;
    setStreamExtraInfo(extraInfo: string, channel?: zego.ZegoPublishChannel): Promise<zego.ZegoPublisherSetStreamExtraInfoResult>;
    sendBroadcastMessage(roomID: string, message: string): Promise<zego.ZegoIMSendBroadcastMessageResult>;
    sendBarrageMessage(roomID: string, message: string): Promise<zego.ZegoIMSendBarrageMessageResult>;
    sendCustomCommand(roomID: string, command: string, toUserList?: zego.ZegoUser[]): Promise<zego.ZegoIMSendCustomCommandResult>;
    startPublishingStream(streamID: string, channel?: zego.ZegoPublishChannel, config?: zego.ZegoPublisherConfig): Promise<void>;
    stopPublishingStream(channel?: zego.ZegoPublishChannel): Promise<void>;
    startPreview(view?: zego.ZegoView, channel?: zego.ZegoPublishChannel): Promise<void>;
    stopPreview(channel?: zego.ZegoPublishChannel): Promise<void>;
    setVideoConfig(config: zego.ZegoVideoConfig, channel?: zego.ZegoPublishChannel): Promise<void>;
    getVideoConfig(channel?: zego.ZegoPublishChannel): Promise<zego.ZegoVideoConfig>;
    setVideoMirrorMode(mode: zego.ZegoVideoMirrorMode, channel?: zego.ZegoPublishChannel): Promise<void>;
    setAppOrientation(mode: zego.ZegoOrientation, channel?: zego.ZegoPublishChannel): Promise<void>;
    setAudioConfig(config: zego.ZegoAudioConfig, channel?: zego.ZegoPublishChannel): Promise<void>;
    getAudioConfig(channel?: zego.ZegoPublishChannel): Promise<zego.ZegoAudioConfig>;
    mutePublishStreamAudio(mute: boolean, channel?: zego.ZegoPublishChannel): Promise<void>;
    mutePublishStreamVideo(mute: boolean, channel?: zego.ZegoPublishChannel): Promise<void>;
    setCaptureVolume(volume: number): Promise<void>;
    addPublishCdnUrl(streamID: string, targetURL: string): Promise<zego.ZegoPublisherUpdateCdnUrlResult>;
    removePublishCdnUrl(streamID: string, targetURL: string): Promise<zego.ZegoPublisherUpdateCdnUrlResult>;
    enablePublishDirectToCDN(enable: boolean, config?: zego.ZegoCDNConfig, channel?: zego.ZegoPublishChannel): Promise<void>;
    sendSEI(data: Uint8Array, channel?: zego.ZegoPublishChannel): Promise<void>;
    enableHardwareEncoder(enable: boolean): Promise<void>;
    enableH265EncodeFallback(enable: boolean): Promise<void>;
    isVideoEncoderSupported(codecID: zego.ZegoVideoCodecID): Promise<boolean>;
    startPlayingStream(streamID: string, view?: zego.ZegoView, config?: zego.ZegoPlayerConfig): Promise<void>;
    stopPlayingStream(streamID: string): Promise<void>;
    setPlayVolume(streamID: string, volume: number): Promise<void>;
    setAllPlayStreamVolume(volume: number): Promise<void>;
    setPlayStreamVideoType(streamID: string, streamType: zego.ZegoVideoStreamType): Promise<void>;
    takePublishStreamSnapshot(channel?: zego.ZegoPublishChannel): Promise<zego.ZegoPublisherTakeSnapshotResult>;
    takePlayStreamSnapshot(streamID: string): Promise<zego.ZegoPlayerTakeSnapshotResult>;
    mutePlayStreamAudio(streamID: string, mute: boolean): Promise<void>;
    mutePlayStreamVideo(streamID: string, mute: boolean): Promise<void>;
    muteAllPlayStreamAudio(mute: boolean): Promise<void>;
    muteAllPlayStreamVideo(mute: boolean): Promise<void>;
    enableHardwareDecoder(enable: boolean): Promise<void>;
    isVideoDecoderSupported(codecID: zego.ZegoVideoCodecID): Promise<boolean>;
    muteMicrophone(mute: boolean): Promise<void>;
    isMicrophoneMuted(): Promise<boolean>;
    muteSpeaker(mute: boolean): Promise<void>;
    isSpeakerMuted(): Promise<boolean>;
    enableAudioCaptureDevice(enable: boolean): Promise<void>;
    getAudioRouteType(): Promise<zego.ZegoAudioRoute>;
    setAudioRouteToSpeaker(defaultToSpeaker: boolean): Promise<void>;
    enableCamera(enable: boolean, channel?: zego.ZegoPublishChannel): Promise<void>;
    useFrontCamera(enable: boolean, channel?: zego.ZegoPublishChannel): Promise<void>;
    startSoundLevelMonitor(config?: zego.ZegoSoundLevelConfig): Promise<void>;
    stopSoundLevelMonitor(): Promise<void>;
    enableHeadphoneMonitor(enable: boolean): Promise<void>;
    enableAEC(enable: boolean): Promise<void>;
    enableHeadphoneAEC(enable: boolean): Promise<void>;
    setAECMode(mode: zego.ZegoAECMode): Promise<void>;
    enableAGC(enable: boolean): Promise<void>;
    enableANS(enable: boolean): Promise<void>;
    setANSMode(mode: zego.ZegoANSMode): Promise<void>;
    enableBeautify(feature: number, channel?: zego.ZegoPublishChannel): Promise<void>;
    setBeautifyOption(option: zego.ZegoBeautifyOption, channel?: zego.ZegoPublishChannel): Promise<void>;
    startNetworkSpeedTest(config: zego.ZegoNetworkSpeedTestConfig, interval?: number): Promise<void>;
    stopNetworkSpeedTest(): Promise<void>;
    getNetworkTimeInfo(): Promise<zego.ZegoNetworkTimeInfo>;
    enableCustomAudioIO(enable: boolean, config: zego.ZegoCustomAudioConfig, channel?: zego.ZegoPublishChannel): Promise<void>;
    enableCustomVideoProcessing(enable: boolean, config?: zego.ZegoCustomVideoProcessConfig, channel?: zego.ZegoPublishChannel): Promise<void>;
    setVideoSource(source: zego.ZegoVideoSourceType, channel?: zego.ZegoPublishChannel): Promise<number>;
    setAudioSource(source: zego.ZegoAudioSourceType, channel?: zego.ZegoPublishChannel): Promise<number>;
    startScreenCaptureInApp(config?: zego.ZegoScreenCaptureConfig): Promise<void>;
    startScreenCapture(config?: zego.ZegoScreenCaptureConfig): Promise<void>;
    stopScreenCapture(): Promise<void>;
    updateScreenCaptureConfig(config: zego.ZegoScreenCaptureConfig): Promise<void>;
    createMediaPlayer(): Promise<zego.ZegoMediaPlayer | null>;
    destroyMediaPlayer(mediaPlayer: zego.ZegoMediaPlayer): Promise<void>;
    createAudioEffectPlayer(): Promise<zego.ZegoAudioEffectPlayer | null>;
    destroyAudioEffectPlayer(audioEffectPlayer: zego.ZegoAudioEffectPlayer): Promise<void>;
    startMixerTask(task: zego.ZegoMixerTask): Promise<zego.ZegoMixerStartResult>;
    stopMixerTask(task: zego.ZegoMixerTask): Promise<zego.ZegoMixerStopResult>;
    startEffectsEnv(): Promise<void>;
    stopEffectsEnv(): Promise<void>;
    enableEffectsBeauty(enable: boolean): Promise<void>;
    setEffectsBeautyParam(param: zego.ZegoEffectsBeautyParam): Promise<void>;
    setVoiceChangerPreset(preset: zego.ZegoVoiceChangerPreset): Promise<void>;
    setVoiceChangerParam(param: zego.ZegoVoiceChangerParam): Promise<void>;
    setAudioEqualizerGain(bandIndex: number, bandGain: number): Promise<void>;
    setReverbPreset(preset: zego.ZegoReverbPreset): Promise<void>;
    setReverbAdvancedParam(param: zego.ZegoReverbAdvancedParam): Promise<void>;
    setReverbEchoParam(param: zego.ZegoReverbEchoParam): Promise<void>;
    setElectronicEffects(enable: boolean, mode: zego.ZegoElectronicEffectsMode, tonal: number): Promise<void>;
}
export declare class ZegoMediaPlayerImpl extends zego.ZegoMediaPlayer {
    private _index;
    constructor(index: number);
    on<MediaPlayerEventType extends keyof ZegoMediaPlayerListener>(event: MediaPlayerEventType, callback: ZegoMediaPlayerListener[MediaPlayerEventType]): void;
    off<MediaPlayerEventType extends keyof ZegoMediaPlayerListener>(event: MediaPlayerEventType, callback?: ZegoMediaPlayerListener[MediaPlayerEventType]): void;
    loadResource(path: string): Promise<zego.ZegoMediaPlayerLoadResourceResult>;
    start(): Promise<void>;
    stop(): Promise<void>;
    pause(): Promise<void>;
    resume(): Promise<void>;
    setPlayerView(view: zego.ZegoView): Promise<void>;
    seekTo(millisecond: number): Promise<zego.ZegoMediaPlayerSeekToResult>;
    setPlaySpeed(speed: number): Promise<void>;
    enableRepeat(enable: boolean): Promise<void>;
    enableAux(enable: boolean): Promise<void>;
    muteLocal(mute: boolean): Promise<void>;
    setVolume(volume: number): Promise<void>;
    setPlayVolume(volume: number): Promise<void>;
    setPublishVolume(volume: number): Promise<void>;
    setProgressInterval(millisecond: number): Promise<void>;
    getPlayVolume(): Promise<number>;
    getPublishVolume(): Promise<number>;
    getTotalDuration(): Promise<number>;
    getCurrentProgress(): Promise<number>;
    getAudioTrackCount(): Promise<number>;
    setAudioTrackIndex(index: number): Promise<void>;
    getCurrentState(): Promise<zego.ZegoMediaPlayerState>;
    getIndex(): number;
}
export declare class ZegoAudioEffectPlayerImpl extends zego.ZegoAudioEffectPlayer {
    private _index;
    constructor(index: number);
    on<AudioEffectPlayerEventType extends keyof ZegoAudioEffectPlayerListener>(event: AudioEffectPlayerEventType, callback: ZegoAudioEffectPlayerListener[AudioEffectPlayerEventType]): void;
    off<AudioEffectPlayerEventType extends keyof ZegoAudioEffectPlayerListener>(event: AudioEffectPlayerEventType, callback?: ZegoAudioEffectPlayerListener[AudioEffectPlayerEventType]): void;
    start(audioEffectID: number, path: string, config: zego.ZegoAudioEffectPlayConfig): Promise<void>;
    stop(audioEffectID: number): Promise<void>;
    pause(audioEffectID: number): Promise<void>;
    resume(audioEffectID: number): Promise<void>;
    stopAll(): Promise<void>;
    pauseAll(): Promise<void>;
    resumeAll(): Promise<void>;
    seekTo(audioEffectID: number, millisecond: number): Promise<zego.ZegoAudioEffectPlayerSeekToResult>;
    setVolume(audioEffectID: number, volume: number): Promise<void>;
    setVolumeAll(volume: number): Promise<void>;
    getTotalDuration(audioEffectID: number): Promise<number>;
    getCurrentProgress(audioEffectID: number): Promise<number>;
    loadResource(audioEffectID: number, path: string): Promise<zego.ZegoAudioEffectPlayerLoadResourceResult>;
    unloadResource(audioEffectID: number): Promise<void>;
    getIndex(): number;
}
export {};
