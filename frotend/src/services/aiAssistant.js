// src/services/aiAssistant.js
//
// Action-oriented assistant engine.
//
// Every reply can include:
//   • messages: [{ text, actions }]  — the text plus optional buttons
//   • lang, intent                    — for the UI
//
// Action shapes:
//   { label, type, payload }
//   type: "call" | "email" | "directions" | "scroll"
//       | "copy" | "fill" | "link" | "share"

const ARABIC_RE = /[\u0600-\u06FF]/;
const SO = ["sidee","maxay","waa","yahay","tahay","waxaan","waxa","sida","goorma","xaggee","lacag","qiimo","magac","hadda","ma","la","ku","ah","iyo","oo","ka","casri","macaamiil","boosto","adeeg","hel","karaa","rabaa","caawi","caawin"];
const SW = ["nini","jinsi","kwa","je","ni","ya","wa","vipi","wapi","lini","kiasi","bei","habari","msaada","huduma","jina","na","kama","sana","leo","kesho","ninahitaji","nataka","naweza","unaweza","gani","wako","nina","saidia"];

export function detectLanguage(text = "") {
  const t = text.toLowerCase().trim();
  if (!t) return "en";
  if (ARABIC_RE.test(text)) return "ar";
  const w = t.split(/\s+/);
  const so = w.filter((x) => SO.includes(x)).length;
  const sw = w.filter((x) => SW.includes(x)).length;
  if (so > sw && so >= 1) return "so";
  if (sw > so && sw >= 1) return "sw";
  return "en";
}

export function timeGreeting(lang) {
  const h = new Date().getHours();
  const m = h < 12, e = h >= 18;
  const G = {
    en: m ? "Good morning" : e ? "Good evening" : "Good afternoon",
    sw: m ? "Habari ya asubuhi" : e ? "Habari ya jioni" : "Habari ya mchana",
    so: m ? "Subax wanaagsan" : e ? "Habeen wanaagsan" : "Galab wanaagsan",
    ar: m ? "صباح الخير" : "مساء الخير",
  };
  return G[lang] || G.en;
}

// ============================================================
// Intents
// ============================================================

const CORE = [
  { id: "greeting", k: ["hello","hi ","hey","habari","salaam","salaan","مرحبا","السلام عليكم"] },
  { id: "help",     k: ["help me","can you help","how can you help","what can you do","assist","saidia","nisaidie","caawi","caawin","ساعدني","مساعدة"] },
  { id: "book",     k: ["book","appointment","reserve","schedule","kuweka","boosto","ballan","حجز","موعد"] },
  { id: "apply",    k: ["apply","application","sign up for","send my cv","cv","resume","omba","codsiga","قدم","طلب"] },
  { id: "complain", k: ["complain","complaint","report","problem with","bad service","lalamika","wargaal","شكوى","أبلغ"] },
  { id: "find",     k: ["find another","looking for","need a","show me","help me find","tafuta","raadi","ابحث"] },
  { id: "compare",  k: ["compare","versus","better than","options","alternatives","linganisha","barbardhig","قارن"] },
  { id: "message",  k: ["send a message","message them","chat with","write to","tuma ujumbe","fariin u dir","أرسل رسالة"] },
  { id: "price",    k: ["price","cost","how much","fee","bei","kiasi","qiimo","lacag","سعر","تكلفة","كم"] },
  { id: "location", k: ["where","location","address","wapi","mahali","xaggee","goob","أين","عنوان","مكان"] },
  { id: "contact",  k: ["phone","call","contact","number","simu","taleefan","هاتف","رقم"] },
  { id: "directions",k: ["directions","how do i get","navigate","route","map","njia","jihada","اتجاهات","طريق"] },
  { id: "hours",    k: ["hours","open","close","time","saa","muda","wakati","ساعات","وقت"] },
  { id: "trust",    k: ["verified","safe","trust","scam","aminika","xaqiijiyay","موثوق","آمن"] },
  { id: "share",    k: ["share","send to a friend","send link","shiriki","wadaag","شارك"] },
];

function scoreK(text, keywords) {
  const t = text.toLowerCase();
  let score = 0;
  for (const k of keywords) if (t.includes(k)) score += k.length >= 6 ? 2 : 1;
  return score;
}

export function detectIntent(text = "") {
  const t = text.toLowerCase();
  // CORE priority, but "help" is weak — let specific intents win
  let best = { id: "unknown", score: 0 };
  for (const { id, k } of CORE) {
    const s = scoreK(t, k);
    if (s > best.score) best = { id, score: s };
  }
  return best.score > 0 ? best.id : "unknown";
}

function pick(a) { return a[Math.floor(Math.random() * a.length)]; }

// ============================================================
// Shortcut action builders
// ============================================================

