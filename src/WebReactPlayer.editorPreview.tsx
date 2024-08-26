import { Component, ReactNode, createElement } from "react";
import { WebReactPlayerPreviewProps } from "../typings/WebReactPlayerProps";

export class preview extends Component<WebReactPlayerPreviewProps> {
    render(): ReactNode {
        return <code>ReactPlayer Url={this.props.url}</code>;
    }
}

export function getPreviewCss(): string {
    return require("./ui/WebReactPlayer.css");
}
