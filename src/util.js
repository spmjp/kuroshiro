const KATAKANA_HIRAGANA_SHIFT = "\u3041".charCodeAt(0) - "\u30a1".charCodeAt(0);
const HIRAGANA_KATAKANA_SHIFT = "\u30a1".charCodeAt(0) - "\u3041".charCodeAt(0);
const ROMANIZATION_SYSTEM = {
    PASSPORT: "passport",
    HEPBURN: "hepburn"
};

/**
 * Check if given char is a hiragana
 *
 * @param {string} ch Given char
 * @return {boolean} if given char is a hiragana
 */
const isHiragana = function (ch) {
    ch = ch[0];
    return ch >= "\u3040" && ch <= "\u309f";
};

/**
 * Check if given char is a katakana
 *
 * @param {string} ch Given char
 * @return {boolean} if given char is a katakana
 */
const isKatakana = function (ch) {
    ch = ch[0];
    return ch >= "\u30a0" && ch <= "\u30ff";
};

/**
 * Check if given char is a kana
 *
 * @param {string} ch Given char
 * @return {boolean} if given char is a kana
 */
const isKana = function (ch) {
    return isHiragana(ch) || isKatakana(ch);
};

/**
 * Check if given char is a kanji
 *
 * @param {string} ch Given char
 * @return {boolean} if given char is a kanji
 */
const isKanji = function (ch) {
    ch = ch[0];
    return (ch >= "\u4e00" && ch <= "\u9fcf") ||
        (ch >= "\uf900" && ch <= "\ufaff") ||
        (ch >= "\u3400" && ch <= "\u4dbf");
};

/**
 * Check if given char is a Japanese
 *
 * @param {string} ch Given char
 * @return {boolean} if given char is a Japanese
 */
const isJapanese = function (ch) {
    return isKana(ch) || isKanji(ch);
};

/**
 * Check if given string has hiragana
 *
 * @param {string} str Given string
 * @return {boolean} if given string has hiragana
 */
const hasHiragana = function (str) {
    for (let i = 0; i < str.length; i++) {
        if (isHiragana(str[i])) return true;
    }
    return false;
};

/**
 * Check if given string has katakana
 *
 * @param {string} str Given string
 * @return {boolean} if given string has katakana
 */
const hasKatakana = function (str) {
    for (let i = 0; i < str.length; i++) {
        if (isKatakana(str[i])) return true;
    }
    return false;
};

/**
 * Check if given string has kana
 *
 * @param {string} str Given string
 * @return {boolean} if given string has kana
 */
const hasKana = function (str) {
    for (let i = 0; i < str.length; i++) {
        if (isKana(str[i])) return true;
    }
    return false;
};

/**
 * Check if given string has kanji
 *
 * @param {string} str Given string
 * @return {boolean} if given string has kanji
 */
const hasKanji = function (str) {
    for (let i = 0; i < str.length; i++) {
        if (isKanji(str[i])) return true;
    }
    return false;
};

/**
 * Check if given string has Japanese
 *
 * @param {string} str Given string
 * @return {boolean} if given string has Japanese
 */
const hasJapanese = function (str) {
    for (let i = 0; i < str.length; i++) {
        if (isJapanese(str[i])) return true;
    }
    return false;
};

const toRawHiragana = function (str) {
    return [...str].map((ch) => {
        if (ch > "\u30a0" && ch < "\u30f7") {
            return String.fromCharCode(ch.charCodeAt(0) + KATAKANA_HIRAGANA_SHIFT);
        }
        return ch;
    }).join("");
};

const toRawKatakana = function (str) {
    return [...str].map((ch) => {
        if (ch > "\u3040" && ch < "\u3097") {
            return String.fromCharCode(ch.charCodeAt(0) + HIRAGANA_KATAKANA_SHIFT);
        }
        return ch;
    }).join("");
};

/**
 * Convert kana to romaji
 *
 * @param {string} str Given string
 * @param {string} system To which romanization system the given string is converted
 * @return {string} Romaji string
 */
