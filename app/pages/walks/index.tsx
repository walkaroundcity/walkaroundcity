import { Link } from "app/core/components/Link"
import Layout from "app/core/layouts/Layout"
import getWalks from "app/walks/queries/getWalks"
import { BlitzPage, Head, usePaginatedQuery, useRouter } from "blitz"
import React, { Suspense } from "react"

const ITEMS_PER_PAGE = 100

export const WalksList = () => {
    const router = useRouter()
    const page = Number(router.query.page) || 0
    const [{ walks, hasMore }] = usePaginatedQuery(getWalks, {
        orderBy: { id: "asc" },
        skip: ITEMS_PER_PAGE * page,
        take: ITEMS_PER_PAGE,
    })

    const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
    const goToNextPage = () => router.push({ query: { page: page + 1 } })

    return (
        <div>
            <ul>
                {walks.map((walk) => (
                    <li key={walk.shortname}>
                        <Link href={`/walks/${walk.shortname}`}>
                            <a>{walk.title}</a>
                        </Link>
                    </li>
                ))}
            </ul>

            <button disabled={page === 0} onClick={goToPreviousPage}>
                Previous
            </button>
            <button disabled={!hasMore} onClick={goToNextPage}>
                Next
            </button>
        </div>
    )
}

const WalksPage: BlitzPage = () => {
    return (
        <>
            <Head>
                <title>Walks</title>
            </Head>

            <div>
                <p>
                    <Link href="/walks/new">
                        <a>Create Walk</a>
                    </Link>
                </p>

                <Suspense fallback={<div>Loading...</div>}>
                    <WalksList />
                </Suspense>
            </div>
        </>
    )
}

WalksPage.authenticate = true
WalksPage.getLayout = (page) => <Layout>{page}</Layout>

export default WalksPage
