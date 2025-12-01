import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkDirective from 'remark-directive';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';

function remarkDirectives() {
    return (tree) => {
        visit(tree, (node) => {
            if (
                node.type === 'textDirective' ||
                node.type === 'leafDirective' ||
                node.type === 'containerDirective'
            ) {
                const data = node.data || (node.data = {});
                const attributes = node.attributes || {};
                const name = node.name;

                if (
                    name === 'product-box' ||
                    name === 'price' ||
                    name === 'rating' ||
                    name === 'reviews' ||
                    name === 'buy-link' ||
                    name === 'features'
                ) {
                    data.hName = 'div';
                    data.hProperties = {
                        class: `product-${name} ${attributes.class || ''}`,
                        ...attributes,
                    };
                }
            }
        });
    };
}

const markdown4Colons = `
::::product-box
:::price
₹575
:::
:::rating
3.7 ⭐
:::
:::reviews
135 ratings
:::
:::buy-link
[Amazon pe kharido](https://amzn.to/4rrYg3z)
:::
::::
`;

const markdownIndented = `
:::product-box
  :::price
  ₹575
  :::
  :::rating
  3.7 ⭐
  :::
  :::reviews
  135 ratings
  :::
  :::buy-link
  [Amazon pe kharido](https://amzn.to/4rrYg3z)
  :::
:::
`;

async function main() {
    console.log("--- 4 Colons ---");
    const file1 = await unified()
        .use(remarkParse)
        .use(remarkDirective)
        .use(remarkDirectives)
        .use(remarkRehype)
        .use(rehypeStringify)
        .process(markdown4Colons);
    console.log(String(file1));

    console.log("\n--- Indented ---");
    const file2 = await unified()
        .use(remarkParse)
        .use(remarkDirective)
        .use(remarkDirectives)
        .use(remarkRehype)
        .use(rehypeStringify)
        .process(markdownIndented);
    console.log(String(file2));
}

main();
