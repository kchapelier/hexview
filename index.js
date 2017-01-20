"use strict";

/** HTMLDATAVIEW DEPS **/

//var ANSI_CHARSET = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, " ", "!", "\"", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ":", ";", "&lt;", "=", "&gt;", "?", "@", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "[", "\\", "]", "^", "_", "`", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "{", "|", "}", "~", " ", "€", " ", "‚", "ƒ", "„", "…", "†", "‡", "ˆ", "‰", "Š", "‹", "Œ", " ", "Ž", " ", " ", "‘", "’", "“", "”", "•", "–", "—", "˜", "™", "š", "›", "œ", " ", "ž", "Ÿ", " ", "¡", "¢", "£", "¤", "¥", "¦", "§", "¨", "©", "ª", "«", "¬", " ", "®", "¯", "°", "±", "²", "³", "´", "µ", "¶", "·", "¸", "¹", "º", "»", "¼", "½", "¾", "¿", "À", "Á", "Â", "Ã", "Ä", "Å", "Æ", "Ç", "È", "É", "Ê", "Ë", "Ì", "Í", "Î", "Ï", "Ð", "Ñ", "Ò", "Ó", "Ô", "Õ", "Ö", "×", "Ø", "Ù", "Ú", "Û", "Ü", "Ý", "Þ", "ß", "à", "á", "â", "ã", "ä", "å", "æ", "ç", "è", "é", "ê", "ë", "ì", "í", "î", "ï", "ð", "ñ", "ò", "ó", "ô", "õ", "ö", "÷", "ø", "ù", "ú", "û", "ü", "ý", "þ", "ÿ"];
var PREPARED_ANSI_CHARSET = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '.', '!', '\"', '#', '$', '%', '&amp;', '\'', '(', ')', '*', '+', ',', '-', '.', '/', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ':', ';', '&lt;', '=', '&gt;', '?', '@', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '[', '\\', ']', '^', '_', '`', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '{', '|', '}', '~', '.', '€', '.', '‚', 'ƒ', '„', '…', '†', '‡', 'ˆ', '‰', 'Š', '‹', 'Œ', '.', 'Ž', '.', '.', '‘', '’', '“', '”', '•', '–', '—', '˜', '™', 'š', '›', 'œ', '.', 'ž', 'Ÿ', '.', '¡', '¢', '£', '¤', '¥', '¦', '§', '¨', '©', 'ª', '«', '¬', '.', '®', '¯', '°', '±', '²', '³', '´', 'µ', '¶', '·', '¸', '¹', 'º', '»', '¼', '½', '¾', '¿', 'À', 'Á', 'Â', 'Ã', 'Ä', 'Å', 'Æ', 'Ç', 'È', 'É', 'Ê', 'Ë', 'Ì', 'Í', 'Î', 'Ï', 'Ð', 'Ñ', 'Ò', 'Ó', 'Ô', 'Õ', 'Ö', '×', 'Ø', 'Ù', 'Ú', 'Û', 'Ü', 'Ý', 'Þ', 'ß', 'à', 'á', 'â', 'ã', 'ä', 'å', 'æ', 'ç', 'è', 'é', 'ê', 'ë', 'ì', 'í', 'î', 'ï', 'ð', 'ñ', 'ò', 'ó', 'ô', 'õ', 'ö', '÷', 'ø', 'ù', 'ú', 'û', 'ü', 'ý', 'þ', 'ÿ'];

function displayHexValue (value) {
    return (value < 16) ? '0' + value.toString(16) : value.toString(16);
}

function displayCharValue (value) {
    return PREPARED_ANSI_CHARSET[value] ? PREPARED_ANSI_CHARSET[value] : '.';
}

/** HTMLDATAVIEW **/

var HtmlDataView = function () {
    this.data = new Uint8Array([]);
};

HtmlDataView.prototype.setData = function (data) {
    this.data = new Uint8Array(data, 0);
};

var html = new Array(16);
var textHtml = new Array(16);

HtmlDataView.prototype.getLine = function (lineIndex) {
    var htmlString,
        basePosition = lineIndex * 16,
        position,
        value,
        i;

    for (i = 0; i < 16; i++) {
        position = basePosition + i;
        value = this.data.length > position ? this.data[position] : null;

        if (value === null) {
            html[i] = '<span class="empty">--</span>';
            textHtml[i] = '';
        } else {
            html[i] = '<span>' + displayHexValue(value) + '</span>';
            textHtml[i] = displayCharValue(value);
        }
    }

    htmlString = '<div class="' + (lineIndex % 2 ? 'odd' : 'even') + '"><span class="line-number">' + (lineIndex * 16).toString(16) + '</span>' + html.join('') + '<span class="text">' + textHtml.join('') + '</span></div>';

    return htmlString;
};

/** APPLICATIVE CODE / EVENT HANDLING / RENDER LOOP **/

var editor = document.getElementsByClassName('editor-view')[0],
    lines = document.getElementsByClassName('lines')[0],
    sizer = document.getElementsByClassName('editor-view-sizer')[0];

var rowHeight = 14;

var htmlView = new HtmlDataView();

var scrollPosition = editor.scrollTop,
    height = editor.offsetHeight,
    firstLine = 0,
    lastLine = 0,
    previousFirstLine = -1,
    previousLastLine = -1,
    needRedraw = true;

window.addEventListener('resize', function (e) {
    height = editor.offsetHeight;
});

function draw () {
    requestAnimationFrame(draw);

    scrollPosition = editor.scrollTop;

    firstLine = Math.max(0, scrollPosition / rowHeight) | 0;
    lastLine = ((scrollPosition + height) / rowHeight) | 0;

    if (needRedraw || previousFirstLine !== firstLine || previousLastLine !== lastLine) {
        //console.log('redraw', firstLine, lastLine);

        var linesHtml = '';

        for (var lineIndex = firstLine; lineIndex <= lastLine; lineIndex++) {
            linesHtml += htmlView.getLine(lineIndex);
        }

        lines.innerHTML = linesHtml;

        lines.style.transform = 'translate3d(0px, ' + (firstLine * rowHeight | 0) + 'px, 0px)';

        previousFirstLine = firstLine;
        previousLastLine = lastLine;

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
        htmlView.setData(e.target.result);

        sizer.style.height = ((1 + (htmlView.data.length / 16) | 0) * rowHeight).toFixed(0) + 'px';
        editor.scrollTop = 0;
        needRedraw = true;
    };

    // process the first File objects
    if (files[0]) {
        var reader = new FileReader();
        reader.onload = onload;
        reader.readAsArrayBuffer(files[0]);
    }
};

editor.addEventListener("dragover", noop, false);
editor.addEventListener("dragleave", noop, false);
editor.addEventListener("drop", fileDrop, false);
