import React from "react"
import { create } from 'jss';
import rtl from 'jss-rtl';
import { ThemeProvider, StylesProvider, jssPreset } from '@material-ui/core/styles';
import { createMuiTheme } from "@material-ui/core"
import Helmet from "react-helmet"

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const theme = createMuiTheme({
  direction: 'rtl',
});


const Layout = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <StylesProvider jss={jss}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>DbKala</title>
          <body dir={'rtl'}/>
        </Helmet>
        {props.children}
      </StylesProvider>
    </ThemeProvider>
  )
}

export default Layout