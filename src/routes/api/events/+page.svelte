<script lang="ts">
	import { DocLayout, CodeBlock } from '@keenmate/svelte-docs';
	import { PropTable, events } from '$lib/demo';

	const detailShape = `interface MultiSelectEventDetail<T> {
  selectedOptions: T[];
  selectedValues: (string | number)[];
  option?: T;     // select / deselect / add
  value?: string; // add only — the typed text
}`;

	const listenExample = `const el = document.querySelector('web-multiselect');

el.addEventListener('change', (e) => {
  console.log(e.detail.selectedValues);
});

el.addEventListener('add', (e) => {
  console.log('created', e.detail.value, e.detail.option);
});`;
</script>

<DocLayout
	titleText="Events"
	descriptionText="Custom events dispatched on the element. All bubble and are composed.">
	<div class="py-3">
		<PropTable rows={events} nameHeader="Event" showDefault={false} />

		<div class="alert alert-warning mt-3">
			<strong>Breaking change in v2.0.0:</strong> the <code>onSelect</code>/<code>onDeselect</code>/<code>onChange</code>
			handler <em>properties</em> now receive a <code>CustomEvent</code> (not a bare option). Read
			<code>e.detail</code>. The <code>addEventListener</code> path is unchanged. See
			<a href="/api/migration">Migration</a>.
		</div>

		<h2 class="h5 mt-4">Event detail</h2>
		<CodeBlock codeContent={detailShape} languageType="typescript" titleText="MultiSelectEventDetail" />

		<h2 class="h5 mt-4">Listening</h2>
		<CodeBlock codeContent={listenExample} languageType="javascript" titleText="addEventListener" />
	</div>
</DocLayout>
