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

const RecoverPasswordSchema = z.object({
  app_name: z.coerce.string().optional().default('APP_NAME'),
  username: z.coerce.string().optional().default('USERNAME'),
  url: z.coerce.string().url().optional(),
});

type RecoverPasswordParams = z.infer<typeof RecoverPasswordSchema>;

export default function RecoverPassword(params: RecoverPasswordParams) {
  const { app_name, username, url } = RecoverPasswordSchema.parse(params);

  return (
    <Html>
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
