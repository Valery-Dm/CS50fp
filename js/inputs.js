/**
*
* Hanlde user inputs.
*
**/

// number of decimals allowed and maximum length
var DECIMALS = 6, MAXLEN = 12;
// instantiate function names
var main, populate, calculate;

// calls on document ready
main = function () {
    var i;
    // populate all fields
    for (i in FIELDS) {
        if (FIELDS.hasOwnProperty(i)){
            // passing (array, name)
            populate(FIELDS[i], i);    
        }
    }

    // select field on click
    $("#middle").on("click", ".inputfield", function (){
        $(this).select();
    });

    // listen for key events in inputfield and restrict input
    $("#middle").on("input keypress", ".inputfield", function (event) {
        var s, symbol, pattern, navKeys, specKeys, allow;
        // define matching patterns and get key
        s = event.which || event.keyCode;
        symbol = String.fromCharCode(s);
        // match digits and dot
        pattern = /^\d*(\.\d*)?$/;
        // tab 9, pageUp 33, pageDown 34, end 35, home 36, leftArrow 37, rightArrow 39
        navKeys = /^9$|^33$|^34$|^35$|^36$|^37$|^39$/;
        // backspace 8, pause 19, esc 27
        specKeys = /^8$|^19$|^27$/;
        allow = false;

        // prevent wrong keypress, it would allow multiple dots
        if (event.type === "keypress"){
            if (symbol.match(pattern)){
                //console.log("input");
            } else if (String(s).match(navKeys) || String(s).match(specKeys) || event.ctrlKey || event.metaKey){
                //console.log("special");
                allow = true;
            } else {
                //console.log("prevent");
                event.preventDefault();
            }
        }

        // add leading zero
        if(this.value === "."){
            this.value = "0.";
        }

        // prevent calculation of copy-pasted string or two dots (but two dots can be in the field)
        if (this.value.search(pattern) !== -1){
            calculate(this.value);
        } else if (allow){
            //console.log("special input");
        } else {
            //console.log("prevent input");
            event.preventDefault();
        }
    });

    // reset function
    $("#middle").on("click", ".blockname", function () {
        // clear all input fields in current block
        $.each($(this).siblings("input"), function (key, value) {
            // if field contains some value - remove it
            if ($('#' + value.id).val()){
                $('#' + value.id).val('');
            }
        });
    });

    // on hover handler (this isn't a good decision for touch screens)
    // All paragraphs are just top elements with a name for each block
    $(".blockname").on( "mouseenter mouseleave", "p", function(event){
        if (event.type === "mouseenter"){
            $(this).append('<span style="text-align:right; font-size:0.5em">&emsp; Click to refresh</span>');
        } else {
            $(this).find( "span:last" ).remove();
        }
    });
};

// create html elements from array of objects
populate = function (array, name) {
    var div, html, idtag;
    // create division for each block of elements
    div = '<div id="' + name + '" class="container" ></div>';
    $("#middle").append(div);
    // constract html tag
    html = ['<div class="blockname"><p>' + name.toUpperCase() + '</p></div>'];
    // continue in a loop
    $.each(array, function(key, value) {
        html.push('<input id="input_' + value.abbr + '" class="inputfield" maxlength="' + MAXLEN + '" placeholder="' + key + '"/>');
        html.push('<abbr id="abbr_' + value.abbr + '" class="inputabbr" title="' + key + '">' + value.abbr + '</abbr>');
    });
    // put it into division
    idtag = '#' + name;
    $(idtag).html(html);
};

// converts given number 
calculate = function (number) {
    var parent, fields_copy, active_field, active_def, i, result, idtag;
    // get active element atributes
    parent = document.activeElement.parentElement.id;
    fields_copy = $.extend(true, {}, FIELDS[parent]);
    active_field = document.activeElement.placeholder;
    active_def = fields_copy[active_field].def;

    for (i in fields_copy) {
        if (fields_copy.hasOwnProperty(i)){
            // divide each definition by acive one to create a new default set
            fields_copy[i].def = fields_copy[i].def / active_def;

            // if active field is metric
            if (fields_copy[active_field].type === "metric") {
                // convert all us values
                if (fields_copy[i].type === "us") {
                    fields_copy[i].def = fields_copy[i].def * CONVERTS[parent];
                }
            }
            // or if active field is us
            else {
                // convert all metrics
                if (fields_copy[i].type === "metric") {
                    fields_copy[i].def = fields_copy[i].def / CONVERTS[parent];
                }
            }

            // multiply them by entered number
            result = number * fields_copy[i].def; 
            // round to specified amount of decimals if there are more than allowed
            result = parseFloat(result.toFixed(DECIMALS));

            // print results into all fields except the active one
            if (i !== active_field) {
                idtag = '#input_' + fields_copy[i].abbr;
                $(idtag).val(result);
            }
        }
    }
};

// get started
$(document).ready(main);
