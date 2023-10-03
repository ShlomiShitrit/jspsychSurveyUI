"use client";
import { Grid, Box } from "@/app/General/muiComponents";
import InputTextField from "@/app/Components/Forms/InputTextField";
import { PromptsGridProps } from "@/app/General/interfaces";
import {
    PROMPT_GRID_INPUT_TYPE_NAME,
    PROMPT_GRID_INPUT_TYPE_PROMPT,
    PROMPT_GRID_LABEL_PROMPT,
    PROMPT_GRID_LABEL_NAME,
    PROMPT_GRID_EMPTY_STR,
} from "@/app/General/Resources/FormsRes";
import {
    GRID_CONT_SPAC_2,
    GRID_ITEM_12,
    GRID_ITEM_6,
    GRID_ITEM_4,
} from "@/app/General/constants";

function PromptGrid({
    optionsQ = [],
    optionsQChangeHandler = () => () => null,
    optionsArray = [],
    namesQ = [],
    nameQChangeHandler = () => () => null,
    errorId = { prompt: PROMPT_GRID_EMPTY_STR, name: PROMPT_GRID_EMPTY_STR },
    newErrors = [],
}: PromptsGridProps) {
    return (
        // TODO: move to constants
        <Grid container spacing={1}>
            {optionsArray.map((promptIndex) => (
                <Grid
                    item
                    xs={GRID_ITEM_12}
                    sm={GRID_ITEM_6}
                    md={GRID_ITEM_4}
                    key={promptIndex}
                >
                    <Box>
                        <InputTextField
                            newErrors={newErrors}
                            errorId={errorId.prompt}
                            id={promptIndex}
                            state={optionsQ[promptIndex]}
                            stateHandler={optionsQChangeHandler(promptIndex)}
                            inputType={PROMPT_GRID_INPUT_TYPE_PROMPT}
                            labelText={PROMPT_GRID_LABEL_PROMPT}
                        />
                        <InputTextField
                            newErrors={newErrors}
                            errorId={errorId.name}
                            id={promptIndex}
                            state={namesQ[promptIndex]}
                            stateHandler={nameQChangeHandler(promptIndex)}
                            inputType={PROMPT_GRID_INPUT_TYPE_NAME}
                            labelText={PROMPT_GRID_LABEL_NAME}
                        />
                    </Box>
                </Grid>
            ))}
        </Grid>
    );
}

export default PromptGrid;
