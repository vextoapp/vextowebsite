export function setPageMetadata(data: {
  title: string;
  description: string;
  url: string;
  image?: string;
  type?: string;
}) {
  document.title = `${data.title} | Vexto`;

  const metaTags = [
    { name: 'description', content: data.description },
    { property: 'og:title', content: data.title },
    { property: 'og:description', content: data.description },
    { property: 'og:url', content: data.url },
    { property: 'og:type', content: data.type || 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: data.title },
    { name: 'twitter:description', content: data.description },
  ];

  if (data.image) {
    metaTags.push(
      { property: 'og:image', content: data.image },
      { name: 'twitter:image', content: data.image }
    );
  }

  metaTags.forEach(({ name, property, content }) => {
    const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
    let element = document.querySelector(selector);

    if (!element) {
      element = document.createElement('meta');
      if (name) element.setAttribute('name', name);
      if (property) element.setAttribute('property', property);
      document.head.appendChild(element);
    }

    element.setAttribute('content', content);
  });
}

export function addFAQStructuredData(faqs: Array<{ question: string; answer: string }>) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  let script = document.querySelector('script[type="application/ld+json"][data-schema="faq"]');
  if (!script) {
    script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.setAttribute('data-schema', 'faq');
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(schema);
}

export function addBlogPostStructuredData(post: {
  title: string;
  excerpt: string;
  author: string;
  published_at: string;
  updated_at: string;
  url: string;
  image?: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Person',
      name: post.author
    },
    datePublished: post.published_at,
    dateModified: post.updated_at,
    url: post.url,
    publisher: {
      '@type': 'Organization',
      name: 'Vexto',
      logo: {
        '@type': 'ImageObject',
        url: 'https://vexto.app/vexto-logo.svg'
      }
    }
  };

  if (post.image) {
    Object.assign(schema, {
      image: post.image
    });
  }

  let script = document.querySelector('script[type="application/ld+json"][data-schema="blog"]');
  if (!script) {
    script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.setAttribute('data-schema', 'blog');
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(schema);
}

export function removeFAQStructuredData() {
  const script = document.querySelector('script[type="application/ld+json"][data-schema="faq"]');
  if (script) {
    script.remove();
  }
}

export function removeBlogStructuredData() {
  const script = document.querySelector('script[type="application/ld+json"][data-schema="blog"]');
  if (script) {
    script.remove();
  }
}
