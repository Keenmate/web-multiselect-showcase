<script lang="ts">
	import { DocLayout, CodeBlock } from '@keenmate/svelte-docs';
	import { PropTable, callbackGroups } from '$lib/demo';

	const example = `const el = document.querySelector('web-multiselect');

// Data extraction (computed value / label)
el.getDisplayValueCallback = (u) => \`\${u.first} \${u.last}\`;

// Rich rendering (may emit raw HTML — see Security)
el.renderOptionContentCallback = (u, ctx) =>
  ctx.isFullscreen
    ? \`<strong>\${u.first}</strong>\`
    : \`<strong>\${u.first}</strong> · <small>\${u.role}</small>\`;

// Veto a selection
el.beforeSelectCallback = (opt, selected) =>
  selected.length >= 3 ? 'Pick at most 3' : true;`;
</script>

<DocLayout
	titleText="Callbacks"
	descriptionText="Property-only functions for data extraction, rendering, search, selection hooks and add-new creation.">
	<div class="py-3">
		<div class="alert alert-info">
			Callbacks are assigned as JS properties (they can't be HTML attributes). The
			<em>rendering</em> callbacks may return raw HTML — read <a href="/api/security">Security</a>.
		</div>

		{#each callbackGroups as group (group.title)}
			<section class="mb-4">
				<h2 class="h5">{group.title}</h2>
				{#if group.blurb}<p class="text-muted small">{@html group.blurb}</p>{/if}
				<PropTable rows={group.rows} nameHeader="Callback" showDefault={false} />
			</section>
		{/each}

		<h2 class="h5 mt-4">Example</h2>
		<CodeBlock codeContent={example} languageType="javascript" titleText="Assigning callbacks" />
	</div>
</DocLayout>
