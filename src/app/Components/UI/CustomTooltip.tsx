import {
    Tooltip,
    styled,
    tooltipClasses,
    TooltipProps,
    InfoIcon,
} from "@/app/General/muiComponents";
import { customTooltipStyle } from "@/app/General/styles";
import {
    EMPTY_STR,
    COLOR_SUCCESS,
    TOOTIP_PLACMENT_PROPS_DEFAULT,
} from "@/app/General/Resources/UIRes";

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))({
    [`& .${tooltipClasses.tooltip}`]: customTooltipStyle,
});

type placementType =
    | "bottom"
    | "left"
    | "right"
    | "top"
    | "bottom-end"
    | "bottom-start"
    | "left-end"
    | "left-start"
    | "right-end"
    | "right-start"
    | "top-end"
    | "top-start"
    | undefined;

function CustomTooltip({
    title = EMPTY_STR,
    placement = TOOTIP_PLACMENT_PROPS_DEFAULT,
}: {
    title: string;
    placement?: placementType;
}) {
    return (
        <CustomWidthTooltip title={title} placement={placement}>
            <InfoIcon color={COLOR_SUCCESS} />
        </CustomWidthTooltip>
    );
}

export default CustomTooltip;
