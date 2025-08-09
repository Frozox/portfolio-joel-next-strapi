import { Thing, WithContext } from 'schema-dts';

interface JsonLdLoaderProps {
  jsonLd: WithContext<Thing>;
}

const JsonLdLoader = ({ jsonLd }: JsonLdLoaderProps) => {
  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
      }}
    />
  );
};

export default JsonLdLoader;
