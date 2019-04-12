import { StringHumanizePipe } from './string-humanize.pipe';

describe('HumanizePipe', () => {
  it('create an instance', () => {
    const pipe = new StringHumanizePipe();
    expect(pipe).toBeTruthy();
  });
});
