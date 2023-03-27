import { format } from "date-fns";
import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";
import { FC, useEffect, useState } from "react";
import {
    BlackContainer,
    ClockContainer,
    Number,
    WhiteContainer,
} from "./Clock.styled";

const ANGLES = [...Array(12).keys()].map((el) => el * 30);

const CLOCK_CONTAINER_WIDTH = 270;
const PADDING_FOR_WHITE_CONTAINER = 40;
const STARTING_POINT = PADDING_FOR_WHITE_CONTAINER / 2;
const CLOCK_RADIUS = 0.5 * (CLOCK_CONTAINER_WIDTH - PADDING_FOR_WHITE_CONTAINER);

const HOUR_HAND_LENGTH = 70;
const MINUTE_HAND_LENGTH = CLOCK_RADIUS + 10;
const SECOND_HAND_LENGTH = 125;
const SECOND_OPPOSITE_HAND_LENGTH = 30;

function getLeftAndTopDifference(
    angle: number,
    radiusValue: number = CLOCK_RADIUS
): {
    topDifference: number;
    leftDifference: number;
} {
    if (angle === 180) {
        return {
            topDifference: radiusValue * 2,
            leftDifference: 0,
        };
    }
    const angle_in_radians = (angle * Math.PI) / 180;
    const lower_angle = (180 - angle) / 2;

    const other_angle_in_radians = (lower_angle * Math.PI) / 180;
    const arcStraightLineWidth =
        (radiusValue * Math.sin(angle_in_radians)) /
        Math.sin(other_angle_in_radians);

    const left_angle = 90 - lower_angle;
    const left_angle_in_radians = (left_angle * Math.PI) / 180;
    const left_angle_sin = Math.sin(left_angle_in_radians);

    const right_angle = 90 - left_angle;
    const right_angle_in_radians = (right_angle * Math.PI) / 180;
    const right_angle_sin = Math.sin(right_angle_in_radians);

    const leftDifference = right_angle_sin * arcStraightLineWidth;
    const topDifference = left_angle_sin * arcStraightLineWidth;

    return {
        leftDifference,
        topDifference,
    };
}

const getDateAtTimeZone = (date: Date, timeZone: string) =>
    utcToZonedTime(date, timeZone);

export const Clock: FC<{ timeZone: string }> = ({ timeZone }) => {
    const [currentDate, setCurrentDate] = useState(
        getDateAtTimeZone(new Date(), timeZone)
    );

    // useEffect(() => {
    //     function loop(timeout: number) {
    //         setCurrentDate(getDateAtTimeZone(new Date(), timeZone));
    //         window.requestAnimationFrame(loop);
    //     }

    //     const id = window.requestAnimationFrame(loop);

    //     return () => {
    //         window.cancelAnimationFrame(id);
    //     };
    // }, []);

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
                    <svg
                        height={CLOCK_CONTAINER_WIDTH}
                        width={CLOCK_CONTAINER_WIDTH}
                        style={{ position: "inherit" }}
                    >
                        <line
                            x1={CLOCK_CONTAINER_WIDTH / 2}
                            y1={CLOCK_CONTAINER_WIDTH / 2}
                            x2={
                                CLOCK_CONTAINER_WIDTH / 2 +
                                getLeftAndTopDifference(
                                    minutesAngle,
                                    MINUTE_HAND_LENGTH
                                ).leftDifference
                            }
                            y2={
                                CLOCK_CONTAINER_WIDTH / 2 -
                                MINUTE_HAND_LENGTH +
                                getLeftAndTopDifference(
                                    minutesAngle,
                                    MINUTE_HAND_LENGTH
                                ).topDifference
                            }
                            strokeLinecap="round"
                            style={{
                                stroke: "black",
                                strokeWidth: 5,
                            }}
                        />
                        <line
                            x1={CLOCK_CONTAINER_WIDTH / 2}
                            y1={CLOCK_CONTAINER_WIDTH / 2}
                            x2={
                                CLOCK_CONTAINER_WIDTH / 2 +
                                getLeftAndTopDifference(hoursAngle, HOUR_HAND_LENGTH)
                                    .leftDifference
                            }
                            y2={
                                CLOCK_CONTAINER_WIDTH / 2 -
                                HOUR_HAND_LENGTH +
                                getLeftAndTopDifference(hoursAngle, HOUR_HAND_LENGTH)
                                    .topDifference
                            }
                            strokeLinecap="round"
                            style={{
                                stroke: "black",
                                strokeWidth: 5,
                            }}
                        />
                        <line
                            x1={CLOCK_CONTAINER_WIDTH / 2}
                            y1={CLOCK_CONTAINER_WIDTH / 2}
                            x2={
                                CLOCK_CONTAINER_WIDTH / 2 +
                                getLeftAndTopDifference(
                                    secondsAngle,
                                    SECOND_HAND_LENGTH
                                ).leftDifference
                            }
                            y2={
                                CLOCK_CONTAINER_WIDTH / 2 -
                                SECOND_HAND_LENGTH +
                                getLeftAndTopDifference(
                                    secondsAngle,
                                    SECOND_HAND_LENGTH
                                ).topDifference
                            }
                            strokeLinecap="round"
                            style={{
                                stroke: "#FF9500",
                                strokeWidth: 4,
                            }}
                        />
                        <line
                            x1={CLOCK_CONTAINER_WIDTH / 2}
                            y1={CLOCK_CONTAINER_WIDTH / 2}
                            x2={
                                CLOCK_CONTAINER_WIDTH / 2 +
                                getLeftAndTopDifference(
                                    secondsAngle + 180,
                                    SECOND_OPPOSITE_HAND_LENGTH
                                ).leftDifference
                            }
                            y2={
                                CLOCK_CONTAINER_WIDTH / 2 -
                                SECOND_OPPOSITE_HAND_LENGTH +
                                getLeftAndTopDifference(
                                    secondsAngle + 180,
                                    SECOND_OPPOSITE_HAND_LENGTH
                                ).topDifference
                            }
                            strokeLinecap="round"
                            style={{
                                stroke: "#FF9500",
                                strokeWidth: 4,
                            }}
                        />
                        <circle
                            cx={CLOCK_CONTAINER_WIDTH / 2}
                            cy={CLOCK_CONTAINER_WIDTH / 2}
                            r="5"
                            fill="white"
                            stroke="black"
                            strokeWidth="3"
                        />
                    </svg>
                </WhiteContainer>
            </BlackContainer>
            <p style={{ marginBottom: 0 }}>{timeZone}</p>
            <p style={{ marginTop: 0 }}>
                {format(currentDate, "d LLL, KK:mm:ss aa")}
            </p>
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
