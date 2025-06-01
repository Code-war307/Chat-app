import {
    Html,
    Tailwind,
    Container,
    Img,
    Text,
    Heading,
    Button,
    Section,
  } from "@react-email/components";
  import * as React from "react";
  
  export default function OTPEmail({ username, otpCode }) {
    return (
      <Html>
        <Tailwind>
          <Container className="bg-[#f9f9f9] p-6 font-sans">
            {/* Logo Section */}
            <Section className="w-full flex justify-center items-center mb-6">
              <Img
                src=""
                width="100"
                height="100"
                alt="Messenger Logo"
              />
            </Section>
  
            {/* Greeting */}
            <Section className="text-center">
              <Heading className="text-2xl font-bold text-white mb-2">
                Hello {username},
              </Heading>
              <Text className="text-base text-gray-700">
                Thank you for signing up! Use the following verification code to complete your registration:
              </Text>
            </Section>
  
            {/* OTP Section */}
            <Section className="my-6 text-center">
              <Text className="text-3xl font-bold text-blue-600 tracking-widest">
                {otpCode}
              </Text>
            </Section>
  
            {/* Button Section (Optional, if you want to link to confirm page) */}
            <Section className="text-center">
              <Button
                href="https://yourapp.com/verify"
                className="bg-blue-600 text-white px-5 py-3 rounded text-base font-semibold"
              >
                Verify Account
              </Button>
            </Section>
  
            {/* Footer */}
            <Section className="mt-10 text-sm text-gray-500 text-center">
              <Text>
                If you did not sign up for this account, please ignore this email or contact support.
              </Text>
              <Text className="mt-2">© 2025 GetChat Inc. All rights reserved.</Text>
            </Section>
          </Container>
        </Tailwind>
      </Html>
    );
  }
  