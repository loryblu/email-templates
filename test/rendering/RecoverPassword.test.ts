// @ts-nocheck
import { describe, expect, it } from 'vitest';
import { faker } from '@faker-js/faker';
import type { RecoverPasswordParams } from '../../emails/RecoverPassword';
import { RecoverPassword } from '../../index';

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
});
