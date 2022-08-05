import { Layout, LayoutProps } from 'components/layout';
import {GetStaticPropsResult} from "next";
import {getMenus} from "../lib/get-menus";

export default function Hackathon({ menus }: LayoutProps) {
    return (
        <Layout title="Articles" menus={menus}>
            <div className="container px-6 pb-10 mx-auto">
                Hello Welcome to the Hackathon
            </div>
        </Layout>
    );
}

export async function getStaticProps(
    context,
): Promise<GetStaticPropsResult<LayoutProps>> {
    return {
        props: {
            menus: await getMenus(),
        },
    };
}
