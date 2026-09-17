<script lang="ts">
	import { DocLayout, CodeBlock } from '@keenmate/svelte-docs';
	import { DemoPlayground, technologies } from '$lib/demo';
	import type { ControlDef } from '$lib/demo';

	const baseAttrs = {
		'value-member': 'value',
		'display-value-member': 'label'
	};

	// --- Demo 1: built-in + custom actions -----------------------------------
	const builtinSetup = (el: any) => {
		el.options = technologies;
		el.actionButtons = [
			{ action: 'select-all', text: 'Select all' },
			{ action: 'clear-all', text: 'Clear' },
			{
				action: 'custom',
				text: 'First 3',
				onClick: (ms: any) =>
					ms.setSelected(
						technologies.slice(0, 3).map((t) => t.value),
						{ notify: true }
					)
			}
		];
	};

	const builtinControls: ControlDef[] = [
		{
			key: 'actionsPosition',
			label: 'Actions position',
			type: 'select',
			attr: 'actions-position',
			default: 'top',
			options: [
				{ value: 'top', label: 'top' },
				{ value: 'bottom', label: 'bottom' }
			]
		},
		{
			key: 'actionsAlign',
			label: 'Actions align',
			type: 'select',
			attr: 'actions-align',
			default: 'stretch',
			options: [
				{ value: 'stretch', label: 'stretch' },
				{ value: 'left', label: 'left' },
				{ value: 'right', label: 'right' },
				{ value: 'center', label: 'center' },
				{ value: 'space-between', label: 'space-between' }
			]
		},
		{
			key: 'actionsLayout',
			label: 'Actions layout',
			type: 'select',
			attr: 'actions-layout',
			default: 'nowrap',
			options: [
				{ value: 'nowrap', label: 'nowrap' },
				{ value: 'wrap', label: 'wrap' }
			]
		}
	];

	const builtinTrailer = `// actionButtons is an array assigned imperatively on the element.
el.options = technologies;
el.actionButtons = [
  { action: 'select-all', text: 'Select all' },
  { action: 'clear-all', text: 'Clear' },
  {
    action: 'custom',
    text: 'First 3',
    onClick: (ms) =>
      ms.setSelected(technologies.slice(0, 3).map((t) => t.value), { notify: true })
  }
];`;

	// --- Demo 2: dynamic buttons ---------------------------------------------
	const dynamicSetup = (el: any) => {
		el.options = technologies;
		el.actionButtons = [
			{
				action: 'custom',
				text: 'Select all',
				getIsDisabledCallback: (ms: any) => ms.getSelected().length === technologies.length,
				onClick: (ms: any) =>
					ms.setSelected(
						technologies.map((t) => t.value),
						{ notify: true }
					)
			},
			{
				action: 'custom',
				getTextCallback: (ms: any) => `Clear (${ms.getSelected().length})`,
				getIsVisibleCallback: (ms: any) => ms.getSelected().length > 0,
				onClick: (ms: any) => ms.clearAll()
			}
		];
	};

	const dynamicCode = `el.options = technologies;
el.actionButtons = [
  {
    action: 'custom',
    text: 'Select all',
    // Auto-disable once everything is selected.
    getIsDisabledCallback: (ms) => ms.getSelected().length === technologies.length,
    onClick: (ms) =>
      ms.setSelected(technologies.map((t) => t.value), { notify: true })
  },
  {
    action: 'custom',
    // Live count in the label; only visible when something is selected.
    getTextCallback: (ms) => \`Clear (\${ms.getSelected().length})\`,
    getIsVisibleCallback: (ms) => ms.getSelected().length > 0,
    onClick: (ms) => ms.clearAll()
  }
];`;
</script>

<DocLayout
	titleText="Action Buttons"
	descriptionText="Add a bar of built-in and custom buttons to the dropdown — Select all, Clear, or your own onClick handlers — and make them react to the current selection."
>
	<div class="py-3">
		<p class="lead">
			<code>actionButtons</code> is an array you assign on the element. Each entry is
			<code>select-all</code>, <code>clear-all</code>, or <code>custom</code> — the built-ins wire
			their own behaviour, while <code>custom</code> buttons run your <code>onClick(ms)</code>.
		</p>

		<DemoPlayground
			titleText="Built-in + custom actions"
			subtitleText="Select all and Clear come wired; a custom button selects the first three."
			{baseAttrs}
			controls={builtinControls}
			setup={builtinSetup}
			trailer={builtinTrailer}
			idText="builtin-actions"
		>
			{#snippet description()}
				<ul class="mb-0">
					<li>
						Built-ins auto-disable smartly: <strong>Select all</strong> disables once every option is
						selected, <strong>Clear</strong> disables while nothing is selected — no callback needed.
					</li>
					<li>
						The action bar is laid out with attributes: <code>actions-position</code>,
						<code>actions-align</code> and <code>actions-layout</code> (try the controls).
					</li>
					<li>
						Custom buttons receive the live element as <code>ms</code>; here
						<code>ms.setSelected(values, &#123; notify: true &#125;)</code> fires <code>change</code>.
					</li>
				</ul>
			{/snippet}
		</DemoPlayground>

		<hr class="my-4" />

		<DemoPlayground
			titleText="Dynamic buttons"
			subtitleText="Text, visibility and disabled state driven by callbacks that re-evaluate on every selection change."
			{baseAttrs}
			setup={dynamicSetup}
			demoNote="Open the dropdown and select items: the Clear button appears with a live count, and Select all disables once everything is picked."
			idText="dynamic-actions"
		>
			{#snippet description()}
				<ul class="mb-0">
					<li><code>getTextCallback(ms)</code> — compute the label (here a live selected count).</li>
					<li>
						<code>getIsVisibleCallback(ms)</code> — show/hide the button (Clear only appears when
						something is selected).
					</li>
					<li>
						<code>getIsDisabledCallback(ms)</code> — enable/disable reactively (Select all off at
						max).
					</li>
					<li>
						<code>getClassCallback(ms)</code> — swap CSS classes by state (inject the styles via
						<code>customStylesCallback</code>, since the button lives in the shadow root).
					</li>
					<li>Callbacks always win over the matching static property (<code>text</code>, <code>cssClass</code>, …).</li>
				</ul>
			{/snippet}
		</DemoPlayground>

		<CodeBlock codeContent={dynamicCode} languageType="javascript" titleText="Dynamic actionButtons" />
	</div>
</DocLayout>
