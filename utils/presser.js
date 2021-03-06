const EVENTS = {
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
  oracle: {
    check: e => (e.key === 'o' || e.key === 'i') && !e.metaKey && !e.ctrlKey,
    preventDefault: false,
  },
  rulings: {
    check: e => e.key === 'r' && !e.metaKey && !e.ctrlKey,
    preventDefault: false,
  },
  flip: {
    check: e => e.key === 'f' && !e.metaKey && !e.ctrlKey,
    preventDefault: false,
  },
  pin: {
    check: e => e.key === 'p' && !e.metaKey && !e.ctrlKey,
    preventDefault: false,
  },
  remove: {
    check: e => e.key === 'k' && !e.metaKey && !e.ctrlKey,
    preventDefault: false,
  },
  escape: {
    check: e => e.key === 'Escape',
    preventDefault: false,
  },
};

export default class Presser {
  constructor() {
    this.target = document.createElement('div');
    document.addEventListener('keydown', this.handleKeyDown);
  }

  on(event, fn) {
    this.target.addEventListener(event, fn);
  }

  off() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    for (let event in EVENTS) {
      if (EVENTS[event].check(e)) {
        EVENTS[event].preventDefault && e.preventDefault();
        this.target.dispatchEvent(new Event(event));
        return;
      }
    }
  };

  // Used for testing - manually fire an event.
  _emit = event => this.target.dispatchEvent(new Event(event));
}
