import type { PasswordResetProps } from './emails/types';
import { templateLoader } from 'emails/utils';
import { PasswordReset } from './emails';

export const passwordReset = async (
  props: PasswordResetProps,
): Promise<string> => {
  return await templateLoader(PasswordReset(props));
};
