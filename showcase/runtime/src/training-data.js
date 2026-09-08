// Authorized, self-contained showcase fixtures. Pace and summaries are derived below.
export const trainingSeed = [
  { id: "RUN-241", date: "09/04", type: "坡道间歇", distance: 8.4, duration: "48:20", load: 87, status: "待复盘", observation: "末组步频下降，关注左侧触地。", note: "" },
  { id: "RUN-238", date: "09/02", type: "恢复跑", distance: 6.2, duration: "36:08", load: 42, status: "已复盘", observation: "恢复区间稳定。", note: "下次继续保持轻松强度。" },
  { id: "RUN-232", date: "08/30", type: "乳酸阈值", distance: 10.1, duration: "51:40", load: 76, status: "待复盘", observation: "后半程心率漂移 4%。", note: "" },
  { id: "RUN-229", date: "08/28", type: "长距离", distance: 18, duration: "1:34:18", load: 91, status: "已复盘", observation: "补给节奏符合计划。", note: "下一次长距离继续使用本次补给节奏。" },
  { id: "RUN-224", date: "08/26", type: "轻松跑", distance: 7.5, duration: "42:01", load: 48, status: "已复盘", observation: "落地噪声降低。", note: "保持这次的轻松节奏。" }
];

export function averagePace(record) {
  const seconds = record.duration.split(":").reduce((sum, part) => sum * 60 + Number(part), 0);
  const pace = Math.round(seconds / record.distance);
  return `${Math.floor(pace / 60)}:${String(pace % 60).padStart(2, "0")}`;
}
