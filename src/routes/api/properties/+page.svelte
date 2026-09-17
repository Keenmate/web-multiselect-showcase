<script lang="ts">
	import { DocLayout } from '@keenmate/svelte-docs';
	import { PropTable, attributeGroups } from '$lib/demo';
</script>

<DocLayout
	titleText="Properties & Attributes"
	descriptionText="Every observed HTML attribute. Each maps to a camelCase JS property of the same name.">
	<div class="py-3">
		<div class="alert alert-info">
			Attributes accept string values (booleans as <code>"true"</code>/<code>"false"</code>). Object,
			array and callback values (options, <code>actionButtons</code>, <code>render*</code>) are set as
			JS properties on the element — see <a href="/api/callbacks">Callbacks</a> and
			<a href="/api/methods">Methods</a>.
		</div>

		{#each attributeGroups as group (group.title)}
			<section class="mb-4">
				<h2 class="h5">{group.title}</h2>
				{#if group.blurb}<p class="text-muted small">{@html group.blurb}</p>{/if}
				<PropTable rows={group.rows} nameHeader="Attribute" />
			</section>
		{/each}
	</div>
</DocLayout>
