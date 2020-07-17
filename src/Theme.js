import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
      primary: { 
          main: '#87C8BB',
          dark: '#5EAAA8'
         },
      secondary: { 
          main: '#E45745',
          dark: '#CA311D'
     },

      error: { main: '#E45745'},
      info: {main: '#C2DACC' },
      success: {main: '#5EAAA8' },
    },
  })

  export default theme
