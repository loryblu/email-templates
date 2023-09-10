import { renderAsync } from '@react-email/render';

export const templateLoader = async (
  Template: JSX.Element,
): Promise<string> => {
  return await renderAsync(Template, { pretty: true });
};
