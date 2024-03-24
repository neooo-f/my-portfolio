import React, { ReactElement, ReactNode } from 'react';
import {
  Html,
  Body,
  Head,
  Heading,
  Hr,
  Container,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';

type ContactFormEmailProps = {
  message: string;
  senderEmail: string;
};

export const ContactFormEmail = ({
  message,
  senderEmail,
}: ContactFormEmailProps): ReactElement<any> => (
  <Html>
    <Head />
    <Preview>Eine neue Nachricht von deiner Portfolio Webseite!</Preview>
    <Tailwind>
      <Body className="bg-gray-100 text-black">
        <Container>
          <Section className="bg-white borderBlack my-10 px-10 py-4 rounded-md">
            <Heading className="leading-tight">
              Du hast folgende Nachricht aus dem Kontaktformular erhalten:
            </Heading>
            <Text>{message}</Text>
            <Hr />
            <Text>Die E-Mail Adresse des Absenders lautet: {senderEmail}</Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);
