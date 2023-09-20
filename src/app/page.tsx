"use client";
import { useState, Fragment } from "react";
import { Provider } from "react-redux";
import WelcomeMessage from "@/app/Components/UI/WelcomeMsg";
import WizardDialog from "@/app/Components/Wizard/Main/WizardDialog";
import store from "@/app/store/index";

function HomePage() {
    const [open, setOpen] = useState(false);

    const openWizard = () => {
        setOpen(true);
    };

    const closeWizard = () => {
        setOpen(false);
    };

    return (
        <Provider store={store}>
            <Fragment>
                <WizardDialog open={open} closeWizard={closeWizard} />
                <WelcomeMessage wizradHandler={openWizard} />
            </Fragment>
        </Provider>
    );
}

export default HomePage;
