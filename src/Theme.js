import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
   

      primary: { 
          main: '#5DB099',
          dark: '#37987E'
         },
      secondary: { 
          main: '#E45745',
          dark: '#CA311D'
     },

      error: { main: '#E45745'},
      info: {main: '#87C8BB' },
      success: {main: '#5EAAA8' },
    },
  })

  export default theme
