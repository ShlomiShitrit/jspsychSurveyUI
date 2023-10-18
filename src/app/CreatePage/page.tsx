"use client";
import { Fragment, useState } from "react";
import {
    ThemeProvider,
    Button,
    Container,
    Stack,
} from "@/app/General/muiComponents";
import {
    darkNavyBlueTheme,
    createPageBtnStyle,
    welcomeMsgStackStyle,
} from "@/app/General/styles";
import { Provider } from "react-redux";
import SurveysList from "@/app/Components/UI/SurveysList";
import WizardDialog from "@/app/Components/Wizard/WizardDialog";
import WelcomeMessage from "@/app/Components/UI/WelcomeMsg";
import DownloadDialog from "@/app/Components/Forms/DownloadDialog";
import store from "@/app/store/index";
import VersionSelect from "@/app/Components/Forms/VersionSelect";
import styles from "@/app/LandingPage.module.css";
import {
    CREATE_TXT1,
    CREATE_TXT2,
    CREATE_BTN_TXT,
    CONTAINER_MAX_WIDTH,
    CREATE_DOWNLOAF_BTN_TXT,
    CREATE_BTN_COLOR,
    CREATE_BTN_VARIANT,
} from "@/app/General/Resources/PagesRes";

function CreatePage() {
    const [openWizrad, setOpenWizrad] = useState(false);
    const [openDownload, setOpenDownload] = useState(false);

    const openWizard = () => {
        setOpenWizrad(true);
    };

    const closeWizard = () => {
        setOpenWizrad(false);
    };

    const openDownloadDialog = () => {
        setOpenDownload(true);
    };

    const closeDownloadDialog = () => {
        setOpenDownload(false);
    };

    return (
        <Provider store={store}>
            <ThemeProvider theme={darkNavyBlueTheme}>
                <Fragment>
                    <Container className={styles.root}>
                        <WizardDialog
                            open={openWizrad}
                            closeWizard={closeWizard}
                        />
                        <DownloadDialog
                            open={openDownload}
                            closeDialogHandler={closeDownloadDialog}
                        />
                        <WelcomeMessage
                            clickHandler={openWizard}
                            text1={CREATE_TXT1}
                            text2={CREATE_TXT2}
                            btnText={CREATE_BTN_TXT}
                        />

                        <br />
                        <Stack
                            sx={welcomeMsgStackStyle}
                            direction={"row"}
                            spacing={2}
                            justifyContent={"center"}
                        >
                            <VersionSelect />
                        </Stack>

                        <SurveysList />
                        <Stack
                            sx={welcomeMsgStackStyle}
                            direction={"row"}
                            spacing={2}
                            justifyContent={"center"}
                        >
                            <Button
                                className={styles.button}
                                sx={createPageBtnStyle}
                                variant={CREATE_BTN_VARIANT}
                                color={CREATE_BTN_COLOR}
                                onClick={openDownloadDialog}
                            >
                                {CREATE_DOWNLOAF_BTN_TXT}
                            </Button>
                        </Stack>
                    </Container>
                </Fragment>
            </ThemeProvider>
        </Provider>
    );
}

export default CreatePage;
