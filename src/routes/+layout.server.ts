import type { PartialDocsConfig } from '@keenmate/svelte-docs';
import { mergeConfig, defaultConfig, generateSSRStyles } from '@keenmate/svelte-docs';

// Enable prerendering for all routes
export const prerender = true;
export const ssr = true;

const config: PartialDocsConfig = {
	site: {
		title: 'Web MultiSelect Showcase',
		description: 'Complete showcase and documentation for @keenmate/web-multiselect component library',
		keywords: ['multiselect', 'multi-select', 'select', 'dropdown', 'typeahead', 'autocomplete', 'web-component', 'showcase', 'keenmate'],
		author: 'KeenMate',
		url: 'https://web-multiselect.keenmate.com',
		language: 'en'
	},
	company: {
		name: 'KeenMate',
		website: 'https://keenmate.com?utm_source=web-multiselect-showcase',
		social: {
			github: 'https://github.com/keenmate/web-multiselect'
		}
	},
	navigation: {
		main: [
			{ label: 'Home', href: '/', icon: '🏠' },
			{ label: 'Getting Started', href: '/getting-started', icon: '🚀' },
			{
				label: 'Features',
				href: '/features/basic',
				icon: '✨',
				children: [
					{ label: 'Basic Usage', href: '/features/basic' },
					{ label: 'Data & API', href: '/features/data-api' },
					{ label: 'Events & Callbacks', href: '/features/events-callbacks' },
					{ label: 'Tree', href: '/features/tree' },
					{ label: 'Custom Rendering', href: '/features/custom-rendering' },
					{ label: 'Action Buttons', href: '/features/action-buttons' },
					{ label: 'Tooltips', href: '/features/tooltips' },
					{ label: 'Responsive & RTL', href: '/features/responsive' },
					{ label: 'External Search', href: '/features/external-search' },
					{ label: 'Virtual Scrolling', href: '/features/virtual-scrolling' },
					{ label: 'Positioning', href: '/features/positioning' },
					{ label: 'Theming', href: '/features/theming' },
					{ label: 'Logging', href: '/features/logging' }
				]
			},
			{
				label: 'API Reference',
				href: '/api/properties',
				icon: '📚',
				children: [
					{ label: 'Properties', href: '/api/properties' },
					{ label: 'Events', href: '/api/events' },
					{ label: 'Methods', href: '/api/methods' },
					{ label: 'Callbacks', href: '/api/callbacks' },
					{ label: 'CSS Variables', href: '/api/css-variables' },
					{ label: 'Security', href: '/api/security' },
					{ label: 'Migration v1 → v2', href: '/api/migration' }
				]
			}
		]
	},
	features: {
		search: true,
		breadcrumbs: true,
		tableOfContents: true,
		analyticsScripts: [
			'<script async src="https://stats.keenmate.services/js/pa-5gQ0SQKYTAhXs7T4v58Pl.js"></script>',
			`<script>window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()</script>`
		]
	}
};

export async function load() {
	const mergedConfig = mergeConfig(defaultConfig, config);
	const ssrStyles = generateSSRStyles(mergedConfig);

	return {
		config: mergedConfig,
		ssrStyles
	};
}
