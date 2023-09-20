import { FormControlLabel, Switch } from "@/app/General/muiComponents";
import { switchLabelStyle } from "@/app/General/styles";
import { NameInputProps } from "@/app/General/interfaces";
import { EMPTY_STRING } from "@/app/General/Resources/Step2FormRes";

function SwitchLabel({
    isState = false,
    stateHandler = () => null,
    labelText = EMPTY_STRING,
}: NameInputProps) {
    return (
        <FormControlLabel
            sx={switchLabelStyle}
            control={<Switch checked={isState} onChange={stateHandler} />}
            label={labelText}
        />
    );
}

export default SwitchLabel;
