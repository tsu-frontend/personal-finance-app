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
