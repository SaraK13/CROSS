const multiply = (a: number, b: number): number => {
    return a * modifyValue(b);
};

const modifyValue = (value: number): number => {
    return value + 34;
}

export  {multiply};

/* class CalculationUtils {
    static multiply(a: number, b: number): number {
        return a * CalculationUtils.modifyValue(b);
    }

    static modifyValue(value: number): number {
        return value + 34;
    }
} */