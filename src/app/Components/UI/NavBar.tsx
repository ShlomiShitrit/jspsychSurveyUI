"use client";
import {
    AppBar,
    Toolbar,
    Box,
    Button,
    ThemeProvider,
} from "@/app/General/muiComponents";

import {
    navbarBoxStyle,
    navbarBtnStyle,
    navbarTheme,
} from "@/app/General/styles";

import {
    APP_BAR_POSITION,
    BTN_HREF,
    HOME_BTN_TEXT,
    DOCS_BTN_TEXT,
    EXTRA_BTN_TEXT,
    CREATE_SURVEY_BTN_TEXT,
} from "@/app/General/Resources/UIResources";

function handleClick(): void {
    console.log("Click happened");
    // TODO: Add a wizrad to create a survey
}

function NavBar() {
    const btnArr = [
        { href: BTN_HREF.default, text: HOME_BTN_TEXT },
        { href: BTN_HREF.docs, text: DOCS_BTN_TEXT },
        { href: BTN_HREF.extra, text: EXTRA_BTN_TEXT },
    ];
    return (
        <ThemeProvider theme={navbarTheme}>
            <AppBar position={APP_BAR_POSITION}>
                <Toolbar>
                    <Box sx={navbarBoxStyle}>
                        {btnArr.map((btn, index) => (
                            <Button
                                sx={navbarBtnStyle}
                                href={btn.href}
                                key={index}
                            >
                                {btn.text}
                            </Button>
                        ))}
                        <Button sx={navbarBtnStyle} onClick={handleClick}>
                            {CREATE_SURVEY_BTN_TEXT}
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
}

export default NavBar;
