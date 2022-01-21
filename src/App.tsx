import * as React from "react";
import '@fontsource/montserrat/500.css'
import '@fontsource/open-sans/700.css'
import {
  ChakraProvider,
} from "@chakra-ui/react"
import Pages from "./components/pages";
import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    heading: 'Open Sans',
    body: 'montserrat',
  },
})

export const App = () => (
  <ChakraProvider theme={theme}>
    <Pages />
  </ChakraProvider>
)
