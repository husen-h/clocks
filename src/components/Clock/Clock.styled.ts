import styled from "styled-components";
import {
    CLOCK_CONTAINER_WIDTH,
    CLOCK_BLACK_CONTAINER_WIDTH,
} from "./Clock.constants";

export const ClockContainer = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const BlackContainer = styled.div`
    width: ${CLOCK_BLACK_CONTAINER_WIDTH}px;
    height: ${CLOCK_BLACK_CONTAINER_WIDTH}px;

    background-color: black;

    border-radius: 60px;

    display: grid;
    place-items: center;
`;

export const WhiteContainer = styled.div`
    width: ${CLOCK_CONTAINER_WIDTH}px;
    height: ${CLOCK_CONTAINER_WIDTH};

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

export const SVGContainer = styled.svg`
    position: inherit;
`;

export const Title = styled.h3<{
    disableMarginTop?: boolean;
    disableMarginBottom?: boolean;
}>`
    margin-top: ${(props) => (props.disableMarginTop ? "0px" : undefined)};
    margin-bottom: ${(props) => (props.disableMarginBottom ? "0px" : undefined)};
`;
