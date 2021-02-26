import { LoginInput } from "app/auth/validations"
import { InputField } from "app/core/components/Field"
import { Form, FORM_ERROR } from "app/core/components/Form"
import { useTranslations } from "next-intl"
import React from "react"

type LoginFormProps = {
    onSuccess?: () => void
}

export const LoginForm = (props: LoginFormProps) => {
    const t = useTranslations()

    return (
        <Form
            submitText={t("buttons.login") as string}
            schema={LoginInput}
            initialValues={{ email: "" }}
            onSubmit={async ({ email }) => {
                try {
                    await fetch("/api/auth/magiclogin/send", {
                        method: "POST",
                        body: JSON.stringify({ destination: email }),
                        headers: { "Content-Type": "application/json" },
                    })
                    props.onSuccess?.()
                } catch (error) {
                    return {
                        [FORM_ERROR]: t("errors.unexpected"),
                    }
                }
            }}
        >
            <InputField name="email" placeholder={t("fieldLabels.email") as string} type="email" />
        </Form>
    )
}

export default LoginForm
