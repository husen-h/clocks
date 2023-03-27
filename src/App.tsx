import NiceModal from "@ebay/nice-modal-react";
import { useState } from "react";
import styled from "styled-components";
import { Clock } from "./components/Clock";
import { TimezonesSelector } from "./components/TimezonesSelector";

function App() {
    const [timeZones, setTimeZones] = useState<string[]>([]);

    const onButtonClick = () => {
        NiceModal.show(TimezonesSelector, {
            onApply: (timeZones) => setTimeZones(timeZones),
            savedTimeZones: timeZones,
        });
    };

    return (
        <>
            <h1>World Time</h1>
            <button onClick={onButtonClick}>Select timezones</button>
            <ClocksContainer>
                {timeZones.map((timeZone) => (
                    <Clock key={timeZone} timeZone={timeZone} />
                ))}
                {/* <Clock timeZone="America/New_York" /> */}
                {/* <Clock timeZone="Africa/Ceuta" />
                <Clock timeZone="America/Sao_Paulo" /> */}
            </ClocksContainer>
        </>
    );
}

const ClocksContainer = styled.section`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 20px;

    padding: 60px;
`;

export default App;
