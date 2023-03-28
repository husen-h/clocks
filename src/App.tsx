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
        <AppContainer>
            <h1>World Time</h1>
            <div>
                <button onClick={onButtonClick}>Select timezones</button>
            </div>
            <ClocksContainer>
                {timeZones.map((timeZone) => (
                    <Clock key={timeZone} timeZone={timeZone} />
                ))}
            </ClocksContainer>
        </AppContainer>
    );
}

const AppContainer = styled.section`
    display: flex;
    flex-direction: column;

    height: 100vh;
    

    overflow: hidden;
`;

const ClocksContainer = styled.section`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 20px;

    padding: 60px;

    overflow-y: auto;
`;

export default App;
