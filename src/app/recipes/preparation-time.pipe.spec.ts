import { PreparationTimePipe } from './preparation-time.pipe';

describe('PreparationTimePipe', () => {
  const pipe = new PreparationTimePipe();

  it('should drop hours if they are equal to 0', () => {
    expect(pipe.transform(20)).toBe('20 min');
    expect(pipe.transform(59)).toBe('59 min');
  });

  it('should drop minutes if they are equal to 0', () => {
    expect(pipe.transform(60)).toBe('1 h');
    expect(pipe.transform(120)).toBe('2 h');
  });

  it('should transform 80 to "1 h 20 min"', () => {
    expect(pipe.transform(80)).toBe('1 h 20 min');
  });

  it('should transform 205 to "3 h 25 min"', () => {
    expect(pipe.transform(205)).toBe('3 h 25 min');
  });
});
