/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



/**
 * Equation de droite passant par deux points
 * renvoie a et b
 */
 
 function getEquation(x1,x2,y1,y2){
		var a = (y2-y1)/(x2-x1);
		var b =-a*x1+y1;
		return new Array(a,b);
 }
 
 /* MAP (eq. processing) */
 function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

