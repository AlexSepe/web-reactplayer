/**
 * This file was generated from WebReactPlayer.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { EditableValue } from "mendix";
import { Big } from "big.js";

export interface WebReactPlayerContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    url: EditableValue<string>;
    playing: EditableValue<boolean>;
    controls: EditableValue<boolean>;
    pip: EditableValue<boolean>;
    elapsedSeconds?: EditableValue<Big>;
    remainingSeconds?: EditableValue<Big>;
    duration?: EditableValue<Big>;
    ended?: EditableValue<boolean>;
}

export interface WebReactPlayerPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    renderMode?: "design" | "xray" | "structure";
    url: string;
    playing: string;
    controls: string;
    pip: string;
    elapsedSeconds: string;
    remainingSeconds: string;
    duration: string;
    ended: string;
}