const toRawRomaji = function (str, system) {
    system = system || ROMANIZATION_SYSTEM.HEPBURN;

    const romajiSystem = {
        passport: {
            // 数字と記号
            "１": "1",
            "２": "2",
            "３": "3",
            "４": "4",
            "５": "5",
            "６": "6",
            "７": "7",
            "８": "8",
            "９": "9",
            "０": "0",
            "！": "!",
            "“": "\"",
            "”": "\"",
            "＃": "#",
            "＄": "$",
            "％": "%",
            "＆": "&",
            "’": "'",
            "（": "(",
            "）": ")",
            "＝": "=",
            "～": "~",
            "｜": "|",
            "＠": "@",
            "‘": "`",
            "＋": "+",
            "＊": "*",
            "；": ";",
            "：": ":",
            "＜": "<",
            "＞": ">",
            "、": ",",
            "。": ".",
            "／": "/",
            "？": "?",
            "＿": "_",
            "・": "･",
            "「": "\"",
            "」": "\"",
            "｛": "{",
            "｝": "}",
            "￥": "\\",
            "＾": "^",

            // 直音-清音(ア～ノ)
            あ: "a",
            い: "i",
            う: "u",
            え: "e",
            お: "o",
            ア: "a",
            イ: "i",
            ウ: "u",
            エ: "e",
            オ: "o",

            か: "ka",
            き: "ki",
            く: "ku",
            け: "ke",
            こ: "ko",
            カ: "ka",
            キ: "ki",
            ク: "ku",
            ケ: "ke",
            コ: "ko",

            さ: "sa",
            し: "shi",
            す: "su",
            せ: "se",
            そ: "so",
            サ: "sa",
            シ: "shi",
            ス: "su",
            セ: "se",
            ソ: "so",

            た: "ta",
            ち: "chi",
            つ: "tsu",
            て: "te",
            と: "to",
            タ: "ta",
            チ: "chi",
            ツ: "tsu",
            テ: "te",
            ト: "to",

            な: "na",
            に: "ni",
            ぬ: "nu",
            ね: "ne",
            の: "no",
            ナ: "na",
            ニ: "ni",
            ヌ: "nu",
            ネ: "ne",
            ノ: "no",

            // 直音-清音(ハ～ヲ)
            は: "ha",
            ひ: "hi",
            ふ: "fu",
            へ: "he",
            ほ: "ho",
            ハ: "ha",
            ヒ: "hi",
            フ: "fu",
            ヘ: "he",
            ホ: "ho",

            ま: "ma",
            み: "mi",
            む: "mu",
            め: "me",
            も: "mo",
            マ: "ma",
            ミ: "mi",
            ム: "mu",
            メ: "me",
            モ: "mo",

            や: "ya",
            ゆ: "yu",
            よ: "yo",
            ヤ: "ya",
            ユ: "yu",
            ヨ: "yo",

            ら: "ra",
            り: "ri",
            る: "ru",
            れ: "re",
            ろ: "ro",
            ラ: "ra",
            リ: "ri",
            ル: "ru",
            レ: "re",
            ロ: "ro",

            わ: "wa",
            ゐ: "i",
            ゑ: "e",
            を: "o",
            ワ: "wa",
            ヰ: "i",
            ヱ: "e",
            ヲ: "o",

            // 直音-濁音(ガ～ボ)、半濁音(パ～ポ)
            が: "ga",
            ぎ: "gi",
            ぐ: "gu",
            げ: "ge",
            ご: "go",
            ガ: "ga",
            ギ: "gi",
            グ: "gu",
            ゲ: "ge",
            ゴ: "go",

            ざ: "za",
            じ: "ji",
            ず: "zu",
            ぜ: "ze",
            ぞ: "zo",
            ザ: "za",
            ジ: "ji",
            ズ: "zu",
            ゼ: "ze",
            ゾ: "zo",

            だ: "da",
            ぢ: "ji",
            づ: "zu",
            で: "de",
            ど: "do",
            ダ: "da",
            ヂ: "ji",
            ヅ: "zu",
            デ: "de",
            ド: "do",

            ば: "ba",
            び: "bi",
            ぶ: "bu",
            べ: "be",
            ぼ: "bo",
            バ: "ba",
            ビ: "bi",
            ブ: "bu",
            ベ: "be",
            ボ: "bo",

            ぱ: "pa",
            ぴ: "pi",
            ぷ: "pu",
            ぺ: "pe",
            ぽ: "po",
            パ: "pa",
            ピ: "pi",
            プ: "pu",
            ペ: "pe",
            ポ: "po",

            // 拗音-清音(キャ～リョ)
            きゃ: "kya",
            きゅ: "kyu",
            きょ: "kyo",
            しゃ: "sha",
            しゅ: "shu",
            しょ: "sho",
            ちゃ: "cha",
            ちゅ: "chu",
            ちょ: "cho",
            にゃ: "nya",
            にゅ: "nyu",
            にょ: "nyo",
            ひゃ: "hya",
            ひゅ: "hyu",
            ひょ: "hyo",
            みゃ: "mya",
            みゅ: "myu",
            みょ: "myo",
            りゃ: "rya",
            りゅ: "ryu",
            りょ: "ryo",
            キャ: "kya",
            キュ: "kyu",
            キョ: "kyo",
            シャ: "sha",
            シュ: "shu",
            ショ: "sho",
            チャ: "cha",
            チュ: "chu",
            チョ: "cho",
            ニャ: "nya",
            ニュ: "nyu",
            ニョ: "nyo",
            ヒャ: "hya",
            ヒュ: "hyu",
            ヒョ: "hyo",
            ミャ: "mya",
            ミュ: "myu",
            ミョ: "myo",
            リャ: "rya",
            リュ: "ryu",
            リョ: "ryo",

            // 拗音-濁音(ギャ～ビョ)、半濁音(ピャ～ピョ)、合拗音(クヮ、グヮ)
            ぎゃ: "gya",
            ぎゅ: "gyu",
            ぎょ: "gyo",
            じゃ: "ja",
            じゅ: "ju",
            じょ: "jo",
            ぢゃ: "ja",
            ぢゅ: "ju",
            ぢょ: "jo",
            びゃ: "bya",
            びゅ: "byu",
            びょ: "byo",
            ぴゃ: "pya",
            ぴゅ: "pyu",
            ぴょ: "pyo",
            // くゎ: "",
            // ぐゎ: "",
            ギャ: "gya",
            ギュ: "gyu",
            ギョ: "gyo",
            ジャ: "ja",
            ジュ: "ju",
            ジョ: "jo",
            ヂャ: "ja",
            ヂュ: "ju",
            ヂョ: "jo",
            ビャ: "bya",
            ビュ: "byu",
            ビョ: "byo",
            ピャ: "pya",
            ピュ: "pyu",
            ピョ: "pyo",
            // クヮ: "",
            // グヮ: "",

            // 小書きの仮名、符号
            ぁ: "a",
            ぃ: "i",
            ぅ: "u",
            ぇ: "e",
            ぉ: "o",
            ゃ: "ya",
            ゅ: "yu",
            ょ: "yo",
            ゎ: "wa",
            ァ: "a",
            ィ: "i",
            ゥ: "u",
            ェ: "e",
            ォ: "o",
            ャ: "ya",
            ュ: "yu",
            ョ: "yo",
            ヮ: "wa",
            ヵ: "ka",
            ヶ: "ke",
            ん: "n",
            ン: "n",
            // ー: "",
            "　": " ",

            // 外来音(イェ～グォ)
            // いぇ: "",
            // うぃ: "",
            // うぇ: "",
            // うぉ: "",
            // きぇ: "",
            // くぁ: "",
            // くぃ: "",
            // くぇ: "",
            // くぉ: "",
            // ぐぁ: "",
            // ぐぃ: "",
            // ぐぇ: "",
            // ぐぉ: "",
            // イェ: "",
            // ウィ: "",
            // ウェ: "",
            // ウォ: "",
            ヴ: "b"
            // ヴァ: "",
            // ヴィ: "",
            // ヴェ: "",
            // ヴォ: "",
            // ヴュ: "",
            // ヴョ: "",
            // キェ: "",
            // クァ: "",
            // クィ: "",
            // クェ: "",
            // クォ: "",
            // グァ: "",
            // グィ: "",
            // グェ: "",
            // グォ: "",

            // 外来音(シェ～フョ)
            // しぇ: "",
            // じぇ: "",
            // すぃ: "",
            // ずぃ: "",
            // ちぇ: "",
            // つぁ: "",
            // つぃ: "",
            // つぇ: "",
            // つぉ: "",
            // てぃ: "",
            // てゅ: "",
            // でぃ: "",
            // でゅ: "",
            // とぅ: "",
            // どぅ: "",
            // にぇ: "",
            // ひぇ: "",
            // ふぁ: "",
            // ふぃ: "",
            // ふぇ: "",
            // ふぉ: "",
            // ふゅ: "",
            // ふょ: "",
            // シェ: "",
            // ジェ: "",
            // スィ: "",
            // ズィ: "",
            // チェ: "",
            // ツァ: "",
            // ツィ: "",
            // ツェ: "",
            // ツォ: "",
            // ティ: "",
            // テュ: "",
            // ディ: "",
            // デュ: "",
            // トゥ: "",
            // ドゥ: "",
            // ニェ: "",
            // ヒェ: "",
            // ファ: "",
            // フィ: "",
            // フェ: "",
            // フォ: "",
            // フュ: "",
            // フョ: ""
        },
        hepburn: {
            // 数字と記号
            "１": "1",
            "２": "2",
            "３": "3",
            "４": "4",
            "５": "5",
            "６": "6",
            "７": "7",
            "８": "8",
            "９": "9",
            "０": "0",
            "！": "!",
            "“": "\"",
            "”": "\"",
            "＃": "#",
            "＄": "$",
            "％": "%",
            "＆": "&",
            "’": "'",
            "（": "(",
            "）": ")",
            "＝": "=",
            "～": "~",
            "｜": "|",
            "＠": "@",
            "‘": "`",
            "＋": "+",
            "＊": "*",
            "；": ";",
            "：": ":",
            "＜": "<",
            "＞": ">",
            "、": ",",
            "。": ".",
            "／": "/",
            "？": "?",
            "＿": "_",
            "・": "･",
            "「": "\"",
            "」": "\"",
            "｛": "{",
            "｝": "}",
            "￥": "\\",
            "＾": "^",

            // 直音-清音(ア～ノ)
            あ: "a",
            い: "i",
            う: "u",
            え: "e",
            お: "o",
            ア: "a",
            イ: "i",
            ウ: "u",
            エ: "e",
            オ: "o",

            か: "ka",
            き: "ki",
            く: "ku",
            け: "ke",
            こ: "ko",
            カ: "ka",
            キ: "ki",
            ク: "ku",
            ケ: "ke",
            コ: "ko",

            さ: "sa",
            し: "shi",
            す: "su",
            せ: "se",
            そ: "so",
            サ: "sa",
            シ: "shi",
            ス: "su",
            セ: "se",
            ソ: "so",

            た: "ta",
            ち: "chi",
            つ: "tsu",
            て: "te",
            と: "to",
            タ: "ta",
            チ: "chi",
            ツ: "tsu",
            テ: "te",
            ト: "to",

            な: "na",
            に: "ni",
            ぬ: "nu",
            ね: "ne",
            の: "no",
            ナ: "na",
            ニ: "ni",
            ヌ: "nu",
            ネ: "ne",
            ノ: "no",

            // 直音-清音(ハ～ヲ)
            は: "ha",
            ひ: "hi",
            ふ: "fu",
            へ: "he",
            ほ: "ho",
            ハ: "ha",
            ヒ: "hi",
            フ: "fu",
            ヘ: "he",
            ホ: "ho",

            ま: "ma",
            み: "mi",
            む: "mu",
            め: "me",
            も: "mo",
            マ: "ma",
            ミ: "mi",
            ム: "mu",
            メ: "me",
            モ: "mo",

            や: "ya",
            ゆ: "yu",
            よ: "yo",
            ヤ: "ya",
            ユ: "yu",
            ヨ: "yo",

            ら: "ra",
            り: "ri",
            る: "ru",
            れ: "re",
            ろ: "ro",
            ラ: "ra",
            リ: "ri",
            ル: "ru",
            レ: "re",
            ロ: "ro",

            わ: "wa",
            ゐ: "i",
            ゑ: "e",
            を: "o",
            ワ: "wa",
            ヰ: "i",
            ヱ: "e",
            ヲ: "o",

            // 直音-濁音(ガ～ボ)、半濁音(パ～ポ)
            が: "ga",
            ぎ: "gi",
            ぐ: "gu",
            げ: "ge",
            ご: "go",
            ガ: "ga",
            ギ: "gi",
            グ: "gu",
            ゲ: "ge",
            ゴ: "go",

            ざ: "za",
            じ: "ji",
            ず: "zu",
            ぜ: "ze",
            ぞ: "zo",
            ザ: "za",
            ジ: "ji",
            ズ: "zu",
            ゼ: "ze",
            ゾ: "zo",

            だ: "da",
            ぢ: "ji",
            づ: "zu",
            で: "de",
            ど: "do",
            ダ: "da",
            ヂ: "ji",
            ヅ: "zu",
            デ: "de",
            ド: "do",

            ば: "ba",
            び: "bi",
            ぶ: "bu",
            べ: "be",
            ぼ: "bo",
            バ: "ba",
            ビ: "bi",
            ブ: "bu",
            ベ: "be",
            ボ: "bo",

            ぱ: "pa",
            ぴ: "pi",
            ぷ: "pu",
            ぺ: "pe",
            ぽ: "po",
            パ: "pa",
            ピ: "pi",
            プ: "pu",
            ペ: "pe",
            ポ: "po",

            // 拗音-清音(キャ～リョ)
            きゃ: "kya",
            きゅ: "kyu",
            きょ: "kyo",
            しゃ: "sha",
            しゅ: "shu",
            しょ: "sho",
            ちゃ: "cha",
            ちゅ: "chu",
            ちょ: "cho",
            にゃ: "nya",
            にゅ: "nyu",
            にょ: "nyo",
            ひゃ: "hya",
            ひゅ: "hyu",
            ひょ: "hyo",
            みゃ: "mya",
            みゅ: "myu",
            みょ: "myo",
            りゃ: "rya",
            りゅ: "ryu",
            りょ: "ryo",
            キャ: "kya",
            キュ: "kyu",
            キョ: "kyo",
            シャ: "sha",
            シュ: "shu",
            ショ: "sho",
            チャ: "cha",
            チュ: "chu",
            チョ: "cho",
            ニャ: "nya",
            ニュ: "nyu",
            ニョ: "nyo",
            ヒャ: "hya",
            ヒュ: "hyu",
            ヒョ: "hyo",
            ミャ: "mya",
            ミュ: "myu",
            ミョ: "myo",
            リャ: "rya",
            リュ: "ryu",
            リョ: "ryo",

            // 拗音-濁音(ギャ～ビョ)、半濁音(ピャ～ピョ)、合拗音(クヮ、グヮ)
            ぎゃ: "gya",
            ぎゅ: "gyu",
            ぎょ: "gyo",
            じゃ: "ja",
            じゅ: "ju",
            じょ: "jo",
            ぢゃ: "ja",
            ぢゅ: "ju",
            ぢょ: "jo",
            びゃ: "bya",
            びゅ: "byu",
            びょ: "byo",
            ぴゃ: "pya",
            ぴゅ: "pyu",
            ぴょ: "pyo",
            // くゎ: "",
            // ぐゎ: "",
            ギャ: "gya",
            ギュ: "gyu",
            ギョ: "gyo",
            ジャ: "ja",
            ジュ: "ju",
            ジョ: "jo",
            ヂャ: "ja",
            ヂュ: "ju",
            ヂョ: "jo",
            ビャ: "bya",
            ビュ: "byu",
            ビョ: "byo",
            ピャ: "pya",
            ピュ: "pyu",
            ピョ: "pyo",
            // クヮ: "",
            // グヮ: "",

            // 小書きの仮名、符号
            ぁ: "a",
            ぃ: "i",
            ぅ: "u",
            ぇ: "e",
            ぉ: "o",
            ゃ: "ya",
            ゅ: "yu",
            ょ: "yo",
            ゎ: "wa",
            ァ: "a",
            ィ: "i",
            ゥ: "u",
            ェ: "e",
            ォ: "o",
            ャ: "ya",
            ュ: "yu",
            ョ: "yo",
            ヮ: "wa",
            ヵ: "ka",
            ヶ: "ke",
            ん: "n",
            ン: "n",
            // ー: "",
            "　": " ",

            // 外来音(イェ～グォ)
            いぇ: "ye",
            うぃ: "wi",
            うぇ: "we",
            うぉ: "wo",
            きぇ: "kye",
            くぁ: "kwa",
            くぃ: "kwi",
            くぇ: "kwe",
            くぉ: "kwo",
            ぐぁ: "gwa",
            ぐぃ: "gwi",
            ぐぇ: "gwe",
            ぐぉ: "gwo",
            イェ: "ye",
            ウィ: "wi",
            ウェ: "we",
            ウォ: "wo",
            ヴ: "vu",
            ヴァ: "va",
            ヴィ: "vi",
            ヴェ: "ve",
            ヴォ: "vo",
            ヴュ: "vyu",
            ヴョ: "vyo",
            キェ: "kya",
            クァ: "kwa",
            クィ: "kwi",
            クェ: "kwe",
            クォ: "kwo",
            グァ: "gwa",
            グィ: "gwi",
            グェ: "gwe",
            グォ: "gwo",

            // 外来音(シェ～フョ)
            しぇ: "she",
            じぇ: "je",
            // すぃ: "",
            // ずぃ: "",
            ちぇ: "che",
            つぁ: "tsa",
            つぃ: "tsi",
            つぇ: "tse",
            つぉ: "tso",
            てぃ: "ti",
            てゅ: "tyu",
            でぃ: "di",
            でゅ: "dyu",
            とぅ: "tu",
            どぅ: "du",
            にぇ: "nye",
            ひぇ: "hye",
            ふぁ: "fa",
            ふぃ: "fi",
            ふぇ: "fe",
            ふぉ: "fo",
            ふゅ: "fyu",
            ふょ: "fyo",
            シェ: "she",
            ジェ: "je",
            // スィ: "",
            // ズィ: "",
            チェ: "che",
            ツァ: "tsa",
            ツィ: "tsi",
            ツェ: "tse",
            ツォ: "tso",
            ティ: "ti",
            テュ: "tyu",
            ディ: "di",
            デュ: "dyu",
            トゥ: "tu",
            ドゥ: "du",
            ニェ: "nye",
            ヒェ: "hye",
            ファ: "fa",
            フィ: "fi",
            フェ: "fe",
            フォ: "fo",
            フュ: "fyu",
            フョ: "fyo"
        }
    };

    const reg_tsu = /(っ|ッ)([bcdfghijklmnopqrstuvwyz])/gm;
    const reg_xtsu = /っ|ッ/gm;

    let pnt = 0;
    const max = str.length;
    let ch;
    let r;
    let result = "";

    // [PASSPORT] 長音省略 「―」の場合
    if (system === ROMANIZATION_SYSTEM.PASSPORT) {
        str = str.replace(/ー/gm, "");
    }

    while (pnt <= max) {
        if (r = romajiSystem[system][str.substring(pnt, pnt + 2)]) {
            result += r;
            pnt += 2;
        }
        else {
            result += (r = romajiSystem[system][ch = str.substring(pnt, pnt + 1)]) ? r : ch;
            pnt += 1;
        }
    }
    result = result.replace(reg_tsu, "$2$2");

    // [PASSPORT|HEPBURN] 子音を重ねて特殊表記
    if (system === ROMANIZATION_SYSTEM.PASSPORT || system === ROMANIZATION_SYSTEM.HEPBURN) {
        result = result.replace(/cc/gm, "tc");
    }

    result = result.replace(reg_xtsu, "tsu");

    // [PASSPORT|HEPBURN] 撥音の特殊表記
    if (system === ROMANIZATION_SYSTEM.PASSPORT || system === ROMANIZATION_SYSTEM.HEPBURN) {
        result = result.replace(/nm/gm, "mm");
        result = result.replace(/nb/gm, "mb");
        result = result.replace(/np/gm, "mp");
    }

    // [HEPBURN] 撥音の特殊表記 他
    if (system === ROMANIZATION_SYSTEM.HEPBURN) {
        result = result.replace(/na/gm, "n'a");
        result = result.replace(/ni/gm, "n'i");
        result = result.replace(/nu/gm, "n'u");
        result = result.replace(/ne/gm, "n'e");
        result = result.replace(/no/gm, "n'o");
        result = result.replace(/ny/gm, "n'y");
    }

    // [PASSPORT] 長音省略 他の場合
    if (system === ROMANIZATION_SYSTEM.PASSPORT) {
        result = result.replace(/uu/gm, "u");
        result = result.replace(/ou/gm, "o");
        result = result.replace(/oo(?!$)/gm, "o");
    }

    // [HEPBURN] 長音変換
    if (system === ROMANIZATION_SYSTEM.HEPBURN) {
        result = result.replace(/aー/gm, "ā");
        result = result.replace(/iー/gm, "ī");
        result = result.replace(/uー/gm, "ū");
        result = result.replace(/eー/gm, "ē");
        result = result.replace(/oー/gm, "ō");
    }

    return result;
};

const getStrType = function (str) { // 0 for pure kanji,1 for kanji-hira(kana)-mixed,2 for pure hira(kana),3 for others
    let hasKJ = false;
    let hasHK = false;
    for (let i = 0; i < str.length; i++) {
        if (isKanji(str[i])) {
            hasKJ = true;
        }
        else if (isHiragana(str[i]) || isKatakana(str[i])) {
            hasHK = true;
        }
    }
    if (hasKJ && hasHK) return 1;
    else if (hasKJ) return 0;
    else if (hasHK) return 2;
    return 3;
};

export {
    // language
    ROMANIZATION_SYSTEM,
    getStrType,
    isHiragana,
    isKatakana,
    isKana,
    isKanji,
    isJapanese,
    hasHiragana,
    hasKatakana,
    hasKana,
    hasKanji,
    hasJapanese,
    toRawHiragana,
    toRawKatakana,
    toRawRomaji
};
