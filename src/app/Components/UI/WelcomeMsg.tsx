import {
    Typography,
    Container,
    Stack,
    Button,
    ThemeProvider,
} from "@/app/General/muiComponents";

import { welcomeMsgStackStyle, darkNavyBlueTheme } from "@/app/General/styles";
import { WelcomeMessageProps } from "@/app/General/interfaces";
import styles from "@/app/landingPage.module.css";

import {
    CONTAINER_MAX_WIDTH,
    TYP_VAR_H2,
    TYP_ALIGN_CENTER,
    TYP_COLOR_PRIME,
    TYP_VAR_H5,
    TYP_COLOR_SEC,
    STACK_DIRECTION_ROW,
    STACK_JUSTIFY_CENTER,
    BTN_VARIANT_CONTAINED,
    EMPTY_STR,
    COLOR_SUCCESS,
} from "@/app/General/Resources/UIRes";

function WelcomeMessage({
    clickHandler = () => null,
    text1 = EMPTY_STR,
    text2 = EMPTY_STR,
    btnText = EMPTY_STR,
}: WelcomeMessageProps) {
    return (
        <ThemeProvider theme={darkNavyBlueTheme}>
            <Container maxWidth={CONTAINER_MAX_WIDTH}>
                <br />
                <br />
                <Typography
                    variant={TYP_VAR_H2}
                    align={TYP_ALIGN_CENTER}
                    color={TYP_COLOR_PRIME}
                    gutterBottom
                >
                    {text1}
                </Typography>
                <Typography
                    variant={TYP_VAR_H5}
                    align={TYP_ALIGN_CENTER}
                    color={TYP_COLOR_SEC}
                >
                    {text2}
                </Typography>
                <Stack
                    sx={welcomeMsgStackStyle}
                    direction={STACK_DIRECTION_ROW}
                    spacing={2}
                    justifyContent={STACK_JUSTIFY_CENTER}
                >
                    <Button
                        className={styles.button}
                        variant={BTN_VARIANT_CONTAINED}
                        color={COLOR_SUCCESS}
                        onClick={clickHandler}
                    >
                        {btnText}
                    </Button>
                </Stack>
            </Container>
        </ThemeProvider>
    );
}

export default WelcomeMessage;
