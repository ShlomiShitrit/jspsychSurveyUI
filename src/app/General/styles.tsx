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
    M_AUTO,
    WIDTH_100_PRECENT,
    STYLE_NAVY_BLUE_THEME,
    STYLE_M_150PX,
    STYLE_CENTER,
    STYLE_M_200PX,
    STYLE_M_50PX,
    STYLE_POSITION_REL,
    STYLE_POSITION_ABS,
} from "@/app/General/Resources/OtherRes";

import {
    STYLE_NAVBAR_BLUE,
    STYLE_PT_4,
    STYLE_PT_3,
    STYLE_PB_5,
    STYLE_MAX_WIDTH_360,
    STYLE_MAX_WIDTH_200,
    STYLE_FONT_SIZE_15,
    STYLE_TOP_0,
    STYLE_RIGHT_65,
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

export const darkNavyBlueTheme = createTheme({
    palette: {
        primary: {
            main: STYLE_NAVY_BLUE_THEME.primary,
        },
        secondary: {
            main: STYLE_NAVY_BLUE_THEME.secondary,
        },
        success: {
            main: STYLE_NAVY_BLUE_THEME.success,
        },
        background: {
            default: STYLE_NAVY_BLUE_THEME.background.default,
            paper: STYLE_NAVY_BLUE_THEME.background.paper,
        },
        text: {
            primary: STYLE_NAVY_BLUE_THEME.text.primary,
            secondary: STYLE_NAVY_BLUE_THEME.text.primary,
        },
        action: {
            active: STYLE_NAVY_BLUE_THEME.action.active,
            hover: STYLE_NAVY_BLUE_THEME.action.hover,
            selected: STYLE_NAVY_BLUE_THEME.action.selected,
            disabled: STYLE_NAVY_BLUE_THEME.action.disabled,
        },
    },
    typography: {
        fontFamily: STYLE_NAVY_BLUE_THEME.typography,
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
export const downloadDialogDialogStyle = { pt: STYLE_PT_3, pb: STYLE_PB_5 };

export const addOptionBtnStyle = { width: STYLE_WIDTH_20_PRECENT };
export const formTxtFieldStyle = { margin: STYLE_M_10PX };
export const switchLabelStyle = { margin: STYLE_M_10PX };
export const matgin10Style = { margin: STYLE_M_10PX };
export const margin15Style = { margin: STYLE_M_15PX };

export const surveysListStyle = {
    width: WIDTH_100_PRECENT,
    maxWidth: STYLE_MAX_WIDTH_360,
    margin: M_AUTO,
    backgroundColor: darkNavyBlueTheme.palette.background.default,
};

export const downloadDialogTxtFieldStyle = {
    ml: STYLE_M_150PX,
    mt: STYLE_M_20PX,
};

export const surveyListListItemStyle = { textAlign: STYLE_CENTER };
export const step3TypStyle = { mb: STYLE_M_20PX };
export const step3TxtFieldStyle = { ml: STYLE_M_150PX };

export const createPageBtnStyle = { ml: STYLE_M_200PX, mt: STYLE_M_50PX };

export const customTooltipStyle = {
    maxWidth: STYLE_MAX_WIDTH_200,
    fontSize: STYLE_FONT_SIZE_15,
};

export const surveyListBox1Style = { position: STYLE_POSITION_REL };
export const surveyListBox2Style = {
    position: STYLE_POSITION_ABS,
    top: STYLE_TOP_0,
    right: STYLE_RIGHT_65,
};
