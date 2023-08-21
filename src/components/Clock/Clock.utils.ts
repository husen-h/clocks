import { CLOCK_RADIUS } from "./Clock.constants";

export function getLeftAndTopDifference(
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
    const angleInRadians = (angle * Math.PI) / 180;
    const lowerAngle = (180 - angle) / 2;

    const otherAngleInRadians = (lowerAngle * Math.PI) / 180;
    const arcStraightLineWidth =
        (radiusValue * Math.sin(angleInRadians)) / Math.sin(otherAngleInRadians);

    const leftAngle = 90 - lowerAngle;
    const leftAngleInRadians = (leftAngle * Math.PI) / 180;
    const leftAngleSin = Math.sin(leftAngleInRadians);

    const rightAngle = 90 - leftAngle;
    const rightAngleInRadians = (rightAngle * Math.PI) / 180;
    const rightAngleSin = Math.sin(rightAngleInRadians);

    const leftDifference = rightAngleSin * arcStraightLineWidth;
    const topDifference = leftAngleSin * arcStraightLineWidth;

    return {
        leftDifference,
        topDifference,
    };
}
