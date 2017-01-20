var ANSI_CHARSET = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, " ", "!", "\"", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ":", ";", "&lt;", "=", "&gt;", "?", "@", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "[", "\\", "]", "^", "_", "`", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "{", "|", "}", "~", " ", "€", " ", "‚", "ƒ", "„", "…", "†", "‡", "ˆ", "‰", "Š", "‹", "Œ", " ", "Ž", " ", " ", "‘", "’", "“", "”", "•", "–", "—", "˜", "™", "š", "›", "œ", " ", "ž", "Ÿ", " ", "¡", "¢", "£", "¤", "¥", "¦", "§", "¨", "©", "ª", "«", "¬", " ", "®", "¯", "°", "±", "²", "³", "´", "µ", "¶", "·", "¸", "¹", "º", "»", "¼", "½", "¾", "¿", "À", "Á", "Â", "Ã", "Ä", "Å", "Æ", "Ç", "È", "É", "Ê", "Ë", "Ì", "Í", "Î", "Ï", "Ð", "Ñ", "Ò", "Ó", "Ô", "Õ", "Ö", "×", "Ø", "Ù", "Ú", "Û", "Ü", "Ý", "Þ", "ß", "à", "á", "â", "ã", "ä", "å", "æ", "ç", "è", "é", "ê", "ë", "ì", "í", "î", "ï", "ð", "ñ", "ò", "ó", "ô", "õ", "ö", "÷", "ø", "ù", "ú", "û", "ü", "ý", "þ", "ÿ"];

var ROW_HEIGHT = 14,
    DATA_PADDING = 0;

var editor = document.getElementsByClassName('editor-view')[0];
var lines = document.getElementsByClassName('lines')[0];
var sizer = document.getElementsByClassName('editor-view-sizer')[0];

var BinaryDataView = function BinaryDataView () {
    this.source = null;
    this.array = null;
    this.operations = [];
};

BinaryDataView.prototype.setSource = function (arrayBuffer) {
    this.source = arrayBuffer;
    this.array = new Uint8Array(this.source, 0);

    window.ab = this.array;
};

BinaryDataView.prototype.executeOperations = function (value) {
    for (var i = 0; i < this.operations.length; i++) {
        if (this.operations[i][0] === 'XOR') {
            value = value ^ this.operations[i][1];
        } else if (this.operations[i][0] === 'ADD') {
            value = (value + this.operations[i][1]) & 0xFF;
        } else if (this.operations[i][0] === 'ROL') {
            value = (value << this.operations[i][1] | value >>> (8 - this.operations[i][1])) & 0xFF;
        }
    }

    return value;
};

BinaryDataView.prototype.get = function (position) {
    var value = (this.array && this.array.length > position) ? this.array[position] : null;

    if (value !== null && this.operations.length) {
        value = this.executeOperations(value);
    }

    return value;
};

function displayHexValue (value) {
    return (value < 16) ? '0' + value.toString(16) : value.toString(16);
}

function displayCharValue (value) {
    return ANSI_CHARSET[value] && ANSI_CHARSET[value] !== ' ' ? ANSI_CHARSET[value] : '.';
}

    var HtmlDataView = function () {
        this.cache = {};
        this.binaryView = null;
    };

    HtmlDataView.prototype.setBinaryView = function (binaryView) {
        this.cache = {};
        this.binaryView = binaryView;
    };

    var html = new Array(16);
    var textHtml = new Array(16);

    HtmlDataView.prototype.getLine = function (lineIndex) {
        var htmlString,
            basePosition = lineIndex * 16,
            value,
            i;

        /*if (this.cache[lineIndex]) {
            //console.log(lineIndex, 'hit cache');
            htmlString = this.cache[lineIndex];
        } else {*/

            for (i = 0; i < 16; i++) {
                value = this.binaryView.get(basePosition + i);

                if (value === null) {
                    html[i] = '<span class="empty">--</span>';
                    textHtml[i] = '';
                } else {
                    html[i] = '<span>' + displayHexValue(value) + '</span>';
                    textHtml[i] = displayCharValue(value);
                }
            }

            htmlString = '<div class="' + (lineIndex % 2 ? 'odd' : 'even') + '"><span class="line-number">' + (lineIndex * 16).toString(16) + '</span>' + html.join('') + '<span class="text">' + textHtml.join('') + '</span></div>';

            //this.cache[lineIndex] = htmlString;
        //}


        return htmlString;
    };

    var binaryView = new BinaryDataView(),
        htmlView = new HtmlDataView();

    //binaryView.operations.push(['XOR', 53]);

    htmlView.setBinaryView(binaryView);

    var positionY = editor.scrollTop,
        sizeY = editor.offsetHeight,
        previousPositionY = 0,
        previousSizeY = 0;

    var needRedraw = true;

    window.addEventListener('resize', function (e) {
        sizeY = editor.offsetHeight;

        if (sizeY !== previousSizeY) {
            needRedraw = true;
            previousSizeY = sizeY;
        }
    });

    function draw () {
        requestAnimationFrame(draw);

        positionY = editor.scrollTop;

        if (positionY !== previousPositionY) {
            needRedraw = true;
            previousPositionY = positionY;
        }

        if (needRedraw) {
            var firstLine = (positionY / ROW_HEIGHT) | 0,
                lastLine = ((positionY + sizeY) / ROW_HEIGHT) | 0;

            firstLine = Math.max(0, firstLine - DATA_PADDING);
            lastLine = lastLine + DATA_PADDING;

            //console.log('redraw', positionY, sizeY, firstLine, lastLine);

            var linesHtml = '';

            for (var lineIndex = firstLine; lineIndex <= lastLine; lineIndex++) {
                linesHtml += htmlView.getLine(lineIndex);
            }

            lines.innerHTML = linesHtml;

            lines.style.transform = 'translate3d(0px, ' + (firstLine * ROW_HEIGHT | 0) + 'px, 0px)';

            needRedraw = false;
        }
    }

    draw();

    var noop = function noop (e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
    };

    var fileDrop = function fileDrop (e) {
        e.preventDefault();

        var files = e.target.files || e.dataTransfer.files;

        var onload = function onload (e) {
            binaryView.setSource(e.target.result);

            sizer.style.height = ((1 + (binaryView.array.length / 16) | 0) * ROW_HEIGHT).toFixed(0) + 'px';
            editor.scrollTop = 0;
            needRedraw = true;
        };

        // process all File objects
        if (files[0]) {
            var reader = new FileReader();
            reader.onload = onload;
            reader.readAsArrayBuffer(files[0]);
        }
    };

    editor.addEventListener("dragover", noop, false);
    editor.addEventListener("dragleave", noop, false);
    editor.addEventListener("drop", fileDrop, false);
