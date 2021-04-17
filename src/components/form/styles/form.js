import styled from 'styled-components/macro';
import { Link as ReactRouterLink} from 'react-router-dom';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    box-sizing: border-box;
    width: 100%;
    margin: auto;
    max-width: 400px;
    padding: 20px;
    text-align:center;
`;
export const Base = styled.form`
    display: flex;
    flex-direction: column;
    max-width: 450px;
    width: 100%;
`;
export const Error = styled.div`
    background: #e87c03;
    border-radius: 5px;
    font-size: 14px;
    margin: 0 0 16px;
    padding: 15px 20px;
`;
export const Title = styled.h1`
    font-size: 20px;
    margin-bottom: 20px;
`;
export const Text = styled.p`
    font-size: 16px;
`;
export const TextSmall = styled.p`
    margin-top: 10px;
    font-size: 13px;
    line-height: normal;
    color: #8c8c8c;
`;
export const Link = styled(ReactRouterLink)`
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;
export const Input = styled.input`
    border: 1px solid #333333;
    border-radius: 5px;
    height: 40px;
    line-height: 40px;
    padding: 5px 20px;
    margin-bottom: 10px;
`;
export const Submit = styled.button`
    background: #A27035;
    border-radius: 5px;
    font-size: 16px;
    margin: 24px 0 12px;
    padding: 16px;
    border: 0;
    color: white;
    cursor: pointer;

    &:disabled {
        opacity: .5;
    }
`;