import { Link } from "app/core/components/Link"
import Layout from "app/core/layouts/Layout"
import deleteWalk from "app/walks/mutations/deleteWalk"
import getWalk from "app/walks/queries/getWalk"
import { BlitzPage, Head, useMutation, useParam, useQuery, useRouter } from "blitz"
import React, { Suspense } from "react"

export const Walk = () => {
    const router = useRouter()
    const shortname = useParam("walk", "string")
    const [deleteWalkMutation] = useMutation(deleteWalk)
    const [walk] = useQuery(getWalk, { shortname })

    return (
        <>
            <Head>
                <title>Walk {walk.id}</title>
            </Head>

            <div>
                <h1>Walk {walk.id}</h1>
                <pre>{JSON.stringify(walk, null, 2)}</pre>

                <Link href={`/walks/${walk.id}/edit`}>
                    <a>Edit</a>
                </Link>

                <button
                    type="button"
                    onClick={async () => {
                        if (window.confirm("This will be deleted")) {
                            await deleteWalkMutation({ id: walk.id })
                            router.push("/walks")
                        }
                    }}
                    style={{ marginLeft: "0.5rem" }}
                >
                    Delete
                </button>
            </div>
        </>
    )
}

const ShowWalkPage: BlitzPage = () => {
    return (
        <div>
            <p>
                <Link href="/walks">
                    <a>Walks</a>
                </Link>
            </p>

            <Suspense fallback={<div>Loading...</div>}>
                <Walk />
            </Suspense>
        </div>
    )
}

ShowWalkPage.authenticate = true
ShowWalkPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowWalkPage
