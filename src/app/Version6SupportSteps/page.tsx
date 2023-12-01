"use client";
import {
    Typography,
    Link,
    ThemeProvider,
    Container,
    Button,
} from "@/app/General/muiComponents";
import { darkNavyBlueTheme } from "@/app/General/styles";
import styles from "@/app/landingPage.module.css";

export default function Version6SupportStepsPage() {
    return (
        <>
            <ThemeProvider theme={darkNavyBlueTheme}>
                <Container
                    maxWidth={false}
                    className={styles.steps}
                    sx={{
                        flexGrow: 1,
                        alignItems: "flex-end",
                    }}
                >
                    <Typography variant="h2">jsPsych 6.3 support</Typography>
                    <br />
                    <Typography variant="h6">
                        If you are using jsPsych 6.3 version, there are few
                        requirments of jsPsych library that needs to be met.
                    </Typography>
                    <br />
                    <Typography variant="h6">
                        The full list of requirements can be found in the
                        documentation of jsPsych 6.3.
                    </Typography>
                    <br />
                    <Typography variant="h6">
                        The documentation can be found in the following link:
                    </Typography>
                    <br />
                    <Link href="https://www.jspsych.org/6.3/tutorials/hello-world/">
                        jsPsych 6.3 documentation
                    </Link>
                    <br />
                    <br />
                    <Typography variant="h6">
                        in this page we will only cover the required steps for
                        this system to work.
                    </Typography>
                    <br />
                    <Typography variant="h6">
                        First of all you need to download the following folder:
                    </Typography>
                    <br />
                    <Button
                        variant="contained"
                        href="https://github.com/jspsych/jsPsych/releases/download/v6.3.1/jspsych-6.3.1.zip"
                    >
                        Download Zip Folder
                    </Button>
                    <br />
                    <br />
                    <Typography variant="h6">
                        The following zip folder contains the jsPsych 6.3
                        version and the required plugins for the system to work.
                    </Typography>
                    <br />
                    <Typography variant="h6">
                        You need to extract the zip folder and save in a
                        location convinient to you.
                    </Typography>
                    <br />
                    <Typography variant="h6">
                        In this folder you will need to add your experiment
                        files.
                    </Typography>
                    <br />
                    <Typography variant="h6">
                        The experiment files should be added to the root folder.
                        Do not add the experiments files in the sub folder
                        (jspsych-6.3.1)
                    </Typography>
                    <br />
                    <Typography variant="h6">
                        Every time you create a Survey, make sure you save it in
                        the this folder. Otherwise the experiment will not work
                    </Typography>
                </Container>
            </ThemeProvider>
        </>
    );
}
