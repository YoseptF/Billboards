"use client";

import {
  Button,
  chakra,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  List,
  ListItem,
  Stack,
  UnorderedList
} from "@chakra-ui/react";
import { FaLock, FaUserAlt } from "react-icons/fa";
import { FC, useState } from "react";

import { Link } from "@chakra-ui/next-js";
import supabase from "@/graphql/supabase";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const getIsStrongPassword = (password: string) => {
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);
  const isLong = password.length >= 8;

  return {
    isPasswordStrong: hasLowercase && hasUppercase && hasNumber && hasSpecial && isLong,
    passwordErrors: [
      { value: hasLowercase, message: "at least one lowercase letter." },
      { value: hasUppercase, message: "at least one uppercase letter." },
      { value: hasNumber, message: "at least one number." },
      { value: hasSpecial, message: "at least one special character." },
      { value: isLong, message: "at least 8 characters long." },
    ]
  };
};

const LoginForm: FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { push } = useRouter();

  const handleShowClick = () => setShowPassword(!showPassword);
  const { errors, values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ email, password }, { setErrors }) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) setErrors({ password: error.message });

      if (data.session) {
        push("/dashboard");
      }

    },
  });

  return (
    (
      <form onSubmit={handleSubmit}>
        <Stack
          spacing={4}
          p="1rem"
          boxShadow="md"
        >
          <FormControl>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
              >
                <CFaUserAlt color="gray.300" />
              </InputLeftElement>
              <Input
                type="email"
                name="email"
                placeholder="email address"
                onChange={handleChange}
                value={values.email}
              />
            </InputGroup>
          </FormControl>
          <FormControl isInvalid={Boolean(errors.password)}>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
              >
                <CFaLock color="gray.300" />
              </InputLeftElement>
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={values.password}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Flex justifyContent={errors.password ? "space-between" : "flex-end"}>
              <FormErrorMessage
                display="flex"
                flexDir="column"
                alignItems="left"
              >
                {errors.password}
              </FormErrorMessage>
              <FormHelperText textAlign="right">
                <Link href="/forgot">forgot password?</Link>
              </FormHelperText>
            </Flex>
          </FormControl>
          <Button
            borderRadius={0}
            type="submit"
            variant="solid"
            width="full"
          >
            Login
          </Button>
        </Stack>
      </form>
    )
  );
};

export default LoginForm;