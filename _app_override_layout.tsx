import type { ReactElement, ReactNode } from 'react'
import { AppProps } from 'next/app';
import {CustomFooter} from "../components/custom-footer";
import {CustomHeader} from "../components/custom-header";
import type { NextPage } from 'next'

import 'styles/globals.css';
import 'styles/custom_layout.css';

export type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
    if (Component.getLayout) {
        return Component.getLayout(<Component {...pageProps} />);
    }

    return (
        <>
            <CustomHeader />
            <Component {...pageProps} />
            <CustomFooter />
        </>
    );
}
