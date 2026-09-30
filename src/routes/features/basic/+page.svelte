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

	// --- Demo 3: grouped list — select-all per group + counts (v2.2.0) --------
	const groupBaseAttrs = {
		'value-member': 'value',
		'display-value-member': 'label',
		'icon-member': 'icon',
		'group-member': 'group',
		'search-placeholder': 'Search technologies…'
	};

	const groupSetup = (el: any) => {
		el.options = technologies;
		// One formatter for the in-input counter AND each group header count.
		el.getCountLabelCallback = (selected: number, total: number) => `${selected}/${total}`;
	};

	const groupTrailer = `el.options = technologies; // each item has a \`group\`
// One formatter drives BOTH the in-input counter and each group header count.
el.getCountLabelCallback = (selected, total) => \`\${selected}/\${total}\`;`;

	const groupControls: ControlDef[] = [
		{
			key: 'groupSelectMode',
			label: 'Group select mode',
			type: 'select',
			attr: 'group-select-mode',
			default: 'none',
			options: [
				{ value: 'none', label: 'none — headers inert' },
				{ value: 'cascade', label: 'cascade — tristate select-all per group' }
			]
		},
		{
			key: 'selectedOrder',
			label: 'Selected order',
			type: 'select',
			attr: 'selected-order',
			default: 'as-selected',
			options: [
				{ value: 'as-selected', label: 'as-selected (default)' },
				{ value: 'label-asc', label: 'label-asc' },
				{ value: 'label-desc', label: 'label-desc' }
			],
			hint: 'Reorders badges/popover only — form value keeps insertion order.'
		},
		{ key: 'showCounter', label: 'Show in-input counter', type: 'toggle', default: true }
	];
</script>

<DocLayout titleText="Basic Usage" descriptionText="The essentials — options, search, selection modes, and the v2.0.0 field controls.">
	<div class="py-3">
		<p class="lead">
			Toggle the switches to shape the control. The <strong>Quick usage</strong> snippet updates live
			so you can copy exactly what you configured.
		</p>

		<DemoPlayground
			code="BU01"
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
			code="BU02"
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

		<hr class="my-4" />

		<DemoPlayground
			code="BU03"
			titleText="Grouped list — select-all per group & counts (v2.2.0)"
			subtitleText="A tristate checkbox on each group header, per-group selected counts, and configurable selected order."
			baseAttrs={groupBaseAttrs}
			controls={groupControls}
			initialConfig={{ groupSelectMode: 'cascade' }}
			setup={groupSetup}
			trailer={groupTrailer}
			idText="grouped-select"
		>
			{#snippet description()}
				<ul class="mb-0">
					<li>
						<code>group-select-mode="cascade"</code> (v2.2.0) puts a <strong>tristate select-all
						checkbox</strong> on each group header — it toggles that group's visible members and reads
						indeterminate when partial. The group name is never a value; the form output carries member
						values only.
					</li>
					<li>
						Every group header shows a <strong>per-group selected count</strong>, and
						<code>getCountLabelCallback((selected, total) =&gt; …)</code> formats that chip <em>and</em> the
						in-input counter together — here both read <code>selected/total</code>.
					</li>
					<li>
						<code>selected-order</code> reorders the badges and popover (<code>label-asc</code> /
						<code>label-desc</code>) — display-only, so <code>getValue()</code> and the form keep insertion
						order.
					</li>
				</ul>
			{/snippet}
		</DemoPlayground>
	</div>
</DocLayout>
