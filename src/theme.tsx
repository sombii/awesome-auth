import {createMuiTheme} from "@material-ui/core";
import blueGrey from "@material-ui/core/colors/blueGrey";
import teal from "@material-ui/core/colors/teal";

export const customTheme = createMuiTheme({
    palette: {
        primary: {
            main: teal[500]
        },
        secondary: {
            main: blueGrey[400]
        }
    }
})

