import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Text,
  Button,
} from '@react-email/components';

interface ConfirmPasswordResetProps {
  appName: string;
  username: string;
  url: string;
}

const StyleSheet = {
  body: {
    backgroundColor: '#f2f2f2',
  },
  container: {
    padding: '1rem',
    border: '1px solid grey',
  },
  button: {
    color: 'white',
    backgroundColor: 'blue',
  },
};

export default function ConfirmPasswordReset(props: ConfirmPasswordResetProps) {
  const { appName, username, url } = props;

  return (
    <Html>
      <Head>
        <title>{`Mensagem | ${appName}`}</title>
        <Preview>
          Recebemos uma solicitação para redefinir a senha da sua conta{' '}
          {appName}
        </Preview>
      </Head>
      <Body style={StyleSheet.body}>
        <Container style={StyleSheet.container}>
          <Text>Olá, {username}!</Text>

          <Text>
            Pedido de redefinição de senha recebido. Clique no botão abaixo para
            confirmar a redefinição de senha.
          </Text>

          <Button href={url} style={StyleSheet.button} pX={16} pY={8}>
            Redefinir senha
          </Button>

          <Text>
            Obrigado por nos ajudar a manter sua conta segura!
            <br />
            Equipe {appName}.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
