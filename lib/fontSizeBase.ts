// 手机淘宝适配方案（基于750的设计图）
const fontSizeBace = (e: Window, t: Document): void => {
  const n = t.documentElement,
    d = e.devicePixelRatio || 1; // 设备DPR
  function i() {
    const e = (n.clientWidth / 3.75) * 0.16; // iPhone 6 布局视口375
    n.style.fontSize = e + "px";
  }
  if (
    ((function e() {
      t.body
        ? (t.body.style.fontSize = "16px")
        : t.addEventListener("DOMContentLoaded", e);
    })(),
    i(),
    e.addEventListener("resize", i),
    e.addEventListener("pageshow", function (e) {
      e.persisted && i();
    }),
    d >= 2)
  ) {
    const o = t.createElement("body"),
      a = t.createElement("div");
    (a.style.border = ".5px solid transparent"),
      o.appendChild(a),
      n.appendChild(o),
      1 === a.offsetHeight && n.classList.add("hairlines"),
      n.removeChild(o);
  }
};

export default fontSizeBace;
