"use client";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ListItemObj } from "@/app/General/interfaces";
import { surveyListActions } from "@/app/store/surveyListSlice";
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
} from "@/app/General/muiComponents";
import {
    CONTAINER_MAX_WIDTH,
    EDGE_END,
    EDGE_START,
    ICON_ARIA_LABEL,
    LIST_ITEN_PRIM,
} from "@/app/General/Resources/SurveysListRes";
import {
    INDEX_0,
    COUNTER_MINUS_1,
    COUNTER_1,
    LENGTH_1,
    LENGTH_0,
} from "@/app/General/constants";
import {
    darkNavyBlueTheme,
    surveysListStyle,
    surveyListListItemStyle,
} from "@/app/General/styles";

function SurveysList() {
    const [checked, setChecked] = useState([INDEX_0]);
    const surveysList = useSelector((state: any) => state.surveyList);
    const dispatch = useDispatch();

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === COUNTER_MINUS_1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, COUNTER_1);
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
                <List sx={surveysListStyle}>
                    {surveysList.length === LENGTH_0 && (
                        <ListItem>
                            <ListItemText
                                primary={LIST_ITEN_PRIM}
                                sx={surveyListListItemStyle}
                            />
                        </ListItem>
                    )}
                    {surveysList.length >= LENGTH_1 &&
                        surveysList.map((value: ListItemObj, index: number) => {
                            const labelId = `${index}`;

                            return (
                                <ListItem
                                    key={index}
                                    secondaryAction={
                                        <IconButton
                                            edge={EDGE_END}
                                            aria-label={ICON_ARIA_LABEL}
                                            onClick={handleDelete}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    }
                                    disablePadding
                                >
                                    <ListItemButton
                                        role={undefined}
                                        onClick={handleToggle(index)}
                                        dense
                                    >
                                        <ListItemIcon>
                                            <Checkbox
                                                edge={EDGE_START}
                                                checked={
                                                    checked.indexOf(index) !==
                                                    COUNTER_MINUS_1
                                                }
                                                tabIndex={COUNTER_MINUS_1}
                                                disableRipple
                                                inputProps={{
                                                    "aria-labelledby": labelId,
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
                        })}
                </List>
            </Container>
        </ThemeProvider>
    );
}

export default SurveysList;
