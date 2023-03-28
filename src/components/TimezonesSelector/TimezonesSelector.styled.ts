import styled from "styled-components";

export const Container = styled.section`
    display: flex;
    flex-direction: column;

    width: 800px;
    height: 600px;

    background-color: white;
    border-radius: 16px;
    box-shadow: 0px 0px 10px #b4b4b4;

    padding: 6px 8px;
`;

export const Header = styled.section`
    display: flex;
    justify-content: flex-end;

    height: 48px;

    margin: 12px;
`;

export const Footer = styled(Header)``;

export const Content = styled.section`
    flex-grow: 1;

    display: flex;
`;

export const ContentHalfContainer = styled.div<{
    drawRightBorder?: boolean;
}>`
    flex: 1;
    max-width: 50%;
    display: flex;
    flex-direction: column;

    border-right: ${(props) => (props.drawRightBorder ? "1px solid #ccc" : "none")};
    padding: 0px 2rem;
`;

export const ContentHalfTitle = styled.h3`
    margin-top: 0px;
`;

export const ListContainer = styled.div`
    overflow-y: auto;
    flex: 1 0 0px;

    margin-top: 6px;
`;

export const ListElement = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin: 6px 8px;
    padding: 0.5rem;
    background: aliceblue;
    transition: background 300ms ease-in-out;

    &:hover {
        background: #81b1e2;
    }

    cursor: pointer;
`;

export const ListElementText = styled.div`
    flex: 1;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    font-size: 1.25rem;
`;
