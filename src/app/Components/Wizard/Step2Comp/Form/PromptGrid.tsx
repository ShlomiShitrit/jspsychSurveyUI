"use client";
import { Grid, Box } from "@/app/General/muiComponents";
import PromptInput from "@/app/Components/Wizard/Step2Comp/Form/PromptInput";
import NameInput from "@/app/Components/Wizard/Step2Comp/Form/NameInput";
import { PromptsGridProps } from "@/app/General/interfaces";
import {
    GRID_CONT_SPAC_2,
    GRID_ITEM_12,
    GRID_ITEM_6,
    GRID_ITEM_4,
} from "@/app/General/constants";

function PromptGrid({
    promptsQ = [],
    promptsQChangeHandler = () => () => null,
    promptsArray = [],
    namesQ = [],
    nameQChangeHandler = () => () => null,
    nameArray = [],
}: PromptsGridProps) {
    return (
        <Grid container spacing={GRID_CONT_SPAC_2}>
            {promptsArray.map((promptIndex) => (
                <Grid
                    item
                    xs={GRID_ITEM_12}
                    sm={GRID_ITEM_6}
                    md={GRID_ITEM_4}
                    key={promptIndex}
                >
                    <Box>
                        <PromptInput
                            id={promptIndex}
                            state={promptsQ[promptIndex]}
                            stateHandler={promptsQChangeHandler(promptIndex)}
                        />
                        <NameInput
                            id={promptIndex}
                            state={namesQ[promptIndex]}
                            stateHandler={nameQChangeHandler(promptIndex)}
                        />
                    </Box>
                </Grid>
            ))}
        </Grid>
    );
}

export default PromptGrid;
