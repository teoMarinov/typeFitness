/* eslint-disable @typescript-eslint/no-explicit-any */
export const apiKey = 'cXTmSF6TELNDG3inGzn4Pw==iGyp237bLqmLjgpe';

export const MIN_USERNAME_LENGTH = 2;

export const MAX_USERNAME_LENGTH = 20;

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const PHONE_NUMBER_LENGTH = 10;

export const MIN_TITLE_LENGTH = 4;

export const MAX_TITLE_LENGTH = 30;

export const MIN_GOAL_NAME_LENGTH = 4;

export const MAX_GOAL_NAME_LENGTH = 30;

export const METRIC_SYSTEM = 'metric';

export const IMPERIAL_SYSTEM = 'imperial';

export const WEIGHT_METRIC_UNIT = 'kg';

export const WEIGHT_IMPERIAL_UNIT = 'lbs';

export const HEIGHT_METRIC_UNIT = 'cm';

export const HEIGHT_IMPERIAL_UNIT = 'in';

export const BMI_METRIC_UNIT = 'kg/m²';
export const MIN_DURATION_STEPS = 0;

export const MIN_GOAL_TIME_PERIOD = 0;
export const MIN_PASSWORD_LENGTH = 6;
export const MIN_HANDLE_LENGTH = 2;
export const MAX_HANDLE_LENGTH = 20;

export const weekDays: any = {
    Sun: "Sunday",
    Mon: "Monday",
    Tue: "Tuesday",
    Wed: "Wednesday",
    Thu: "Thursday",
    Fri: "Friday",
    Sat: "Saturday",
};

export
    const ACTION = {
        CHANGE_NAME: "change name",
        CHANGE_CALORIES: "change calories",
        CHANGE_FAT: "change fat",
        CHANGE_SATURATED_FAT: "change saturated fat",
        CHANGE_CARBOHYDRATE: "change carbohydrate",
        CHANGE_SUGAR: "change sugar",
        CHANGE_PROTEIN: "change protein",
        RESET_STATE: "reset state",
    };