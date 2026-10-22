/*
 * Draft prepared with AI assistance for Dev 2; to be reviewed and edited by the team.
 *
 * SilverGuard AI: guardian alert module (backlog item D4).
 * Works in the browser (<script src="alert.js"> exposes window.SilverGuardAlert)
 * and in Node (require('./alert.js')). No dependencies, no network calls at load time.
 *
 * Security: this file never stores, logs or prints the bot token. Every error
 * string is passed through redact() so a token can never leak into the UI.
 */
(function (root, factory) {
  'use strict';
  var api = factory();
  if (typeof module === 'object' && module.exports) {
    module.exports = api;
  } else {
    root.SilverGuardAlert = api;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  // Request format: https://api.telegram.org/bot<token>/METHOD_NAME
  // Source: https://core.telegram.org/bots/api#making-requests
  var TELEGRAM_API_BASE = 'https://api.telegram.org';
  // Text limit "1-4096 characters": https://core.telegram.org/bots/tutorial
  var MAX_TEXT_LENGTH = 4096;
  var DEFAULT_TIMEOUT_MS = 10000;
  var DEFAULT_TIME_ZONE = 'Asia/Singapore';

  function now() {
    if (typeof performance !== 'undefined' && performance && typeof performance.now === 'function') {
      return performance.now();
    }
    return Date.now();
  }

  function elapsedSince(start) {
    return Math.max(0, Math.round(now() - start));
  }

  function result(ok, start, error) {
    return { ok: ok, ms: start === null ? 0 : elapsedSince(start), error: ok ? null : error };
  }

  /** Replace every occurrence of the token in a string, so it can never be shown or logged. */
  function redact(text, token) {
    var s = String(text == null ? '' : text);
    if (token && typeof token === 'string' && token.length >= 4) {
      s = s.split(token).join('<bot token hidden>');
    }
    return s;
  }

  /**
   * Mask the middle digits of a phone number.
   * '+6591234567' -> '+65 9XXX XX67' (Singapore numbers: first digit and last 2 shown).
   * Other international numbers keep '+', the first 2 digits and the last 2 digits.
   * Local numbers keep the first digit and the last 2. Fewer than 4 digits: fully hidden.
   */
  function maskPhoneNumber(raw) {
    var input = String(raw == null ? '' : raw).trim();
    var hasPlus = input.charAt(0) === '+';
    var digits = input.replace(/\D/g, '');
    if (digits.length === 0) return '';

    if (digits.length < 4) return (hasPlus ? '+' : '') + digits.replace(/\d/g, 'X');

    var shown;
    if (hasPlus && digits.indexOf('65') === 0 && digits.length === 10) {
      // Singapore: +65 then 8 digits -> "+65 9XXX XX67"
      return '+65 ' + groupInFours(maskMiddle(digits.slice(2), 1));
    }
    if (hasPlus) {
      // Other countries: country-code length varies, so show "+" and the first 2 digits only.
      shown = maskMiddle(digits, 2);
      return '+' + groupInFours(shown);
    }
    // No "+": a local number such as "9123 4567" -> "9XXX XX67"
    return groupInFours(maskMiddle(digits, 1));
  }

  /** Keep `keepStart` leading digits and the last 2 digits; replace the rest with X. */
  function maskMiddle(digits, keepStart) {
    if (digits.length <= keepStart + 2) return digits.slice(0, -2).replace(/\d/g, 'X') + digits.slice(-2);
    return digits.slice(0, keepStart) + digits.slice(keepStart, -2).replace(/\d/g, 'X') + digits.slice(-2);
  }

  function groupInFours(s) {
    return s.replace(/(.{4})(?=.)/g, '$1 ');
  }

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

  var PRONOUNS = {
    she: ['She', 'her'],
    he: ['He', 'him'],
    they: ['They', 'them']
  };

  /**
   * Build the guardian's alert text.
   * buildAlertText({ seniorName: 'Mum', callerNumber: '+6591234567', time: '10:42' })
   * -> 'Unknown number +65 9XXX XX67 rang Mum at 10:42. She can still answer. Please call her before any money moves.'
   *
   * Options: maskNumber (default true; set false only if the senior consented to sharing the
   * caller's number), pronoun ('she' | 'he' | 'they', default 'she'), timeZone (default Asia/Singapore).
   */
  function buildAlertText(options) {
    var o = options || {};
    var seniorName = (o.seniorName && String(o.seniorName).trim()) || 'Mum';
    var maskNumber = o.maskNumber !== false;
    var p = PRONOUNS[o.pronoun] || PRONOUNS.she;
    var time = formatTime(o.time, o.timeZone);

    var digits = String(o.callerNumber == null ? '' : o.callerNumber).replace(/\D/g, '');
    var who;
    if (!digits) {
      who = 'An unknown caller (number hidden)';
    } else if (maskNumber) {
      who = 'Unknown number ' + maskPhoneNumber(o.callerNumber);
    } else {
      who = 'Unknown number ' + String(o.callerNumber).trim();
    }
    return who + ' rang ' + seniorName + ' at ' + time + '. ' +
      p[0] + ' can still answer. Please call ' + p[1] + ' before any money moves.';
  }

  /** Plain-words explanation of a Telegram error reply. */
  function explainTelegramError(code, description) {
    var desc = String(description || '').toLowerCase();
    var base = 'Telegram refused the message' + (code ? ' (error ' + code + ')' : '') +
      (description ? ': ' + description : '') + '.';
    var hint = '';
    if (code === 401 || desc.indexOf('unauthorized') !== -1) {
      hint = ' The bot token is wrong or has been revoked. Copy it again from BotFather.';
    } else if (desc.indexOf('chat not found') !== -1) {
      hint = ' The chat ID is wrong, or the guardian has not opened the bot and pressed Start yet.';
    } else if (code === 403) {
      hint = ' The guardian has blocked the bot or has not started a chat with it.';
    } else if (code === 429) {
      hint = ' Too many messages in a short time. Wait a little and try again.';
    } else if (code === 400) {
      hint = ' Check the chat ID and the message text.';
    }
    return base + hint;
  }

  /**
   * Send the alert through the Telegram Bot API method sendMessage.
   * Returns a Promise of { ok, ms, error } and never throws.
   *   ok    true when Telegram replied {"ok": true}
   *   ms    time from the call to Telegram's reply (or to the failure), in milliseconds
   *   error null on success, otherwise a plain-words explanation (token always hidden)
   */
  async function sendGuardianAlert(options) {
    var o = options || {};
    var token = typeof o.token === 'string' ? o.token.trim() : '';
    var chatId = o.chatId == null ? '' : String(o.chatId).trim();
    var text = o.text == null ? '' : String(o.text);
    var fetchImpl = o.fetchImpl === undefined ? globalThis.fetch : o.fetchImpl;
    var timeoutMs = typeof o.timeoutMs === 'number' && o.timeoutMs > 0 ? o.timeoutMs : DEFAULT_TIMEOUT_MS;

    if (!token) return result(false, null, 'The bot token is missing. Paste it in Settings, or switch Mock mode on.');
    if (!chatId) return result(false, null, 'The chat ID is missing. Paste the guardian\'s chat ID in Settings.');
    if (!text.trim()) return result(false, null, 'The alert text is empty.');
    if (text.length > MAX_TEXT_LENGTH) return result(false, null, 'The alert text is longer than ' + MAX_TEXT_LENGTH + ' characters.');
    if (typeof fetchImpl !== 'function') return result(false, null, 'This browser or Node version has no fetch(). Use a current browser or Node 18 or later.');

    var url = TELEGRAM_API_BASE + '/bot' + token + '/sendMessage';
    // application/x-www-form-urlencoded is one of the documented ways to pass parameters
    // (https://core.telegram.org/bots/api#making-requests). It is also a "simple" request
    // for browsers, so no CORS preflight is needed.
    var body = new URLSearchParams();
    body.set('chat_id', chatId);
    body.set('text', text);

    var controller = typeof AbortController === 'function' ? new AbortController() : null;
    var timer = null;
    var start = now();
    var timeout = new Promise(function (resolve) {
      timer = setTimeout(function () {
        if (controller) controller.abort();
        resolve({ timedOut: true });
      }, timeoutMs);
    });

    try {
      var request = Promise.resolve().then(function () {
        return fetchImpl(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: body.toString(),
          signal: controller ? controller.signal : undefined
        });
      }).then(function (response) {
        return Promise.resolve()
          .then(function () { return response.json(); })
          .then(function (json) { return { response: response, json: json }; },
            function () { return { response: response, json: null }; });
      });

      var outcome = await Promise.race([request, timeout]);
      if (outcome.timedOut) {
        return result(false, start, 'No reply from Telegram within ' + (timeoutMs / 1000) + ' s (timed out). Check the internet connection and try again.');
      }
      var json = outcome.json;
      var status = outcome.response && outcome.response.status;
      if (json && json.ok === true) return result(true, start, null);
      if (json && json.ok === false) {
        return result(false, start, redact(explainTelegramError(json.error_code || status, json.description), token));
      }
      return result(false, start, 'Telegram sent a reply we could not read' + (status ? ' (HTTP ' + status + ')' : '') + '.');
    } catch (err) {
      var name = err && err.name;
      if (name === 'AbortError' || name === 'TimeoutError') {
        return result(false, start, 'No reply from Telegram within ' + (timeoutMs / 1000) + ' s (timed out). Check the internet connection and try again.');
      }
      return result(false, start, 'Could not reach Telegram (network error). Check the internet connection. Details: ' +
        redact(err && err.message ? err.message : String(err), token));
    } finally {
      clearTimeout(timer);
    }
  }

  /**
   * Mock mode: no network. Waits about delayMs (default 600 ms) and reports success,
   * or the given failure, in the same { ok, ms, error } shape plus mock: true.
   */
  async function simulateGuardianAlert(options) {
    var o = options || {};
    var delayMs = typeof o.delayMs === 'number' && o.delayMs >= 0 ? o.delayMs : 600;
    var sleep = typeof o.sleep === 'function' ? o.sleep : function (ms) {
      return new Promise(function (resolve) { setTimeout(resolve, ms); });
    };
    var start = now();
    await sleep(delayMs);
    var r = o.fail ? result(false, start, String(o.fail)) : result(true, start, null);
    r.mock = true;
    return r;
  }

  /**
   * Helper for setup: list the chats that have recently messaged the bot, using the
   * Bot API method getUpdates (https://core.telegram.org/bots/api#getupdates; it does not
   * work if a webhook is set). Lets the team find the chat ID without typing the token
   * into the browser address bar (which would save it in browser history).
   * Field path message.chat.id: needs verification against the Update and Chat reference.
   * Returns { ok, chats: [{ id, type, name }], error }.
   */
  async function findChatIds(options) {
    var o = options || {};
    var token = typeof o.token === 'string' ? o.token.trim() : '';
    var fetchImpl = o.fetchImpl === undefined ? globalThis.fetch : o.fetchImpl;
    var timeoutMs = typeof o.timeoutMs === 'number' && o.timeoutMs > 0 ? o.timeoutMs : DEFAULT_TIMEOUT_MS;
    if (!token) return { ok: false, chats: [], error: 'The bot token is missing.' };
    if (typeof fetchImpl !== 'function') return { ok: false, chats: [], error: 'No fetch() available.' };

    var controller = typeof AbortController === 'function' ? new AbortController() : null;
    var timer = setTimeout(function () { if (controller) controller.abort(); }, timeoutMs);
    try {
      var response = await fetchImpl(TELEGRAM_API_BASE + '/bot' + token + '/getUpdates', {
        method: 'POST', signal: controller ? controller.signal : undefined
      });
      var json = await response.json();
      if (!json || json.ok !== true) {
        return { ok: false, chats: [], error: redact(explainTelegramError(json && json.error_code, json && json.description), token) };
      }
      var seen = {};
      var chats = [];
      (json.result || []).forEach(function (update) {
        var msg = update && (update.message || update.edited_message || update.channel_post);
        var chat = msg && msg.chat;
        if (!chat || chat.id == null || seen[chat.id]) return;
        seen[chat.id] = true;
        var name = chat.title || [chat.first_name, chat.last_name].filter(Boolean).join(' ') || chat.username || '';
        chats.push({ id: chat.id, type: chat.type || '', name: name });
      });
      if (chats.length === 0) {
        return { ok: true, chats: [], error: 'No chats found yet. Ask the guardian to open the bot, press Start and send "hi", then try again.' };
      }
      return { ok: true, chats: chats, error: null };
    } catch (err) {
      var timedOut = err && (err.name === 'AbortError' || err.name === 'TimeoutError');
      return { ok: false, chats: [], error: timedOut ? 'No reply from Telegram (timed out).' :
        'Could not reach Telegram (network error). Details: ' + redact(err && err.message ? err.message : String(err), token) };
    } finally {
      clearTimeout(timer);
    }
  }

  return {
    TELEGRAM_API_BASE: TELEGRAM_API_BASE,
    MAX_TEXT_LENGTH: MAX_TEXT_LENGTH,
    sendGuardianAlert: sendGuardianAlert,
    simulateGuardianAlert: simulateGuardianAlert,
    buildAlertText: buildAlertText,
    maskPhoneNumber: maskPhoneNumber,
    findChatIds: findChatIds,
    explainTelegramError: explainTelegramError
  };
});
