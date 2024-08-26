import { Component } from "react";

export interface LoadExternalScriptProps {
    src: string;
    id: string;
    onLoad?: ((ev: Event) => any) | null;
    onError?:  ((ev: Event) => any) | null;
}

export class LoadExternalScript extends Component<LoadExternalScriptProps> {    
    render() {
        if (!document.getElementById(this.props.id)) {
            const script = document.createElement("script");
            script.src = this.props.src;
            script.id = this.props.id;
            script.async = true;
            script.onload = this.props.onLoad?? null;
            script.onerror = this.props.onError?? null;
            if (document.head) {
                document.head.appendChild(script);
            }
        }
        return false;
    }
}