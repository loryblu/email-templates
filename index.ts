import type { PasswordResetProps } from './assets/types';
import { loader } from './assets/utils';
import { PasswordReset } from './emails';

export const passwordReset = async (props: PasswordResetProps) => {
  return await loader<PasswordResetProps>(PasswordReset, props);
};
