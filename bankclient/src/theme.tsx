import { createContext, useState, useMemo } from "react";
import { createTheme, Theme } from "@mui/material/styles";

interface Colors {
    red: Record<number, string>;
    purple: Record<number, string>;
    black: Record<number, string>;
    white1: Record<number, string>;
    white2: Record<number, string>;
}

export const tokens = (mode: "dark" | "light"): Colors => ({
    ...(mode === "dark"
        ? {
            red: {
                100: "#f5ced5",
                200: "#eb9dac",
                300: "#e06b82",
                400: "#d63a59",
                500: "#cc092f",
                600: "#a30726",
                700: "#7a051c",
                800: "#520413",
                900: "#290209",
            },
            purple: {
                100: "#e0d6e6",
                200: "#c1adcc",
                300: "#a184b3",
                400: "#825b99",
                500: "#633280",
                600: "#4f2866",
                700: "#3b1e4d",
                800: "#281433",
                900: "#140a1a",
            },
            black: {
                100: "#d3d2d2",
                200: "#a7a5a6",
                300: "#7b7979",
                400: "#4f4c4d",
                500: "#231f20",
                600: "#1c191a",
                700: "#151313",
                800: "#0e0c0d",
                900: "#070606",
            },
            white1: {
                100: "#fbfbfb",
                200: "#f7f7f7",
                300: "#f3f3f3",
                400: "#efefef",
                500: "#ebebeb",
                600: "#bcbcbc",
                700: "#8d8d8d",
                800: "#5e5e5e",
                900: "#2f2f2f",
            },
            white2: {
                100: "#ffffff",
                200: "#ffffff",
                300: "#ffffff",
                400: "#ffffff",
                500: "#ffffff",
                600: "#f7f7f7",
                700: "#999999",
                800: "#666666",
                900: "#333333",
            },
        }
        : {})
}) as Colors;

export const themeSettings = (mode: "dark" | "light") => {
    const colors = tokens(mode);

    return {
        palette: {
            mode: mode,
            ...(mode === "dark"
                ? {
                    primary: {
                        main: colors.white1[400],
                    },
                    secondary: {
                        main: colors.purple[400],
                    },
                    neutral: {
                        dark: colors.purple[700],
                        main: colors.red[500],
                        light: colors.red[100],
                    },
                    background: {
                        default: colors.white2[600],
                    },
                }
                : {}),
            typography: {
                fontFamily: ["Source Code Pro", "sans-serif"].join(","),
            },
            fontSize: 12,
            h1: {
                fontFamily: ["Source Code Pro", "sans-serif"].join(","),
                fontSize: 40,
            },
            h2: {
                fontFamily: ["Source Code Pro", "sans-serif"].join(","),
                fontSize: 32,
            },
            h3: {
                fontFamily: ["Source Code Pro", "sans-serif"].join(","),
                fontSize: 24,
            },
            h4: {
                fontFamily: ["Source Code Pro", "sans-serif"].join(","),
                fontSize: 20,
            },
            h5: {
                fontFamily: ["Source Code Pro", "sans-serif"].join(","),
                fontSize: 16,
            },
            h6: {
                fontFamily: ["Source Code Pro", "sans-serif"].join(","),
                fontSize: 14,
            },
        },
    };
};

interface ColorModeContextType {
    toggleColorMode: () => void;
}

export const ColorModeContext = createContext<ColorModeContextType>({
    toggleColorMode: () => {},
});

export const useMode = (): [Theme, ColorModeContextType] => {
    const [mode, setMode] = useState<"dark" | "light">("dark");

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => setMode((prev) => (prev === "light" ? "dark" : "light")),
        }),
        []
    );

    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

    return [theme, colorMode];
};
