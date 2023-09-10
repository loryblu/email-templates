import { renderAsync } from '@react-email/render';

export const templateLoader = async <PropsType>(
  Template: Function,
  props: PropsType,
): Promise<string> => {
  return await renderAsync(Template(props), { pretty: true });
};
