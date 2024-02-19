import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Text,
  Button,
} from '@react-email/components';
import { z } from 'zod';
import stylesheet from '../assets/stylesheet';
import responses from '../assets/responses';

const RecoverPasswordSchema = z.object({
  app_name: z
    .string({ invalid_type_error: responses.string })
    .min(1, { message: responses.tooSmall })
    .optional()
    .default('APP_NAME'),
  username: z
    .string({ invalid_type_error: responses.string })
    .min(1, { message: responses.tooSmall })
    .optional()
    .default('USERNAME'),
  url: z
    .string({ invalid_type_error: responses.string })
    .url({ message: responses.url })
    .optional(),
});

type RecoverPasswordParams = z.infer<typeof RecoverPasswordSchema>;

function RecoverPassword(params: RecoverPasswordParams) {
  const { app_name, username, url } = RecoverPasswordSchema.parse(params);

  return (
    <Html lang='pt-BR' dir='ltr'>
      <Head>
        <title>{app_name}</title>
        <Preview>
          Recebemos uma solicitação para redefinir a senha da sua conta{' '}
          {app_name}
        </Preview>
      </Head>
      <Body style={stylesheet.body}>
        <Container style={stylesheet.mailContainer}>
          <Text>Olá, {username}!</Text>

          <Text>
            Pedido de redefinição de senha recebido. Clique no botão abaixo para
            confirmar a redefinição de senha.
          </Text>

          <Button href={url} style={stylesheet.button.blue}>
            Redefinir senha
          </Button>

          <Text>
            Obrigado por nos ajudar a manter sua conta segura!
            <br />
            Equipe {app_name}.
          </Text>

          <Text>Se o botão não funcionar, copie o link: {url}</Text>
        </Container>
      </Body>
    </Html>
  );
}

export type { RecoverPasswordParams };
export { RecoverPassword };
export default RecoverPassword;
