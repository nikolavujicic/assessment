import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    background-color: #f5f5f5;
    margin: 0;
    padding: 0;
  }

  h1, h2, h3 {
    margin-bottom: 16px;
  }

  input, button {
    font-size: 16px;
  }

  button {
    cursor: pointer;
  }
`

export default GlobalStyles
