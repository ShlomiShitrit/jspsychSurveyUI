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
    CREATE_SURVEY_TEXT,
} from "@/app/General/Resources/UIRes";

function NavBar() {
    const btnArr = [
        { href: BTN_HREF.default, text: HOME_BTN_TEXT },
        { href: BTN_HREF.docs, text: DOCS_BTN_TEXT },
        { href: BTN_HREF.extra, text: EXTRA_BTN_TEXT },
        { href: BTN_HREF.create, text: CREATE_SURVEY_TEXT },
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
                    </Box>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
}

export default NavBar;