function actionsFor(service, lang) {
  const A = {
    en: {
      call:      { label: "📞 Call now",       type: "call",       payload: service?.phone },
      message:   { label: "✉️ Send message",   type: "fill",       payload: "Hello, I'd like to ask about your service. " },
      directions:{ label: "🗺 Get directions", type: "directions", payload: service?.location },
      copyPhone: { label: "📋 Copy number",    type: "copy",       payload: service?.phone },
      copyAddr:  { label: "📋 Copy address",   type: "copy",       payload: service?.location },
      packages:  { label: "💼 View packages",  type: "scroll",     payload: "packages" },
      reviews:   { label: "⭐ See reviews",     type: "scroll",     payload: "reviews" },
      location:  { label: "📍 Show on map",    type: "scroll",     payload: "location" },
      share:     { label: "🔗 Share this",     type: "share" },
      browse:    { label: "🔎 Browse services",type: "link",       payload: "/services" },
      browseCat: { label: "📂 See similar",    type: "link",       payload: "/services" },
    },
    sw: {
      call:      { label: "📞 Piga simu",       type: "call",       payload: service?.phone },
      message:   { label: "✉️ Tuma ujumbe",     type: "fill",       payload: "Habari, ningependa kuuliza kuhusu huduma yenu. " },
      directions:{ label: "🗺 Pata maelekezo",  type: "directions", payload: service?.location },
      copyPhone: { label: "📋 Nakili nambari",  type: "copy",       payload: service?.phone },
      copyAddr:  { label: "📋 Nakili anwani",   type: "copy",       payload: service?.location },
      packages:  { label: "💼 Vifurushi",       type: "scroll",     payload: "packages" },
      reviews:   { label: "⭐ Maoni",           type: "scroll",     payload: "reviews" },
      location:  { label: "📍 Ramani",          type: "scroll",     payload: "location" },
      share:     { label: "🔗 Shiriki",         type: "share" },
      browse:    { label: "🔎 Huduma zote",     type: "link",       payload: "/services" },
      browseCat: { label: "📂 Zinazofanana",    type: "link",       payload: "/services" },
    },
    so: {
      call:      { label: "📞 Hadda wac",       type: "call",       payload: service?.phone },
      message:   { label: "✉️ Fariin dir",      type: "fill",       payload: "Salaan, waxaan jeclaan lahaa inaan wax ka weydiiyo adeeggaaga. " },
      directions:{ label: "🗺 Jihooyinka",      type: "directions", payload: service?.location },
      copyPhone: { label: "📋 Koobi lambar",    type: "copy",       payload: service?.phone },
      copyAddr:  { label: "📋 Koobi ciwaan",    type: "copy",       payload: service?.location },
      packages:  { label: "💼 Xirmooyinka",     type: "scroll",     payload: "packages" },
      reviews:   { label: "⭐ Dib u eegis",     type: "scroll",     payload: "reviews" },
      location:  { label: "📍 Khariidad",       type: "scroll",     payload: "location" },
      share:     { label: "🔗 Wadaag",          type: "share" },
      browse:    { label: "🔎 Adeegyada",       type: "link",       payload: "/services" },
      browseCat: { label: "📂 Kuwa la mid ah",  type: "link",       payload: "/services" },
    },
    ar: {
      call:      { label: "📞 اتصل الآن",       type: "call",       payload: service?.phone },
      message:   { label: "✉️ أرسل رسالة",      type: "fill",       payload: "مرحبًا، أود السؤال عن خدمتكم. " },
      directions:{ label: "🗺 الاتجاهات",       type: "directions", payload: service?.location },
      copyPhone: { label: "📋 انسخ الرقم",      type: "copy",       payload: service?.phone },
      copyAddr:  { label: "📋 انسخ العنوان",    type: "copy",       payload: service?.location },
      packages:  { label: "💼 الحزم",           type: "scroll",     payload: "packages" },
      reviews:   { label: "⭐ التقييمات",       type: "scroll",     payload: "reviews" },
      location:  { label: "📍 الخريطة",         type: "scroll",     payload: "location" },
      share:     { label: "🔗 شارك",            type: "share" },
      browse:    { label: "🔎 كل الخدمات",      type: "link",       payload: "/services" },
      browseCat: { label: "📂 مشابه",           type: "link",       payload: "/services" },
    },
  };
  return A[lang] || A.en;
}

// ============================================================
// Reply packs — each intent returns messages with optional actions
// ============================================================

