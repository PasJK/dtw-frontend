import React from "react";
import { Tab, Tabs } from "@mui/material";

export interface TabListProps {
    key: string;
    label: string;
    disabled?: boolean;
    display?: boolean;
    children: React.JSX.Element | React.ReactNode;
}

interface CustomTabProps {
    active: string | boolean;
    ariaLabel?: string;
    setActive: (val: string) => void;
    tabList: TabListProps[];
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: string;
    value: string;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`user-tabpanel-${index}`}
            aria-labelledby={`user-tab-${index}`}
            {...other}
        >
            {value === index && children}
        </div>
    );
}

function a11yProps(index: string, ariaLabel = "custom") {
    return {
        value: index,
        id: `${ariaLabel}-tab-${index}`,
        "aria-controls": `${ariaLabel}-tabpanel-${index}`,
        className: "p-2 min-h-fit",
    };
}

export default function CustomTabs({ active, setActive, tabList, ariaLabel }: CustomTabProps) {
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setActive(newValue);
    };

    return (
        <div>
            <Tabs
                value={active}
                variant="scrollable"
                scrollButtons="auto"
                onChange={handleChange}
                aria-label="create users tab"
                className="border-b min-h-fit mb-4"
            >
                {tabList.map(tab => {
                    const { label, key, disabled = false, display = true } = tab;

                    return (
                        display && (
                            <Tab
                                disabled={disabled}
                                key={`tab-header-${key}`}
                                label={label}
                                {...a11yProps(key, ariaLabel)}
                            />
                        )
                    );
                })}
            </Tabs>
            {tabList.map(tab => {
                const { key, children } = tab;
                return (
                    <CustomTabPanel index={key} value={String(active)} key={`tab-container-${key}`}>
                        {children}
                    </CustomTabPanel>
                );
            })}
        </div>
    );
}
