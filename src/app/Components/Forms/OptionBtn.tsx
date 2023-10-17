import { Button } from "@/app/General/muiComponents";
import { AddOptionBtnProps } from "@/app/General/interfaces";
import { addOptionBtnStyle } from "@/app/General/styles";

import { ADD_BTN_VARIANT, ADD_BTN_TXT } from "@/app/General/Resources/FormsRes";

export default function OptionBtn({
    isAdd,
    optionHandler = () => null,
}: AddOptionBtnProps) {
    return (
        <Button
            sx={addOptionBtnStyle}
            variant={ADD_BTN_VARIANT}
            onClick={optionHandler}
        >
            {isAdd ? ADD_BTN_TXT : "-"}
        </Button>
    );
}
