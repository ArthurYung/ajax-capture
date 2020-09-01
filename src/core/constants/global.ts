export const global = (
  () => (typeof window === "undefined" ? {} : window) as Window
)();

export const platform = (
  () => {
    if (!global.navigator) {
      return "";
    }

    const u = global.navigator.userAgent || "";
    const mobileAgents = [
      "Android",
      "iPhone",
      "webOS",
      "BlackBerry",
      "SymbianOS",
      "Windows Phone",
      "iPad",
      "iPod"
    ];

    for (let i = 0; i < mobileAgents.length; i++) {
      if (u.includes(mobileAgents[i])) {
        return mobileAgents[i];
      }
    }

    return global.navigator.platform;
  }
)();

export const ua = (
  () => {
    const agent = global.navigator?.userAgent || "";
    if (agent.includes("Opera") || agent.includes("OPR")) {
      // opera 浏览器
      return agent.match(/(Opera|OPR)([0-9./]+)?/)[0];
    }

    if (agent.includes("Edge")) {
      // edge 浏览器
      return agent.match(/Edge([0-9./]+)?/)[0];
    }

    if (agent.includes("Firefox")) {
      // Firefox 浏览器
      return agent.match(/Firefox([0-9./]+)?/)[0];
    }

    if (agent.includes("Safari") && !agent.includes("Chrome")) {
      // Safari 浏览器
      return agent.match(/Safari([0-9./]+)?/)[0];
    }

    if (agent.includes("Chrome")) {
      // Chrome 浏览器
      return agent.match(/Chrome([0-9./]+)?/)[0];
    }

    if (agent.includes("MSIE") && agent.includes("Trident")) {
      // IE 浏览器
      return agent.match(/MSIE ([0-9./]+)?/)[0];
    }

    return agent.split(" ")[0] || "";
  }
)();
