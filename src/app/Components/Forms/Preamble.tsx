import { Box } from "@/app/General/muiComponents";
import InputTextField from "@/app/Components/Forms/InputTextField";
import SwitchLabel from "@/app/Components/Forms/SwitchLabel";
import CustomTooltip from "@/app/Components/UI/CustomTooltip";
import { PreambleProps } from "@/app/General/interfaces";

export default function Preamble({
    id,
    preambleState,
    preambleHandler,
    isImageHandler,
    imageState,
}: PreambleProps) {
    return (
        <Box sx={{ display: "flex", direction: "row" }}>
            <InputTextField
                inputType="preamble"
                labelText="Preamble"
                stateHandler={preambleHandler}
                state={preambleState}
                id={id}
                errorId={`${id}-preamble`}
                newErrors={[{ preamble: "Not required" }]}
            />
            <CustomTooltip
                title={`Checked this switch if the preamble is an image,
                then enter a link to the image in the input field.
                If the preamble is a text, don't check this switch,
                and enter the text in the input field`}
            />
            <SwitchLabel
                isState={imageState}
                stateHandler={isImageHandler}
                labelText="Image?"
            />
        </Box>
    );
}
