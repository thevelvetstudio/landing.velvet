import { Head, usePage } from '@inertiajs/react';

type SeoData = {
    title: string;
    description: string;
    canonical: string;
    robots: string;
    name: string;
    locale: string;
    language: string;
    image: string;
    explicit: boolean;
    schema: Record<string, unknown> | null;
};

export default function Seo() {
    const { seo } = usePage<{ seo: SeoData }>().props;
    return <Head title={seo.title}>
        <meta head-key="description" name="description" content={seo.description} />
        <meta head-key="robots" name="robots" content={seo.robots} />
        <link head-key="canonical" rel="canonical" href={seo.canonical} />
        <meta head-key="language" name="language" content={seo.language} />
        <link head-key="alternate-es" rel="alternate" hrefLang={seo.language} href={seo.canonical} />
        <link head-key="alternate-default" rel="alternate" hrefLang="x-default" href={seo.canonical} />
        <meta head-key="og:type" property="og:type" content="website" />
        <meta head-key="og:site_name" property="og:site_name" content={seo.name} />
        <meta head-key="og:locale" property="og:locale" content={seo.locale} />
        <meta head-key="og:title" property="og:title" content={seo.title} />
        <meta head-key="og:description" property="og:description" content={seo.description} />
        <meta head-key="og:url" property="og:url" content={seo.canonical} />
        <meta head-key="og:image" property="og:image" content={seo.image} />
        <meta head-key="og:image:width" property="og:image:width" content="1200" />
        <meta head-key="og:image:height" property="og:image:height" content="630" />
        <meta head-key="og:image:alt" property="og:image:alt" content="The Velvet Studio — Un estudio webcam diferente" />
        <meta head-key="twitter:card" name="twitter:card" content="summary_large_image" />
        <meta head-key="twitter:title" name="twitter:title" content={seo.title} />
        <meta head-key="twitter:description" name="twitter:description" content={seo.description} />
        <meta head-key="twitter:image" name="twitter:image" content={seo.image} />
        {seo.explicit && <meta head-key="rating" name="rating" content="adult" />}
        {seo.schema && <script head-key="schema" type="application/ld+json">{JSON.stringify(seo.schema).replace(/</g, '\\u003c')}</script>}
    </Head>;
}
