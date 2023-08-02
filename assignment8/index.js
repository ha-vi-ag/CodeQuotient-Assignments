module.exports.add = function add(a, b) {

    if(a === undefined || a === null)
        throw new Error("Invalid arguements");
    
    if(b === undefined || b === null)
        throw new Error("Invalid arguements");
    
    return a + b;
}

module.exports.subtract = function subtract(a, b) {

    if(a == undefined || a === null)
        throw new Error("Invalid arguements");
    
    if(b == undefined || b === null)
        throw new Error("Invalid arguements");

    return a - b;
}


module.exports.multiply = function multiply(a, b) { 

    if(a === undefined || a === null || typeof a === "string")
        throw new Error("Invalid arguements");
    
    if(b === undefined || b === null || typeof b === "string")
        throw new Error("Invalid arguements");

    return a * b;
}


module.exports.divide = function divide(a, b) { 

    if(a == undefined || a === null || typeof a === "string")
        throw new Error("Invalid arguements");
    
    if(b == undefined || b === null || typeof b === "string")
        throw new Error("Invalid arguements");

    if (b === 0) 
        throw new Error("Division by zero");

    return a / b;
}

