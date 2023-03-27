import styled from "styled-components";

export const ClockContainer = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const BlackContainer = styled.div`
    width: 300px;
    height: 300px;

    background-color: black;

    border-radius: 60px;

    display: grid;
    place-items: center;
`;

export const WhiteContainer = styled.div`
    width: 270px;
    height: 270px;

    margin: 4px 12px;

    background-color: white;
    color: white;

    border-radius: 50%;
    position: relative;
`;

export const Number = styled.div<{
    topValue: number;
    leftValue: number;
}>`
    position: absolute;
    top: ${(props) => `${props.topValue}px`};
    left: ${(props) => `${props.leftValue}px`};

    display: flex;
    align-items: center;
    justify-content: center;

    /* background-color: rgba(0, 0, 0, 0.2); */
    color: black;

    transform: translate(-50%, -50%);

    width: 50px;
    height: 50px;

    font-size: 1.75rem;
`;
