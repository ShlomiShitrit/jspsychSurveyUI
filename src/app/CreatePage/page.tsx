"use client";
import { useState } from "react";
import {
    ThemeProvider,
    Button,
    Container,
    Stack,
    Chip,
    Typography,
} from "@/app/General/muiComponents";
import { useRouter } from "next/navigation";
import { darkNavyBlueTheme, welcomeMsgStackStyle } from "@/app/General/styles";
import { Provider } from "react-redux";
import SurveysList from "@/app/Components/UI/SurveysList";
import WizardDialog from "@/app/Components/Wizard/WizardDialog";
import WelcomeMessage from "@/app/Components/UI/WelcomeMsg";
import DownloadDialog from "@/app/Components/Forms/DownloadDialog";
import store from "@/app/store/index";
import VersionSelect from "@/app/Components/Forms/VersionSelect";
import styles from "@/app/landingPage.module.css";
import { pageButtonStyle } from "@/app/General/styles";
import {
    CREATE_TXT1,
    CREATE_TXT2,
    CREATE_BTN_TXT,
    CREATE_DOWNLOAF_BTN_TXT,
} from "@/app/General/Resources/PagesRes";

function CreatePage() {
    const [openWizrad, setOpenWizrad] = useState(false);
    const [openDownload, setOpenDownload] = useState(false);

    const router = useRouter();

    return (
        <Provider store={store}>
            <ThemeProvider theme={darkNavyBlueTheme}>
                <Container maxWidth={false} className={styles.root}>
                    <WizardDialog
                        open={openWizrad}
                        closeWizard={() => setOpenWizrad(false)}
                    />
                    <DownloadDialog
                        open={openDownload}
                        closeDialogHandler={() => setOpenDownload(false)}
                    />
                    <WelcomeMessage
                        clickHandler={() => setOpenWizrad(true)}
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

                    <Stack
                        sx={welcomeMsgStackStyle}
                        direction={"row"}
                        spacing={2}
                        alignItems={"center"}
                        justifyContent={"center"}
                        alignContent={"center"}
                    >
                        <Chip label="Warning" color="error" />

                        <Typography
                            variant="body1"
                            sx={{
                                fontWeight: "bold",
                            }}
                        >
                            Using jspsych 6.3 verion? Click Here for the
                            required steps
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={() =>
                                router.replace("Version6SupportSteps")
                            }
                        >
                            jsPsych 6.3 support
                        </Button>
                    </Stack>

                    <SurveysList />
                    <Stack
                        sx={welcomeMsgStackStyle}
                        direction={"row"}
                        spacing={2}
                        justifyContent={"center"}
                    >
                        <Button
                            sx={pageButtonStyle}
                            onClick={() => setOpenDownload(true)}
                        >
                            {CREATE_DOWNLOAF_BTN_TXT}
                        </Button>
                    </Stack>
                </Container>
            </ThemeProvider>
        </Provider>
    );
}

export default CreatePage;
