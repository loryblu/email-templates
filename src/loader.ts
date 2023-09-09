import ConfirmPasswordReset from '../emails/ConfirmPasswordReset';
import { render } from '@react-email/render';

export const html = render(
  ConfirmPasswordReset({ username: 'nome', url: '#asd', appName: 'asdsad' }),
  {
    plainText: true,
  },
);
