/* NY Real Estate Prep — how many mock-exam questions each unit gets.
 * Proportional to syllabus hours (largest remainder), at least 1 per unit. Pure function, tested in tests/. */
(function (NYRE) {
  NYRE.examAllocation = function (units, count) {
    var total = units.reduce(function (s, u) { return s + u.hours; }, 0);
    var alloc = {}, rema = [], used = 0;
    units.forEach(function (u) {
      var exact = (count * u.hours) / total;
      alloc[u.id] = Math.max(1, Math.floor(exact));
      used += alloc[u.id];
      rema.push({ id: u.id, r: exact - alloc[u.id] });
    });
    rema.sort(function (a, b) { return b.r - a.r || a.id - b.id; });
    for (var k = 0; used < count; k++) { alloc[rema[k % rema.length].id]++; used++; }
    while (used > count) {
      var big = units.slice().sort(function (a, b) { return alloc[b.id] - alloc[a.id]; })[0];
      alloc[big.id]--; used--;
    }
    return alloc;
  };
})((window.NYRE = window.NYRE || {}));
