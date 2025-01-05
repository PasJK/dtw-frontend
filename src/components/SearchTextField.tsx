import React from "react";
import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface ISearchTextField {
    label: string;
    value: string;
    className?: string;
    dataTestID?: string;
    onChange: (val: string) => void;
}

export default function SearchTextField({ label, className, value, dataTestID, onChange }: ISearchTextField) {
    return (
        <TextField
            label={value ? label : ""}
            data-testid={dataTestID}
            className={className}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            InputProps={{
                sx: { height: 48 },
                startAdornment: <SearchIcon className="mr-1" />,
            }}
            placeholder={label || "Search"}
            sx={{
                "& .MuiFormLabel-root": {
                    top: "-4px",
                },
                "& .MuiInputLabel-shrink": {
                    top: 0,
                },
            }}
        />
    );
}
