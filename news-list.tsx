import { GetStaticPropsResult } from 'next';
import { DrupalNode } from 'next-drupal';
import { DrupalJsonApiParams } from 'drupal-jsonapi-params';

import { getMenus } from 'lib/get-menus';
import { Layout, LayoutProps } from 'components/layout';
import { PageHeader } from 'components/page-header';
import { NodeNewsTeaser } from 'components/news--teaser';
import { drupal } from '../lib/drupal';

interface NewsListPageProps extends LayoutProps {
    newsList: DrupalNode[];
}

export default function NewsListPage({ menus, newsList }: NewsListPageProps) {
    return (
        <Layout title="News List" menus={menus}>
            <PageHeader heading="News List" text="List of latest news." />
            <div className="container px-6 pb-10 mx-auto">
                {newsList?.length ? (
                    <div className="grid gap-14 md:grid-cols-2">
                        {newsList.map((news) => (
                            <NodeNewsTeaser key={news.id} node={news} />
                        ))}
                    </div>
                ) : (
                    <p>No content found.</p>
                )}
            </div>
        </Layout>
    );
}

export async function getStaticProps(
    context,
): Promise<GetStaticPropsResult<NewsListPageProps>> {
    const newsList = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
        'node--news',
        context,
        {
            params: new DrupalJsonApiParams()
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
                .getQueryObject(),
        },
    );

    return {
        props: {
            newsList,
            menus: await getMenus(),
        },
        revalidate: 60,
    };
}
