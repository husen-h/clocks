import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { FC, useEffect, useState } from "react";
import {
    ANGLES,
    CLOCK_CONTAINER_WIDTH,
    CLOCK_RADIUS,
    HOUR_HAND_LENGTH,
    MINUTE_HAND_LENGTH,
    SECOND_HAND_LENGTH,
    SECOND_OPPOSITE_HAND_LENGTH,
    STARTING_POINT,
} from "./Clock.constants";
import {
    BlackContainer,
    ClockContainer,
    Number,
    SVGContainer,
    Title,
    WhiteContainer,
} from "./Clock.styled";
import { getLeftAndTopDifference } from "./Clock.utils";

const getDateAtTimeZone = (date: Date, timeZone: string) =>
    utcToZonedTime(date, timeZone);

export const Clock: FC<{ timeZone: string }> = ({ timeZone }) => {
    const [currentDate, setCurrentDate] = useState(
        getDateAtTimeZone(new Date(), timeZone)
    );

    useEffect(() => {
        function loop(timeout: number) {
            setCurrentDate(getDateAtTimeZone(new Date(), timeZone));
            window.requestAnimationFrame(loop);
        }

        const id = window.requestAnimationFrame(loop);

        return () => {
            window.cancelAnimationFrame(id);
        };
    }, []);

    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    const milliseconds = currentDate.getMilliseconds();

    const hoursAngle = (hours / 12 + minutes / (60 * 12)) * 360;
    const minutesAngle = (minutes / 60 + seconds / (60 * 60)) * 360;
    const secondsAngle = (seconds / 60 + milliseconds / (1000 * 60)) * 360;

    return (
        <ClockContainer>
            <BlackContainer>
                <WhiteContainer>
                    {ANGLES.map((angle, index) => (
                        <Number
                            key={angle}
                            topValue={
                                STARTING_POINT +
                                getLeftAndTopDifference(angle).topDifference
                            }
                            leftValue={
                                STARTING_POINT +
                                CLOCK_RADIUS +
                                getLeftAndTopDifference(angle).leftDifference
                            }
                        >
                            {index || 12}
                        </Number>
                    ))}
                    <SVGContainer
                        height={CLOCK_CONTAINER_WIDTH}
                        width={CLOCK_CONTAINER_WIDTH}
                    >
                        <Hand
                            angle={hoursAngle}
                            handLength={HOUR_HAND_LENGTH}
                            strokeColor="black"
                            strokeWidth="5"
                        />
                        <Hand
                            angle={minutesAngle}
                            handLength={MINUTE_HAND_LENGTH}
                            strokeColor="black"
                            strokeWidth="5"
                        />
                        <Hand
                            angle={secondsAngle}
                            handLength={SECOND_HAND_LENGTH}
                            strokeColor="#FF9500"
                            strokeWidth="4"
                        />
                        <Hand
                            angle={secondsAngle + 180}
                            handLength={SECOND_OPPOSITE_HAND_LENGTH}
                            strokeColor="#FF9500"
                            strokeWidth="4"
                        />
                        <circle
                            cx={CLOCK_CONTAINER_WIDTH / 2}
                            cy={CLOCK_CONTAINER_WIDTH / 2}
                            r="5"
                            fill="white"
                            stroke="black"
                            strokeWidth="3"
                        />
                    </SVGContainer>
                </WhiteContainer>
            </BlackContainer>
            <Title disableMarginBottom>{timeZone}</Title>
            <Title disableMarginTop>
                {format(currentDate, "d LLL, KK:mm:ss aa")}
            </Title>
        </ClockContainer>
    );
};

interface HandProps {
    angle: number;
    handLength: number;
    strokeWidth: string;
    strokeColor: string;
}

const Hand: FC<HandProps> = ({ angle, handLength, strokeColor, strokeWidth }) => {
    const { leftDifference, topDifference } = getLeftAndTopDifference(
        angle,
        handLength
    );
    return (
        <line
            x1={CLOCK_CONTAINER_WIDTH / 2}
            y1={CLOCK_CONTAINER_WIDTH / 2}
            x2={CLOCK_CONTAINER_WIDTH / 2 + leftDifference}
            y2={CLOCK_CONTAINER_WIDTH / 2 - handLength + topDifference}
            strokeLinecap="round"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
        />
    );
};
