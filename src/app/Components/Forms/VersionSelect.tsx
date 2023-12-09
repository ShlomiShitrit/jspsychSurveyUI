"use client";
import { useState, useEffect } from "react";
import { Select, MenuItem, Box, Typography } from "@mui/material";
import { versionActions } from "@/app/store/versionSlice";
import { useDispatch } from "react-redux";

export default function VersionSelect() {
    const [version, setVersion] = useState("7.3");
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(versionActions.changeVersion(version));
    }, [version]);

    return (
        <Box sx={{ ml: "150px", display: "flex", direction: "row" }}>
            <Typography
                sx={{ mr: "20px", mt: "20px" }}
                variant={"h6"}
                component={"div"}
            >
                jsPsych Version:
            </Typography>

            <Select
                sx={{ mt: "10px" }}
                variant="filled"
                value={version}
                onChange={(e) => setVersion(e.target.value as string)}
            >
                <MenuItem value={"7.3"}>7.3</MenuItem>
                <MenuItem value={"6.3"}>6.3</MenuItem>
            </Select>
        </Box>
    );
}
