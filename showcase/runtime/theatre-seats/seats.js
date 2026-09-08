// Deliberately fictional inventory. Every view and total derives from these records.
export const show = {
  title: "夜航", subtitle: "不插电现场", venue: "回声小剧场",
  startsAt: "2026-09-18T19:30:00+08:00", duration: 90,
};

export const zones = [
  { id: "front", name: "近台区", price: 280, color: "#8760b6", tint: "#eee5f8", rows: ["A", "B"] },
  { id: "middle", name: "中区", price: 180, color: "#317a70", tint: "#e0eeea", rows: ["C", "D"] },
  { id: "back", name: "后区", price: 120, color: "#95602b", tint: "#f3e8d9", rows: ["E", "F"] },
];
const unavailable = new Set(["A01", "A02", "A06", "A07", "A11", "B04", "B05", "B06", "B12", "C01", "C05", "C06", "C10", "D03", "D04", "D09", "D10", "E06", "E07", "F01", "F12"]);
export const seats = zones.flatMap(zone => zone.rows.flatMap((row, rowInZone) =>
  Array.from({ length: 12 }, (_, index) => {
    const number = index + 1;
    const id = row + String(number).padStart(2, "0");
    return { id, row, number, rowIndex: zones.indexOf(zone) * 2 + rowInZone, zone: zone.id,
      price: zone.price, block: number <= 3 ? "left" : number <= 9 ? "center" : "right",
      available: !unavailable.has(id) };
  })
));
export const seatById = Object.fromEntries(seats.map(seat => [seat.id, seat]));
export const seatLabel = seat => `${seat.row}排${String(seat.number).padStart(2, "0")}座`;
export const totalPrice = ids => ids.reduce((total, id) => total + seatById[id].price, 0);

// Never bridge a real aisle or an occupied seat. Stable ranking prefers center, then front.
export function recommendSeats(count, zoneId = "all") {
  if (!Number.isInteger(count) || count < 1 || count > 4) return [];
  const candidates = seats.flatMap(first => {
    const group = Array.from({ length: count }, (_, offset) => seatById[first.row + String(first.number + offset).padStart(2, "0")]);
    if (group.some(seat => !seat?.available || seat.block !== first.block || (zoneId !== "all" && seat.zone !== zoneId))) return [];
    const center = group.reduce((sum, seat) => sum + seat.number, 0) / count;
    return [{ ids: group.map(seat => seat.id), score: Math.abs(center - 6.5) * 12 + first.rowIndex }];
  });
  return candidates.sort((a, b) => a.score - b.score || a.ids[0].localeCompare(b.ids[0]))[0]?.ids || [];
}

export function zoneSummary(selected = []) {
  return zones.map(zone => {
    const inventory = seats.filter(seat => seat.zone === zone.id);
    return { ...zone, total: inventory.length, available: inventory.filter(seat => seat.available).length,
      selected: selected.filter(id => seatById[id].zone === zone.id).length };
  });
}
