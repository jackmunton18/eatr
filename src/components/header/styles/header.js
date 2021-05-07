import styled from 'styled-components/macro';
import { Link as ReactRouterLink} from 'react-router-dom'

export const Background = styled.div`
    display: flex;
    flex-direction: column;
    @media (max-width: 1100px) {
        ${({ dontShowOnSmallViewPort }) => dontShowOnSmallViewPort && `background: none;`}
    }
    padding-top: 80px;
    justify-content:center;
`;
export const Frame = styled.div`

`;
export const Group = styled.div`
    display: flex;
    align-items: center;

`;
export const Link = styled.p`
    color: #242331;
    text-decoration: none;
    margin-right: 30px;
    font-weight: ${({active}) => (active === 'true' ? '700' : 'normal')};
    cursor: pointer;
    &:hover {
        font-weight: bold;
    }
    &:last-of-type {
        margin-right: 0;
    }
`;
export const Container = styled.div`
    display: flex;
    height: 64px;
    padding: 20px 40px;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top:0;
    width: 100vw;
    box-sizing: border-box;

    a {
        display: flex;
    }
`;
export const Feature = styled(Container)`
    padding: 150px 0 150px 0;
    flex-direction: column;
    align-items: normal;
    width: 50%;
    height: auto;
    @media (max-width: 1100px) {
        padding: 100px 0 50px 0;
    }
`;
export const FeatureCallOut = styled.p`    
    color: white;
    font-size: 50px;
    font-weight: bold;
    line-height: normal;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.45);
    margin: 0;
    margin-bottom: 20px;
`;
export const Text = styled.p`
    color: #242331;
    font-size: 22px;
    line-height: normal;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.45);
    margin: 0;
    @media (max-width: 1100px) {
        display: none
    }
`;
export const Logo = styled.img`
    height: 32px;
    width: 59px;
    margin-right: 40px;

`;
export const ButtonLink = styled(ReactRouterLink)`
    display: inline-block;
    background-color: #A27035;
    width: auto;
    height: fit-content;
    color: white;
    border: 0;
    font-size: 15px;
    border-radius: 3px;
    padding: 8px 17px;
    cursor: pointer;
    text-decoration: none;
    box-sizing: border-box;
    transition: all .1s ease-out;

    &:hover {
        background-color: #533E2D;
    }
`;

export const Picture = styled.button`
    background: url(${({ src }) => src});
    background-size: contain;
    border: 0;
    width: 32px;
    height: 32px;
    cursor: pointer;
`;

export const Dropdown = styled.div`
    display: none;
    position: fixed;
    background-color: #242331;
    padding: 10px;
    width: 100px;
    top: 10px;
    right: 10px;
    ${Group}:last-of-type ${Link} {
        cursor: pointer;
    }
    ${Group} {
        margin-bottom: 10px;
        &:last-of-type {
        margin-bottom: 0;
        }
        ${Link},${Picture} {
            cursor: default;
        }
    }
    button {
        margin-right: 10px;
    }
    p {
        font-size: 12px;
        margin-bottom: 0;
        margin-top: 0;
    }
`;

export const Profile = styled.div`
    display: flex;
    align-items: center;
    margin-left: 20px;
    position: relative;
    button {
        cursor: pointer;
    }
    &:hover > ${Dropdown} {
        display: flex;
        flex-direction: column;
    }
`;
export const Search = styled.div`
    display: flex;
    align-items: center;    
    svg {
        color: white;
        cursor: pointer;
    }
    @media (max-width: 700px) {
        display: none;
    }
`;
export const SearchIcon = styled.button`
    cursor: pointer;
    background-color: transparent;
    border: 0;
    &:focus {
        outline: none;
    }

    img {
        filter: brightness(0) invert(1);
        width: 16px;
    }
`;
export const SearchInput = styled.input`
    background-color: #44444459;
    color: white;
    border: 1px solid white;
    transition: width 0.5s;
    height: 30px;
    font-size: 14px;
    margin-left: ${({active}) => (active === true ? '10px' : '0')};
    padding: ${({active}) => (active === true ? '0 10px' : '0')};
    opacity: ${({active}) => (active === true ? '1' : '0')};
    width: ${({active}) => (active === true ? '200px' : '0')};
`;

export const PlayButton = styled.button`
    box-shadow: 0 0.6vw 1vw -0.4vw rgba(0,0,0,0.35);
    background-color: #e6e6e6;
    color: black;
    border-width: 0;
    padding: 10px 20px;
    border-radius: 5px;
    max-width: 130px;
    font-size: 20px;
    margin-top: 30px;
    cursor: pointer;
    transition: all .5s ease;
    font-weight: bold;

    &:hover {
        background-color: #ff1e1e;
        color: white;
    }
    &:focus {
        outline: none;
    }
`;