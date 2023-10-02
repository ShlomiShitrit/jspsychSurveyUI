import {
    Tooltip,
    styled,
    tooltipClasses,
    TooltipProps,
    InfoIcon,
} from "@/app/General/muiComponents";
import { customTooltipStyle } from "@/app/General/styles";
import { EMPTY_STR, COLOR_SUCCESS } from "@/app/General/Resources/UIRes";

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))({
    [`& .${tooltipClasses.tooltip}`]: customTooltipStyle,
});

function CustomTooltip({ title = EMPTY_STR }: { title: string }) {
    return (
        <CustomWidthTooltip title={title}>
            <InfoIcon color={COLOR_SUCCESS} />
        </CustomWidthTooltip>
    );
}

export default CustomTooltip;
