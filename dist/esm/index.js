import { Capacitor, registerPlugin } from '@capacitor/core';
import { InsetsType } from './definitions';
/**
 * Update safe area insets CSS variables.
 * @param {Rect} insets
 */
function updateSafeAreaInsets(insets) {
    const prefix = 'safe';
    const style = document.documentElement.style;
    style.setProperty(`--${prefix}-ins-top`, `max(${insets.top}px, env(safe-area-inset-top))`);
    style.setProperty(`--${prefix}-ins-right`, `max(${insets.right}px, env(safe-area-inset-right))`);
    style.setProperty(`--${prefix}-ins-bottom`, `max(${insets.bottom}px, env(safe-area-inset-bottom))`);
    style.setProperty(`--${prefix}-ins-left`, `max(${insets.left}px, env(safe-area-inset-left))`);
}
/**
 * Update keyboard insets CSS variables.
 * @param {Rect} insets
 */
function updateKeyboardInsets(insets) {
    const prefix = 'keyb';
    const style = document.documentElement.style;
    style.setProperty(`--${prefix}-ins-bottom`, `${insets.bottom}px`);
}
// Plugin registration.
const Insets = registerPlugin('Insets');
if (Capacitor.getPlatform() === 'web') {
    // Get safe area insets at the start (web).
    updateSafeAreaInsets({ top: 0, right: 0, bottom: 0, left: 0 });
}
else {
    // Get safe area insets at the start.
    Insets.getSafeAreaInsets().then(insets => {
        updateSafeAreaInsets(insets);
    }, err => console.error(err));
    // Get keyboard insets at the start.
    Insets.getKeyboardInsets().then(insets => {
        updateKeyboardInsets(insets);
    }, err => console.error(err));
    // "insetschange" event.
    Insets.addListener('insets', event => {
        console.log(`[insets] ${event.type}: ${JSON.stringify(event.insets)}`);
        if (InsetsType.SafeArea === event.type) {
            updateSafeAreaInsets(event.insets);
        }
        else if (InsetsType.Keyboard === event.type) {
            updateKeyboardInsets(event.insets);
        }
    }).catch(err => console.error(err));
}
export { Insets };
//# sourceMappingURL=index.js.map