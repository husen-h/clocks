import { FC, useEffect, useMemo } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

interface ModalProps {
    children: React.ReactNode;
}

const modalRoot = document.getElementById("modal-root")!;
const body = document.body;

export const Modal: FC<ModalProps> = ({ children }) => {
    const el = useMemo(() => document.createElement("div"), []);
    useEffect(() => {
        modalRoot?.appendChild(el);
        body.style.overflow = "hidden";

        return () => {
            modalRoot?.removeChild(el);
            body.style.overflow = "";
        };
    }, []);

    return ReactDOM.createPortal(<Overlay>{children}</Overlay>, el);
};

const Overlay = styled.div`
    background: rgba(83, 83, 83, 0.25);
    height: 100vh;
    width: 100vw;
    position: absolute;
    top: 0;
    left: 0;

    display: grid;
    place-items: center;
`;
