"use client";
import { Grid } from "@/app/General/muiComponents";
import InputTextField from "@/app/Components/Forms/InputTextField";
import { OptionsGridProps } from "@/app/General/interfaces";
import {
    GRID_ITEM_12,
    GRID_ITEM_6,
    GRID_ITEM_4,
} from "@/app/General/constants";
import { OPTIONS_GRID_INPUT_TYPE } from "@/app/General/Resources/FormsRes";

function OptionsGrid({
    optionsQ,
    optionsQChangeHandler,
    optionsArray,
    labelText,
    errorId,
    newErrors,
}: OptionsGridProps) {
    return (
        //  TODO: move to constants
        <Grid container spacing={1}>
            {optionsArray.map((optionIndex) => (
                <Grid
                    item
                    xs={GRID_ITEM_12}
                    sm={GRID_ITEM_6}
                    md={GRID_ITEM_4}
                    key={optionIndex}
                >
                    <InputTextField
                        newErrors={newErrors}
                        labelText={labelText}
                        errorId={errorId}
                        id={optionIndex}
                        state={optionsQ[optionIndex]}
                        stateHandler={optionsQChangeHandler(optionIndex)}
                        inputType={OPTIONS_GRID_INPUT_TYPE}
                    />
                </Grid>
            ))}
        </Grid>
    );
}

export default OptionsGrid;
