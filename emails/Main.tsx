import * as React from 'react';
import { Html, Body, Container, Text, Button } from '@react-email/components';

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

export default function Main() {
  return (
    <Html>
      <Body style={StyleSheet.body}>
        <Container style={StyleSheet.container}>
          <Text>Hello world!</Text>

          <Button href='https://example.com' style={StyleSheet.button} pX={16} pY={8}>
            Botão text
          </Button>
        </Container>
      </Body>
    </Html>
  );
}
