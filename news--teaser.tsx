import Link from 'next/link';

import { MediaImage } from 'components/media--image';

export function NodeNewsTeaser({ node, ...props }) {
    return (
        <article className="flex flex-col space-y-4" {...props}>
            {node.field_news_image && (
                <Link href={node.path.alias} passHref>
                    <a className="block overflow-hidden no-underline rounded-md">
                        <MediaImage
                            media={node.field_news_image}
                            priority
                            sizes="(min-width: 968px) 420px, (min-width: 768px) 50vw, 100vw"
                        />
                    </a>
                </Link>
            )}
            <div>
                <Link href={node.path.alias} passHref>
                    <a className="no-underline hover:text-blue-600">
                        <h2 className="mb-4 text-xl font-bold">{node.title}</h2>
                    </a>
                </Link>
                {node.body?.summary && (
                    <p className="text-gray-500" data-cy="summary">
                        {node.body.summary}
                    </p>
                )}
            </div>
        </article>
    );
}
