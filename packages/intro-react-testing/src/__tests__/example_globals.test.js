import {storage} from '../lib/storage';
import {saveUsername, getUsername} from '../user';

describe('Basic', () => {
  test('matchers', () => {
    expect(true).toBe(true); // Equibalencia
    expect({name: 'David'}).toEqual({name: 'David'}); // Para objetos o arrays

    expect({name: 'David'}).not.toEqual({name: 'David Fabian'}); // negacion

    expect('dAvId').toMatch(/david/i); // Verificar string
    expect('dAvId').not.toMatch(/fabian/); // Verifiacar que una string no se encuentre

    // expect(compileAndroidCode).toThrow();
    // expect(compileAndroidCode).toThrow(Error);
  });

  beforeAll(() => {
    // se ejecuta antes de todos los test
    console.log('beforeAll');
  });

  beforeEach(() => {
    // se ejecuta antes de cada test
    console.log('beforeEach');
  });

  afterAll(() => {
    // se ejecuta despues de todos los test
    console.log('afterAll');
  });

  afterEach(() => {
    // se ejecuta despues de cada test
    console.log('afterEach');
  });
});

describe('async', () => {
  // callbacks
  const asyncCallback = cb => {
    setTimeout(() => {
      cb(true);
    }, 1000);
  };

  // promises
  const asyncPromise = () => {
    return new Promise(resolve => resolve(true));
  };

  test('example of async with callback', done => {
    asyncCallback(result => {
      expect(result).toBe(true);
      done();
    });
  });

  test('example of async with promises', () => {
    return asyncPromise().then(result => expect(result).toBe(true));
  });

  test('example of async with async await', async () => {
    const result = await asyncPromise();
    expect(result).toBe(true);
  });
});

jest.mock('../lib/storage');

describe('mock', () => {
  test('first example', () => {
    const myMock = jest
      .fn()
      .mockReturnValueOnce(true)
      .mockReturnValueOnce('hello world')
      .mockReturnValueOnce(5);

    const result1 = myMock();
    const result2 = myMock();
    const result3 = myMock();

    expect(myMock).toHaveBeenCalledTimes(3);

    expect(result1).toBe(true);
    expect(result2).toBe('hello world');
    expect(result3).toBe(5);
  });

  test('second example', () => {
    const username = 'john doe';
    saveUsername(username);
    expect(storage.save).toHaveBeenCalledTimes(1);
    expect(storage.save).toHaveBeenCalledWith({
      key: 'username',
      value: username
    });
  });

  test('third example', () => {
    const username = 'john doe';
    storage.get.mockReturnValueOnce(username);

    const result = getUsername();

    expect(result).toBe(username);
    expect(storage.get).toHaveBeenCalledTimes(1);
    expect(storage.get).toHaveBeenCalledWith({key: 'username'});
  });
});
