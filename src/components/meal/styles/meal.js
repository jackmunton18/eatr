import styled from 'styled-components/macro';

export const Container = styled.div`
    position: relative;
    display: block;

`;
export const Item = styled.div`
    position: relative;
    display: block;

`;
export const Inner = styled.div`
    position: relative;
    display: block;

`;
export const Title = styled.h1`
    font-size: 18px;
    line-height: 1.1;
    position: relative;
    cursor: pointer;
    padding: 20px 20px;
    margin-bottom: 0px;

    @media max-width: 600px {
        font-size: 35px;
    }

    &:hover {
        background: hsl(32deg 51% 42% / 4%);
    }

    &:before {
        content: 'v';
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 20px;
        color: #a27035;
    }
`;
export const Text = styled.p`
    font-size: 16px;
    padding: 0px 20px;
    &:first-of-type {
        font-size: 14px;
    }
`;