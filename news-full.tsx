import { formatDate } from 'lib/format-date';
import { MediaImage } from 'components/media--image';
import { FormattedText } from 'components/formatted-text';

export function NodeNewsFull({ node, ...props }) {
    return (
        <article className="max-w-2xl px-6 py-10 mx-auto" {...props}>
            <h1 className="mb-4 text-3xl font-black leading-tight md:text-4xl">
                {node.title}
            </h1>
            <p className="mb-4 text-gray-600">
                {node.field_display_author?.title ? (
                    <span>
            Posted by{' '}
                        <span className="font-semibold">
              {node.field_display_author?.title}
            </span>
          </span>
                ) : null}
                {node.created && <span> on {formatDate(node.created)}</span>}
            </p>
            {node.field_news_image && (
                <div className="my-6 overflow-hidden rounded-md">
                    <MediaImage
                        media={node.field_news_image}
                        priority
                        sizes="(min-width: 768px) 625px, 100vw"
                    />
                </div>
            )}
            {node.body?.processed && (
                <div className="prose">
                    <FormattedText processed={node.body.processed} />
                </div>
            )}
        </article>
    );
}
