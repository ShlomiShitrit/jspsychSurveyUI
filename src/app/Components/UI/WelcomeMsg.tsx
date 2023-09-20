import {
    Typography,
    Container,
    Stack,
    Button,
    ThemeProvider,
} from "@/app/General/muiComponents";

import { darkTheme, welcomeMsgStackStyle } from "@/app/General/styles";
import { WelcomeMessageProps } from "@/app/General/interfaces";

import {
    CONTAINER_MAX_WIDTH,
    TYP_COMP_H1,
    TYP_VAR_H2,
    TYP_ALIGN_CENTER,
    TYP_COLOR_PRIME,
    TYP_VAR_H5,
    TYP_COLOR_SEC,
    STACK_DIRECTION_ROW,
    STACK_JUSTIFY_CENTER,
    BTN_VARIANT_CONTAINED,
    FIRST_WELCOME_MSG,
    SEC_WELCOME_MSG,
    CREATE_BTN_TEXT,
} from "@/app/General/Resources/UIResources";

function WelcomeMessage({ wizradHandler = () => null }: WelcomeMessageProps) {
    return (
        <ThemeProvider theme={darkTheme}>
            <Container maxWidth={CONTAINER_MAX_WIDTH}>
                <br />
                <br />
                <Typography
                    component={TYP_COMP_H1}
                    variant={TYP_VAR_H2}
                    align={TYP_ALIGN_CENTER}
                    color={TYP_COLOR_PRIME}
                    gutterBottom
                >
                    {FIRST_WELCOME_MSG}
                </Typography>
                <Typography
                    variant={TYP_VAR_H5}
                    align={TYP_ALIGN_CENTER}
                    color={TYP_COLOR_SEC}
                    paragraph
                >
                    {SEC_WELCOME_MSG}
                </Typography>
                <Stack
                    sx={welcomeMsgStackStyle}
                    direction={STACK_DIRECTION_ROW}
                    spacing={2}
                    justifyContent={STACK_JUSTIFY_CENTER}
                >
                    <Button
                        variant={BTN_VARIANT_CONTAINED}
                        onClick={wizradHandler}
                    >
                        {CREATE_BTN_TEXT}
                    </Button>
                </Stack>
            </Container>
        </ThemeProvider>
    );
}

export default WelcomeMessage;
