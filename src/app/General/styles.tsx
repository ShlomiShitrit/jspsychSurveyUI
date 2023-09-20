"use client";
import { createTheme, blue } from "@/app/General/muiComponents";
import {
    STYLES_MODE_DARK,
    STYLES_PRIMARY_MAIN,
    STYLES_SECONDARY_MAIN,
    STYLES_SUCCESS_MAIN,
    STYLE_DISPLAY,
    STYLE_FFF_COLOR,
    STYLE_M_20PX,
    STYLE_WIDTH_20_PRECENT,
    STYLE_M_10PX,
    STYLE_M_15PX,
} from "@/app/General/Resources/stylesRes";

import {
    STYLE_NAVBAR_BLUE,
    STYLE_PT_4,
    STYLE_PT_3,
    STYLE_PB_5,
} from "@/app/General/constants";

export const darkTheme = createTheme({
    palette: {
        mode: STYLES_MODE_DARK,
        primary: {
            main: STYLES_PRIMARY_MAIN,
        },
        secondary: {
            main: STYLES_SECONDARY_MAIN,
        },
        success: {
            main: STYLES_SUCCESS_MAIN,
        },
    },
});

export const navbarTheme = createTheme({
    palette: {
        primary: {
            main: blue[STYLE_NAVBAR_BLUE],
        },
    },
});

export const navbarBoxStyle = {
    display: { xs: STYLE_DISPLAY.xs, md: STYLE_DISPLAY.md },
};

export const navbarBtnStyle = {
    color: STYLE_FFF_COLOR,
};

export const welcomeMsgStackStyle = {
    pt: STYLE_PT_4,
};

export const step1BoxStyle = { margin: STYLE_M_20PX };

export const wizradDialogDialogStyle = { pt: STYLE_PT_3, pb: STYLE_PB_5 };

export const addOptionBtnStyle = { width: STYLE_WIDTH_20_PRECENT };
export const formTxtFieldStyle = { margin: STYLE_M_10PX };
export const switchLabelStyle = { margin: STYLE_M_10PX };
export const matgin10Style = { margin: STYLE_M_10PX };
export const margin15Style = { margin: STYLE_M_15PX };