const PACKS = {
  greeting: {
    en: (s, A) => [
      { text: pick(["Hey 👋", "Hi there!", "Hello!"]) },
      { text: `I'm here to help with **${s.name}** — or to walk you through anything: booking, applying, reporting a problem…` },
      { text: `What would you like to do?`,
        actions: [A.call, A.packages, A.directions] },
    ],
    sw: (s, A) => [
      { text: pick(["Habari 👋", "Salaam!", "Mambo!"]) },
      { text: `Nipo hapa kukusaidia kwa **${s.name}** — au kukupitisha kwa lolote: kuweka, kuomba, kuripoti…` },
      { text: `Ungependa kufanya nini?`,
        actions: [A.call, A.packages, A.directions] },
    ],
    so: (s, A) => [
      { text: pick(["Salaan 👋", "Haye!"]) },
      { text: `Waxaan halkan u joogaa inaan kaa caawiyo **${s.name}** — ama wax kasta: ballansasho, codsi, soo sheegid…` },
      { text: `Maxaad rabtaa inaad qabato?`,
        actions: [A.call, A.packages, A.directions] },
    ],
    ar: (s, A) => [
      { text: pick(["مرحبًا 👋", "أهلًا!"]) },
      { text: `أنا هنا للمساعدة في **${s.name}** — أو لإرشادك في أي مهمة: الحجز، التقديم، الإبلاغ…` },
      { text: `ماذا تريد أن تفعل؟`,
        actions: [A.call, A.packages, A.directions] },
    ],
  },

  help: {
    en: (s, A) => [
      { text: `Yes — I can do a lot more than answer questions 🙂` },
      { text: `Here's what I can help you with:\n\n• **Book** an appointment\n• **Apply** for a job or service\n• **Report** a problem or complaint\n• **Find** a similar provider\n• **Message** the provider directly` },
      { text: `Which one would you like?`,
        actions: [A.message, A.call, A.browseCat] },
    ],
    sw: (s, A) => [
      { text: `Ndio — naweza kufanya mengi zaidi ya kujibu maswali 🙂` },
      { text: `Hivi ndivyo ninaweza kukusaidia:\n\n• **Kuweka** miadi\n• **Kuomba** kazi au huduma\n• **Kuripoti** tatizo au malalamiko\n• **Kupata** mtoa huduma anayefanana\n• **Kutuma ujumbe** moja kwa moja` },
      { text: `Ungependa kipi?`,
        actions: [A.message, A.call, A.browseCat] },
    ],
    so: (s, A) => [
      { text: `Haa — waxaan qaban karaa wax badan oo ka badan jawaab su'aalo 🙂` },
      { text: `Waxaan kaa caawin karaa:\n\n• **Ballansasho**\n• **Codsi** shaqo ama adeeg\n• **Soo sheeg** dhibaato ama cabasho\n• **Hel** bixiye la mid ah\n• **Fariin u dir** si toos ah` },
      { text: `Kee ayaad rabtaa?`,
        actions: [A.message, A.call, A.browseCat] },
    ],
    ar: (s, A) => [
      { text: `نعم — أستطيع فعل الكثير غير الإجابة على الأسئلة 🙂` },
      { text: `إليك ما يمكنني مساعدتك به:\n\n• **حجز** موعد\n• **تقديم** طلب لوظيفة أو خدمة\n• **الإبلاغ** عن مشكلة أو شكوى\n• **إيجاد** مزود مشابه\n• **إرسال رسالة** للمزود مباشرة` },
      { text: `أي واحدة تريد؟`,
        actions: [A.message, A.call, A.browseCat] },
    ],
  },

  book: {
    en: (s, A) => [
      { text: `Let's get you booked 👍` },
      { text: `The fastest way is a quick call. Say something like:\n\n_"Hi, I'd like to book ${s.name} for [day] at [time]. My name is [name]."_\n\nThat's usually enough — 30 seconds.` },
      { text: `Want me to open the dialer, or pre-fill a message?`,
        actions: [A.call, A.message, A.packages] },
    ],
    sw: (s, A) => [
      { text: `Tukuweke haraka 👍` },
      { text: `Njia ya haraka ni simu fupi. Sema kitu kama:\n\n_"Habari, ningependa kuweka ${s.name} siku ya [siku] saa [saa]. Jina langu ni [jina]."_\n\nKawaida inatosha — sekunde 30.` },
      { text: `Nikufungue kipiga simu, au niandae ujumbe?`,
        actions: [A.call, A.message, A.packages] },
    ],
    so: (s, A) => [
      { text: `Aan kuu ballansado 👍` },
      { text: `Tan ugu dhaqsi badan waa wicitaan gaaban. Dheh wax sidan ah:\n\n_"Salaan, waxaan jeclaan lahaa inaan ballansado ${s.name} maalinta [maalinta] saacadda [saacadda]. Magacaygu waa [magaca]."_\n\nCaadi ahaan waa ku filan — 30 il-biriqsi.` },
      { text: `Ma kuu furo wicitaanka, ama aan fariin diyaariyo?`,
        actions: [A.call, A.message, A.packages] },
    ],
    ar: (s, A) => [
      { text: `لنحجز لك 👍` },
      { text: `أسرع طريقة مكالمة قصيرة. قل شيئًا مثل:\n\n_"مرحبًا، أريد حجز ${s.name} يوم [اليوم] الساعة [الوقت]. اسمي [الاسم]."_\n\nعادة كافٍ — 30 ثانية.` },
      { text: `هل أفتح لك الاتصال، أم أُجهّز رسالة؟`,
        actions: [A.call, A.message, A.packages] },
    ],
  },

  apply: {
    en: (s, A) => [
      { text: `Got it — let's get your application ready 📝` },
      { text: `Send them this short intro:\n\n_"Hello, my name is [your name]. I'm interested in your services at ${s.name}. I have [experience/skills]. Could you please share the next steps?"_\n\nShort, clear, respectful.` },
      { text: `Want me to pre-fill it in the chat so you can edit and send?`,
        actions: [A.message, A.call] },
    ],
    sw: (s, A) => [
      { text: `Sawa — tuandae maombi yako 📝` },
      { text: `Tuma utangulizi huu mfupi:\n\n_"Habari, jina langu ni [jina lako]. Ninavutiwa na huduma zenu katika ${s.name}. Nina [uzoefu/ujuzi]. Tafadhali mnijulishe hatua zinazofuata?"_\n\nMfupi, wazi, wa heshima.` },
      { text: `Nikakuandikie kwenye gumzo ili uhariri na kutuma?`,
        actions: [A.message, A.call] },
    ],
    so: (s, A) => [
      { text: `Haye — codsigaaga ayaan diyaarinaynaa 📝` },
      { text: `U dir hordhac gaaban:\n\n_"Salaan, magacaygu waa [magacaaga]. Waxaan xiiseynayaa adeegyadaada ee ${s.name}. Waxaan leeyahay [khibrad/xirfado]. Fadlan ii sheeg tallaabooyinka xiga?"_\n\nGaaban, cad, ixtiraam leh.` },
      { text: `Ma kuu qoraa wada-hadalka si aad u beddesho oo u dirto?`,
        actions: [A.message, A.call] },
    ],
    ar: (s, A) => [
      { text: `حسنًا — لنجهّز طلبك 📝` },
      { text: `أرسل لهم هذه المقدمة القصيرة:\n\n_"مرحبًا، اسمي [اسمك]. أنا مهتم بخدماتكم في ${s.name}. لدي [خبرة/مهارات]. هل يمكنكم مشاركة الخطوات التالية؟"_\n\nقصيرة وواضحة ومحترمة.` },
      { text: `هل أملأها لك في الدردشة لتعديلها وإرسالها؟`,
        actions: [A.message, A.call] },
    ],
  },

  complain: {
    en: (s, A) => [
      { text: `Sorry to hear that 😔 Let's get it reported properly.` },
      { text: `Here's a complaint template you can send:\n\n_"I want to raise a concern about my recent experience with ${s.name}. Date: [date]. Issue: [short description]. I would appreciate a response."_\n\nKeep it factual — that gets the fastest resolution.` },
      { text: `Want me to pre-fill this in the chat, or take you to the report section?`,
        actions: [
          { label: "✉️ Pre-fill complaint", type: "fill", payload: "I want to raise a concern about my recent experience with " + (s?.name || "this service") + ". Date: [date]. Issue: [short description]. I would appreciate a response." },
          { label: "🚩 Report listing", type: "scroll", payload: "safety" },
        ] },
    ],
    sw: (s, A) => [
      { text: `Pole kusikia hivyo 😔 Tuandae ripoti ipasavyo.` },
      { text: `Kiolezo cha malalamiko:\n\n_"Ningependa kuwasilisha malalamiko kuhusu uzoefu wangu wa hivi karibuni na ${s.name}. Tarehe: [tarehe]. Tatizo: [maelezo mafupi]. Ningependa jibu."_\n\nWeka ukweli — hiyo hupata suluhisho la haraka.` },
      { text: `Nikakuandikie kwenye gumzo, au nikupeleke sehemu ya kuripoti?`,
        actions: [
          { label: "✉️ Andaa malalamiko", type: "fill", payload: "Ningependa kuwasilisha malalamiko kuhusu uzoefu wangu wa hivi karibuni na " + (s?.name || "huduma hii") + ". Tarehe: [tarehe]. Tatizo: [maelezo mafupi]. Ningependa jibu." },
          { label: "🚩 Ripoti orodha", type: "scroll", payload: "safety" },
        ] },
    ],
    so: (s, A) => [
      { text: `Waan ka xumahay 😔 Aan si sax ah u soo sheegno.` },
      { text: `Qaabka cabashada:\n\n_"Waxaan rabaa inaan soo bandhigo walaac ku saabsan khibradaydii dhowayd ee ${s.name}. Taariikh: [taariikh]. Dhibaatada: [sharaxaad gaaban]. Waxaan jeclaan lahaa jawaab."_\n\nKu qor xaqiiqada — taas ayaa keenaysa xal degdeg ah.` },
      { text: `Ma kuu qoraa wada-hadalka, ama kuu geeyaa qaybta soo sheegista?`,
        actions: [
          { label: "✉️ Diyaari cabasho", type: "fill", payload: "Waxaan rabaa inaan soo bandhigo walaac ku saabsan khibradaydii dhowayd ee " + (s?.name || "adeeggan") + ". Taariikh: [taariikh]. Dhibaatada: [sharaxaad gaaban]. Waxaan jeclaan lahaa jawaab." },
          { label: "🚩 Soo sheeg liiska", type: "scroll", payload: "safety" },
        ] },
    ],
    ar: (s, A) => [
      { text: `آسف لسماع ذلك 😔 لنقم بالإبلاغ بشكل صحيح.` },
      { text: `قالب الشكوى:\n\n_"أريد رفع شكوى حول تجربتي الأخيرة مع ${s.name}. التاريخ: [التاريخ]. المشكلة: [وصف قصير]. أرجو الرد."_\n\nاكتب الحقائق — فهذا يحقق أسرع حل.` },
      { text: `هل أملأه في الدردشة، أم أنقلك إلى قسم الإبلاغ؟`,
        actions: [
          { label: "✉️ جهّز شكوى", type: "fill", payload: "أريد رفع شكوى حول تجربتي الأخيرة مع " + (s?.name || "هذه الخدمة") + ". التاريخ: [التاريخ]. المشكلة: [وصف قصير]. أرجو الرد." },
          { label: "🚩 أبلغ عن الإدراج", type: "scroll", payload: "safety" },
        ] },
    ],
  },

  find: {
    en: (s, A) => [
      { text: `Sure — let's find what you need 🔎` },
      { text: `You can browse similar providers by going back to the Services page and filtering by category. Everything in **${s.category || "this category"}** is grouped together.` },
      { text: `Want me to take you there?`,
        actions: [A.browse, A.browseCat] },
    ],
    sw: (s, A) => [
      { text: `Hakika — tupate unachohitaji 🔎` },
      { text: `Unaweza kuchunguza watoa huduma wanaofanana kwa kurudi kwenye ukurasa wa Huduma na kuchuja kwa kategoria. Kila kitu kwenye **${s.category || "kategoria hii"}** kimewekwa pamoja.` },
      { text: `Nikuchukue hapo?`,
        actions: [A.browse, A.browseCat] },
    ],
    so: (s, A) => [
      { text: `Haa — aan helno waxa aad u baahan tahay 🔎` },
      { text: `Waad baari kartaa bixiyayaal la mid ah adigoo ku noqonaya bogga Adeegyada oo ku shaandheynaya qaybta. Wax walba oo **${s.category || "qaybtan"}** waa la wada ururiyay.` },
      { text: `Ma kuu geeyaa halkaas?`,
        actions: [A.browse, A.browseCat] },
    ],
    ar: (s, A) => [
      { text: `بالتأكيد — لنجد ما تحتاجه 🔎` },
      { text: `يمكنك تصفح مزودين مشابهين بالعودة إلى صفحة الخدمات والتصفية حسب الفئة. كل شيء في **${s.category || "هذه الفئة"}** مُجمّع معًا.` },
      { text: `هل آخذك إلى هناك؟`,
        actions: [A.browse, A.browseCat] },
    ],
  },

  compare: {
    en: (s, A) => [
      { text: `Smart move — comparing saves money 💡` },
      { text: `Here's what to compare:\n\n• **Price** — call 2–3 providers\n• **Verified badge** — gold means we checked them\n• **Reviews** — see the ratings on each page\n• **Response time** — faster often means better service` },
      { text: `Want to see the other providers in this category?`,
        actions: [A.browseCat, A.reviews] },
    ],
    sw: (s, A) => [
      { text: `Hatua nzuri — kulinganisha huokoa pesa 💡` },
      { text: `Vitu vya kulinganisha:\n\n• **Bei** — piga simu kwa 2–3\n• **Beji ya uthibitisho** — dhahabu ni tumethibitisha\n• **Maoni** — angalia alama kwenye kila ukurasa\n• **Muda wa kujibu** — haraka huwa huduma bora` },
      { text: `Uone watoa huduma wengine wa kategoria hii?`,
        actions: [A.browseCat, A.reviews] },
    ],
    so: (s, A) => [
      { text: `Fikrad wanaagsan — barbardhigiddu waxay badbaadisaa lacag 💡` },
      { text: `Waxyaabaha la barbardhigi karo:\n\n• **Qiimaha** — wac 2–3\n• **Calaamadda la xaqiijiyay** — dahab waa la hubiyay\n• **Dib u eegis** — eeg qiimeynta bog kasta\n• **Waqtiga jawaabta** — dhaqso badanaa macnaheedu waa adeeg fiican` },
      { text: `Ma rabtaa inaad aragto bixiyayaasha kale ee qaybtan?`,
        actions: [A.browseCat, A.reviews] },
    ],
    ar: (s, A) => [
      { text: `خطوة ذكية — المقارنة توفّر المال 💡` },
      { text: `ما يمكن مقارنته:\n\n• **السعر** — اتصل بـ 2–3\n• **الشارة الذهبية** — يعني تحققنا منهم\n• **التقييمات** — انظر النجوم\n• **سرعة الرد** — الأسرع غالبًا خدمة أفضل` },
      { text: `هل تريد رؤية مزودين آخرين في هذه الفئة؟`,
        actions: [A.browseCat, A.reviews] },
    ],
  },

  message: {
    en: (s, A) => [
      { text: `Sure — let's write it ✍️` },
      { text: `I'll pre-fill the chat box with a short, respectful opener. Edit it however you like, then hit send.` },
      { text: `Open the message now?`,
        actions: [A.message, A.call] },
    ],
    sw: (s, A) => [
      { text: `Hakika — tuandike ✍️` },
      { text: `Nitakuandikia ujumbe mfupi wa heshima. Uhariri upendavyo, kisha tuma.` },
      { text: `Nifungue ujumbe sasa?`,
        actions: [A.message, A.call] },
    ],
    so: (s, A) => [
      { text: `Haa — aan qorno ✍️` },
      { text: `Waxaan kuu buuxin doonaa sanduuqa fariinta eray gaaban oo ixtiraam leh. Wax ka beddel sida aad rabto, kadib dir.` },
      { text: `Ma furo fariinta hadda?`,
        actions: [A.message, A.call] },
    ],
    ar: (s, A) => [
      { text: `بالتأكيد — لنكتبها ✍️` },
      { text: `سأملأ صندوق الدردشة بمقدمة قصيرة ومحترمة. عدّلها كما تريد ثم أرسل.` },
      { text: `هل أفتح الرسالة الآن؟`,
        actions: [A.message, A.call] },
    ],
  },

  price: {
    en: (s, A) => [
      { text: `Prices depend on the job 🙂` },
      { text: `Basic starts around KES 1,500, Standard around 3,500. For **${s.name}**, they'd want to hear your exact need first.` },
      { text: `Want to call for a real quote?`,
        actions: [A.call, A.packages] },
    ],
    sw: (s, A) => [
      { text: `Bei inategemea kazi 🙂` },
      { text: `Msingi huanza karibu KES 1,500, Kawaida karibu 3,500. Kwa **${s.name}**, watahitaji kusikia mahitaji yako.` },
      { text: `Upige simu kwa bei kamili?`,
        actions: [A.call, A.packages] },
    ],
    so: (s, A) => [
      { text: `Qiimaha wuxuu ku xiran yahay shaqada 🙂` },
      { text: `Aasaasiga wuxuu ka bilaabmaa KES 1,500, Caadiga 3,500. **${s.name}** waxay u baahan yihiin inay maqlaan baahidaada.` },
      { text: `Ma wacaa si aad u hesho qiimo dhab ah?`,
        actions: [A.call, A.packages] },
    ],
    ar: (s, A) => [
      { text: `الأسعار تعتمد على العمل 🙂` },
      { text: `الأساسي يبدأ من 1,500 شلن، والمعياري 3,500. **${s.name}** سيحتاجون سماع احتياجك أولًا.` },
      { text: `هل أتصل للحصول على عرض سعر حقيقي؟`,
        actions: [A.call, A.packages] },
    ],
  },

  location: {
    en: (s, A) => [
      { text: s.location ? `📍 They're based in **${s.location}**.` : `📍 They serve the Garissa area.` },
      { text: `I can show you on the map or open Google Maps for directions.` },
      { text: `Which one?`,
        actions: [A.location, A.directions, A.copyAddr] },
    ],
    sw: (s, A) => [
      { text: s.location ? `📍 Wako **${s.location}**.` : `📍 Wanahudumia Garissa.` },
      { text: `Naweza kukuonyesha kwenye ramani au kufungua Google Maps.` },
      { text: `Ipi?`,
        actions: [A.location, A.directions, A.copyAddr] },
    ],
    so: (s, A) => [
      { text: s.location ? `📍 Waxay ku yaallaan **${s.location}**.` : `📍 Waxay u adeegaan Garissa.` },
      { text: `Waxaan ku tusi karaa khariidadda ama Google Maps.` },
      { text: `Kee?`,
        actions: [A.location, A.directions, A.copyAddr] },
    ],
    ar: (s, A) => [
      { text: s.location ? `📍 هم في **${s.location}**.` : `📍 يخدمون منطقة غاريسا.` },
      { text: `يمكنني إظهارهم على الخريطة أو فتح خرائط Google.` },
      { text: `أيهما؟`,
        actions: [A.location, A.directions, A.copyAddr] },
    ],
  },

  contact: {
    en: (s, A) =>
      s.phone
        ? [
            { text: `Their number is **${s.phone}** 📞` },
            { text: `Want me to open the dialer, copy the number, or pre-fill a message?`,
              actions: [A.call, A.copyPhone, A.message] },
          ]
        : [
            { text: `No phone number on this listing yet.` },
            { text: `Try sending them a message instead — they'll get it by email.`,
              actions: [A.message] },
          ],
    sw: (s, A) =>
      s.phone
        ? [
            { text: `Nambari yao ni **${s.phone}** 📞` },
            { text: `Nikufungue kipiga, ninakili nambari, au niandae ujumbe?`,
              actions: [A.call, A.copyPhone, A.message] },
          ]
        : [
            { text: `Hakuna nambari bado.` },
            { text: `Tuma ujumbe badala yake.`,
              actions: [A.message] },
          ],
    so: (s, A) =>
      s.phone
        ? [
            { text: `Lambarkoodu waa **${s.phone}** 📞` },
            { text: `Ma kuu furo wicitaanka, koobi lambarka, ama diyaari fariin?`,
              actions: [A.call, A.copyPhone, A.message] },
          ]
        : [
            { text: `Weli ma jiro lambar.` },
            { text: `Dir fariin beddelkeeda.`,
              actions: [A.message] },
          ],
    ar: (s, A) =>
      s.phone
        ? [
            { text: `رقمهم **${s.phone}** 📞` },
            { text: `هل أفتح الاتصال، أنسخ الرقم، أم أجهّز رسالة؟`,
              actions: [A.call, A.copyPhone, A.message] },
          ]
        : [
            { text: `لا يوجد رقم بعد.` },
            { text: `أرسل رسالة بدلًا من ذلك.`,
              actions: [A.message] },
          ],
  },

  directions: {
    en: (s, A) => [
      { text: s.location ? `📍 They're in **${s.location}**.` : `📍 In Garissa County.` },
      { text: `Tap below and Google Maps will guide you turn by turn.`,
        actions: [A.directions, A.copyAddr] },
    ],
    sw: (s, A) => [
      { text: s.location ? `📍 Wako **${s.location}**.` : `📍 Kaunti ya Garissa.` },
      { text: `Bonyeza hapa chini, Google Maps itakuelekeza.`,
        actions: [A.directions, A.copyAddr] },
    ],
    so: (s, A) => [
      { text: s.location ? `📍 Waxay ku yaallaan **${s.location}**.` : `📍 Degmada Garissa.` },
      { text: `Riix hoos, Google Maps ayaa ku hagaya tallaabo kasta.`,
        actions: [A.directions, A.copyAddr] },
    ],
    ar: (s, A) => [
      { text: s.location ? `📍 في **${s.location}**.` : `📍 في مقاطعة غاريسا.` },
      { text: `اضغط بالأسفل وسيرشدك Google Maps خطوة بخطوة.`,
        actions: [A.directions, A.copyAddr] },
    ],
  },

  hours: {
    en: () => [
      { text: `🕒 Open **Mon–Sat, 8 AM – 6 PM**.` },
      { text: `The sidebar shows "Open now" live so you can tell at a glance.` },
    ],
    sw: () => [
      { text: `🕒 Wako wazi **Jumatatu–Jumamosi, 8 AM – 6 PM**.` },
      { text: `Pembeni kuna "Wazi sasa" ili kujua mara moja.` },
    ],
    so: () => [
      { text: `🕒 Furan **Isniin–Sabti, 8 AM – 6 PM**.` },
      { text: `Dhinaca waxaa ku yaal "Hadda furan" si aad si degdeg ah u ogaato.` },
    ],
    ar: () => [
      { text: `🕒 مفتوح **الإثنين–السبت، 8 ص – 6 م**.` },
      { text: `الشريط الجانبي يعرض "مفتوح الآن".` },
    ],
  },

  trust: {
    en: (s, A) =>
      s.isVerified
        ? [
            { text: `Yes ✅ **${s.name}** is verified.` },
            { text: `Our team reviewed them — gold badge up top. You're safe with them.` },
          ]
        : [
            { text: `Not yet verified, honestly.` },
            { text: `You can absolutely contact them, but:\n• Ask for a written quote\n• Don't pay everything upfront\n• Keep the receipt` },
            { text: `Want me to pre-fill a message with these safety questions?`,
              actions: [A.message] },
          ],
    sw: (s, A) =>
      s.isVerified
        ? [
            { text: `Ndio ✅ **${s.name}** amethibitishwa.` },
            { text: `Timu yetu ilimhakiki — beji ya dhahabu juu. Uko salama.` },
          ]
        : [
            { text: `Bado hajathibitishwa.` },
            { text: `Unaweza kuwasiliana, lakini:\n• Omba bei iliyoandikwa\n• Usilipe yote mbele\n• Hifadhi risiti` },
            { text: `Nikakuandikie maswali ya usalama?`,
              actions: [A.message] },
          ],
    so: (s, A) =>
      s.isVerified
        ? [
            { text: `Haa ✅ **${s.name}** waa la xaqiijiyay.` },
            { text: `Kooxdayada ayaa dib u eegtay — calaamad dahab ah. Waad ammaan qabtaa.` },
          ]
        : [
            { text: `Weli lama xaqiijin.` },
            { text: `Waad la xiriiri kartaa, laakiin:\n• Weydii qiimo qoran\n• Ha bixin wax walba horay\n• Keydi rasiidka` },
            { text: `Ma kuu qoraa su'aalaha badbaadada?`,
              actions: [A.message] },
          ],
    ar: (s, A) =>
      s.isVerified
        ? [
            { text: `نعم ✅ **${s.name}** موثّق.` },
            { text: `راجعه فريقنا — شارة ذهبية في الأعلى. أنت بأمان.` },
          ]
        : [
            { text: `لم يتم التحقق بعد.` },
            { text: `يمكنك التواصل، لكن:\n• اطلب عرض سعر مكتوب\n• لا تدفع كل شيء مقدمًا\n• احتفظ بالإيصال` },
            { text: `هل أُعدّ لك رسالة بأسئلة السلامة؟`,
              actions: [A.message] },
          ],
  },

  share: {
    en: (s, A) => [
      { text: `Good idea — let's get the link out there 🔗` },
      { text: `I can copy the page link to your clipboard so you can paste it wherever you like.` },
      { text: `Ready?`,
        actions: [A.share] },
    ],
    sw: (s, A) => [
      { text: `Wazo zuri — tushiriki kiungo 🔗` },
      { text: `Naweza kunakili kiungo kwenye clipboard ili ubandike popote.` },
      { text: `Tayari?`,
        actions: [A.share] },
    ],
    so: (s, A) => [
      { text: `Fikrad wanaagsan — aan link-iga wadaagno 🔗` },
      { text: `Waxaan koobi karaa link-iga si aad meel kasta u dhejiso.` },
      { text: `Diyaar?`,
        actions: [A.share] },
    ],
    ar: (s, A) => [
      { text: `فكرة جيدة — لنشارك الرابط 🔗` },
      { text: `يمكنني نسخ الرابط إلى الحافظة لتلصقه في أي مكان.` },
      { text: `جاهز؟`,
        actions: [A.share] },
    ],
  },
};

