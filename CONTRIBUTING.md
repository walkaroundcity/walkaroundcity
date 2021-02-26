## getting Started

### prerequisites

-   install yarn using `npm i -g yarn`
-   install vercel using `yarn global add vercel`
-   install [docker and docker-compose](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04)

### running the dev server

1. `yarn prepare`
2. `yarn dev`

### branching

because [hotfixing is not so hot](https://www.pega.com/insights/articles/why-hotfixes-arent-so-hot) we use the [github-flow](https://guides.github.com/introduction/flow/).

The `main` branch is our single source of truth. All merges to `main` are automatically production code. Quality assurance is to be done in Pull Requests, not on `main`.

Allowed branch prefixes are:

-   `feat/`
-   `fix/`
-   `chore/`

### commits

We're using commitlint to ensure [conventional commit messages](https://www.conventionalcommits.org/en/v1.0.0/).

## structure

`app` is where most of the magic happens.

it contains directories loosely grouping business models together into modules.

each of the module may contain directories that are leveraged for blitzjs' file based concepts:

-   `api` contains declared [serverless functions](https://vercel.com/docs/serverless-functions/introduction)
-   `mutations` contains [mutation resolvers](https://blitzjs.com/docs/mutation-resolvers)
-   `queries` contains [query resolvers](https://blitzjs.com/docs/query-resolvers)
-   `pages` contains [blitzjs page](https://blitzjs.com/docs/pages)
-   `pages` and `api` make use of the powerful [file-based routing](https://blitzjs.com/docs/routing) mechanism

other than that:

1. please stick to the convention to keep `components` that are relevant only to a certain business module inside an according dir.
2. don't redeclare hooks everywhere. instead put your `useQuery` and `useMutation` into according `hooks`

## translating

for now, translating are implemented using [next-intl](https://github.com/amannn/next-intl), just in a single json file in locales, but we should introduce scopes soon.

## database

we use the [prisma orm](https://www.prisma.io/) that is [well integrated](https://blitzjs.com/docs/database-overview) into blitz.

postgres is started alongside yarn dev using docker-compose.

you can browse the current data using the prisma studio: `yarn db:studio`

you can add a new entity and all the "boring" files using the `blitz generate` [scaffolding command](`https://blitzjs.com/docs/cli-generate`)

## components

-   whenever possible, make use of a component from [chakra-ui](https://chakra-ui.com/docs/getting-started)
-   don't directly use components from `@chakra-ui/react`, instead rewire them to a local component in `core/components`. This ensures consistency and allows for easier refactoring.

### stories

a file suffixed `stories.tsx` will be automatically picked up by storybook. a basic story looks like this:

```JSX
const config = {
    title: "Design System/ComponentYouWantToDisplay",
}

export default config

export const nameYouWantThisVariantToHaveInStorybook = (): React.ReactElement => (
    <ComponentYouWantToDisplay propYouWantToPass={"abcdef"} />
)
```

## tests

we use [jest](https://jestjs.io/docs/en/getting-started) for component and unit testing. jest is configured to pick up files suffixed `.test.ts` and `.test.tsx`.

test suffixed with `.tsx` automatically are run a a jsdom environment, while all `.ts` suffixed tests are provided with a virgin db schema each.

### components recipes

mock a hook:

```JSX
jest.mock("app/core/hooks/useCurrentUser")
const mockUseCurrentUser = useCurrentUser as jest.MockedFunction<typeof useCurrentUser>
...
mockUseCurrentUser.mockReturnValue({
        id: 1,
        name: "User",
        email: "user@email.com",
        role: "user",
        profile_picture:
            "https://pbs.twimg.com/profile_images/749669380955447296/IPzukly4_normal.jpg",
    })
```

use [react-testing-library](https://testing-library.com/docs/react-testing-library/example-intro) find in a rendered dom:

```JSX
    const { findByText } = render(<PageOrComponent />)
    const email = await findByText(/user@email.com/i)
    expect(email).toBeInTheDocument()
```
