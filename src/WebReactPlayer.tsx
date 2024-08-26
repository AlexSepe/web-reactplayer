import { Component, ReactNode, createElement } from "react";
import { OnReactPlayerProgressProps, ReactPlayerComponent } from "./components/ReactPlayerComponent";

import { WebReactPlayerContainerProps } from "../typings/WebReactPlayerProps";

import "./ui/WebReactPlayer.css";
import Big from "big.js";

export class WebReactPlayer extends Component<WebReactPlayerContainerProps> {    
    constructor(props: WebReactPlayerContainerProps) {
        super(props);
        this.handleOnProgress = this.handleOnProgress.bind(this);
    }

    private handleOnProgress(values: OnReactPlayerProgressProps){             
        // if (this.props.elapsedPercent){
        //     const value = new Big(values.elapsedPercent);
        //     this.props.elapsedPercent?.setValue(value);
        // }
        if (this.props.elapsedSeconds){
            const value = new Big(values.elapsedSeconds);
            this.props.elapsedSeconds?.setValue(value);
        }
        if (this.props.remainingSeconds){
            const value = new Big(values.remainingSeconds);
            this.props.remainingSeconds?.setValue(value);
        }
        if (this.props.duration){
            const value = new Big(values.duration);
            this.props.duration?.setValue(value);
        }
        if (this.props.ended){
            const value = values.ended;
            this.props.ended?.setValue(value);
        }
        if (this.props.playing){
            const value = values.playing;
            this.props.playing?.setValue(value);
        }
        console.info("Component onProgress = ", values);
    }

    render(): ReactNode {        
        return (
            (this.props.url.status === "available" &&
                this.props.playing.status === "available"
            ) && (
                <ReactPlayerComponent
                    url={this.props.url.value || ""}
                    pip={this.props.pip.value || true}
                    playing={this.props.playing.value || false}
                    controls={this.props.controls.value || true}
                    light={false}
                    volume={0.8}
                    muted={false}                    
                    playbackRate={1.0}
                    loop={false}
                    onProgress={this.handleOnProgress}
                />
            )
        );
    }
}
