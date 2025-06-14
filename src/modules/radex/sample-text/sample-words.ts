interface SampleWord {
  arabic: string;
  english?: string;
  note?: string;
}

export const sampleWords: SampleWord[] = [
  // 1 character
  { arabic: 'وَ', english: 'and', note: 'conjunction' },

  // 2 characters
  { arabic: 'فِي', english: 'in', note: 'preposition' },
  { arabic: 'إِلَى', english: 'to', note: 'preposition' },
  { arabic: 'عَلَى', english: 'on', note: 'preposition' },
  { arabic: 'مَعَ', english: 'with', note: 'preposition' },
  { arabic: 'عَن', english: 'about', note: 'preposition' },
  { arabic: 'مِن', english: 'from', note: 'preposition' },
  { arabic: 'دَأَبَ', english: 'persisted', note: 'Form 1 perfect verb' },

  // 3 characters
  {
    arabic: 'تِلْكَ',
    english: 'that',
    note: 'demonstrative pronoun, feminine',
  },
  { arabic: 'غَيْر', english: 'other', note: 'noun/particle' },
  { arabic: 'رَجَب', english: 'Rajab', note: 'proper noun, month name' },
  {
    arabic: 'اللَّه',
    english: 'God',
    note: 'proper noun with definite article',
  },
  { arabic: 'رَبّ', english: 'Lord', note: 'noun' },

  // 4 characters
  {
    arabic: 'تَبْلُغ',
    english: 'reaches',
    note: 'Form 1 imperfect verb, 3rd feminine singular',
  },
  { arabic: 'سُورِيَا', english: 'Syria', note: 'proper noun, country name' },
  {
    arabic: 'وَإِنَّهَا',
    english: 'and it',
    note: 'conjunction + emphatic particle + pronoun',
  },
  { arabic: 'مَوْجَة', english: 'wave', note: 'noun, feminine' },
  { arabic: 'عَالَم', english: 'world', note: 'noun' },
  { arabic: 'بِسْم', english: 'in the name', note: 'preposition + noun' },
  { arabic: 'الْحَمْد', english: 'praise', note: 'noun with definite article' },
  {
    arabic: 'أَسْمَاه',
    english: 'he named',
    note: 'Form 4 perfect verb with object pronoun',
  },

  // 5 characters
  {
    arabic: 'مَدْرَسَة',
    english: 'school',
    note: 'Form 1 active participle, feminine, place noun',
  },
  {
    arabic: 'وَتَنْظُر',
    english: 'and looks',
    note: 'conjunction + Form 1 imperfect verb',
  },
  {
    arabic: 'الْقُوَّات',
    english: 'forces',
    note: 'noun plural with definite article',
  },
  { arabic: 'حَلِيفًا', english: 'ally', note: 'noun, accusative with tanwin' },
  {
    arabic: 'الدَّوْلَة',
    english: 'state',
    note: 'noun with definite article',
  },
  {
    arabic: 'عَازِلَة',
    english: 'isolated',
    note: 'active participle, feminine',
  },
  {
    arabic: 'الْحُدُود',
    english: 'borders',
    note: 'noun plural with definite article',
  },
  {
    arabic: 'رَاضِيَة',
    english: 'satisfied',
    note: 'active participle, feminine',
  },
  { arabic: 'تَغْطِيَة', english: 'coverage', note: 'Form 2 verbal noun' },
  { arabic: 'مَسَاحَة', english: 'area', note: 'noun, feminine' },
  { arabic: 'جَدِيدَة', english: 'new', note: 'adjective, feminine' },
  { arabic: 'عَجَائِب', english: 'wonders', note: 'noun plural' },
  { arabic: 'غَرَائِب', english: 'oddities', note: 'noun plural' },
  { arabic: 'قَنَوَات', english: 'channels', note: 'noun plural' },
  { arabic: 'يُوتِيُوب', english: 'YouTube', note: 'loanword from English' },
  {
    arabic: 'مَغْرِبِيَّة',
    english: 'Moroccan',
    note: 'nisba adjective, feminine',
  },
  {
    arabic: 'الرَّحْمَن',
    english: 'the Merciful',
    note: 'Form 1 active participle with definite article',
  },
  {
    arabic: 'الرَّحِيم',
    english: 'the Compassionate',
    note: 'Form 1 active participle with definite article',
  },
  {
    arabic: 'مَسْؤُول',
    english: 'official',
    note: 'Form 1 passive participle',
  },
  {
    arabic: 'بِهَجَمَات',
    english: 'with attacks',
    note: 'preposition + noun plural',
  },
  {
    arabic: 'مُمَثِّلُو',
    english: 'representatives',
    note: 'Form 2 active participle, masculine plural',
  },
  {
    arabic: 'تَوَرُّطِهَا',
    english: 'its/her involvement',
    note: 'Form 5 verbal noun with possessive pronoun',
  },
  {
    arabic: 'مُقْتَطَعَة',
    english: 'excerpted',
    note: 'Form 8 passive participle, feminine',
  },
  {
    arabic: 'آخَرِين',
    english: 'others',
    note: 'adjective, masculine plural genitive',
  },
  {
    arabic: 'تَرَاجَعَت',
    english: 'retreated',
    note: 'Form 6 perfect verb, 3rd feminine singular',
  },
  {
    arabic: 'الْمُتَّحِدَة',
    english: 'United',
    note: 'Form 8 active participle, feminine with definite article',
  },
  {
    arabic: 'بِالشُّؤُون',
    english: 'with affairs',
    note: 'preposition + noun plural with definite article',
  },
  {
    arabic: 'مَأْهُولَة',
    english: 'inhabited',
    note: 'Form 1 passive participle, feminine',
  },
  {
    arabic: 'أَخْرَجَتْهُ',
    english: 'expelled him',
    note: 'Form 4 perfect verb with object pronoun',
  },
  { arabic: 'جَوَاسِيس', english: 'spies', note: 'noun plural' },
  {
    arabic: 'اسْتِقَالَتُهُ',
    english: 'his resignation',
    note: 'Form 10 verbal noun with possessive pronoun',
  },
  {
    arabic: 'انْطَلَقَت',
    english: 'launched',
    note: 'Form 7 perfect verb, 3rd feminine singular',
  },
  {
    arabic: 'عَلْمَانِيَّة',
    english: 'secular',
    note: 'nisba adjective, feminine',
  },
  {
    arabic: 'تَسَاءَلْنَا',
    english: 'we wondered',
    note: 'Form 6 perfect verb, 1st plural',
  },
  {
    arabic: 'بِحُقُوقِهِنَّ',
    english: 'with their rights',
    note: 'preposition + noun plural + feminine plural possessive',
  },
  { arabic: 'رُؤْيَة', english: 'vision', note: 'Form 1 verbal noun' },
  {
    arabic: 'الأَرَامِل',
    english: 'widows',
    note: 'noun plural with definite article',
  },
  {
    arabic: 'أَطْفَالُهُنَّ',
    english: 'their children',
    note: 'noun plural + feminine plural possessive',
  },
  { arabic: 'الْوَعْر' },
  { arabic: 'يَتَأَزَّم' },

  // 6 characters
  {
    arabic: 'وَاشِنْطُن',
    english: 'Washington',
    note: 'proper noun, loanword',
  },
  {
    arabic: 'أَسَاسِيًّا',
    english: 'essential',
    note: 'nisba adjective, masculine accusative with tanwin',
  },
  {
    arabic: 'مُوَاجَهَة',
    english: 'confrontation',
    note: 'Form 3 verbal noun',
  },
  {
    arabic: 'مُسَلَّحِي',
    english: 'militants',
    note: 'Form 2 active participle, masculine plural genitive',
  },
  { arabic: 'تَنْظِيم', english: 'organization', note: 'Form 2 verbal noun' },
  {
    arabic: 'مَسَاحَتُهَا',
    english: 'its area',
    note: 'noun + possessive pronoun',
  },
  {
    arabic: 'كِيلُومِتْرًا',
    english: 'kilometer',
    note: 'loanword, accusative with tanwin',
  },
  {
    arabic: 'اللَّاجِئِين',
    english: 'refugees',
    note: 'active participle plural genitive with definite article',
  },
  {
    arabic: 'السُّورِيِّين',
    english: 'Syrians',
    note: 'nisba adjective, masculine plural genitive with definite article',
  },
  { arabic: 'أَرْدُوغَان', english: 'Erdogan', note: 'proper noun, loanword' },
  {
    arabic: 'نَسْتَطِيع',
    english: 'we can',
    note: 'Form 10 imperfect verb, 1st plural',
  },
  {
    arabic: 'الْعَالَمِين',
    english: 'worlds',
    note: 'noun dual/plural genitive with definite article',
  },
  {
    arabic: 'السُّعُودِيَّة',
    english: 'Saudi',
    note: 'nisba adjective, feminine with definite article',
  },
  {
    arabic: 'الْمَرْفُوعَة',
    english: 'the raised',
    note: 'Form 1 passive participle, feminine with definite article',
  },
  {
    arabic: 'الاسْتِمَاع',
    english: 'listening',
    note: 'Form 8 verbal noun with definite article',
  },
  {
    arabic: 'الإِسْلامِيِّين',
    english: 'Islamists',
    note: 'nisba adjective, masculine plural genitive with definite article',
  },
  {
    arabic: 'يَتَهَرَّبُون',
    english: 'they evade',
    note: 'Form 5 imperfect verb, 3rd masculine plural',
  },
  {
    arabic: 'الْوِلايَات',
    english: 'states',
    note: 'noun plural with definite article',
  },
  {
    arabic: 'مُتَّهَمِين',
    english: 'accused',
    note: 'Form 8 passive participle, masculine plural genitive',
  },
  {
    arabic: 'التَّحَدِّيَات',
    english: 'challenges',
    note: 'Form 5 verbal noun plural with definite article',
  },
  {
    arabic: 'الْخُطُوَتَان',
    english: 'the two steps',
    note: 'noun dual nominative with definite article',
  },
  {
    arabic: 'لِلتَّخْطِيط',
    english: 'for planning',
    note: 'preposition + Form 2 verbal noun with definite article',
  },

  // 7+ characters
  { arabic: 'اسْتِقْبَال', english: 'reception', note: 'Form 10 verbal noun' },
  {
    arabic: 'بِاعْتِبَارِهَا',
    english: 'considering it',
    note: 'preposition + Form 8 verbal noun + possessive pronoun',
  },
  {
    arabic: 'التَّحْقِيقَات',
    english: 'investigations',
    note: 'Form 2 verbal noun plural with definite article',
  },
  {
    arabic: 'الْمَعْلُومَات',
    english: 'information',
    note: 'Form 1 passive participle plural with definite article',
  },
  {
    arabic: 'الاسْتِخْبَارَاتِيَّة',
    english: 'intelligence',
    note: 'Form 10 verbal noun + nisba adjective, feminine with definite article',
  },
  {
    arabic: 'صُحُفِيِّيهَا',
    english: 'its journalists',
    note: 'nisba adjective plural + possessive pronoun',
  },
  {
    arabic: 'سَيَسْتَعْمِلُونَهَا',
    english: 'they will use it',
    note: 'future particle + Form 10 imperfect verb + object pronoun',
  },
];
