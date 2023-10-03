"use client";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ListItemObj } from "@/app/General/interfaces";
import { surveyListActions } from "@/app/store/surveyListSlice";
import CustomTooltip from "@/app/Components/UI/CustomTooltip";
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemButton,
    Checkbox,
    IconButton,
    DeleteIcon,
    ThemeProvider,
    Container,
    Box,
} from "@/app/General/muiComponents";
import {
    CONTAINER_MAX_WIDTH,
    EDGE_END,
    EDGE_START,
    ICON_ARIA_LABEL,
    LIST_ITEN_PRIM,
    SURVEY_LIST_TOOLTIP,
} from "@/app/General/Resources/UIRes";
import {
    UI_INDEX_MINUS_1,
    UI_INDEX_1,
    UI_ARR_LEN_1,
    UI_ARR_LEN_0,
} from "@/app/General/constants";
import {
    darkNavyBlueTheme,
    surveysListStyle,
    surveyListListItemStyle,
    surveyListBox1Style,
    surveyListBox2Style,
    surveyListBox3Style,
} from "@/app/General/styles";

function SurveysList() {
    const [checked, setChecked] = useState<number[]>([]);
    const surveysList = useSelector((state: any) => state.surveyList);
    const dispatch = useDispatch();

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === UI_INDEX_MINUS_1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, UI_INDEX_1);
        }

        setChecked(newChecked);
    };

    const handleDelete = () => {
        checked.forEach((value: number) => {
            dispatch(surveyListActions.removeSurvey(value));
        });
    };

    return (
        <ThemeProvider theme={darkNavyBlueTheme}>
            <Container maxWidth={CONTAINER_MAX_WIDTH}>
                <Box sx={surveyListBox1Style}>
                    <Box sx={surveyListBox2Style}>
                        <CustomTooltip title={SURVEY_LIST_TOOLTIP} />
                    </Box>
                    <br />
                    <br />
                    <List sx={surveysListStyle}>
                        {surveysList.length === UI_ARR_LEN_0 && (
                            <ListItem>
                                <ListItemText
                                    primary={LIST_ITEN_PRIM}
                                    sx={surveyListListItemStyle}
                                />
                            </ListItem>
                        )}
                        {surveysList.length >= UI_ARR_LEN_1 &&
                            surveysList.map(
                                (value: ListItemObj, index: number) => {
                                    const labelId = `${index}`;

                                    return (
                                        <ListItem key={index} disablePadding>
                                            <ListItemButton
                                                role={undefined}
                                                onClick={handleToggle(index)}
                                                dense
                                            >
                                                <ListItemIcon>
                                                    <Checkbox
                                                        edge={EDGE_START}
                                                        checked={
                                                            checked.indexOf(
                                                                index
                                                            ) !==
                                                            UI_INDEX_MINUS_1
                                                        }
                                                        tabIndex={
                                                            UI_INDEX_MINUS_1
                                                        }
                                                        disableRipple
                                                        inputProps={{
                                                            "aria-labelledby":
                                                                labelId,
                                                        }}
                                                    />
                                                </ListItemIcon>
                                                <ListItemText
                                                    id={labelId}
                                                    primary={`${value.name}: ${value.stype} `}
                                                />
                                            </ListItemButton>
                                        </ListItem>
                                    );
                                }
                            )}
                    </List>
                    <br />
                    <br />
                    <br />
                    <Box sx={surveyListBox3Style}>
                        <IconButton
                            edge={EDGE_END}
                            aria-label={ICON_ARIA_LABEL}
                            disabled={checked.length === UI_ARR_LEN_0}
                            onClick={handleDelete}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default SurveysList;
