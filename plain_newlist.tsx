import { DrupalJsonApiParams } from 'drupal-jsonapi-params';

import { drupal } from '../lib/drupal';

export default function NewsListPage({ newsList }) {
    return (
        <div className="container px-6 pb-10 mx-auto">
            {newsList?.length ? (
                <div className="grid gap-14 md:grid-cols-2">
                    {newsList.map((news) => (
                        <div>{news.title}</div>
                    ))}
                </div>
            ) : (
                <p>No content found.</p>
            )}
        </div>
    );
}

export async function getStaticProps(context) {
    const newsList = await drupal.getResourceCollectionFromContext(
        'node--news',
        context,
        {
            params: new DrupalJsonApiParams()
                .addFilter('status', '1')
                .addSort('created', 'DESC')
                .addFields('node--news', [
                    'title',
                ])
                .getQueryObject(),
        },
    );

    return {
        props: {
            newsList,
        },
    };
}
