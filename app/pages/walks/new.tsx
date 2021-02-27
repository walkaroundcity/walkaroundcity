import { Link } from "app/core/components/Link"
import Layout from "app/core/layouts/Layout"
import { FORM_ERROR, WalkForm } from "app/walks/components/WalkForm"
import createWalk from "app/walks/mutations/createWalk"
import { BlitzPage, useMutation, useRouter } from "blitz"
import React from "react"

const NewWalkPage: BlitzPage = () => {
    const router = useRouter()
    const [createWalkMutation] = useMutation(createWalk)

    return (
        <div>
            <h1>Create New Walk</h1>

            {/* <WalkForm
        submitText="Create Walk"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateWalk}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const walk = await createWalkMutation(values)
            router.push(`/walks/${walk.id}`)
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      /> */}

            <p>
                <Link href="/walks">
                    <a>Walks</a>
                </Link>
            </p>
        </div>
    )
}

NewWalkPage.authenticate = true
NewWalkPage.getLayout = (page) => <Layout title={"Create New Walk"}>{page}</Layout>

export default NewWalkPage
