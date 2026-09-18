// ============================================================
// YADD Prototype — mock scenario data (DEMO ONLY, not real data)
// Scope: Sana'a / Amanat Al Asimah. Neighborhood-level only.
// Ratings/counts marked '—' intentionally where "no data".
// ============================================================

export const SERVICE_CATEGORIES = [
  { id: 'electric', name: 'كهرباء' },
  { id: 'ac', name: 'تكييف' },
  { id: 'home-repair', name: 'صيانة منزلية' },
  { id: 'plumbing', name: 'سباكة' },
  { id: 'paint', name: 'دهانات' },
  { id: 'carpentry', name: 'نجارة' },
];

export const PRODUCT_CATEGORIES = [
  { id: 'sweets', name: 'حلويات' },
  { id: 'bakery', name: 'مخبوزات' },
  { id: 'handmade', name: 'هدايا يدوية' },
  { id: 'honey', name: 'عسل' },
  { id: 'clothes', name: 'ملابس' },
];

// Neighborhoods of Amanat Al Asimah (demo subset — LOC-DATA-Q01 open)
export const NEIGHBORHOODS = [
  'حدة',
  'السبعين',
  'شميلة',
  'نقم',
  'التحرير',
  'معين',
  'شعوب',
  'آزال',
  'بني الحارث',
  'الصافية',
];

export const categoryName = (type, id) => {
  const list = type === 'PRODUCT' ? PRODUCT_CATEGORIES : SERVICE_CATEGORIES;
  return (list.find((c) => c.id === id) || {}).name || id;
};

export const PROVIDERS = [
  {
    id: 'pr-1',
    kind: 'SERVICE',
    displayName: 'أبو أحمد للكهرباء',
    categories: ['electric'],
    areas: ['حدة', 'السبعين'],
    about: 'فني كهرباء منزلية: تأسيس، صيانة، وتركيب إنارة. التزام بالمواعيد وتوثيق واضح للاتفاق.',
    rating: 4.6,
    completed: 23,
    works: [
      { id: 'w1', title: 'تأسيس كهرباء شقة', desc: 'تأسيس كامل مع لوحة توزيع' },
      { id: 'w2', title: 'تركيب إنارة مخفية', desc: 'إنارة LED لمجلس' },
      { id: 'w3', title: 'صيانة لوحة', desc: 'إصلاح تماس كهربائي' },
    ],
  },
  {
    id: 'pr-2',
    kind: 'SERVICE',
    displayName: 'مركز التبريد الحديث',
    categories: ['ac'],
    areas: ['شميلة', 'نقم'],
    about: 'صيانة وتركيب مكيفات سبليت وشباك، تعبئة غاز وتنظيف دوري.',
    rating: null, // — : no rating data yet (do not fabricate)
    completed: null,
    works: [{ id: 'w1', title: 'تركيب سبلت', desc: 'تركيب + تمديد نحاس' }],
  },
  {
    id: 'pr-3',
    kind: 'PRODUCT',
    displayName: 'حلويات البيت السعيد',
    tradeName: 'حلويات البيت السعيد',
    categories: ['sweets'],
    areas: ['التحرير', 'معين'],
    about: 'حلويات منزلية للمناسبات: معمول، كيك، وبقلاوة حسب الطلب.',
    rating: 4.9,
    completed: 41,
    works: [
      { id: 'w1', title: 'معمول العيد', desc: 'معمول بالتمر والسمن البلدي' },
      { id: 'w2', title: 'كيك مناسبات', desc: 'كيك حسب التصميم المطلوب' },
      { id: 'w3', title: 'بقلاوة', desc: 'بقلاوة بالمكسرات' },
    ],
  },
  {
    id: 'pr-4',
    kind: 'PRODUCT',
    displayName: 'مخبز الدار',
    tradeName: 'مخبز الدار',
    categories: ['bakery'],
    areas: ['شعوب', 'آزال'],
    about: 'مخبوزات طازجة يوميًا: خبز، كعك، وفطائر.',
    rating: null,
    completed: null,
    works: [],
  },
  {
    id: 'pr-5',
    kind: 'SERVICE',
    displayName: 'أبو محمد للصيانة',
    categories: ['home-repair', 'plumbing'],
    areas: ['الصافية', 'بني الحارث'],
    about: 'صيانة منزلية عامة وسباكة: إصلاح تسريبات وتركيب أدوات صحية.',
    rating: 4.2,
    completed: 11,
    works: [{ id: 'w1', title: 'إصلاح تسريب', desc: 'تسريب مغسلة مطبخ' }],
  },
];

