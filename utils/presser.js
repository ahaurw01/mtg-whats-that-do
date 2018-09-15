let target;
function init() {
  target = document.createElement('div');
  document.addEventListener('keydown', e => {
    for (let event in events) {
      if (events[event].check(e)) {
        events[event].preventDefault && e.preventDefault();
        target.dispatchEvent(new Event(event));
        return;
      }
    }
  });
}

export function on(event, fn) {
  if (!target) init();
  target.addEventListener(event, fn);
}

export function off(event, fn) {
  if (!target) init();
  target.removeEventListener(event, fn);
}

const events = {
  search: {
    check: e => e.key === 'p' && (e.metaKey || e.ctrlKey),
    preventDefault: true,
  },
  clear: {
    check: e => e.key === 'k' && (e.metaKey || e.ctrlKey),
    preventDefault: true,
  },
  nextCard: {
    check: e => e.key === 'j' && (e.metaKey || e.ctrlKey),
    preventDefault: true,
  },
  previousCard: {
    check: e => e.key === 'h' && (e.metaKey || e.ctrlKey),
    preventDefault: true,
  },
  oracle: { check: e => e.key === 'o', preventDefault: false },
  rulings: { check: e => e.key === 'r', preventDefault: false },
  flip: { check: e => e.key === 'f', preventDefault: false },
  pin: { check: e => e.key === 'p', preventDefault: false },
  remove: { check: e => e.key === 'k', preventDefault: false },
};
