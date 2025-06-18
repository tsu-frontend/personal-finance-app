# Personal Finance App - Refactor & Improvements TODO

This document tracks planned improvements and refactoring tasks for the Personal Finance App.

## Core Tasks

1. **Save data to localStorage.**
2. Refactor `openEditAddModal` to handle both add and edit modals, keeping all data and logic within it.
3. After completing all code, remove the `modalType` error throw.
4. ~~Fix colorBlocks logic.~~ ✔️
   ~~5. Move theme modal toggle and handling functions to a separate module.~~ ✔️
5. Move `postFetch` function to a separate module.
   ~~7. Rework `validateInput1` into a separate module.~~ ✔️ **Factor in both pots and budgets pages.** ✖️
   ~~6. Move the `themes` object to a new file in a `constants` folder and update all imports accordingly.~~ ✔️

## Additional Possible Improvements

1. Submit the modal form when the user presses the Enter key.
2. Trap focus inside the modal so users can't tab to elements behind it.
3. Implement better error handling and user feedback for fetch failures.
4. Add unit tests for modal logic and utility functions. Example:
   ```js
   test("returns false for empty input", () => {
     document.body.innerHTML = '<input id="input-1" value="" />';
     expect(validateInput1()).toBe(false);
   });
   ```
5. Add keyboard navigation and allow closing modals with the Escape key.
6. Refactor inline styles and classes into CSS modules or classes.
7. Optimize event listeners to avoid memory leaks by removing them when no longer needed or deleting the DOM elements they're attached to.
8. Use animation end event listeners instead of setTimeout for transitions for cleaner code.

## Endgame

1. Persist modal state in URL or history for deep linking.

## Known Bugs

1. Clicking the `themeModal` toggle button (which is outside the modal) while the modal is open flickers it, since the button opens the `themeModal` and the `clickOutClose` function closes it.

   > **Fix:** Update the theme button click handler so that it first checks if the theme modal is already open.

2. When changing the theme in the edit modal, the "already used" indicator remains on the current pot's theme because the original selected theme is still included in `colorBlocks` as in use, even after selecting a new theme.

   > **Fix:** Update the logic so that when a new theme is selected in the edit modal, the `colorBlocks` calculation excludes the original theme.

3. Same as bug #1, but with the `optionsModal`.

4. When the `deleteModal` closes via clicking the close buttons or after a successful delete fetch, opening the `editAddModal (modalType === "add")` causes the body’s overflow style to flicker. The `overflow: hidden` style is correctly applied when the modal opens, but it is then removed.

   > **Possible fix:** Ensure that the logic for setting and removing `overflow: hidden` on the body is only triggered when all modals are closed, not just when a single modal closes.

   > **Possible fix 2:** Pause all event listeners related to modal interactions until the modal close animation finishes, since `overflow: hidden` is removed after the animation.

   > **Possible fix 3:** Remove `overflow: hidden` as soon as the close animation starts, instead of waiting for it to finish.
