"use client";
import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Box,
} from "@/app/General/muiComponents";

import { stypeActions } from "@/app/store/stypeSlice";
import { RootState } from "@/app/store/index";
import { step1BoxStyle } from "@/app/General/styles";
import {
    FORM_LABEL_ID,
    FORM_LABEL_TEXT,
    RADIO_GROUP_NAME,
    RADIO_GROUP_ARIA_LABEL,
    TEXT_CONTROL_LABEL,
    MULTI_CHOICE_CONTROL_LABEL,
    MULTI_SELECT_CONTROL_LABEL,
    LIKERT_CONTROL_LABEL,
} from "@/app/General/Resources/WizardRes";

function Step1() {
    const dispatch = useDispatch();
    const surveyType = useSelector(
        (state: RootState) => state.stype.surveyType
    );

    const changeStypeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(stypeActions.setStype(e.target.value));
    };

    return (
        <Box sx={step1BoxStyle}>
            <FormControl>
                <FormLabel id={FORM_LABEL_ID}>{FORM_LABEL_TEXT}</FormLabel>
                <RadioGroup
                    aria-labelledby={RADIO_GROUP_ARIA_LABEL}
                    name={RADIO_GROUP_NAME}
                    value={surveyType}
                    onChange={changeStypeHandler}
                >
                    <FormControlLabel
                        value={TEXT_CONTROL_LABEL}
                        control={<Radio />}
                        label={TEXT_CONTROL_LABEL}
                    />
                    <FormControlLabel
                        value={MULTI_CHOICE_CONTROL_LABEL}
                        control={<Radio />}
                        label={MULTI_CHOICE_CONTROL_LABEL}
                    />
                    <FormControlLabel
                        value={MULTI_SELECT_CONTROL_LABEL}
                        control={<Radio />}
                        label={MULTI_SELECT_CONTROL_LABEL}
                    />

                    <FormControlLabel
                        value={LIKERT_CONTROL_LABEL}
                        control={<Radio />}
                        label={LIKERT_CONTROL_LABEL}
                    />
                    <FormControlLabel
                        value={"html"}
                        control={<Radio />}
                        label={"HTML"}
                    />
                </RadioGroup>
            </FormControl>
        </Box>
    );
}

export default Step1;
