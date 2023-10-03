import { FormControlLabel, Switch } from "@/app/General/muiComponents";
import { switchLabelStyle } from "@/app/General/styles";
import { SwitchLabelProps } from "@/app/General/interfaces";
import { EMPTY_STRING } from "@/app/General/Resources/FormsRes";

function SwitchLabel({
    isState = false,
    stateHandler = () => null,
    labelText = EMPTY_STRING,
}: SwitchLabelProps) {
    return (
        <FormControlLabel
            sx={switchLabelStyle}
            control={<Switch checked={isState} onChange={stateHandler} />}
            label={labelText}
        />
    );
}

export default SwitchLabel;
