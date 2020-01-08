export function track(...args) {
  if (window.mixpanel && window.mixpanel.track) {
    return window.mixpanel.track.apply(window.mixpanel, args);
  }
}

export default { track };
