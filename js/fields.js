/* 
* All values represented as whole numbers or fractions
* for correct math inside each type (metric, us).
* Conversion number is between fields with def 1
*/

var FIELDS, CONVERTS;

FIELDS = 
{
    "lengths":
    {
        "Millimeters": {abbr: "mm", type: "metric", def: 1000},
        "Centimeters": {abbr: "cm", type: "metric", def: 100},
        "Meters": {abbr: "m", type: "metric", def: 1},
        "Kilometers": {abbr: "km", type: "metric", def: 1/1000},
        "Inches": {abbr: "in", type: "us", def: 1},
        "Feet": {abbr: "ft", type: "us", def: 1/12},
        "Yards": {abbr: "yd", type: "us", def: 1/36},
        "Miles": {abbr: "mi", type: "us", def: 1/63360}
    },

    "weights":
    {
        "Grams": {abbr: "g", type: "metric", def: 1000},
        "Kilograms": {abbr: "kg", type: "metric", def: 1},
        "Tonne": {abbr: "T", type: "metric", def: 1/1000},
        "Ounce": {abbr: "oz", type: "us", def: 16},
        "Pound": {abbr: "lb", type: "us", def: 1},
        "Stone": {abbr: "st", type: "us", def: 1/14},
        "Short Ton": {abbr: "ST", type: "us", def: 1/2000},
        "Long Ton": {abbr: "LT", type: "us", def: 1/2240}
    },
    
    "volumes":
    {
        "Milliliters": {abbr: "ml", type: "metric", def: 1000},
        "Liters": {abbr: "l", type: "metric", def: 1},
        "Cubic meters": {abbr: "m3", type: "metric", def: 1/1000},
        "US ounces": {abbr: "floz", type: "us", def: 1},
        "US cups": {abbr: "c", type: "us", def: 1/8},
        "US pints": {abbr: "pt", type: "us", def: 1/16},
        "US quarts": {abbr: "qt", type: "us", def: 1/32},
        "US gallons": {abbr: "gal", type: "us", def: 1/128}
    }
};

CONVERTS = 
{
    "lengths": 39.370078, 
    "weights": 2.20462,
    "volumes": 33.81402
};
