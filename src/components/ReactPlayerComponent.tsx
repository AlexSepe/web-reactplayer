import { Component, ReactNode, createElement, createRef } from "react";
import ReactPlayer from "react-player/file";
import React from "react";
import { OnProgressProps } from "react-player/base";

declare global {
    interface Window {
        Hls: any;
        //Hls: any;
    }
}

export interface OnReactPlayerProgressProps {
    elapsedPercent: number;
    elapsedSeconds: number;
    remainingSeconds: number;
    duration: number;
    ended: boolean;
    playing: boolean;
}

export interface ReactPlayerComponentProps {
    url: string;
    pip: boolean;
    playing: boolean;
    controls: boolean;
    light: boolean;
    volume: number;
    muted: boolean;
    playbackRate: number;
    loop: boolean;
    onProgress?: (arg0: OnReactPlayerProgressProps) => void;
}

type ReactPlayerComponentState = {
    externalLibLoaded: boolean;
    elapsedPercent: number;
    elapsedSeconds: number;
    remainingSeconds: number;
    duration: number;
    ended: boolean;
    playing: boolean;
};

export class ReactPlayerComponent extends Component<ReactPlayerComponentProps, ReactPlayerComponentState> {
    private playerRef = createRef<ReactPlayer>();
    private hlsVersion = "1.5.14";
    private HLS_SDK_URL = `https://cdn.jsdelivr.net/npm/hls.js@${this.hlsVersion}/dist/hls.min.js`;

    private player?: ReactPlayer;

    constructor(props: ReactPlayerComponentProps) {
        super(props);
        this.state = {
            externalLibLoaded: false,
            elapsedPercent: 0,
            elapsedSeconds: 0,
            remainingSeconds: 0,
            duration: 0,
            ended: false,
            playing: props.playing
        };
        this.handleDuration = this.handleDuration.bind(this);
        this.handleProgress = this.handleProgress.bind(this);
        this.handleEnded = this.handleEnded.bind(this);
        this.handlePlay = this.handlePlay.bind(this);
        this.handlePause = this.handlePause.bind(this);
    }

    componentDidMount(): void {
        //loadScript(this.HLS_SDK_URL, {}, this.handleScriptInject);
        const loadModule = async () => {
            try {
                const module = await import(/* webpackIgnore: true */ this.HLS_SDK_URL);
                console.log("loaded HLS -> ", module.isSupported ? "HLS isSupported" : "HLS não isSupported");
                //module.default(); // or whatever function you need to call
                window.Hls = module.default;

                this.setState({
                    externalLibLoaded: true
                });
            } catch (error) {
                console.error("Error loading module:", error);
            }
        };
        loadModule();
    }

    componentDidUpdate(
        _prevProps: Readonly<ReactPlayerComponentProps>,
        prevState: Readonly<ReactPlayerComponentState>,
        _snapshot?: any
    ): void {
        if (
            prevState.duration !== this.state.duration ||
            prevState.elapsedPercent !== this.state.elapsedPercent ||
            prevState.elapsedSeconds !== this.state.elapsedSeconds ||
            prevState.remainingSeconds !== this.state.remainingSeconds ||
            prevState.ended !== this.state.ended ||
            prevState.playing !== this.state.playing
        ) {
            if (this.props.onProgress) {
                const progressValues: OnReactPlayerProgressProps = { ...this.state };
                this.props.onProgress(progressValues);
            }
        }     
        
        //if (_prevProps.seekTo !== this.props.seekTo) {
            // this.player?.setState({playing: true});
            // this.player?.seekTo()
        //}
    }

    private handlePlay(): void {
        console.log("* handlePlay");
        this.setState({
            ended: false,
            playing: true
        });
    }
    private handleEnablePIP(): void {
        console.log("* handleEnablePIP");
    }
    private handleDisablePIP(): void {
        console.log("* handleDisablePIP");
    }
    private handlePause(): void {
        console.log("* handlePause");
        this.setState({            
            playing: false
        });
    }
    private handleOnPlaybackRateChange(): void {
        console.log("* handleOnPlaybackRateChange");
    }
    private handleEnded(): void {
        console.log("* handleEnded");
        this.setState({
            ended: true,
            playing: false
        });
    }
    private handleProgress(state: OnProgressProps): void {
        console.log("* handleProgress", state);
        this.setState({
            elapsedPercent: state.played,
            elapsedSeconds: state.playedSeconds,
            remainingSeconds: this.state.duration * (1 - state.played)
        });
    }
    private handleDuration(duration: number): void {
        console.log("* handleDuration", duration);
        this.setState({
            duration: duration
        });
    }
    private handleOnReady(player: any): void {
        this.player = player;
        console.log("* onReady");
        if (this.player) {
            console.log("* duration...?", this.player?.getDuration());
        }
    }

    render(): ReactNode {
        return (
            <React.Fragment>
                {!this.state.externalLibLoaded && <div>Loading...</div>}
                {/* <div>Controls:: Playing:{this.props.playing ? "true" : "false"}</div> */}
                {this.state.externalLibLoaded && (
                    <ReactPlayer
                        ref={this.playerRef}
                        className="react-player"
                        width="100%"
                        height="100%"
                        hlsVersion={this.hlsVersion}
                        url={this.props.url}
                        pip={this.props.pip}
                        playing={this.props.playing}
                        controls={this.props.controls}
                        light={this.props.light}
                        loop={this.props.loop}
                        playbackRate={this.props.playbackRate}
                        volume={this.props.volume}
                        muted={this.props.muted}
                        onReady={this.handleOnReady}
                        onStart={() => console.log("onStart")}
                        onPlay={this.handlePlay}
                        onEnablePIP={this.handleEnablePIP}
                        onDisablePIP={this.handleDisablePIP}
                        onPause={this.handlePause}
                        onBuffer={() => console.log("onBuffer")}
                        onPlaybackRateChange={this.handleOnPlaybackRateChange}
                        onSeek={(seconds: number) => console.log("onSeek", seconds)}
                        onEnded={this.handleEnded}
                        onError={e => console.log("onError", e)}
                        onProgress={this.handleProgress}
                        onDuration={this.handleDuration}
                        onPlaybackQualityChange={(e: any) => console.log("onPlaybackQualityChange", e)}
                    />
                )}
            </React.Fragment>
        );
    }
}