// ============================================================
// Smart fallback — turns unknowns into assistive actions
// ============================================================

function smartFallback(message, ctx, lang) {
  const A = actionsFor(ctx, lang);
  const F = {
    en: (s) => [
      { text: pick(["Hmm, let me think 🤔", "Good question!"]) },
      { text: `I don't have the exact answer, but here's how I can still help with **${s.name}**:` },
      { text: `Pick an action below, or ask me something else:`,
        actions: [A.call, A.message, A.directions] },
    ],
    sw: (s) => [
      { text: pick(["Hmm, niache nifikirie 🤔", "Swali zuri!"]) },
      { text: `Sina jibu kamili, lakini hivi ndivyo ninaweza kukusaidia na **${s.name}**:` },
      { text: `Chagua mojawapo, au uliza kitu kingine:`,
        actions: [A.call, A.message, A.directions] },
    ],
    so: (s) => [
      { text: pick(["Hmm, aan ka fikiro 🤔", "Su'aal wanaagsan!"]) },
      { text: `Ma hayo jawaabta saxda ah, laakiin sidan ayaan kaa caawin karaa **${s.name}**:` },
      { text: `Dooro mid hoose, ama wax kale weydii:`,
        actions: [A.call, A.message, A.directions] },
    ],
    ar: (s) => [
      { text: pick(["همم، دعني أفكر 🤔", "سؤال جيد!"]) },
      { text: `لا أملك الجواب الدقيق، لكن يمكنني المساعدة في **${s.name}** كما يلي:` },
      { text: `اختر إجراءً أدناه، أو اسأل شيئًا آخر:`,
        actions: [A.call, A.message, A.directions] },
    ],
  };
  return F[lang](ctx);
}

