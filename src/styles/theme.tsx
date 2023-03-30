import { extendTheme } from 'native-base';

export const customTheme = extendTheme({
    fonts: {
        body: 'MontRegular',
    },
    colors: {
        primary: {
            100: 'rgb(14,46,77)',
        },
        yellow: 'rgba(244,179,22)',
    }
});