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