// ============================================================
// Public API
// ============================================================

export function getAssistantReply(message, ctx = {}) {
  return new Promise((resolve) => {
    const lang = detectLanguage(message);
    const intent = detectIntent(message);
    const A = actionsFor(ctx, lang);

    let messages;
    const pack = PACKS[intent];
    if (pack) {
      messages = (pack[lang] || pack.en)(ctx, A);
    } else {
      messages = smartFallback(message, ctx, lang);
    }

    // Add a small per-message delay for natural sequencing
    messages = messages.map((m, i) => ({
      ...m,
      delay: i === 0 ? 400 + Math.random() * 500 : 700 + Math.random() * 700,
    }));

    const initialPause = 350 + Math.random() * 400;
    setTimeout(() => resolve({ messages, lang, intent }), initialPause);
  });
}

export function getSuggestions(lang = "en") {
  const S = {
    en: ["Book an appointment", "How much does it cost?", "Do they accept M-Pesa?", "Where are they?"],
    sw: ["Nataka kuweka miadi", "Inagharimu kiasi gani?", "Mnachukua M-Pesa?", "Wako wapi?"],
    so: ["Raba inaan ballansado", "Waa imisa qiimaha?", "Ma qaataan M-Pesa?", "Xaggee ayay joogaan?"],
    ar: ["أريد حجز موعد", "كم التكلفة؟", "هل تقبلون M-Pesa؟", "أين هم؟"],
  };
  return S[lang] || S.en;
}
