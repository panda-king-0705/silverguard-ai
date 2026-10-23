/*
 * Draft prepared with AI assistance for Dev 2; to be reviewed and edited by the team.
 *
 * SilverGuard AI: wording of the guardian message that follows a Scam Check (pitch demo, DEV2-3).
 * Works in the browser (exposes window.SilverGuardScamAlert) and in Node (require('./scamcheck-alert.js')).
 * No dependencies and no network calls.
 *
 * This is the "buildScamCheckAlertText" proposed in demo/guardian-alert/INTEGRATION.md. It lives in
 * the pitch-demo folder for now because alert.js belongs to another folder. If the team accepts it,
 * move it into alert.js in a later sprint and delete this file.
 *
 * RULE: the guardian message is built from the LEVEL and generic cue NAMES only. This module has no
 * parameter that accepts the pasted message, and containsPastedText() lets the page and the tests
 * prove that no part of the message leaked into the alert.
 */
(function (root, factory) {
  'use strict';
  var api = factory();
  if (typeof module === 'object' && module.exports) {
    module.exports = api;
  } else {
    root.SilverGuardScamAlert = api;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  var DEFAULT_TIME_ZONE = 'Asia/Singapore';
  var MAX_LABELS = 6;
  var MAX_LABEL_LENGTH = 30;
  // Length of the shortest run of the pasted message that counts as "quoted" in the alert.
  var WINDOW = 16;

  var PRONOUNS = { she: 'her', he: 'him', they: 'them' };

  function formatTime(time, timeZone) {
    if (typeof time === 'string' && time.trim() !== '') return time.trim();
    var date = time instanceof Date ? time : (typeof time === 'number' ? new Date(time) : new Date());
    if (isNaN(date.getTime())) date = new Date();
    try {
      return new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit', minute: '2-digit', hourCycle: 'h23', timeZone: timeZone || DEFAULT_TIME_ZONE
      }).format(date);
    } catch (e) {
      var h = String(date.getHours()); var m = String(date.getMinutes());
      return (h.length < 2 ? '0' + h : h) + ':' + (m.length < 2 ? '0' + m : m);
    }
  }

  /** Keep only short, plain cue names such as "Money request"; drop anything else. */
  function cleanLabels(labels) {
    var out = [];
    (Array.isArray(labels) ? labels : []).forEach(function (l) {
      var s = String(l == null ? '' : l).replace(/\s+/g, ' ').trim();
      if (!s || s.length > MAX_LABEL_LENGTH || !/^[A-Za-z][A-Za-z ]*$/.test(s)) return;
      s = s.charAt(0).toLowerCase() + s.slice(1);
      if (out.indexOf(s) === -1 && out.length < MAX_LABELS) out.push(s);
    });
    return out;
  }

  /**
   * buildScamCheckAlertText({ seniorName: 'Mum', level: 'High risk', cueLabels: ['Money request', 'Secrecy'], time: '10:44' })
   * -> 'Mum checked a message in SilverGuard at 10:44: High risk (money request, secrecy). Please call her before any money moves.'
   *
   * Options: includeCues (default true; false sends the level only), pronoun ('she' | 'he' | 'they'),
   * timeZone (default Asia/Singapore). There is deliberately no option for the message text.
   */
  function buildScamCheckAlertText(options) {
    var o = options || {};
    var seniorName = (o.seniorName && String(o.seniorName).trim()) || 'Mum';
    var key = PRONOUNS[o.pronoun] ? o.pronoun : 'she';
    var level = (o.level && String(o.level).trim()) || 'High risk';
    var labels = o.includeCues === false ? [] : cleanLabels(o.cueLabels);
    var time = formatTime(o.time, o.timeZone);
    var what = level + (labels.length ? ' (' + labels.join(', ') + ')' : '');
    return seniorName + ' checked a message in SilverGuard at ' + time + ': ' + what + '. ' +
      'Please call ' + PRONOUNS[key] + ' before any money moves.';
  }

  function squash(s) {
    var t = String(s == null ? '' : s);
    if (typeof t.normalize === 'function') t = t.normalize('NFKC');
    return t.toLowerCase().replace(/\s+/g, ' ').trim();
  }

  /**
   * True if the alert text contains the pasted message, or any run of WINDOW (16) characters of it.
   * Used as a last check before sending, and in the tests. Case and spacing are ignored.
   */
  function containsPastedText(alertText, pasted) {
    var a = squash(alertText);
    var p = squash(pasted);
    if (!p) return false;
    if (p.length < WINDOW) return a.indexOf(p) !== -1 && p.length >= 6;
    for (var i = 0; i + WINDOW <= p.length; i++) {
      if (a.indexOf(p.slice(i, i + WINDOW)) !== -1) return true;
    }
    return false;
  }

  return {
    WINDOW: WINDOW,
    buildScamCheckAlertText: buildScamCheckAlertText,
    containsPastedText: containsPastedText,
    cleanLabels: cleanLabels
  };
});
