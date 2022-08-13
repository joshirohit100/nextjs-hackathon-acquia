export async function getServerSideProps(
    context,
): Promise<GetServerSidePropsResult<NewsListPageProps>> {
    console.log("server side executed");
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
    };
}
      
      
      // import { GetServerSidePropsResult } from 'next';
