'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@capacitor/core');

var Style;
(function (Style) {
    Style["Dark"] = "dark";
    Style["Light"] = "light";
    Style["Default"] = "default";
})(Style || (Style = {}));
var InsetsType;
(function (InsetsType) {
    InsetsType["SafeArea"] = "safe-area";
    InsetsType["Keyboard"] = "keyboard";
})(InsetsType || (InsetsType = {}));

const Insets = core.registerPlugin('Insets');
// Init:
Insets.getSafeAreaInsets().then(insets => {
    updateSafeAreaInsets(insets);
});
Insets.getKeyboardInsets().then(insets => {
    updateKeyboardInsets(insets);
});
// Event: "insetschange"
Insets.addListener('insets', event => {
    console.log(`[insets] ${event.type}: ${JSON.stringify(event.insets)}`);
    if (InsetsType.SafeArea === event.type) {
        updateSafeAreaInsets(event.insets);
    }
    else if (InsetsType.Keyboard === event.type) {
        updateKeyboardInsets(event.insets);
    }
});
function updateSafeAreaInsets(insets) {
    const prefix = 'safe';
    const style = document.documentElement.style;
    style.setProperty(`--${prefix}-ins-top`, `${insets.top}px`);
    style.setProperty(`--${prefix}-ins-right`, `${insets.right}px`);
    style.setProperty(`--${prefix}-ins-bottom`, `${insets.bottom}px`);
    style.setProperty(`--${prefix}-ins-left`, `${insets.left}px`);
}
function updateKeyboardInsets(insets) {
    const prefix = 'keyb';
    const style = document.documentElement.style;
    style.setProperty(`--${prefix}-ins-bottom`, `${insets.bottom}px`);
}

exports.Insets = Insets;
//# sourceMappingURL=plugin.cjs.js.map