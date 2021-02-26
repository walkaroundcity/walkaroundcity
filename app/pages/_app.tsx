import { ChakraProvider } from "@chakra-ui/react"
import LoginForm from "app/auth/components/LoginForm"
import {
    AppProps,
    AuthenticationError,
    AuthorizationError,
    ErrorComponent,
    ErrorFallbackProps,
    useRouter,
} from "blitz"
import { IntlErrorCode, NextIntlProvider } from "next-intl"
import React, { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { queryCache } from "react-query"

function onError(error) {
    if (error.code === IntlErrorCode.MISSING_MESSAGE) {
        // Missing translations are expected should only log an error
        console.error(error)
    }
}
function getMessageFallback({ namespace, key, error }) {
    const path = [namespace, key].filter((part) => part != null).join(".")

    if (error.code === IntlErrorCode.MISSING_MESSAGE) {
        return `${path} is not yet translated`
    } else {
        return `Dear developer, please fix this message: ${path}`
    }
}

export default function App({ Component, pageProps }: AppProps) {
    const getLayout = Component.getLayout || ((page) => page)
    const router = useRouter()

    return (
        <ErrorBoundary
            FallbackComponent={RootErrorFallback}
            resetKeys={[router.asPath]}
            onReset={() => {
                // This ensures the Blitz useQuery hooks will automatically refetch
                // data any time you reset the error boundary
                queryCache.resetErrorBoundaries()
            }}
        >
            <ChakraProvider>
                <Suspense fallback={<div>Loading... </div>}>
                    <NextIntlProvider
                        messages={pageProps.messages}
                        onError={onError}
                        getMessageFallback={getMessageFallback}
                    >
                        {getLayout(<Component {...pageProps} />)}
                    </NextIntlProvider>
                </Suspense>
            </ChakraProvider>
        </ErrorBoundary>
    )
}

function RootErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
    if (error instanceof AuthenticationError) {
        return <LoginForm onSuccess={resetErrorBoundary} />
    } else if (error instanceof AuthorizationError) {
        return (
            <ErrorComponent
                statusCode={error.statusCode}
                title="Sorry, you are not authorized to access this"
            />
        )
    } else {
        return (
            <ErrorComponent
                statusCode={error.statusCode || 400}
                title={error.message || error.name}
            />
        )
    }
}
