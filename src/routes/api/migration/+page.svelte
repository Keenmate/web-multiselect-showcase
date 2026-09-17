<script lang="ts">
	import { DocLayout, CodeBlock } from '@keenmate/svelte-docs';
	import { breakingChanges } from '$lib/demo';

	const before = `// v1.x — handler received the bare option
el.onSelect = (option) => {
  console.log(option.value);
};`;

	const after = `// v2.0.0 — handler receives a CustomEvent
el.onSelect = (e) => {
  console.log(e.detail.option.value);
  console.log(e.detail.selectedValues);
};

// addEventListener is unchanged:
el.addEventListener('select', (e) => console.log(e.detail.option));`;
</script>

<DocLayout
	titleText="Migration v1 → v2"
	descriptionText="What changed between 1.x and 2.0.0, and how to update your code.">
	<div class="py-3">
		<div class="alert alert-warning">
			v2.0.0 is mostly additive (tree mode, add-new creation, scroll-to & search APIs, container-responsive
			collapse, base-icon theming). The items below are the changes that can require edits.
		</div>

		<h2 class="h5">Event handler signature</h2>
		<div class="row g-3">
			<div class="col-md-6"><CodeBlock codeContent={before} languageType="javascript" titleText="Before (v1.x)" /></div>
			<div class="col-md-6"><CodeBlock codeContent={after} languageType="javascript" titleText="After (v2.0.0)" /></div>
		</div>

		<h2 class="h5 mt-4">All breaking changes</h2>
		{#each breakingChanges as item, i (item.title)}
			<details class="card mb-2" open={i === 0}>
				<summary class="card-header fw-semibold">{item.title}</summary>
				<div class="card-body">{@html item.body}</div>
			</details>
		{/each}
	</div>
</DocLayout>
