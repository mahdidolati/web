import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { FieldHookConfig, useField } from "formik";
import React from "react"

type InputFieldProps = FieldHookConfig<any> & {
    label: string;
    name: string;
};

export const InputField: React.FC<InputFieldProps> = ({
    label, 
    ...props
}) => {
    const [field, { error }] = useField(props);
    return (
        <FormControl isInvalid={!!error}>
            <FormLabel htmlFor={field.name}>{label}</FormLabel>
            <Input 
                {...field} 
                type={props.type}
                id={field.name} 
                placeholder={props.placeholder} 
            />
            { error? <FormErrorMessage>{error}</FormErrorMessage> : null }
        </FormControl>
    );
}