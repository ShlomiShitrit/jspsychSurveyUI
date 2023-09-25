"use client";
import { Fragment, useState } from "react";
import { ThemeProvider, Button, Container } from "@/app/General/muiComponents";
import { darkNavyBlueTheme, createPageBtnStyle } from "@/app/General/styles";
import { Provider } from "react-redux";
import SurveysList from "@/app/Components/UI/SurveysList";
import WizardDialog from "@/app/Components/Wizard/WizardDialog";
import WelcomeMessage from "@/app/Components/UI/WelcomeMsg";
import DownloadDialog from "@/app/Components/Forms/DownloadDialog";
import store from "@/app/store/index";
import {
    CREATE_TXT1,
    CREATE_TXT2,
    CREATE_BTN_TXT,
    CONTAINER_MAX_WIDTH,
    CREATE_DOWNLOAF_BTN_TXT,
    CREATE_BTN_COLOR,
    CREATE_BTN_VARIANT,
} from "@/app/General/Resources/UIResources";

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
                    <Container maxWidth={CONTAINER_MAX_WIDTH}>
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
                        <br />
                        <SurveysList />
                        <Button
                            sx={createPageBtnStyle}
                            variant={CREATE_BTN_VARIANT}
                            color={CREATE_BTN_COLOR}
                            onClick={openDownloadDialog}
                        >
                            {CREATE_DOWNLOAF_BTN_TXT}
                        </Button>
                    </Container>
                </Fragment>
            </ThemeProvider>
        </Provider>
    );
}

export default CreatePage;
