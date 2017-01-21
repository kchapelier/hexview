"use strict";

/** HTMLDATAVIEW DEPS **/

//var ANSI_CHARSET = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, " ", "!", "\"", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ":", ";", "&lt;", "=", "&gt;", "?", "@", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "[", "\\", "]", "^", "_", "`", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "{", "|", "}", "~", " ", "€", " ", "‚", "ƒ", "„", "…", "†", "‡", "ˆ", "‰", "Š", "‹", "Œ", " ", "Ž", " ", " ", "‘", "’", "“", "”", "•", "–", "—", "˜", "™", "š", "›", "œ", " ", "ž", "Ÿ", " ", "¡", "¢", "£", "¤", "¥", "¦", "§", "¨", "©", "ª", "«", "¬", " ", "®", "¯", "°", "±", "²", "³", "´", "µ", "¶", "·", "¸", "¹", "º", "»", "¼", "½", "¾", "¿", "À", "Á", "Â", "Ã", "Ä", "Å", "Æ", "Ç", "È", "É", "Ê", "Ë", "Ì", "Í", "Î", "Ï", "Ð", "Ñ", "Ò", "Ó", "Ô", "Õ", "Ö", "×", "Ø", "Ù", "Ú", "Û", "Ü", "Ý", "Þ", "ß", "à", "á", "â", "ã", "ä", "å", "æ", "ç", "è", "é", "ê", "ë", "ì", "í", "î", "ï", "ð", "ñ", "ò", "ó", "ô", "õ", "ö", "÷", "ø", "ù", "ú", "û", "ü", "ý", "þ", "ÿ"];
var PREPARED_ANSI_CHARSET = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '.', '!', '\"', '#', '$', '%', '&amp;', '\'', '(', ')', '*', '+', ',', '-', '.', '/', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ':', ';', '&lt;', '=', '&gt;', '?', '@', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '[', '\\', ']', '^', '_', '`', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '{', '|', '}', '~', '.', '€', '.', '‚', 'ƒ', '„', '…', '†', '‡', 'ˆ', '‰', 'Š', '‹', 'Œ', '.', 'Ž', '.', '.', '‘', '’', '“', '”', '•', '–', '—', '˜', '™', 'š', '›', 'œ', '.', 'ž', 'Ÿ', '.', '¡', '¢', '£', '¤', '¥', '¦', '§', '¨', '©', 'ª', '«', '¬', '.', '®', '¯', '°', '±', '²', '³', '´', 'µ', '¶', '·', '¸', '¹', 'º', '»', '¼', '½', '¾', '¿', 'À', 'Á', 'Â', 'Ã', 'Ä', 'Å', 'Æ', 'Ç', 'È', 'É', 'Ê', 'Ë', 'Ì', 'Í', 'Î', 'Ï', 'Ð', 'Ñ', 'Ò', 'Ó', 'Ô', 'Õ', 'Ö', '×', 'Ø', 'Ù', 'Ú', 'Û', 'Ü', 'Ý', 'Þ', 'ß', 'à', 'á', 'â', 'ã', 'ä', 'å', 'æ', 'ç', 'è', 'é', 'ê', 'ë', 'ì', 'í', 'î', 'ï', 'ð', 'ñ', 'ò', 'ó', 'ô', 'õ', 'ö', '÷', 'ø', 'ù', 'ú', 'û', 'ü', 'ý', 'þ', 'ÿ'];
var PREPARED_HEX_VALUES = ['00','01','02','03','04','05','06','07','08','09','0a','0b','0c','0d','0e','0f','10','11','12','13','14','15','16','17','18','19','1a','1b','1c','1d','1e','1f','20','21','22','23','24','25','26','27','28','29','2a','2b','2c','2d','2e','2f','30','31','32','33','34','35','36','37','38','39','3a','3b','3c','3d','3e','3f','40','41','42','43','44','45','46','47','48','49','4a','4b','4c','4d','4e','4f','50','51','52','53','54','55','56','57','58','59','5a','5b','5c','5d','5e','5f','60','61','62','63','64','65','66','67','68','69','6a','6b','6c','6d','6e','6f','70','71','72','73','74','75','76','77','78','79','7a','7b','7c','7d','7e','7f','80','81','82','83','84','85','86','87','88','89','8a','8b','8c','8d','8e','8f','90','91','92','93','94','95','96','97','98','99','9a','9b','9c','9d','9e','9f','a0','a1','a2','a3','a4','a5','a6','a7','a8','a9','aa','ab','ac','ad','ae','af','b0','b1','b2','b3','b4','b5','b6','b7','b8','b9','ba','bb','bc','bd','be','bf','c0','c1','c2','c3','c4','c5','c6','c7','c8','c9','ca','cb','cc','cd','ce','cf','d0','d1','d2','d3','d4','d5','d6','d7','d8','d9','da','db','dc','dd','de','df','e0','e1','e2','e3','e4','e5','e6','e7','e8','e9','ea','eb','ec','ed','ee','ef','f0','f1','f2','f3','f4','f5','f6','f7','f8','f9','fa','fb','fc','fd','fe','ff'];

function displayHexValue (value) {
    return PREPARED_HEX_VALUES[value];
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
        value = this.data.length > position ? this.data[position] : -1;

        if (value === -1) {
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
    lastLine = firstLine + (height / rowHeight) | 0;

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
