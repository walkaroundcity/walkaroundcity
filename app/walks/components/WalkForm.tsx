import { InputField } from "app/core/components/Field"
import { Form, FormProps } from "app/core/components/Form"
import * as z from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function WalkForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
    return (
        <Form<S> {...props}>
            <InputField name="title" label="Title" placeholder="Title" />
        </Form>
    )
}
