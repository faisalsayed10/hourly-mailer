import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
  FormControl,
  Image,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Link from "next/link";
import { useUser } from "hooks";
import { Error, SignupData } from "@lib/types";
import Head from "next/head";
import { useForm } from "react-hook-form";
import axios from "axios";
import { User } from ".prisma/client";

const Signup: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Error>(null);
  const [alert, setAlert] = useState<string>(null);
  const { register, handleSubmit } = useForm();
  const toast = useToast();

  const { mutateUser } = useUser("/", true);

  async function handleSignup(data: SignupData) {
    try {
      setLoading(true);
      const { data: user } = await axios.post<User>("/api/signup", data);
      setLoading(false);
      setErrors(null);
      await mutateUser(user);
      toast({
        title: "Signup success",
        description: `Welcome, ${user.username}!`,
        status: "success",
        variant: "subtle",
        duration: 2000,
      });
    } catch (err) {
      setLoading(false);
      setErrors(err.response.data);
    }
  }

  return (
    <>
      <Head>
        <title>Signup</title>
      </Head>
      <Box
        className="form-page"
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Box
          display="flex"
          alignItems="center"
          bgColor="white"
          pos="relative"
          flexDir={["column-reverse", "column-reverse", "row"]}
          boxShadow="2xl"
          h="70vh"
          w={["auto", "auto", "400px"]}
          m="8"
          borderRadius="xl"
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flex="1 0 0"
          >
            <Box as="form" w="80%" onSubmit={handleSubmit(handleSignup)}>
              <Text fontSize="3xl">Hello there!</Text>
              {errors && (
                <Alert status="error">
                  <AlertIcon />
                  {Object.values(errors).map((error) => (
                    <React.Fragment key={error}>
                      {error}
                      <br />
                    </React.Fragment>
                  ))}
                </Alert>
              )}
              <FormControl id="username" my='3'>
                <Input
                  variant="outline"
                  placeholder="Username"
                  ref={register}
                  name="username"
                  isInvalid={errors?.username ? true : false}
                  errorBorderColor="crimson"
                  required
                />
              </FormControl>
              <FormControl id="email" mb='3'>
                <Input
                  variant="outline"
                  placeholder="Enter your email"
                  type="email"
                  ref={register}
                  name="email"
                  isInvalid={errors?.email ? true : false}
                  errorBorderColor="crimson"
                  required
                />
              </FormControl>
              <FormControl id="password" mb="3">
                <Input
                  variant="outline"
                  type="password"
                  placeholder="Password"
                  ref={register}
                  name="password"
                  isInvalid={errors?.password ? true : false}
                  errorBorderColor="crimson"
                  required
                />
              </FormControl>
              <FormControl id="confirm-password" mb="3">
                <Input
                  variant="outline"
                  type="password"
                  placeholder="Confirm password"
                  ref={register}
                  name="confirmPassword"
                  isInvalid={errors?.confirmPassword ? true : false}
                  errorBorderColor="crimson"
                  required
                />
              </FormControl>
              <Button
                bgColor="#6577f3"
                color="white"
                variant="solid"
                isLoading={loading}
                w="100%"
                mb="3"
                type="submit"
              >
                Signup
              </Button>
              {alert && (
                <Alert status="info">
                  <AlertIcon />
                  {alert}
                </Alert>
              )}
              <Center>
                <Text pos="absolute" bottom="3" fontSize={["sm", "md", "md"]}>
                  Already have an account? <Link href="/login">Login</Link>
                </Text>
              </Center>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Signup;
