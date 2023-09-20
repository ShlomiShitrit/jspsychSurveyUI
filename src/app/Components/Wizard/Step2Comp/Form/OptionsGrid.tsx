"use client";
import { Grid } from "@/app/General/muiComponents";
import OptionInput from "@/app/Components/Wizard/Step2Comp/Form/OptionInput";
import { OptionsGridProps } from "@/app/General/interfaces";
import {
    GRID_CONT_SPAC_2,
    GRID_ITEM_12,
    GRID_ITEM_6,
    GRID_ITEM_4,
} from "@/app/General/constants";
import { OPTIONS_GRID_EMPTY_STR } from "@/app/General/Resources/Step2FormRes";

function OptionsGrid({
    optionsQ = [],
    optionsQChangeHandler = () => () => null,
    optionsArray = [],
    labelText = OPTIONS_GRID_EMPTY_STR,
}: OptionsGridProps) {
    return (
        <Grid container spacing={GRID_CONT_SPAC_2}>
            {optionsArray.map((optionIndex) => (
                <Grid
                    item
                    xs={GRID_ITEM_12}
                    sm={GRID_ITEM_6}
                    md={GRID_ITEM_4}
                    key={optionIndex}
                >
                    <OptionInput
                        labelText={labelText}
                        id={optionIndex}
                        state={optionsQ[optionIndex]}
                        stateHandler={optionsQChangeHandler(optionIndex)}
                    />
                </Grid>
            ))}
        </Grid>
    );
}

export default OptionsGrid;
