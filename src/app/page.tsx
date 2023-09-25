"use client";
import { Fragment } from "react";
import { useRouter } from "next/navigation";
import { Provider } from "react-redux";
import WelcomeMessage from "@/app/Components/UI/WelcomeMsg";
import store from "@/app/store/index";
import {
    FIRST_WELCOME_MSG,
    SEC_WELCOME_MSG,
    BTN_TXT,
    CREATE_ROUTE,
} from "@/app/General/Resources/UIResources";

function HomePage() {
    const router = useRouter();
    const changeRouteToCreate = () => {
        router.push(CREATE_ROUTE);
    };

    return (
        <Provider store={store}>
            <Fragment>
                <WelcomeMessage
                    clickHandler={changeRouteToCreate}
                    text1={FIRST_WELCOME_MSG}
                    text2={SEC_WELCOME_MSG}
                    btnText={BTN_TXT}
                />
            </Fragment>
        </Provider>
    );
}

export default HomePage;
