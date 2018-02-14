import * as validators from '../../validators';

describe('validator', () => {
  it('should return undefined on completed required fields', () => {
    expect(validators.required('test')).toEqual(
      undefined
    );
  });

  it('should return undefined on completed nonEmpty fields', () => {
    expect(validators.nonEmpty('test')).toEqual(
      undefined
    );
  });

  it('should return undefined on satisfactory isTrimmed fields', () => {
    expect(validators.isTrimmed('testTrimmed')).toEqual(
      undefined
    );
  });

  it('should return undefined on satisfactory length fields', () => {
    expect(validators.length({min: 6})('1234567')).toEqual(
      undefined
    );
    expect(validators.length({max: 8})('1234567')).toEqual(
      undefined
    );
  });

  it('should run a function when validating matches fields', () => {
    expect(validators.matches('password')).toBeInstanceOf(Function)
  });
});

describe('validators error message', () => {
  it('should alert message on empty required fields', () => {
    expect(validators.required(undefined)).toEqual(
      'Required'
    );
  });

  it('should alert message on empty nonEmpty fields', () => {
    expect(validators.nonEmpty('')).toEqual(
      'Cannot be empty'
    );
  });

  it('should alert message on isTrimmed fields', () => {
    expect(validators.isTrimmed(' testTrimmed ')).toEqual(
      'Cannot start or end with whitespace'
    );
  });

  it('should alert message on fields with outside length limit', () => {
    expect(validators.length({min: 6})('123')).toEqual(
      'Must be at least 6 characters long'
    );
    expect(validators.length({max: 8})('123456789')).toEqual(
      'Must be at most 8 characters long'
    );
  });

});