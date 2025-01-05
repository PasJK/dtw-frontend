import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import palette from "@/configs/palette";

interface TextInputProps {
    title: string;
    value: string;
    onChange: (val: string) => void;
    placeholder: string;
    type?: "text" | "password" | "number" | "email";
    isError?: boolean;
    helperText?: string;
    require?: boolean;
    rows?: number;
    maxLength?: number;
    isDisabled?: boolean;
}

export default function TextInput({
    title,
    value,
    onChange = () => {},
    placeholder = "",
    type = "text",
    isError = false,
    helperText = "",
    require,
    rows,
    maxLength,
    isDisabled = false,
}: TextInputProps) {
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

    const handleOnChange = (inputValue: string) => {
        onChange(inputValue);
    };

    return (
        <div className="flex flex-col">
            <span className="font-medium text-sm">
                {title} {!require && <small className="text-optional">(optional)</small>}
            </span>
            <TextField
                value={value}
                onChange={e => {
                    if (maxLength) {
                        const numericValue = e.target.value.replace(/[^\d]/g, "");
                        if (numericValue.length <= maxLength) {
                            handleOnChange(numericValue);
                        }
                    } else {
                        handleOnChange(e.target.value);
                    }
                }}
                type={isShowPassword ? "text" : type}
                placeholder={placeholder}
                error={isError}
                helperText={helperText}
                multiline={rows && rows > 1 ? true : false}
                rows={rows}
                sx={{
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#79747E" },
                        "&:hover fieldset": { borderColor: isError ? palette.error.main : palette.primary.main },
                        "&.Mui-focused fieldset": { borderColor: isError ? palette.error.main : palette.primary.main },
                        "&.Mui-disabled": {
                            backgroundColor: "#F5F5F5"
                        }
                    },
                }}
                InputProps={{
                    endAdornment:
                        type === "password" ? (
                            <InputAdornment position="end" className="mx-2">
                                <IconButton
                                    edge="end"
                                    aria-label="toggle password visibility"
                                    onMouseDown={e => e.preventDefault()}
                                    onClick={() => setIsShowPassword(state => !state)}
                                >
                                    {isShowPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </IconButton>
                            </InputAdornment>
                        ) : null,
                }}
                disabled={isDisabled}
            />
        </div>
    );
}
