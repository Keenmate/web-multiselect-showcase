<script lang="ts">
	import { DocLayout } from '@keenmate/svelte-docs';
	import { DemoPlayground, technologies } from '$lib/demo';
	import type { ControlDef } from '$lib/demo';

	const baseAttrs = {
		'value-member': 'value',
		'display-value-member': 'label',
		'icon-member': 'icon',
		'subtitle-member': 'subtitle',
		'search-placeholder': 'Search technologies…'
	};

	const setup = (el: any) => {
		el.options = technologies;
	};

	const controls: ControlDef[] = [
		{ key: 'multiple', label: 'Multiple selection', type: 'toggle', default: true },
		{ key: 'showCheckboxes', label: 'Show checkboxes', type: 'toggle', default: true },
		{ key: 'enableSearch', label: 'Enable search', type: 'toggle', default: true },
		{ key: 'showClear', label: 'Inline clear button (v2)', type: 'toggle', default: false },
		{ key: 'showCounter', label: 'Show counter', type: 'toggle', default: false },
		{ key: 'closeOnSelect', label: 'Close on select', type: 'toggle', default: false },
		{
			key: 'badgesDisplayMode',
			label: 'Badges display mode',
			type: 'select',
			default: 'badges',
			options: [
				{ value: 'badges', label: 'badges' },
				{ value: 'count', label: 'count' },
				{ value: 'compact', label: 'compact' },
				{ value: 'partial', label: 'partial' },
				{ value: 'none', label: 'none' }
			]
		},
		{
			key: 'searchMode',
			label: 'Search mode',
			type: 'select',
			default: 'filter',
			options: [
				{ value: 'filter', label: 'filter' },
				{ value: 'navigate', label: 'navigate' }
			],
			hint: 'Navigate keeps all rows visible and jumps between matches (Ctrl+↑/↓).'
		}
	];
</script>

<DocLayout titleText="Basic Usage" descriptionText="The essentials — options, search, selection modes, and the v2.0.0 field controls.">
	<div class="py-3">
		<p class="lead">
			Toggle the switches to shape the control. The <strong>Quick usage</strong> snippet updates live
			so you can copy exactly what you configured.
		</p>

		<DemoPlayground
			titleText="Interactive multiselect"
			subtitleText="Selection mode, search, badges and the new inline clear button in one place."
			{baseAttrs}
			{controls}
			{setup}
			idText="playground"
		>
			{#snippet description()}
				<ul class="mb-0">
					<li><code>value-member</code> / <code>display-value-member</code> map your data onto the control.</li>
					<li><code>show-clear</code> and the inline counter are new field-shell controls in v2.0.0.</li>
					<li>Switching <code>badges-display-mode</code> to <code>count</code>/<code>compact</code> keeps the field compact for large selections.</li>
				</ul>
			{/snippet}
		</DemoPlayground>

		<hr class="my-4" />

		<DemoPlayground
			titleText="Single-select mode"
			subtitleText="Set multiple=false for a classic single-choice picker."
			baseAttrs={{
				'value-member': 'value',
				'display-value-member': 'label',
				'icon-member': 'icon',
				multiple: 'false',
				'close-on-select': 'true',
				'search-placeholder': 'Pick one…'
			}}
			setup={(el) => (el.options = technologies)}
			controls={[
				{ key: 'showCheckboxes', label: 'Show checkboxes', type: 'toggle', default: true },
				{ key: 'enableSearch', label: 'Enable search', type: 'toggle', default: true }
			]}
			demoNote="Selecting an option replaces the previous choice and closes the dropdown."
			idText="single-select"
		/>
	</div>
</DocLayout>
