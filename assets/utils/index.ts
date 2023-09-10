import { renderAsync } from '@react-email/render';

export async function loader<T>(Template: Function, props: T): Promise<string> {
  return await renderAsync(Template(props), { pretty: true });
}
