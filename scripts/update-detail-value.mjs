import fs from 'fs';
const dir = 'd:/workspace/website/chinese-snacks/src/data/';

/* ---------- 1. Re-pair compare blocks (remove duplicate references) ---------- */
const extrasPath = dir + 'snack-extras.json';
const extras = JSON.parse(fs.readFileSync(extrasPath, 'utf8'));

const newCompares = {
  liangpi: {
    withId: 'baocai',
    withNameZh: '泡菜',
    chooseThisIf: "You want something cold, filling, and tangy \u2014 a proper lunch in itself, not a side.",
    chooseThatIf: "You want a free, instant palate reset while you figure out what to actually order.",
    differences: [
      ["Meal status", "A full cold lunch \u2014 noodles, cucumber, chili oil", "A free side dish \u2014 a few crunchy bites between courses"],
      ["Texture", "Slippery chewy noodles cut with cucumber crunch", "Snappy pickled cabbage and radish"],
      ["Flavor base", "Chili oil + vinegar + sesame paste", "Sour brine with Sichuan peppercorn heat"],
      ["Cost", "\u00a58-18 at a dedicated shop", "Free at nearly every Sichuan restaurant"],
    ],
  },
  baocai: {
    withId: 'liangpi',
    withNameZh: '凉皮',
    chooseThisIf: "You want a free crunchy palate reset between spicy bites \u2014 and a signal the kitchen cares.",
    chooseThatIf: "You want a proper cold meal that stands on its own.",
    differences: [
      ["Role", "Free side dish served before or with your meal", "A paid standalone cold lunch"],
      ["Texture", "Crunchy, snappy, salty-sour", "Slippery noodles, chewy and substantial"],
      ["Cost", "Free \u2014 quality is the restaurant's pride signal", "\u00a58-18 at Wei Jia Liangpi and similar shops"],
      ["When", "Alongside the meal, keeps the palate fresh", "At lunch, as the meal itself"],
    ],
  },
  yangrouChuan: {
    withId: 'zhajiangmian',
    withNameZh: '炸酱面',
    chooseThisIf: "It's evening and you want to graze \u2014 skewers, cold beer, and a crowd.",
    chooseThatIf: "It's lunchtime and you need one filling, seated meal before afternoon sightseeing.",
    differences: [
      ["Eating style", "Graze \u2014 10-20 skewers over conversation", "A single bowl, eaten fast at lunch"],
      ["Flavor", "Cumin, chili, and charcoal smoke", "Savory fermented soybean paste with pork and cucumber"],
      ["Best time", "Evening, when the grills fire up", "Lunch \u2014 11:30 AM to 1:30 PM is classic"],
      ["Price", "\u00a53-8 per skewer, count as you go", "\u00a515-25 a bowl"],
    ],
  },
  zhajiangmian: {
    withId: 'yangrou-chuan',
    withNameZh: '羊肉串',
    chooseThisIf: "You want one hot, filling, sit-down bowl at lunch \u2014 the Beijing classic.",
    chooseThatIf: "You want a snack-style evening crawl with smoke and cumin.",
    differences: [
      ["Format", "A complete bowl \u2014 noodles, dark amber sauce, fresh vegetables", "Skewers \u2014 order 10, count sticks at the end"],
      ["Flavor", "Deep fermented soybean paste, savory and slightly sweet", "Charcoal-smoked lamb with cumin and chili"],
      ["Best time", "Lunch, when the sauce is freshly cooked", "Evening, when the grills light up"],
      ["Price", "\u00a515-25", "\u00a53-8 per skewer"],
    ],
  },
  mapoDoufu: {
    withId: 'hongyou-chaoshou',
    withNameZh: '红油抄手',
    chooseThisIf: "You're eating with rice and want the signature sharing dish of Sichuan.",
    chooseThatIf: "You want a lighter, softer bite where vinegar balances the heat.",
    differences: [
      ["Format", "A main dish \u2014 tofu in numbing chili oil, eaten over rice", "Wontons \u2014 10 soft parcels under red chili oil"],
      ["Heat", "Numbing (ma) forward \u2014 Sichuan peppercorn is the star", "Spicy, with black vinegar cutting the burn"],
      ["Portion", "Share it \u2014 it's a table dish", "A snack or light meal for one"],
      ["Best spot", "Chen Mapo Tofu on Qingyang Street", "Long Chaoshou on Chunxi Road"],
    ],
  },
  hongyouChaoshou: {
    withId: 'mapo-doufu',
    withNameZh: '麻婆豆腐',
    chooseThisIf: "You want one light, saucy bite that's spicy but balanced by vinegar.",
    chooseThatIf: "You're eating a proper meal with rice and want the classic sharing dish.",
    differences: [
      ["Format", "10 wontons in red chili oil \u2014 a snack or light meal", "A main dish of silken tofu over rice"],
      ["Sauce", "Chili oil + black vinegar \u2014 bright and sharp", "Numbing chili oil \u2014 thick, earthy, peppercorn-forward"],
      ["Portion", "Self-contained, for one", "Built to share with rice and cold drinks"],
      ["Best spot", "Long Chaoshou on Chunxi Road", "Chen Mapo Tofu on Qingyang Street"],
    ],
  },
  wontonNoodles: {
    withId: 'shrimp-dumplings',
    withNameZh: '虾饺',
    chooseThisIf: "You want a complete meal \u2014 noodles, wontons, and broth with real depth.",
    chooseThatIf: "You're at a dim sum table and want the craft test of the kitchen.",
    differences: [
      ["Format", "A full bowl \u2014 springy noodles + shrimp-pork wontons in clear broth", "A basket of 3-4 pleated dumplings, dim sum style"],
      ["Texture", "Chewy alkaline noodles, plump wontons", "Silky translucent wrapper, whole shrimp inside"],
      ["When", "Lunch \u2014 broth is freshest before 1 PM", "Morning dim sum \u2014 before 11 AM at Panxi"],
      ["Meal size", "A meal on its own", "A small course \u2014 order several baskets"],
    ],
  },
  shrimpDumplings: {
    withId: 'wonton-noodles',
    withNameZh: '云吞面',
    chooseThisIf: "You're judging a dim sum kitchen \u2014 har gow is the exam dish.",
    chooseThatIf: "You want a full, brothy meal instead of a small course.",
    differences: [
      ["Craft", "13-fold pleated wrapper, shrimp visible through the skin", "Wontons wrapped in thicker, sturdier skins"],
      ["Serving", "3-4 per bamboo basket \u2014 one course among many", "A bowl with noodles and broth \u2014 the whole meal"],
      ["Filling", "Whole clean shrimp, nothing else", "Shrimp-pork mix, heartier"],
      ["Best moment", "Morning dim sum, before 11 AM", "Lunch, before the broth degrades"],
    ],
  },
  cheongFun: {
    withId: 'dan-ta',
    withNameZh: '蛋挞',
    chooseThisIf: "You want a light, silky savory bite to start the day.",
    chooseThatIf: "You want the sweet afternoon break \u2014 the 2:45 PM batch at Lian Xiang Lou.",
    differences: [
      ["Type", "Savory steamed rice noodle rolls \u2014 breakfast", "Sweet custard tart \u2014 afternoon tea"],
      ["Texture", "Silky, slippery sheets with soy-sesame sauce", "Flaky crust, wobbly warm custard"],
      ["Best time", "Breakfast and late night", "Around 3 PM, when the fresh batch comes out"],
      ["Price", "\u00a58-20", "\u00a55-12"],
    ],
  },
};

