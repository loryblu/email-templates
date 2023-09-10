import type { PasswordResetProps } from '../assets/types/index';
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Text,
  Button,
} from '@react-email/components';
import { MainStyleSheet } from '../assets/styles';

function PasswordReset(props: PasswordResetProps) {
  const {
    appName = '[app_name]',
    userName = '[username]',
    recoverLink = '#[recover_link]',
  } = props;

  return (
    <Html>
      <Head>
        <title>{`Mensagem | ${appName}`}</title>
        <Preview>
          Recebemos uma solicitação para redefinir a senha da sua conta{' '}
          {appName}
        </Preview>
      </Head>
      <Body style={MainStyleSheet.body}>
        <Container style={MainStyleSheet.container}>
          <Text>Olá, {userName}!</Text>

          <Text>
            Pedido de redefinição de senha recebido. Clique no botão abaixo para
            confirmar a redefinição de senha.
          </Text>

          <Button
            href={recoverLink}
            style={MainStyleSheet.button}
            pX={16}
            pY={8}
          >
            Redefinir senha
          </Button>

          <Text>
            Obrigado por nos ajudar a manter sua conta segura!
            <br />
            Equipe {appName}.
          </Text>

          <Text>
            Se o botão não funcionar, tente copirar o link: {recoverLink}
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export { PasswordReset };
export default PasswordReset;
