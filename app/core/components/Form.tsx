import React, { PropsWithoutRef, ReactNode } from "react"
import { Form as FinalForm, FormProps as FinalFormProps } from "react-final-form"
import * as z from "zod"

import { Alert } from "./Alert"
import { Button } from "./Button"
import { IconAlert } from "./Icons"
import { Stack } from "./Orientation"
export { FORM_ERROR } from "final-form"

export type FormProps<S extends z.ZodType<any, any>> = {
    /** All your form fields */
    children: ReactNode
    /** Text to display in the submit button */
    submitText?: string
    schema?: S
    onSubmit: FinalFormProps<z.infer<S>>["onSubmit"]
    initialValues?: FinalFormProps<z.infer<S>>["initialValues"]
} & Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit">

export function Form<S extends z.ZodType<any, any>>({
    children,
    submitText,
    schema,
    initialValues,
    onSubmit,
    ...props
}: FormProps<S>) {
    return (
        <FinalForm
            initialValues={initialValues}
            validate={(values) => {
                if (!schema) return
                try {
                    schema.parse(values)
                } catch (error) {
                    return error.formErrors.fieldErrors
                }
            }}
            onSubmit={onSubmit}
            render={({ handleSubmit, submitting, submitError }) => (
                <form onSubmit={handleSubmit} className="form" {...props}>
                    <Stack spacing={4}>
                        {children}

                        {submitError && (
                            <Alert status="error">
                                <IconAlert />
                                {submitError}
                            </Alert>
                        )}

                        {submitText && (
                            <Button
                                fontFamily={"heading"}
                                mt={8}
                                w={"full"}
                                bgGradient="linear(to-r, red.400,pink.400)"
                                color={"white"}
                                type="submit"
                                disabled={submitting}
                                _hover={{
                                    bgGradient: "linear(to-r, red.400,pink.400)",
                                    boxShadow: "xl",
                                }}
                            >
                                {submitText}
                            </Button>
                        )}
                    </Stack>
                </form>
            )}
        />
    )
}

export default Form