const byId = Object.fromEntries(extras.map(e => [e.id, e]));
byId.liangpi.compare = newCompares.liangpi;
byId.baocai.compare = newCompares.baocai;
byId['yangrou-chuan'].compare = newCompares.yangrouChuan;
byId.zhajiangmian.compare = newCompares.zhajiangmian;
byId['mapo-doufu'].compare = newCompares.mapoDoufu;
byId['hongyou-chaoshou'].compare = newCompares.hongyouChaoshou;
byId['wonton-noodles'].compare = newCompares.wontonNoodles;
byId['shrimp-dumplings'].compare = newCompares.shrimpDumplings;
byId['cheong-fun'].compare = newCompares.cheongFun;

const extrasOut = JSON.stringify(extras, null, 2).replace(/\n/g, '\r\n') + '\r\n';
fs.writeFileSync(extrasPath, extrasOut, 'utf8');
console.log('extras updated:', extras.length, 'entries');

/* ---------- 2. Add fieldNote (editor field notes) to every snack ---------- */
const snacksPath = dir + 'snacks.json';
const snacks = JSON.parse(fs.readFileSync(snacksPath, 'utf8'));

const fieldNotes = {
  jianbing: "Order it 'jia liang ge dan, bu yao la' (two eggs, no chili) \u2014 the two-egg version holds together for the walk to your hotel. The crunch window is about 90 seconds; eat it standing at the cart, before you start walking.",
  tanghulu: "Winter rule: the hawthorn version is the only one worth the line. Vendors selling strawberry tanghulu in November are usually dipping frozen fruit. Also, the caramel should crack \u2014 if it bends, the syrup was cooked on a humid day and will chew like taffy.",
  xiaolongbao: "The first batch at Jia Jia Tang Bao leaves the steamer at 6:45 AM \u2014 that's when the skin is thinnest and the broth hottest. After 9 AM the batches get rushed and torn wrappers get more common. Order one basket and eat it in under four minutes.",
  chuanchuan: "The trick isn't the skewers, it's the pot: at Jianshe Road, the stall with the longest line replaces its oil pot every few hours \u2014 clean oil means clean flavor. And count your sticks twice when they tally the bill; busy stalls miscount by two or three.",
  roujiamo: "Ask for 'lao tong rou' (aged marinade). The pork has been braising in the same pot for years, and the flavor is twice as deep as the fresh version. Fan Ji on Zhubashi Street is famous for exactly this \u2014 the queue moves fast, so don't be put off.",
  shengjianbao: "The first pan at Yang's Fry Dumplings goes out around 6:45 AM with clean oil \u2014 that's why the bottoms crack instead of taste greasy. You have about four minutes before the steam softens the base. Eat the whole thing in two bites, soup and all.",
  'mala-tang': "Pick your ingredients before the evening rush: after 7 PM the broth gets cloudy and the spice concentrates as it re-boils. The locals' move is to order one notch below your usual spice level \u2014 you can always add chili oil at the table.",
  baocai: "The free baocai is a quality test. If the brine is aged, the vegetables come out properly crunchy and the kitchen cares about its craft. It's free \u2014 treat it as a signal about the restaurant, not as the meal itself.",
  liangpi: "Wei Jia Liangpi runs out by 1:30 PM on weekends \u2014 the noodles are made that morning and sold until gone. The vinegar-sesame balance runs sweeter before noon and sharper after; regulars time their visit for the morning batch.",
  'dan-dan-mian': "The sesame paste is what separates Chengdu dan dan mian from everything else \u2014 at Chen Mapo it's blended in while still warm. Order 'shao la' (less chili) and you still get the full layered flavor, minus the tears.",
  bingfen: "Look at the syrup, not the toppings: real bingfen uses old rock sugar that pours a clear amber, not muddy brown. The stalls on Jianshe Road pour it from copper kettles \u2014 that's the one to get after hot pot.",
  'yangrou-chuan': "The marker of a good cart: cumin dusted on AFTER the skewer leaves the grill, so it doesn't burn and the aroma lands on your tongue. In Xi'an's Muslim Quarter, follow the smell of charcoal smoke, not the signboard.",
  zhajiangmian: "The sauce-to-noodle ratio is the test. If the bowl arrives pale, send it back \u2014 a proper Beijing zhajiangmian comes out dark amber with a visible oil ring. Order 'guo jiang' (extra sauce on the side) if you like it rich.",
  'mapo-doufu': "Two tells of a great version: the tofu should arrive trembling, and the chili oil should form a red ring around the bowl. At Chen Mapo the oil is burned in small batches \u2014 order it as a main with rice, not as a side.",
  xiaomian: "Chongqing breakfast rule: the noodle shop with folding stools on the curb is the one. The chili oil should be dark red and leave a stain on the bowl \u2014 pale oil means yesterday's batch. Under \u00a510 for a bowl is the going rate.",
  'cheong-fun': "Say 'lao ban, duo dian jiang' (more sauce) \u2014 the soy-sesame sauce is where the flavor lives. Ask for sheets steamed fresh from the bamboo tray rather than the pre-steamed pile; the fresh ones melt on the tongue.",
  'dan-ta': "The 2:45 PM batch at Lian Xiang Lou sells out by 3:15 \u2014 the custard is poured fresh so the top blisters. If you walk in before 2 PM and the shop is quiet, the tarts have been sitting; skip and come back.",
  'hongyou-chaoshou': "The black vinegar is the secret \u2014 it cuts the chili oil so you can actually taste the pork. Long Chaoshou serves ten per bowl; the right order is one bowl plus a dan dan mian to share, not two bowls of wontons.",
  'yangrou-paomo': "Tear the bread smaller than your thumbnail \u2014 a big piece won't soak up the broth and you'll be chewing dough at the end. The full ritual runs 45 minutes; go at 2 PM when the shop is quiet and you have the time.",
  congyoubing: "The cold test: a good congyoubing still flakes after sitting for an hour. The best morning version is cooked in the same pan as the jianbing \u2014 shared lard, shared flavor.",
  'wonton-noodles': "The broth is the dish: it should be clear with a golden oil sheen \u2014 cloudiness means it was boiled too hard. Order the shrimp-pork ('xian xia') version and finish within about eight minutes, before the noodles soften.",
  'shrimp-dumplings': "Count the pleats: a proper har gow has thirteen folds and a wrapper thin enough to see the shrimp through. At Panxi, order it first, before 11 AM \u2014 the morning shrimp are the freshest catch of the day.",
};

for (const s of snacks) {
  if (!fieldNotes[s.id]) throw new Error('missing fieldNote for ' + s.id);
  s.fieldNote = fieldNotes[s.id];
}

const snacksOut = JSON.stringify(snacks, null, 2).replace(/\n/g, '\r\n') + '\r\n';
fs.writeFileSync(snacksPath, snacksOut, 'utf8');
console.log('snacks updated:', snacks.length, 'entries, all have fieldNote');
