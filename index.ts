import type { PasswordResetProps } from './emails/types';
import { templateLoader } from './emails/utils';
import { PasswordReset } from './emails';

export const PasswordResetTemplate = async (props: PasswordResetProps) => {
  return await templateLoader<PasswordResetProps>(PasswordReset, props);
};
