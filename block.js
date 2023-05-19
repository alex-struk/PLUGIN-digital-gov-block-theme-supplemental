const { registerBlockType } = wp.blocks;
const { createElement } = wp.element;

registerBlockType('my-plugin/vuejs-wordpress-block', {
    title: 'Vue.js App',
    icon: 'format-image',
    category: 'common',
    edit: () => createElement('div', { id: 'app' }, 'Loading Vue.js app...'),
    save: () => createElement('div', { id: 'app' }, 'Loading Vue.js app...'),
});