export const providerById = (id) => PROVIDERS.find((p) => p.id === id);

// ---- Seed requests --------------------------------------------------
// status: Open | Matched | ClosedByBeneficiary | Expired
export const SEED_MY_REQUESTS = [
  {
    id: 'rq-1',
    mine: true,
    type: 'SERVICE',
    category: 'electric',
    neighborhood: 'حدة',
    description: 'أحتاج فني كهرباء لإصلاح انقطاع متكرر في المجلس وتركيب ٤ مفاتيح جديدة.',
    extra: 'يفضل الحضور عصرًا.',
    indicativePrice: 15000,
    images: 1,
    status: 'Open',
    createdAt: '2026-09-17',
    updatedAt: '2026-09-18',
  },
  {
    id: 'rq-2',
    mine: true,
    type: 'PRODUCT',
    category: 'sweets',
    neighborhood: 'التحرير',
    description: 'طلب ٣ كيلو معمول للعيد، نصفها بالتمر ونصفها بالجوز.',
    extra: '',
    indicativePrice: null,
    images: 0,
    status: 'Expired',
    createdAt: '2026-09-10',
    updatedAt: '2026-09-13',
  },
];

export const SEED_SUITABLE_REQUESTS = [
  {
    id: 'sq-1',
    type: 'SERVICE',
    category: 'electric',
    neighborhood: 'السبعين',
    description: 'تركيب ثريا جديدة في الصالة مع مراجعة التمديدات.',
    extra: '',
    indicativePrice: 20000,
    images: 0,
    status: 'Open',
    createdAt: '2026-09-18',
  },
  {
    id: 'sq-2',
    type: 'SERVICE',
    category: 'ac',
    neighborhood: 'شميلة',
    description: 'صيانة مكيف سبلت لا يبرد، غالبًا يحتاج تعبئة غاز وتنظيف.',
    extra: 'الدور الثاني، متوفر سلم.',
    indicativePrice: null,
    images: 1,
    status: 'Open',
    createdAt: '2026-09-17',
  },
  {
    id: 'sq-3',
    type: 'SERVICE',
    category: 'home-repair',
    neighborhood: 'حدة',
    description: 'إصلاح باب خشبي لا يغلق بإحكام + دهان جزئي.',
    extra: '',
    indicativePrice: 8000,
    images: 0,
    status: 'Open',
    createdAt: '2026-09-16',
  },
];

// Provider Responses on rq-1 (demo). status: Active | Selected | NotSelected | Withdrawn
export const SEED_RESPONSES = [
  {
    id: 'rs-1',
    requestId: 'rq-1',
    providerId: 'pr-1',
    acceptIndicative: true,
    proposedPrice: null,
    note: 'أستطيع الحضور غدًا عصرًا، والعمل يشمل اختبار اللوحة.',
    requiresDeposit: false,
    status: 'Active',
    createdAt: '2026-09-18',
  },
  {
    id: 'rs-2',
    requestId: 'rq-1',
    providerId: 'pr-5',
    acceptIndicative: false,
    proposedPrice: 18000,
    note: 'السعر يشمل المفاتيح الجديدة من نوعية جيدة.',
    requiresDeposit: true,
    status: 'Active',
    createdAt: '2026-09-18',
  },
];

export const REQUEST_STATUS_AR = {
  Open: 'مفتوح',
  Matched: 'تم اختيار مقدم',
  ClosedByBeneficiary: 'مغلق',
  Expired: 'منتهي',
};

export const fmtPrice = (v) =>
  v === null || v === undefined || v === '' ? '—' : `${Number(v).toLocaleString('ar-YE')} ر.ي`;

export const metric = (v) => (v === null || v === undefined ? '—' : v);
