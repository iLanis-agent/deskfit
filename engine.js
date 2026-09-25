/* DeskFit engine - ergonomic workstation measurements from body height. Pure math, no DOM. */
(function (root) {
  'use strict';

  // Anthropometric ratios (fractions of body height), with tolerance bands.
  const RATIOS = {
    seatHeight:      { r: 0.25, tol: 2, label: 'Chair seat height' },
    deskSitting:     { r: 0.41, tol: 3, label: 'Desk height, sitting' },
    deskStanding:    { r: 0.61, tol: 3, label: 'Desk height, standing' },
    keyboardSitting: { r: 0.40, tol: 3, label: 'Keyboard tray, sitting' },
    monitorSitting:  { r: 0.72, tol: 5, label: 'Monitor top, sitting' },
    monitorStanding: { r: 0.94, tol: 5, label: 'Monitor top, standing' },
    viewDistance:    { r: 0.36, tol: 10, label: 'Screen viewing distance' }
  };

  function num(v, name) {
    const n = typeof v === 'string' ? parseFloat(v) : v;
    if (typeof n !== 'number' || !isFinite(n) || isNaN(n)) throw new Error(name + ' must be a number');
    return n;
  }
  function round1(x) { return Math.round(x * 10) / 10; }

  function fit(heightCm) {
    const h = num(heightCm, 'heightCm');
    if (h < 120 || h > 220) throw new Error('heightCm must be in [120, 220]');
    const out = {};
    for (const k of Object.keys(RATIOS)) {
      const spec = RATIOS[k];
      out[k] = { value: round1(h * spec.r), min: round1(h * spec.r - spec.tol), max: round1(h * spec.r + spec.tol), label: spec.label };
    }
    // screen tilt and eye-line: top of screen at or slightly below eye level
    out.tiltDeg = { min: 10, max: 20, label: 'Screen tilt (degrees back)' };
    out.heightCm = h;
    return out;
  }

  function feetInchesToCm(feet, inches) {
    const f = num(feet, 'feet'), i = inches === undefined ? 0 : num(inches, 'inches');
    if (f < 3 || f > 8 || f % 1) throw new Error('feet must be a whole number 3-8');
    if (i < 0 || i >= 12) throw new Error('inches must be in [0, 12)');
    return round1((f * 12 + i) * 2.54);
  }

  function cmToFeetInches(cm) {
    const c = num(cm, 'cm');
    if (c <= 0) throw new Error('cm must be positive');
    const totalIn = c / 2.54;
    const f = Math.floor(totalIn / 12);
    const i = Math.round((totalIn - f * 12) * 10) / 10;
    return { feet: f, inches: i };
  }

  const api = { fit: fit, feetInchesToCm: feetInchesToCm, cmToFeetInches: cmToFeetInches, RATIOS: RATIOS };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.DeskFitEngine = api;
})(typeof self !== 'undefined' ? self : this);
