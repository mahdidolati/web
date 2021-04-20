import React from "react"
import { Form, Formik } from "formik";
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { Box } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { useMutation } from "urql";
import { useRegisterMutation } from "../generated/graphql";

interface registerProps { }

export const Register: React.FC<registerProps> = ({}) => {
    const [,register] = useRegisterMutation();
    return (
        <Wrapper variant="small">
            <Formik 
                initialValues={{ username: "", password: ""}}
                onSubmit={async (values) => {
                    const response = await register(values);
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField
                            name="username"
                            placeholder="username"
                            label="Username"
                        />
                        <Box mt={4}>
                            <InputField
                                name="password"
                                placeholder="password"
                                label="Password"
                                type="password"
                            />
                        </Box>
                        <Button 
                            mt={4}
                            type="submit" 
                            colorScheme="teal"
                            isLoading={isSubmitting}>
                            register
                        </Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
}

export default Register