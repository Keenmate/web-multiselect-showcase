<script lang="ts">
	import { DocLayout, CodeBlock } from '@keenmate/svelte-docs';
	import { PropTable, cssVarGroups } from '$lib/demo';

	const example = `/* Set variables on the element itself (Shadow DOM). */
web-multiselect {
  --ms-rem: 12px;                    /* scale everything up */
  --ms-input-border-color: #6366f1;
  --ms-option-bg-selected: #eef2ff;
}`;
</script>

<DocLayout
	titleText="CSS Variables"
	descriptionText="Theme with --ms-* custom properties. All theming flows from these — no preprocessor required.">
	<div class="py-3">
		<div class="alert alert-info">
			Variables must be set on the <code>&lt;web-multiselect&gt;</code> element itself (not a wrapper),
			because the component uses Shadow DOM. See the <a href="/features/theming">Theming</a> page for
			live examples.
		</div>

		<CodeBlock codeContent={example} languageType="css" titleText="Theming" />

		{#each cssVarGroups as group (group.title)}
			<section class="mb-4 mt-4">
				<h2 class="h5">{group.title}</h2>
				{#if group.blurb}<p class="text-muted small">{@html group.blurb}</p>{/if}
				<PropTable rows={group.rows} nameHeader="Variable" />
			</section>
		{/each}
	</div>
</DocLayout>
