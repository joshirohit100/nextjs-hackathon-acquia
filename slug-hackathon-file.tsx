import { Layout, LayoutProps } from 'components/layout';
import {GetStaticPathsResult, GetStaticPropsResult} from "next";
import {getMenus} from "../../lib/get-menus";
import {drupal} from "../../lib/drupal";
import { useRouter } from "next/router";

export default function HackaThon({ menus }: LayoutProps) {
    const router = useRouter();
    const hackathonName = router.query.hackathonType;
    return (
        <Layout title='${hackathonName}' menus={menus}>
            <div className="container px-6 pb-10 mx-auto">
                Hello Welcome to the { hackathonName} Hackathon
            </div>
        </Layout>
    );
}

export async function getStaticPaths(context): Promise<GetStaticPathsResult> {
    return {
        paths: [
            {
                params: {
                    hackathonType: 'drupal',
                }
            },
            {
                params: {
                    hackathonType: 'NextJS',
                }
            }
        ],
        fallback: false,
    }
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
