import { extendTheme } from "native-base";

export const customTheme = extendTheme({
  colors: {
    // primary color and its shades
    primary: {
      300: "#63B3ED",
      400: "#4299E1",
      500: "#3182CE",
      600: "#2B6CB0",
      700: "#2C5282",
      800: "#003F5E"
    },
  },
});

export default customTheme;
