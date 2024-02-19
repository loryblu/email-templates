// @ts-nocheck
import type { ZodError, ZodIssue } from 'zod';
import type { RecoverPasswordParams } from '../../emails/RecoverPassword';
import { describe, expect, it } from 'vitest';
import { faker } from '@faker-js/faker';
import validationResponses from '../../assets/responses';
import { RecoverPassword } from '../../index';

type GroupIssuesByParamResponse = {
  [key: string]: ZodIssue;
};

function groupIssuesByParam(
  issues: Array<ZodIssue>,
): GroupIssuesByParamResponse {
  return issues.reduce((previousValue, currentValue: ZodIssue) => {
    const param = currentValue.path[0];

    previousValue[param] = currentValue;
    return previousValue;
  }, {});
}

async function renderWithIssues(stubs: RecoverPasswordParams) {
  return await RecoverPassword(stubs).catch((error: ZodError) => {
    return groupIssuesByParam(error.issues);
  });
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
        const expected = new RegExp(`Olá, (<!-- -->)?${happyStubs.username}(<!-- -->)?!`);

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
    describe('Validate code and error messages', async () => {
      describe('Check STRING validation', async () => {
        const stringValidationStubs: RecoverPasswordParams = {
          app_name: faker.datatype.boolean(),
          username: faker.datatype.boolean(),
          url: faker.datatype.boolean(),
        };

        const issues = await renderWithIssues(stringValidationStubs);
        const expectedCode = 'invalid_type';
        const expectedMessage = validationResponses.string;

        it('Check "app_name" datatype', () => {
          expect(issues.app_name.code).toStrictEqual(expectedCode);
          expect(issues.app_name.message).toStrictEqual(expectedMessage);
        });

        it('Check "username" datatype', () => {
          expect(issues.username.code).toStrictEqual(expectedCode);
          expect(issues.username.message).toStrictEqual(expectedMessage);
        });

        it('Check "url" datatype', () => {
          expect(issues.url.code).toStrictEqual(expectedCode);
          expect(issues.url.message).toStrictEqual(expectedMessage);
        });
      });

      describe('Check LENGTH validation', async () => {
        const lengthValidationStubs: RecoverPasswordParams = {
          app_name: '',
          username: '',
        };

        const issues = await renderWithIssues(lengthValidationStubs);
        const expectedCode = 'too_small';
        const expectedMessage = validationResponses.tooSmall;

        it('Check "app_name" length', () => {
          expect(issues.app_name.code).toStrictEqual(expectedCode);
          expect(issues.app_name.message).toStrictEqual(expectedMessage);
        });

        it('Check "username" length', () => {
          expect(issues.username.code).toStrictEqual(expectedCode);
          expect(issues.username.message).toStrictEqual(expectedMessage);
        });
      });

      describe('Check URL Format validation', async () => {
        const lengthValidationStubs: RecoverPasswordParams = {
          url: '',
        };

        const issues = await renderWithIssues(lengthValidationStubs);
        const expectedCode = 'invalid_string';
        const expectedMessage = validationResponses.url;

        it('Check "url" format', () => {
          expect(issues.url.code).toStrictEqual(expectedCode);
          expect(issues.url.message).toStrictEqual(expectedMessage);
        });
      });
    });
  });
});
