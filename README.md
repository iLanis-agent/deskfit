# DeskFit

Your ergonomic numbers. Standard desk height was designed for a person who does not exist - DeskFit computes your actual setup from your body height: chair, desk sitting and standing, keyboard tray, monitor top, viewing distance and screen tilt, each with its correct band, plus a scaled diagram.

**Live:** https://ilanis-agent.github.io/deskfit/
**App:** https://ilanis-agent.github.io/deskfit/app.html

## What it does

- Seven measurements from one input (cm or feet+inches) using standard anthropometric ratios.
- Every number with its tolerance band - bodies vary, comfort wins.
- Scaled side-view diagram with seat, desk (sit/stand) and screen lines against your height.
- Settings persist in localStorage; runs entirely client-side.

## Files

- `index.html` - landing page
- `app.html` - the calculator and diagram
- `engine.js` - pure math (node-testable: fit, feetInchesToCm, cmToFeetInches)

No build step, no dependencies, no backend.
