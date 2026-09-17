<script lang="ts">
	import { DocLayout, CodeBlock } from '@keenmate/svelte-docs';
	import { PropTable, methodGroups } from '$lib/demo';

	const example = `const el = document.querySelector('web-multiselect');

el.options = myData;
el.setSelected(['js', 'ts']);

el.open();
el.search('type');           // filter as if typed
el.scrollToValue('ts');      // jump to a row
el.showMessage('Saved!', { variant: 'success', duration: 2000 });`;
</script>

<DocLayout
	titleText="Methods & JS API"
	descriptionText="Imperative API on the element instance. Open/close, search-text control and scroll-to are new in v2.0.0.">
	<div class="py-3">
		{#each methodGroups as group (group.title)}
			<section class="mb-4">
				<h2 class="h5">{group.title}</h2>
				{#if group.blurb}<p class="text-muted small">{@html group.blurb}</p>{/if}
				<PropTable rows={group.rows} nameHeader="Method" showDefault={false} />
			</section>
		{/each}

		<h2 class="h5 mt-4">Example</h2>
		<CodeBlock codeContent={example} languageType="javascript" titleText="Imperative usage" />
	</div>
</DocLayout>
