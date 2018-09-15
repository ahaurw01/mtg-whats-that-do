import * as presser from '../../utils/presser';

describe('presser', () => {
  let preventDefault;
  beforeEach(() => {
    preventDefault = jest.fn();
    KeyboardEvent.prototype.preventDefault = preventDefault;
  });

  test('search', done => {
    presser.on('search', () => {
      expect(preventDefault).toHaveBeenCalled();
      done();
    });

    const event = new KeyboardEvent('keydown', {
      key: 'p',
      metaKey: true,
    });
    document.dispatchEvent(event);
  });

  test('clear', done => {
    presser.on('clear', () => {
      expect(preventDefault).toHaveBeenCalled();
      done();
    });

    const event = new KeyboardEvent('keydown', {
      key: 'k',
      metaKey: true,
    });
    document.dispatchEvent(event);
  });

  test('nextCard', done => {
    presser.on('nextCard', () => {
      expect(preventDefault).toHaveBeenCalled();
      done();
    });

    const event = new KeyboardEvent('keydown', {
      key: 'j',
      metaKey: true,
    });
    document.dispatchEvent(event);
  });

  test('previousCard', done => {
    presser.on('previousCard', () => {
      expect(preventDefault).toHaveBeenCalled();
      done();
    });

    const event = new KeyboardEvent('keydown', {
      key: 'h',
      metaKey: true,
    });
    document.dispatchEvent(event);
  });

  test('oracle', done => {
    presser.on('oracle', () => {
      expect(preventDefault).not.toHaveBeenCalled();
      done();
    });

    const event = new KeyboardEvent('keydown', {
      key: 'o',
    });
    document.dispatchEvent(event);
  });

  test('rulings', done => {
    presser.on('rulings', () => {
      expect(preventDefault).not.toHaveBeenCalled();
      done();
    });

    const event = new KeyboardEvent('keydown', {
      key: 'r',
    });
    document.dispatchEvent(event);
  });

  test('flip', done => {
    presser.on('flip', () => {
      expect(preventDefault).not.toHaveBeenCalled();
      done();
    });

    const event = new KeyboardEvent('keydown', {
      key: 'f',
    });
    document.dispatchEvent(event);
  });

  test('pin', done => {
    presser.on('pin', () => {
      expect(preventDefault).not.toHaveBeenCalled();
      done();
    });

    const event = new KeyboardEvent('keydown', {
      key: 'p',
    });
    document.dispatchEvent(event);
  });

  test('remove', done => {
    presser.on('remove', () => {
      expect(preventDefault).not.toHaveBeenCalled();
      done();
    });

    const event = new KeyboardEvent('keydown', {
      key: 'k',
    });
    document.dispatchEvent(event);
  });

  test('off', () => {
    const handler = () => {
      throw new Error('should not be called');
    };
    presser.on('remove', handler);
    presser.off('remove', handler);

    const event = new KeyboardEvent('keydown', {
      key: 'k',
    });
    document.dispatchEvent(event);
  });
});
