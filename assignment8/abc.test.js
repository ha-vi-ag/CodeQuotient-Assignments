const op = require('./index') 

test("should add two numbers",() => {
    expect(op.add(1,2)).toBe(3);
});

test("should add two numbers", () => {
    expect(op.add(1,"2")).toBe("12");
});


test("should not add undefind", () => {
    expect(() => op.add(1)).toThrow();
});


test("should subtract two numbers", () => {
    expect(op.subtract(3,4)).toBe(-1);
});

test("should subtract two strings", () => {
    expect(op.subtract("3","4")).toBe(-1);
});

test("should subtract string and number", () => {
    expect(op.subtract(3,"4")).toBe(-1);
});


test("should multiply two numbers", () => {
    expect(op.multiply(3,4)).toBe(12);
});

test("should not multiply strings", () => {
    expect(() => op.multiply("3","4")).toThrow();
});

test("should not multiply undefined values", () => {
    expect(() => op.multiply(4)).toThrow();
});

test("should not multiply string and number", () => {
    expect(() => op.multiply("3",4)).toThrow();
});

test("should divide two numbers", () => {
    expect(op.divide(8,4)).toBe(2);
});

test("should not divide by zero", () => {
    expect(() => op.divide(3,0)).toThrow();
});

test("should not divide undefined values", () => {
    expect(() => op.divide(4)).toThrow();
});

test("should not divide string and number", () => {
    expect(() => op.divide("3",4)).toThrow();
});

test("should not divide strings", () => {
    expect(() => op.divide("8","4")).toThrow();
});


