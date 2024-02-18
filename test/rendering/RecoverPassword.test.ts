// @ts-nocheck
import { describe, expect, it } from 'vitest';
import { faker } from '@faker-js/faker';
import type { RecoverPasswordParams } from '../../emails/RecoverPassword';
import { RecoverPassword } from '../../index';
import { ZodError, ZodIssue } from 'zod';

function groupIssuesByParam(issues: Array<ZodIssue>): {
  [key: string]: ZodIssue;
} {
  return issues.reduce((previousValue, currentValue: ZodIssue) => {
    const param = currentValue.path[0];

    previousValue[param] = currentValue;
    return previousValue;
  }, {});
}

async function renderWithIssues(stubs) {
  return await RecoverPassword(stubs).catch(
    (error: ZodError) => groupIssuesByParam(error.issues),
  );
}

describe('Compilation test', () => {
  describe('Happy path', () => {
    const happyStubs: RecoverPasswordParams = {
      app_name: faker.word.words(2),
      username: faker.person.firstName(),
      url: faker.internet.url(),
    };

    describe('Validate the rendered content', () => {
      it.concurrent('Check title content', async () => {
        const received = await RecoverPassword(happyStubs);
        const expected = new RegExp(`<title>${happyStubs.app_name}</title>`);

        expect(expected.test(received)).toBeTruthy();
      });

      it.concurrent('Check username content', async () => {
        const received = await RecoverPassword(happyStubs);
        const expected = new RegExp(`Olá, ${happyStubs.username}!`);

        expect(expected.test(received)).toBeTruthy();
      });

      it.concurrent('Check url content', async () => {
        const received = await RecoverPassword(happyStubs);
        const expected = new RegExp(`href="${happyStubs.url}"`);

        expect(expected.test(received)).toBeTruthy();
      });
    });
  });

  describe('Unhappy path', () => {
    const unhappyStubs: RecoverPasswordParams = {
      app_name: faker.number.int({ min: 1, max: 200 }),
      username: '',
      url: faker.word.words(1),
    };

    describe('Validate code and error messages', async () => {
      describe('Check STRING validation', async () => {
        const stringValidationStubs: RecoverPasswordParams = {
          app_name: faker.datatype.boolean(),
          username: faker.datatype.boolean(),
          url: faker.datatype.boolean(),
        };

        const issues = await renderWithIssues(stringValidationStubs);
        const expectedCode = 'invalid_type';
        const expectedMessage = 'Espera um texto';

        it('Check "app_name"', () => {
          expect(issues.app_name.code).toStrictEqual(expectedCode);
          expect(issues.app_name.message).toStrictEqual(expectedMessage);
        });

        it('Check "username" errors', () => {
          expect(issues.username.code).toStrictEqual(expectedCode);
          expect(issues.username.message).toStrictEqual(expectedMessage);
        });

        it('Check "url" errors', () => {
          expect(issues.url.code).toStrictEqual(expectedCode);
          expect(issues.url.message).toStrictEqual(expectedMessage);
        });
      });
    });
  });
});
