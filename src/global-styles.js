import { createGlobalStyle} from 'styled-components';

const colors = {
    'flax': '#ddca7d',
    'camel': '#b88b4a',
    'goldenBrown': '#a27035',
    'cafeNoir': '#533e2d',
    'raisinBlack': '#242331'
};


export const GlobalStyles = createGlobalStyle`
    html, body {
        font-family: 'Raleway', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: #eaeaea;
        color: ${colors.raisinBlack};
        font-size: 16px;
        font-weight: 300;
    }
    b, strong {
        font-weight: 400;
    }
    a {
        &:active {
            color: #ffffff;
        }
    }
`;