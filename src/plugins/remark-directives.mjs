import { visit } from 'unist-util-visit';

export function remarkDirectives() {
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
