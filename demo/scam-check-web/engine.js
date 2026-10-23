/*
 * Draft prepared with AI assistance for the Dev 1 role; to be reviewed and edited by the team.
 *
 * SilverGuard AI — rules-only Scam Check engine for the browser demo (backlog D2).
 * Pure functions, no dependencies. Works in the browser (window.SilverGuardEngine)
 * and in Node (require('./engine.js')).
 *
 *   detectCues(text)     -> [{ family, label, weight, reason, matches: [phrases] }]
 *   assess(text)         -> { level, reasons: [plain sentences], cues, ignored, reminder }
 *   normaliseForMatching -> the text after leetspeak, repeated-letter and shorthand clean-up
 *
 * It looks for the scam SCRIPT (money, secrecy, identity switch, urgency, authority,
 * emotional pressure) in English, Singlish, Mandarin and Malay. It never says "safe".
 * The product design adds a trained classifier on the phone; this demo does not.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.SilverGuardEngine = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var LEVELS = {
    HIGH: 'High risk',
    CHECK: 'Check with family',
    NONE: 'No warning signs found'
  };

  var REMINDER = 'Still verify any request for money by calling family on a number you saved.';

  // Chinese numerals and digits followed by a currency word, e.g. 五千块, 3000元.
  var ZH_AMOUNT = '[0-9零一二两三四五六七八九十百千万]+\\s*(?:块钱?|元|新币|新元)';

  // A "big" bare Chinese amount with no 块/元: 两万, 三千, 五百, 一万二. It needs a 百/千/万 so that
  // counts and times (六口, 十二点) are not read as money. Words that make it a count or a time are excluded.
  var ZH_BIG_NUM = '(?:[零一二两三四五六七八九十]{1,3}[百千万](?:[零一二两三四五六七八九十]{1,3}[百千]?)?)';
  var ZH_NOT_UNIT = '(?![个只张口位次天年月日点岁人公里条本件])';
  // Money verbs that make a bare amount a request: 转两万, 借我五千, 给我三千, 要三千.
  var ZH_MONEY_VERBS = '(?:转|打|汇|借|垫|凑|赔|付|给|要|需要|欠|缺|寄)[我你他她它们给过去到入进]{0,3}';
  // Digits only after verbs that are clearly about money (not "打110").
  var ZH_DIGIT_VERBS = '(?:转|汇|借|垫|凑|赔|付|欠)[我你他她它们给过去到入进]{0,3}';

  // English and Malay: a money verb, up to three words, then a bare amount of 3 to 6 digits.
  var EN_MONEY_VERBS = '(?:pay(?:ing)?|send(?:ing)?|give|giving|lend(?:ing)?|owe|owing|bank in|top up|settle|deposit|hantar|pindah(?:kan)?|bagi|beri|bayar|pinjam(?:kan)?)';
  var BARE_AMOUNT = '(?:\\d{1,3}(?:,\\d{3})+|\\d{3,6})\\b(?!\\s?\\d)(?!\\s*(?:am|pm|people|persons?|pax|photos?|pics?|pictures?|days?|weeks?|months?|years?|hours?|hrs?|mins?|minutes?|km|kg|percent|%|times?|words?))';

  /*
   * Each family has:
   *   patterns: regexes run on lower-cased, NFKC-normalised text
   *   casePatterns: regexes run on the original text (for acronyms such as MAS, ICA)
   *   strip: phrases removed before matching this family (to avoid known false matches)
   *   negatable: a match is ignored when a negation directly governs it ("NOT asking for money").
   *     Secrecy and identity are never negated because their cues already contain a negation
   *     ("don't tell", "can't talk"); authority is left alone so "not the police, the bank" still counts.
   */
  var CUE_FAMILIES = [
    {
      family: 'money',
      label: 'Money request',
      weight: 'High',
      reason: 'They asked for money or talked about sending or paying it',
      negatable: true,
      patterns: [
        /\btransfer(?:s|red|ring)?\b/g,
        /\bpay[\s-]?now\b/g,
        /\bbank\s+in\b/g,
        /\bbank\s+(?:account|acct|a\/c|transfer|details)\b/g,
        /\baccount\s+(?:number|no\.?)\b/g,
        // "to this account", "account 0123456789" (shorthand "acc"/"acct" is expanded first)
        /\b(?:to|into)\s+(?:this|that|his|her|their|my|the)\s+(?:bank\s+)?account\b/g,
        /\baccount\s*(?:no\.?|number|#)?\s*:?\s*\d[\d\s-]{5,}\d/g,
        /\bsafe(?:ty)?\s+account\b/g,
        /\bgift\s?cards?\b/g,
        /\b(?:itunes|google play|apple|steam)\s+cards?\b/g,
        /\b(?:crypto(?:currency)?|bitcoin|btc|usdt|ethereum)\b/g,
        /\b(?:money|cash|funds?)\b/g,
        /\b(?:borrow|lend me|loan|remit|ransom|bail)\b/g,
        /\bsend\s+(?:me|us|him|her)\b/g,
        /(?:s\$|\$|\bsgd\s?|\brm\s?)\s?\d[\d,]*(?:\.\d+)?\s?k?\b/g,
        /\b\d+(?:\.\d+)?\s?k\b/g,
        /\b\d[\d,]*\s?(?:dollars|bucks|sgd)\b/g,
        // A money verb, up to three words, then a bare amount: "pay my friend 1500", "bank in 300"
        new RegExp('\\b' + EN_MONEY_VERBS + '(?:\\s+[a-z\']+){0,3}\\s+' + BARE_AMOUNT, 'g'),
        // Malay
        /\b(?:hantar|pindah(?:kan)?|beri|bagi|pinjam(?:kan)?)\s+(?:duit|wang)\b/g,
        /\b(?:duit|wang|akaun|pinjam|bayar)\b/g,
        // Mandarin
        /转账|转帐|汇款|汇钱|打钱|借钱|付款|银行户口|银行账户|户口|账户|钱|保释|赎金/g,
        new RegExp(ZH_AMOUNT, 'g'),
        // Bare Chinese amounts next to a money verb (no 块/元): 转两万, 借我五千, 要三千
        new RegExp(ZH_MONEY_VERBS + ZH_BIG_NUM + ZH_NOT_UNIT, 'g'),
        new RegExp(ZH_DIGIT_VERBS + '[0-9][0-9,]{2,}' + ZH_NOT_UNIT, 'g')
      ]
    },
    {
      family: 'secrecy',
      label: 'Secrecy',
      weight: 'High',
      reason: 'They asked you to keep it secret',
      patterns: [
        /\b(?:don'?t|do not|dont|dun|never)\s+(?:tell|inform|discuss|mention|share)\b/g,
        /\b(?:don'?t|do not|dont|dun|never)\s+let\s+(?:\w+\s+){0,2}know\b/g,
        /\b(?:don'?t|do not|dont|dun|never)\s+(?:call|contact|report to)\s+(?:the\s+)?police\b/g,
        /\bkeep\s+(?:this|it|that)\s+(?:between us|(?:a\s+)?secret|confidential|quiet|to yourself)\b/g,
        /\bbetween\s+(?:you and me|us)\b/g,
        /\b(?:confidential|secret)\b/g,
        // Malay
        /\bjangan\s+(?:beritahu|bagitahu|bagi tahu|beri tahu|kasi tahu|cakap|lapor(?:kan)?)\b/g,
        /\brahsia\b/g,
        // Mandarin
        /别告诉|不要告诉|不要跟.{0,6}说|别跟.{0,6}说|别让.{0,6}知道|不要让.{0,6}知道|保密|千万别说|不要报警|别报警/g
      ]
    },
    {
      family: 'identity',
      label: 'Identity switch',
      weight: 'High',
      reason: 'They said they have a new number, lost their phone or cannot talk',
      patterns: [
        /\bnew\s+(?:phone\s+)?(?:number|no\.?|hp)\b/g,
        /\bchanged?\s+(?:my\s+)?(?:phone\s+)?(?:number|no\.?)\b/g,
        /\b(?:my\s+)?number\s+(?:changed|change already)\b/g,
        /\b(?:lost|lose|spoilt|broke)\s+(?:my\s+)?phone\b/g,
        /\bphone\s+(?:lost|spoil|spoilt|kena stolen|stolen|broke|broken|cannot use|can'?t use|died)\b/g,
        /\b(?:can'?t|cannot|cant|can not|unable to)\s+(?:talk|speak|call|pick up|answer)\b/g,
        /\bvoice\s+(?:note|message|msg)s?\s+only\b/g,
        /\bonly\s+(?:can\s+)?(?:send\s+)?voice\s+(?:note|message|msg)s?\b/g,
        /\bsave\s+(?:this|my new|my)\s+(?:number|no\.?|one)\b/g,
        /\bdelete\s+(?:the|my)\s+old\s+(?:number|one)\b/g,
        /\bguess\s+who\b/g,
        // Malay
        /\bnombor\s+baru\b|\btukar\s+nombor\b|\bsimpan\s+nombor\b|\bteka\s+siapa\b/g,
        // "telefon hilang", "telefon lama hilang", "telefon saya rosak", "hp saya hilang"
        /\b(?:telefon|handphone|hp)\s+(?:\w+\s+)?(?:hilang|rosak|dicuri)\b/g,
        /\btak\s+(?:boleh|dapat)\s+(?:cakap|bercakap|telefon)\b/g,
        // Mandarin
        /新号码|新号|换了?号码|换号|手机(?:丢了|不见了|坏了|掉了|被偷)|不能(?:讲|说话|接电话|打电话)|没法(?:说话|接)|猜猜?我是谁|存(?:一下)?这个号码/g
      ]
    },
    {
      family: 'urgency',
      label: 'Urgency',
      weight: 'Medium',
      reason: 'They are rushing you or describing an emergency',
      // Singlish "just now" means "a moment ago", not "immediately".
      // "pay-now" (a hyphenated PayNow) is a payment service, not "now".
      strip: [/\bjust\s+now\b/g, /\bpay-now\b/g],
      negatable: true,
      patterns: [
        /\bnow\b/g,
        /\b(?:urgent(?:ly)?|asap|immediately|right away|hurry|quick(?:ly)?|emergency|tonight|today)\b/g,
        /\bwithin\s+\d+\s*(?:hours?|hrs?|minutes?|mins?)\b/g,
        /\b(?:hospital|accident|arrested|arrest|police station|lock(?:ed)? up|jail|detained|kidnap(?:ped)?)\b/g,
        // Malay
        /\b(?:segera|sekarang|cepat|kecemasan|kemalangan|ditangkap|malam ini)\b/g,
        // Mandarin
        /马上|紧急|急需|立刻|立即|现在|今晚|赶快|快点|医院|车祸|出事|被抓|警察局|拘留/g
      ]
    },
    {
      family: 'authority',
      label: 'Authority',
      weight: 'Medium',
      reason: 'They say they are the police, a bank, a court or the government',
      patterns: [
        /\b(?:police|polis|court|judge|magistrate|warrant|bank officer|bank staff|fraud team|officer|inspector|government|govt|ministry|money laundering)\b/g,
        /\binvestigat(?:e|es|ed|ion|ions|ing)\b/g,
        // Malay
        /\b(?:mahkamah|kerajaan|pegawai|siasatan)\b/g,
        // Mandarin
        /警察|警方|警局|公安|法庭|法院|政府|银行职员|银行人员|调查|洗钱|官员/g
      ],
      casePatterns: [/\b(?:MAS|ICA|SPF|IRAS|MOM|MOH|AGC|IMDA)\b/g]
    },
    {
      family: 'emotion',
      label: 'Emotional pressure',
      weight: 'Low',
      reason: 'They are trying to make you scared or sorry for them',
      negatable: true,
      patterns: [
        /\b(?:crying|cry|cried|scared|afraid|frightened|terrified|please help|help me|beg you|begging)\b/g,
        // Malay
        /\b(?:menangis|takut|tolong saya|tolong bantu|bantu saya)\b/g,
        // Mandarin
        /哭|害怕|好怕|救我|求求你|帮帮我/g
      ]
    }
  ];

  function normalise(text) {
    var t = String(text == null ? '' : text);
    if (typeof t.normalize === 'function') t = t.normalize('NFKC');
    return t.replace(/[‘’ʼ′]/g, "'").replace(/\s+/g, ' ');
  }

  // ------------------------------------------------------------ text clean-up

  // Symbol and digit swaps used to dodge word lists: p@ynow, tr4nsfer, c0des, googl3.
  var LEET = { '@': 'a', '4': 'a', '3': 'e', '0': 'o', '1': 'i', '5': 's', '7': 't' };

  // Common chat shorthand, whole words only. Add new entries here; no sentence is special-cased.
  var SHORTHAND = {
    pls: 'please', plz: 'please', plss: 'please', pliz: 'please',
    u: 'you', ur: 'your', ure: 'you are',
    acc: 'account', acct: 'account', accnt: 'account', ac: 'account', 'a/c': 'account',
    tfr: 'transfer', trf: 'transfer', trfr: 'transfer', xfer: 'transfer',
    tmr: 'tomorrow', tmrw: 'tomorrow', tmw: 'tomorrow', tml: 'tomorrow',
    bck: 'back', fren: 'friend', frens: 'friends', frend: 'friend', frd: 'friend', frds: 'friends',
    urgnt: 'urgent', urg: 'urgent', urgt: 'urgent', emerg: 'emergency', hosp: 'hospital',
    mny: 'money', cuz: 'because'
  };
  // Words such as "bro", "sis", "lah" are deliberately NOT cues: casual address is normal in family chats.

  function isLetter(ch) { return ch >= 'a' && ch <= 'z'; }

  // Leave amounts such as "rm5k", "3k", "2nd", "10pm" alone.
  var NUMBER_LIKE = /^(?:rm|sgd|usd|myr|idr|s)?\d[\d.,]*(?:k|m|sgd|usd|dollars|bucks|x|pax|pm|am|hrs?|st|nd|rd|th)?$/;

  function deleet(tok) {
    if ((tok.match(/[a-z]/g) || []).length < 2 || NUMBER_LIKE.test(tok)) return tok;
    var out = '';
    var lettersBefore = 0;
    for (var i = 0; i < tok.length; i++) {
      var c = tok.charAt(i);
      var prev = out.charAt(out.length - 1);
      var next = tok.charAt(i + 1);
      if (LEET[c] && isLetter(prev) &&
          (isLetter(next) || (i === tok.length - 1 && (c === '3' || c === '4' || c === '@') && lettersBefore >= 3))) {
        c = LEET[c];
      }
      if (isLetter(c)) lettersBefore++;
      out += c;
    }
    return out;
  }

  /**
   * Cleans lower-case text before the word lists run:
   *   1. symbol/digit swaps inside words (p@ynow, tr4nsfer, Googl3 Pl@y c@rds)
   *   2. three or more repeated letters shrink to one (pleaseee, heeelp)
   *   3. whole-word shorthand is expanded (pls, acc, u, tmr)
   */
  function normaliseForMatching(text) {
    var t = normalise(text).toLowerCase();
    return t.replace(/[a-z0-9@\/'-]+/g, function (tok) {
      var w = deleet(tok).replace(/([a-z])\1{2,}/g, '$1');
      var base = w, suffix = '';
      if (/'s$/.test(w)) { base = w.slice(0, -2); suffix = "'s"; }
      return Object.prototype.hasOwnProperty.call(SHORTHAND, base) ? SHORTHAND[base] + suffix : w;
    });
  }

  // ------------------------------------------------------------ negation

  /*
   * A negation cancels a cue only when it DIRECTLY governs it: the negation word is followed only by
   * a few light words ("asking", "for", "any", "you", "to"...) and then the cue, with no comma, full stop
   * or other word in between. So "I'm NOT asking for money" cancels "money", but
   * "I'm not able to talk, transfer $500 now" and "Not asking for myself, send 3k" do not cancel the request.
   */
  var NEG_FILLER = 'asking|ask|asked|for|any|you|your|to|need|needing|want|wanting|expect|expecting|looking|' +
    'request|requesting|a|an|the|some|anything|more|about|worry|bother|even|really|that|this|my|me|us';
  var NEG_EN = new RegExp(
    "(?:\\b(?:not|never|no|nothing|nobody|without|nor|don'?t|dont|dun|doesn'?t|didn'?t|isn'?t|aren'?t|wasn'?t|won'?t)\\b)" +
    '(?:\\s+(?:' + NEG_FILLER + ')){0,4}\\s*$');
  var NEG_ZH = /(?:不是|并非|不用|不必|无需|不会|没有|没|不要|别|绝不)[要想是向跟让找叫你您给借再]{0,5}$/;
  var NEG_MS = new RegExp(
    '\\b(?:bukan|tidak|tak|tiada|jangan|usah)\\b(?:\\s+(?:minta|nak|mahu|ingin|untuk|pasal|risau|bimbang|kamu|awak|anda|saya|kepada|apa-apa|sebarang|lah|la)){0,4}\\s*$');

  function isNegated(text, index) {
    var before = text.slice(Math.max(0, index - 80), index);
    return NEG_EN.test(before) || NEG_ZH.test(before) || NEG_MS.test(before);
  }

  // ------------------------------------------------------------ detection

  function collect(re, text, out, ignored) {
    re.lastIndex = 0;
    var m;
    while ((m = re.exec(text)) !== null) {
      var phrase = m[0].trim();
      if (phrase) {
        if (ignored && isNegated(text, m.index)) {
          if (ignored.indexOf(phrase) === -1) ignored.push(phrase);
        } else if (out.indexOf(phrase) === -1) {
          out.push(phrase);
        }
      }
      if (m[0].length === 0) re.lastIndex++;
    }
  }

  /**
   * Returns { cues, ignored }: the cue families found (with matched phrases) and the phrases that were
   * ignored because a negation directly governs them (shown to the person so nothing is hidden).
   */
  function analyse(text) {
    var original = normalise(text);
    var lower = normaliseForMatching(text);
    var found = [];
    var ignoredAll = [];
    CUE_FAMILIES.forEach(function (fam) {
      var subject = lower;
      (fam.strip || []).forEach(function (re) {
        subject = subject.replace(re, ' ');
      });
      var matches = [];
      var ignored = fam.negatable ? [] : null;
      fam.patterns.forEach(function (re) { collect(re, subject, matches, ignored); });
      (fam.casePatterns || []).forEach(function (re) { collect(re, original, matches); });
      if (ignored) {
        ignored.forEach(function (p) {
          if (matches.indexOf(p) === -1) ignoredAll.push({ family: fam.family, phrase: p });
        });
      }
      if (matches.length) {
        found.push({
          family: fam.family,
          label: fam.label,
          weight: fam.weight,
          reason: fam.reason,
          matches: matches
        });
      }
    });
    return { cues: found, ignored: ignoredAll };
  }

  /** Returns the cue families found, each with the phrases that matched. */
  function detectCues(text) {
    return analyse(text).cues;
  }

  /**
   * Combines cues into one of three levels (never "safe"):
   *   High risk          = money request + any other High or Medium cue
   *   Check with family  = any High cue without that combination (money alone counts)
   *   No warning signs   = everything else
   */
  function assess(text) {
    var analysis = analyse(text);
    var cues = analysis.cues;
    var has = function (family) {
      return cues.some(function (c) { return c.family === family; });
    };
    var money = has('money');
    var otherStrong = cues.some(function (c) {
      return c.family !== 'money' && (c.weight === 'High' || c.weight === 'Medium');
    });
    var anyHigh = cues.some(function (c) { return c.weight === 'High'; });

    var level = LEVELS.NONE;
    if (money && otherStrong) level = LEVELS.HIGH;
    else if (anyHigh) level = LEVELS.CHECK;

    return {
      level: level,
      reasons: cues.map(function (c) { return c.reason; }),
      cues: cues,
      ignored: analysis.ignored,
      reminder: REMINDER
    };
  }

  return {
    LEVELS: LEVELS,
    REMINDER: REMINDER,
    CUE_FAMILIES: CUE_FAMILIES,
    detectCues: detectCues,
    normaliseForMatching: normaliseForMatching,
    assess: assess
  };
});
