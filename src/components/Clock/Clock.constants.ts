export const ANGLES = [...Array(12).keys()].map((el) => el * 30);

export const CLOCK_CONTAINER_WIDTH = 270;
export const CLOCK_BLACK_CONTAINER_WIDTH = CLOCK_CONTAINER_WIDTH + 30;
export const PADDING_FOR_WHITE_CONTAINER = 40;
export const STARTING_POINT = PADDING_FOR_WHITE_CONTAINER / 2;
export const CLOCK_RADIUS =
    0.5 * (CLOCK_CONTAINER_WIDTH - PADDING_FOR_WHITE_CONTAINER);

export const HOUR_HAND_LENGTH = 70;
export const MINUTE_HAND_LENGTH = CLOCK_RADIUS + 10;
export const SECOND_HAND_LENGTH = 125;
export const SECOND_OPPOSITE_HAND_LENGTH = 30;