/* NY Real Estate Prep — unlimited math drills.
 * Each generator returns {topic, q, c: [4 strings], a: index, e: explanation}.
 * Pass an rng (() => [0,1)) for deterministic tests. */
(function (NYRE) {
  function money(n, cents) {
    var v = cents ? Math.round(n * 100) / 100 : Math.round(n);
    return "$" + v.toLocaleString("en-US", { minimumFractionDigits: cents ? 2 : 0, maximumFractionDigits: cents ? 2 : 0 });
  }
  function num(n, d) {
    return Number(n).toLocaleString("en-US", { maximumFractionDigits: d == null ? 2 : d });
  }
  function pct(n, d) { return num(n, d == null ? 2 : d) + "%"; }

  function makeRand(rng) {
    rng = rng || Math.random;
    return {
      int: function (lo, hi, step) {
        step = step || 1;
        var n = Math.floor((hi - lo) / step) + 1;
        return lo + step * Math.floor(rng() * n);
      },
      pick: function (arr) { return arr[Math.floor(rng() * arr.length)]; },
      rng: rng,
    };
  }

  // Build 4 unique choices around the correct formatted answer.
  function choices(correct, wrongs, fmt, R) {
    var seen = {}, out = [];
    var c = fmt(correct);
    seen[c] = 1;
    out.push(c);
    for (var i = 0; i < wrongs.length && out.length < 4; i++) {
      var w = wrongs[i];
      if (w == null || !isFinite(w) || w <= 0) continue;
      var s = fmt(w);
      if (!seen[s]) { seen[s] = 1; out.push(s); }
    }
    var bumps = [1.1, 0.9, 1.25, 0.8, 1.05, 0.95, 1.5, 0.5];
    for (var j = 0; out.length < 4 && j < bumps.length; j++) {
      var t = fmt(correct * bumps[j]);
      if (!seen[t]) { seen[t] = 1; out.push(t); }
    }
    // shuffle, tracking the correct index
    var idx = out.map(function (_, k) { return k; });
    for (var k = idx.length - 1; k > 0; k--) {
      var r = Math.floor(R.rng() * (k + 1));
      var tmp = idx[k]; idx[k] = idx[r]; idx[r] = tmp;
    }
    return { c: idx.map(function (k) { return out[k]; }), a: idx.indexOf(0) };
  }

  var MONTHS = [
    ["January", 31], ["February", 28], ["March", 31], ["April", 30], ["May", 31], ["June", 30],
    ["July", 31], ["August", 31], ["September", 30], ["October", 31], ["November", 30], ["December", 31],
  ];

  var G = {
    commissionSplit: function (R) {
      var price = R.int(350, 1500, 5) * 1000;
      var rate = R.pick([4, 5, 5.5, 6]);
      var brokerShare = R.pick([50, 50, 60]);
      var agentShare = R.pick([50, 60, 65, 70, 75]);
      var total = price * rate / 100;
      var side = total * brokerShare / 100;
      var ans = side * agentShare / 100;
      var r = choices(ans, [side, total * agentShare / 100, total, side * (100 - agentShare) / 100], money, R);
      return {
        topic: "Commission split",
        q: "A property sells for " + money(price) + " at a " + rate + "% commission. The listing broker's side receives " + brokerShare + "% of the commission, and the listing salesperson gets " + agentShare + "% of the broker's side. How much does the salesperson earn?",
        c: r.c, a: r.a,
        e: money(price) + " × " + rate + "% = " + money(total) + ". × " + brokerShare + "% = " + money(side) + ". × " + agentShare + "% = " + money(ans) + ".",
      };
    },
    netToSeller: function (R) {
      var net = R.int(300, 1200, 5) * 1000;
      var rate = R.pick([4, 5, 6]);
      var ans = net / (1 - rate / 100);
      var r = choices(ans, [net * (1 + rate / 100), net, net + net * rate / 100 * 2], money, R);
      return {
        topic: "Net to seller",
        q: "A seller wants to net " + money(net) + " after paying a " + rate + "% commission (ignore other costs). What is the minimum sale price?",
        c: r.c, a: r.a,
        e: "Price = net ÷ (1 − rate) = " + money(net) + " ÷ " + num(1 - rate / 100, 2) + " = " + money(ans) + ". Multiplying by (1 + rate) is the classic mistake.",
      };
    },
    acreage: function (R) {
      var acres = R.pick([0.5, 1, 1.5, 2, 2.5, 3, 4, 5]);
      var w = R.pick([100, 150, 200, 250, 300, 330, 400]);
      var sqft = acres * 43560;
      var l = sqft / w;
      if (Math.abs(l - Math.round(l)) > 1e-9) { w = 330; l = sqft / w; }
      var ans = acres;
      var fmt = function (v) { return num(v, 2) + " acres"; };
      var r = choices(ans, [sqft / 40000, sqft / 5280, acres * 2, sqft / 43560 / 2], fmt, R);
      return {
        topic: "Area — acres",
        q: "A rectangular parcel measures " + num(w, 2) + " ft by " + num(l, 2) + " ft. How many acres is it?",
        c: r.c, a: r.a,
        e: num(w, 2) + " × " + num(l, 2) + " = " + num(sqft, 0) + " sq ft ÷ 43,560 = " + num(ans, 2) + " acres.",
      };
    },
    irregularLot: function (R) {
      var a = R.int(60, 150, 10), b = R.int(100, 250, 10), extra = R.int(20, 80, 10);
      var rect = a * b, tri = 0.5 * a * extra, ans = rect + tri;
      var fmt = function (v) { return num(v, 0) + " sq ft"; };
      var r = choices(ans, [rect + a * extra, rect, a * (b + extra)], fmt, R);
      return {
        topic: "Area — irregular lot",
        q: "A lot is a " + a + " ft × " + b + " ft rectangle plus a right-triangle section with a " + a + " ft base and " + extra + " ft height. What is its total area?",
        c: r.c, a: r.a,
        e: "Rectangle " + a + " × " + b + " = " + num(rect, 0) + "; triangle ½ × " + a + " × " + extra + " = " + num(tri, 0) + "; total " + num(ans, 0) + " sq ft.",
      };
    },
    pricePerSqFt: function (R) {
      var sqft = R.int(700, 3500, 50);
      var ppsf = R.int(250, 1500, 5);
      var price = sqft * ppsf;
      var r = choices(ppsf, [price / (sqft * 1.1), price / (sqft * 0.9), ppsf * 1.2], function (v) { return money(v); }, R);
      return {
        topic: "Price per square foot",
        q: "A " + num(sqft, 0) + " sq ft apartment sells for " + money(price) + ". What is the price per square foot?",
        c: r.c, a: r.a,
        e: money(price) + " ÷ " + num(sqft, 0) + " = " + money(ppsf) + " per sq ft.",
      };
    },
    points: function (R) {
      var price = R.int(300, 1200, 10) * 1000;
      var down = R.pick([10, 15, 20, 25]);
      var pts = R.pick([0.5, 1, 1.5, 2, 2.5]);
      var loan = price * (1 - down / 100);
      var ans = loan * pts / 100;
      var r = choices(ans, [price * pts / 100, loan * pts / 10, ans * 2], money, R);
      return {
        topic: "Discount points",
        q: "A buyer puts " + down + "% down on a " + money(price) + " home and pays " + pts + " point" + (pts === 1 ? "" : "s") + " on the loan. What do the points cost?",
        c: r.c, a: r.a,
        e: "Loan = " + money(price) + " × " + (100 - down) + "% = " + money(loan) + ". Points are % of the LOAN: × " + pts + "% = " + money(ans) + ".",
      };
    },
    monthlyInterest: function (R) {
      var loan = R.int(150, 900, 5) * 1000;
      var rate = R.pick([4.5, 5, 5.25, 5.5, 6, 6.25, 6.5, 7]);
      var ans = loan * rate / 100 / 12;
      var r = choices(ans, [loan * rate / 100, loan * rate / 100 / 365 * 30 * 1.03, ans * 1.2], function (v) { return money(v, true); }, R);
      return {
        topic: "Interest",
        q: "What is the first month's interest on a " + money(loan) + " loan at " + rate + "% annual interest?",
        c: r.c, a: r.a,
        e: money(loan) + " × " + rate + "% ÷ 12 = " + money(ans, true) + ".",
      };
    },
    ltv: function (R) {
      var value = R.int(300, 1500, 10) * 1000;
      var price = value + R.pick([0, 0, 10000, 20000, 25000]);
      var ltvp = R.pick([75, 80, 85, 90, 95]);
      var ans = Math.min(value, price) * ltvp / 100;
      var r = choices(ans, [price * ltvp / 100 === ans ? value * (ltvp - 5) / 100 : price * ltvp / 100, Math.min(value, price) * (100 - ltvp) / 100, ans * 1.05], money, R);
      return {
        topic: "Loan-to-value",
        q: "A home sells for " + money(price) + " and appraises for " + money(value) + ". The lender allows " + ltvp + "% LTV. What is the maximum loan?",
        c: r.c, a: r.a,
        e: "Lenders use the LOWER of price or appraisal: " + money(Math.min(value, price)) + " × " + ltvp + "% = " + money(ans) + ".",
      };
    },
    taxPer100: function (R) {
      var av = R.int(80, 900, 5) * 1000;
      var rate = R.int(150, 450, 5) / 100;
      var ans = av / 100 * rate;
      var r = choices(ans, [av * rate / 1000, av * rate / 10, ans * 1.1], function (v) { return money(v, true); }, R);
      return {
        topic: "Property tax (per $100)",
        q: "A property is assessed at " + money(av) + " and the tax rate is " + money(rate, true) + " per $100 of assessed value. What is the annual tax?",
        c: r.c, a: r.a,
        e: money(av) + " ÷ 100 × " + money(rate, true) + " = " + money(ans, true) + ".",
      };
    },
    mills: function (R) {
      var av = R.int(60, 600, 5) * 1000;
      var m = R.int(18, 60);
      var ans = av * m / 1000;
      var r = choices(ans, [av * m / 100, av * m / 10000, ans * 1.1], money, R);
      return {
        topic: "Property tax (mills)",
        q: "A property assessed at " + money(av) + " is taxed at " + m + " mills. What is the annual tax?",
        c: r.c, a: r.a,
        e: "1 mill = $0.001. " + money(av) + " × " + m + " ÷ 1,000 = " + money(ans) + ".",
      };
    },
    transferTax: function (R) {
      var price = R.int(200, 2800, 5) * 1000 + R.pick([0, 250, 500]);
      var units = Math.ceil(price / 500);
      var ans = units * 2;
      var r = choices(ans, [price / 500, price * 0.004 * 2, price * 0.001], money, R);
      return {
        topic: "NYS transfer tax",
        q: "Using the NYS real estate transfer tax of $2 per $500 of consideration (round up to the next $500), what is the tax on a " + money(price) + " sale?",
        c: r.c, a: r.a,
        e: money(price) + " ÷ $500 = " + num(price / 500, 2) + " → " + num(units, 0) + " units × $2 = " + money(ans) + " (≈0.4%).",
      };
    },
    recordingTax: function (R) {
      var loan = R.int(200, 1500, 5) * 1000;
      var rate = loan < 500000 ? 1.8 : 1.925;
      var ans = loan * rate / 100;
      var r = choices(ans, [loan * (rate === 1.8 ? 1.925 : 1.8) / 100, loan * rate / 1000, ans * 1.5], money, R);
      return {
        topic: "Mortgage recording tax",
        q: "An NYC buyer of a 1–3 family home takes a " + money(loan) + " mortgage. The mortgage recording tax rate is " + rate + "%. What is the tax?",
        c: r.c, a: r.a,
        e: money(loan) + " × " + rate + "% = " + money(ans) + ". (NYC: 1.8% under $500k; 1.925% at $500k+.)",
      };
    },
    proration360: function (R) {
      var annual = R.int(36, 180) * 100;
      var mIdx = R.int(0, 10);
      var day = R.int(1, Math.min(30, MONTHS[mIdx][1]));
      var monthsOwned = mIdx; // full months before closing month
      var sellerDays = monthsOwned * 30 + day;
      var buyerDays = 360 - sellerDays;
      var daily = annual / 360;
      var ans = daily * buyerDays;
      var fmt = function (v) { return "Credit seller " + money(v, true); };
      var wrongs = [daily * sellerDays, annual / 365 * buyerDays, daily * (buyerDays - 1)];
      var r = choices(ans, wrongs, fmt, R);
      return {
        topic: "Proration (360-day year)",
        q: "The seller prepaid the calendar-year property taxes of " + money(annual) + ". Closing is " + MONTHS[mIdx][0] + " " + day + " and the seller owns the day of closing. Using a 360-day year (30-day months), what is the tax proration?",
        c: r.c, a: r.a,
        e: "Seller owns " + monthsOwned + " × 30 + " + day + " = " + sellerDays + " days, so the buyer owns 360 − " + sellerDays + " = " + buyerDays + " days. " + money(annual) + " × " + buyerDays + " ÷ 360 = " + money(ans, true) + " (daily ≈ " + money(daily, true) + "; carry extra decimals, not the rounded daily figure). The seller prepaid, so credit seller, debit buyer.",
      };
    },
    proration365: function (R) {
      var annual = R.int(30, 150) * 100 + R.pick([0, 50]);
      var mIdx = R.int(0, 11);
      var day = R.int(1, MONTHS[mIdx][1]);
      var days = day;
      for (var i = 0; i < mIdx; i++) days += MONTHS[i][1];
      var daily = annual / 365;
      var ans = daily * days;
      var fmt = function (v) { return "Debit seller " + money(v, true); };
      var r = choices(ans, [daily * (365 - days), annual / 360 * days, daily * (days - 1)], fmt, R);
      return {
        topic: "Proration (365-day year)",
        q: "This year's property taxes of " + money(annual) + " have NOT been paid and will be paid by the buyer later. Closing is " + MONTHS[mIdx][0] + " " + day + " (not a leap year), and the seller owns the day of closing. Using a 365-day year, what is the proration?",
        c: r.c, a: r.a,
        e: "Jan 1 through " + MONTHS[mIdx][0] + " " + day + " = " + days + " days. " + money(annual) + " × " + days + " ÷ 365 = " + money(ans, true) + " (daily ≈ " + money(daily, true) + "). The seller hasn't paid for days they owned, so debit seller, credit buyer.",
      };
    },
    capValue: function (R) {
      var noi = R.int(30, 400) * 1000;
      var cap = R.pick([4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 9, 10]);
      var ans = noi / (cap / 100);
      var r = choices(ans, [noi / ((cap + 1) / 100), noi / ((cap - 1) / 100), noi * cap / 100], money, R);
      return {
        topic: "Cap rate → value",
        q: "A building has net operating income of " + money(noi) + ". At a " + cap + "% capitalization rate, what is its value?",
        c: r.c, a: r.a,
        e: "Value = NOI ÷ rate = " + money(noi) + " ÷ " + num(cap / 100, 4) + " = " + money(ans) + ".",
      };
    },
    capRate: function (R) {
      var price = R.int(400, 5000, 50) * 1000;
      var cap = R.pick([4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8]);
      var noi = price * cap / 100;
      var fmt = function (v) { return pct(v, 2); };
      var r = choices(cap, [cap + 0.5, cap - 0.5, price / noi], fmt, R);
      return {
        topic: "Cap rate",
        q: "An investor pays " + money(price) + " for a property with NOI of " + money(noi) + ". What is the capitalization rate?",
        c: r.c, a: r.a,
        e: money(noi) + " ÷ " + money(price) + " = " + pct(cap, 2) + ".",
      };
    },
    grm: function (R) {
      var rent = R.int(20, 90) * 100;
      var grm = R.int(90, 180);
      var price = rent * grm;
      var fmt = function (v) { return num(v, 1); };
      var r = choices(grm, [price / (rent * 12), grm * 1.1, grm * 0.9], fmt, R);
      return {
        topic: "Gross rent multiplier",
        q: "A small rental building sells for " + money(price) + " and collects " + money(rent) + " in gross rent per month. What is the gross rent multiplier (monthly)?",
        c: r.c, a: r.a,
        e: money(price) + " ÷ " + money(rent) + " = " + num(grm, 1) + ".",
      };
    },
    depreciation: function (R) {
      var price = R.int(300, 2000, 10) * 1000;
      var landPct = R.pick([15, 20, 25, 30]);
      var resi = R.rng() < 0.6;
      var life = resi ? 27.5 : 39;
      var land = price * landPct / 100;
      var ans = (price - land) / life;
      var r = choices(ans, [price / life, (price - land) / (resi ? 39 : 27.5), land / life], money, R);
      return {
        topic: "Tax depreciation",
        q: "An investor buys a " + (resi ? "residential rental" : "commercial office") + " property for " + money(price) + "; " + landPct + "% of the price is land. What is the annual straight-line depreciation?",
        c: r.c, a: r.a,
        e: "Land isn't depreciated: building = " + money(price - land) + " ÷ " + life + " years = " + money(ans) + ".",
      };
    },
    appreciation: function (R) {
      var v = R.int(250, 1200, 5) * 1000;
      var rate = R.pick([2, 3, 4, 5, 6]);
      var yrs = R.int(2, 6);
      var ans = v * (1 + rate / 100 * yrs);
      var comp = v * Math.pow(1 + rate / 100, yrs);
      var r = choices(ans, [comp, v * (1 + rate / 100), v * rate / 100 * yrs], money, R);
      return {
        topic: "Appreciation",
        q: "A " + money(v) + " home appreciates " + rate + "% per year, straight-line (not compounded), for " + yrs + " years. What is it worth?",
        c: r.c, a: r.a,
        e: money(v) + " × " + rate + "% × " + yrs + " = " + money(v * rate / 100 * yrs) + " gain → " + money(ans) + ".",
      };
    },
    profitPct: function (R) {
      var cost = R.int(200, 900, 10) * 1000;
      var p = R.pick([10, 12.5, 15, 20, 25, 30, 40]);
      var sale = cost * (1 + p / 100);
      var fmt = function (v) { return pct(v, 1); };
      var r = choices(p, [(sale - cost) / sale * 100, p * 2, 100 + p], fmt, R);
      return {
        topic: "Percent profit",
        q: "An investor bought a property for " + money(cost) + " and sold it for " + money(sale) + ". What was the percentage of profit on the original cost?",
        c: r.c, a: r.a,
        e: "Profit " + money(sale - cost) + " ÷ cost " + money(cost) + " = " + pct(p, 1) + ".",
      };
    },
    qualifying: function (R) {
      var income = R.int(40, 200) * 100;
      var back = R.pick([36, 41, 43]);
      var debts = R.int(2, 15) * 100;
      var ans = income * back / 100 - debts;
      var r = choices(ans, [income * back / 100, income * 0.28, ans - debts], money, R);
      return {
        topic: "Qualifying ratio",
        q: "A borrower's gross monthly income is " + money(income) + " and other monthly debts total " + money(debts) + ". With a " + back + "% back-end (total debt) ratio, what is the maximum monthly housing payment?",
        c: r.c, a: r.a,
        e: money(income) + " × " + back + "% = " + money(income * back / 100) + " − " + money(debts) + " = " + money(ans) + ".",
      };
    },
    frontFoot: function (R) {
      var front = R.int(40, 150, 5);
      var depth = R.int(100, 250, 10);
      var ff = R.int(500, 4000, 50);
      var ans = front * ff;
      var r = choices(ans, [depth * ff, front * depth * ff / 100, (front + depth) * ff], money, R);
      return {
        topic: "Front footage",
        q: "A " + front + "' × " + depth + "' lot sells for " + money(ff) + " per front foot. What is the price?",
        c: r.c, a: r.a,
        e: "The first dimension is the frontage: " + front + " × " + money(ff) + " = " + money(ans) + ".",
      };
    },
    cashOnCash: function (R) {
      var equity = R.int(100, 900, 10) * 1000;
      var rate = R.pick([4, 5, 6, 7.5, 8, 9, 10, 12]);
      var btcf = equity * rate / 100;
      var ds = R.int(20, 150) * 1000;
      var noi = btcf + ds;
      var fmt = function (v) { return pct(v, 2); };
      var r = choices(rate, [noi / equity * 100, ds / equity * 100, rate + 2], fmt, R);
      return {
        topic: "Cash-on-cash return",
        q: "A property has NOI of " + money(noi) + " and annual debt service of " + money(ds) + ". The investor put in " + money(equity) + " of cash. What is the cash-on-cash return?",
        c: r.c, a: r.a,
        e: "Cash flow = " + money(noi) + " − " + money(ds) + " = " + money(btcf) + ". ÷ " + money(equity) + " = " + pct(rate, 2) + ".",
      };
    },
    mansionTax: function (R) {
      var price = R.int(1000, 1990, 10) * 1000;
      var ans = price * 0.01;
      var r = choices(ans, [price * 0.001, (price - 1000000) * 0.01, price * 0.004], money, R);
      return {
        topic: "Mansion tax",
        q: "A buyer purchases a " + money(price) + " home outside NYC. What is the 1% mansion tax (paid by the buyer)?",
        c: r.c, a: r.a,
        e: "The mansion tax is 1% of the entire price once the price is $1M or more: " + money(price) + " × 1% = " + money(ans) + ".",
      };
    },
  };

  NYRE.math = {
    kinds: Object.keys(G),
    labels: Object.keys(G).reduce(function (m, k) { m[k] = G[k](makeRand(function () { return 0.5; })).topic; return m; }, {}),
    generate: function (kind, rng) {
      var R = makeRand(rng);
      var k = kind && G[kind] ? kind : R.pick(Object.keys(G));
      var item = G[k](R);
      item.kind = k;
      item.u = 10;
      return item;
    },
  };
})((window.NYRE = window.NYRE || {}));
