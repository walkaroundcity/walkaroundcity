import { Link } from "app/core/components/Link"
import Layout from "app/core/layouts/Layout"
import { FORM_ERROR, WalkForm } from "app/walks/components/WalkForm"
import updateWalk from "app/walks/mutations/updateWalk"
import getWalk from "app/walks/queries/getWalk"
import { BlitzPage, Head, useMutation, useParam, useQuery, useRouter } from "blitz"
import React from "react"
import { Suspense } from "react"

export const EditWalk = () => {
    const router = useRouter()
    const shortname = useParam("walk", "string")
    const [walk, { setQueryData }] = useQuery(getWalk, { shortname })
    const [updateWalkMutation] = useMutation(updateWalk)

    return (
        <>
            <Head>
                <title>Edit Walk {walk.id}</title>
            </Head>

            <div>
                <h1>Edit Walk {walk.id}</h1>
                <pre>{JSON.stringify(walk)}</pre>

                {/* <WalkForm
                    submitText="Update Walk"
                    // TODO use a zod schema for form validation
                    //  - Tip: extract mutation's schema into a shared `validations.ts` file and
                    //         then import and use it here
                    // schema={UpdateWalk}
                    initialValues={walk}
                    onSubmit={async (values) => {
                        try {
                            const updated = await updateWalkMutation({
                                id: walk.id,
                                ...values,
                            })
                            await setQueryData(updated)
                            router.push(`/walks/${updated.id}`)
                        } catch (error) {
                            console.error(error)
                            return {
                                [FORM_ERROR]: error.toString(),
                            }
                        }
                    }}
                /> */}
            </div>
        </>
    )
}

const EditWalkPage: BlitzPage = () => {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <EditWalk />
            </Suspense>

            <p>
                <Link href="/walks">
                    <a>Walks</a>
                </Link>
            </p>
        </div>
    )
}

EditWalkPage.authenticate = true
EditWalkPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditWalkPage
