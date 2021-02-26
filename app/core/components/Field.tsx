/* eslint-disable no-restricted-imports */
import {
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input,
    InputProps,
} from "@chakra-ui/react"
import React from "react"
import { useField } from "react-final-form"

type FieldProps = {
    helperText?: string
    label?: string
}

export const Field: React.FC<
    FieldProps & {
        field: typeof Input
        fieldProps: InputProps & {
            name: string
        }
    }
> = (props) => {
    const {
        input,
        meta: { touched, error, submitError, submitting },
    } = useField(props.fieldProps.name)

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

    return (
        <FormControl isInvalid={!!error}>
            {props.label && <FormLabel htmlFor={props.fieldProps.name}>{props.label}</FormLabel>}
            <props.field {...input} {...props.fieldProps} disabled={submitting} />
            {props.helperText && <FormHelperText>{props.helperText}</FormHelperText>}
            {touched && normalizedError && <FormErrorMessage>{normalizedError}</FormErrorMessage>}
        </FormControl>
    )
}

type FieldType = FieldProps & { name: string }

export const DefaultInput = (props) => (
    <Input
        bg={"gray.100"}
        border={0}
        color={"gray.500"}
        _placeholder={{
            color: "gray.500",
        }}
        {...props}
    />
)

export const InputField: React.FC<InputProps & FieldType> = (props) => {
    return (
        <Field
            fieldProps={props}
            field={DefaultInput}
            label={props.label}
            helperText={props.helperText}
        />
    )
}
