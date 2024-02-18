import { renderAsync } from '@react-email/render';
import * as Models from './emails';

const options = { pretty: true };

export async function RecoverPassword(params: Models.RecoverPasswordParams) {
  return await renderAsync(Models.RecoverPassword(params), options);
}
