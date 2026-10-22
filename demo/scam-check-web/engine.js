/*
 * Draft prepared with AI assistance for the Dev 1 role; to be reviewed and edited by the team.
 *
 * SilverGuard AI — rules-only Scam Check engine for the browser demo (backlog D2).
 * Pure functions, no dependencies. Works in the browser (window.SilverGuardEngine)
 * and in Node (require('./engine.js')).
 *
 *   detectCues(text) -> [{ family, label, weight, reason, matches: [phrases] }]
 *   assess(text)     -> { level, reasons: [plain sentences], cues, reminder }
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

  /*
   * Each family has:
   *   patterns: regexes run on lower-cased, NFKC-normalised text
   *   casePatterns: regexes run on the original text (for acronyms such as MAS, ICA)
   *   strip: phrases removed before matching this family (to avoid known false matches)
   */
  var CUE_FAMILIES = [
    {
      family: 'money',
      label: 'Money request',
      weight: 'High',
      reason: 'They asked for money or talked about sending or paying it',
      patterns: [
        /\btransfer(?:s|red|ring)?\b/g,
        /\bpay\s?now\b/g,
        /\bbank\s+(?:account|acct|a\/c|transfer|details)\b/g,
        /\baccount\s+(?:number|no\.?)\b/g,
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
        // Malay
        /\b(?:hantar|pindah(?:kan)?|beri|bagi|pinjam(?:kan)?)\s+(?:duit|wang)\b/g,
        /\b(?:duit|wang|akaun|pinjam|bayar)\b/g,
        // Mandarin
        /转账|转帐|汇款|汇钱|打钱|借钱|付款|银行户口|银行账户|户口|账户|钱/g,
        new RegExp(ZH_AMOUNT, 'g')
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
      strip: [/\bjust\s+now\b/g],
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

  function collect(re, text, out) {
    re.lastIndex = 0;
    var m;
    while ((m = re.exec(text)) !== null) {
      var phrase = m[0].trim();
      if (phrase && out.indexOf(phrase) === -1) out.push(phrase);
      if (m[0].length === 0) re.lastIndex++;
    }
  }

  /** Returns the cue families found, each with the phrases that matched. */
  function detectCues(text) {
    var original = normalise(text);
    var lower = original.toLowerCase();
    var found = [];
    CUE_FAMILIES.forEach(function (fam) {
      var subject = lower;
      (fam.strip || []).forEach(function (re) {
        subject = subject.replace(re, ' ');
      });
      var matches = [];
      fam.patterns.forEach(function (re) { collect(re, subject, matches); });
      (fam.casePatterns || []).forEach(function (re) { collect(re, original, matches); });
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
    return found;
  }

  /**
   * Combines cues into one of three levels (never "safe"):
   *   High risk          = money request + any other High or Medium cue
   *   Check with family  = any High cue without that combination (money alone counts)
   *   No warning signs   = everything else
   */
  function assess(text) {
    var cues = detectCues(text);
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
      reminder: REMINDER
    };
  }

  return {
    LEVELS: LEVELS,
    REMINDER: REMINDER,
    CUE_FAMILIES: CUE_FAMILIES,
    detectCues: detectCues,
    assess: assess
  };
});
