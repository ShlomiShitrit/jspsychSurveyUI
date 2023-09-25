import { useState } from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
    ThemeProvider,
} from "@/app/General/muiComponents";
import { DownloadDialogProps } from "@/app/General/interfaces";
import {
    downloadDialogDialogStyle,
    darkTheme,
    downloadDialogTxtFieldStyle,
} from "@/app/General/styles";
import DownloadBtn from "@/app/Components/Forms/DownloadBtn";
import {
    DIALOG_TITLE,
    TYP_VAR,
    TYP_ALIGN,
    TYP_TXT,
    TXT_FIELD_LABEL,
    TXT_FIELD_VAR,
    EMPTY_STR,
} from "@/app/General/Resources/FormsRes";

function DownloadDialog({
    open = false,
    closeDialogHandler = () => null,
}: DownloadDialogProps) {
    const [fileName, setFileName] = useState(EMPTY_STR);

    const fileNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFileName(event.target.value);
    };
    return (
        <ThemeProvider theme={darkTheme}>
            <Dialog
                open={open}
                onClose={closeDialogHandler}
                sx={downloadDialogDialogStyle}
                fullWidth
            >
                <DialogTitle>{DIALOG_TITLE}</DialogTitle>
                <DialogContent>
                    <Typography variant={TYP_VAR} align={TYP_ALIGN}>
                        {TYP_TXT}
                    </Typography>
                    <TextField
                        sx={downloadDialogTxtFieldStyle}
                        label={TXT_FIELD_LABEL}
                        variant={TXT_FIELD_VAR}
                        onChange={fileNameHandler}
                    />
                </DialogContent>
                <DialogActions>
                    <DownloadBtn
                        fileName={fileName}
                        errorHandler={() => null}
                    />
                </DialogActions>
            </Dialog>
        </ThemeProvider>
    );
}

export default DownloadDialog;
