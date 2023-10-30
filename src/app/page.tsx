"use client";
import React from "react";
import { Container, Grid, Typography, Button } from "@mui/material";
import styles from "@/app/landingPage.module.css";
import store from "@/app/store/index";
import {
    FIRST_WELCOME_MSG,
    SEC_WELCOME_MSG,
    BTN_TXT,
    CREATE_ROUTE,
} from "@/app/General/Resources/PagesRes";
import { pageButtonStyle } from "@/app/General/styles";pageButtonStyle
import { useRouter } from "next/navigation";
import { Provider } from "react-redux";
import StarIcon from "@mui/icons-material/Star";

function LandingPage() {
    const router = useRouter();
    const changeRouteToCreate = () => {
        router.push(CREATE_ROUTE);
    };
    return (
        <Provider store={store}>
            <Container maxWidth={false} className={styles.root}>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12}>
                        <Typography variant="h2" className={styles.header}>
                            {FIRST_WELCOME_MSG}
                        </Typography>
                        <Typography variant="h5" className={styles.description}>
                            {SEC_WELCOME_MSG}
                        </Typography>
                        <br />
                        <Button
                            sx={pageButtonStyle}
                            onClick={changeRouteToCreate}
                        >
                            {BTN_TXT}
                        </Button>
                    </Grid>
                </Grid>
            </Container>

            <Container maxWidth={false} className={styles.features}>
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12}>
                        <Typography variant="h3" className={styles.header}>
                            {"All kind of features"}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <i className="material-icons-round feature-icon">
                            <StarIcon />
                        </i>
                        <Typography
                            variant="h4"
                            className={styles.featureTitle}
                        >
                            {"Multi types of surveys"}
                        </Typography>
                        <Typography
                            variant="body1"
                            className={styles.featureDescription}
                        >
                            Multi Choice, Likert, Multi Select, Text and many
                            more to come
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <i className="material-icons-round feature-icon">
                            <StarIcon />
                        </i>
                        <Typography
                            variant="h4"
                            className={styles.featureTitle}
                        >
                            Custom trial
                        </Typography>
                        <Typography
                            variant="body1"
                            className={styles.featureDescription}
                        >
                            Add questions blocks to a list and make your own
                            trial
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <i className="material-icons-round feature-icon">
                            <StarIcon />
                        </i>
                        <Typography
                            variant="h4"
                            className={styles.featureTitle}
                        >
                            Versions support
                        </Typography>
                        <Typography
                            variant="body1"
                            className={styles.featureDescription}
                        >
                            Support for both 7.3 and 6.3 version of jsPsych
                        </Typography>
                    </Grid>
                </Grid>
            </Container>

            <Container maxWidth={false} className={styles.contact}>
                <Typography variant="h3" className={styles.contactHeader}>
                    We are still working on it
                </Typography>
                <Typography variant="h5" className={styles.contactDescription}>
                    The website is still under development, there are a lot more
                    features to come!
                </Typography>
            </Container>
        </Provider>
    );
}

export default LandingPage;
