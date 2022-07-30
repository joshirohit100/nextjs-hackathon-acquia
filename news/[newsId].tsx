import {GetStaticPathsResult, GetStaticPropsResult} from 'next';
import { DrupalNode } from 'next-drupal';
import { drupal } from '../../lib/drupal';
import { NodeNewsFull } from "../../components/news-full";

import { getMenus } from 'lib/get-menus';
import { Layout, LayoutProps } from 'components/layout';
import {DrupalJsonApiParams} from "drupal-jsonapi-params";

interface NewsPageProps extends LayoutProps {
    news: DrupalNode;
}

export default function NewsPage({news, menus}: NewsPageProps) {
    return (
        <Layout title={news.title || news.name} menus={menus}>
            <NodeNewsFull node={news as DrupalNode} />
        </Layout>
    );
}

export async function getStaticPaths(context): Promise<GetStaticPathsResult> {
    // Build paths for all `node--news`.
    const allPaths = await drupal.getStaticPathsFromContext("node--news", context);
    const paths = allPaths.map(path => {
        return {
            params: {
                newsId: path['params']['slug'][1],
            }
        }
    })
    return {
        paths: paths,
        fallback: false,
    }
}

export async function getStaticProps(context): Promise<GetStaticPropsResult<NewsPageProps>> {
    console.log(context);
    const params = new DrupalJsonApiParams()
        .addFilter('status', '1')
        .addSort('created', 'DESC')
        .addInclude(['field_news_image.image'])
        .addFields('node--news', [
            'id',
            'title',
            'body',
            'path',
            'created',
            'field_news_image',
        ])
        .getQueryObject();
    const news = await drupal.getResourceByPath<DrupalNode>(`news/${context.params.newsId}`, {
        params: params,
    });

    console.log(news);
    return {
        props: {
            news: news,
            menus: await getMenus(),
        },
        revalidate: 60,
    };
}
