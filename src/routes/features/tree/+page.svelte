<script lang="ts">
	import { DocLayout } from '@keenmate/svelte-docs';
	import { DemoPlayground, foodTree } from '$lib/demo';
	import type { ControlDef } from '$lib/demo';

	const baseAttrs = {
		'value-member': 'path',
		'display-value-member': 'name',
		'path-member': 'path',
		'full-title-member': 'full'
	};

	const setup = (el: any) => {
		el.options = foodTree;
	};

	const controls: ControlDef[] = [
		{
			key: 'checkboxMode',
			label: 'Checkbox mode',
			type: 'select',
			attr: 'checkbox-mode',
			default: 'independent',
			options: [
				{ value: 'independent', label: 'independent' },
				{ value: 'cascade', label: 'cascade' }
			]
		},
		{
			key: 'cascadeSelectPolicy',
			label: 'Cascade select policy',
			type: 'select',
			attr: 'cascade-select-policy',
			default: 'rolled-up',
			options: [
				{ value: 'rolled-up', label: 'rolled-up' },
				{ value: 'leaves', label: 'leaves' },
				{ value: 'all', label: 'all' }
			],
			hint: 'Only used in cascade mode.'
		},
		{
			key: 'showBadgeFullTitle',
			label: 'Show full title on badges',
			type: 'toggle',
			attr: 'show-badge-full-title',
			default: false
		},
		{
			key: 'searchMode',
			label: 'Search mode',
			type: 'select',
			attr: 'search-mode',
			default: 'filter',
			options: [
				{ value: 'filter', label: 'filter' },
				{ value: 'navigate', label: 'navigate' }
			]
		}
	];

	const leavesSetup = (el: any) => {
		el.options = foodTree;
		el.getIsSelectableCallback = (node: any) => !node.hasChildren;
	};

	const leavesTrailer = `// Only leaves are selectable — the callback sees the derived hasChildren.
el.getIsSelectableCallback = (node) => !node.hasChildren;`;
</script>

<DocLayout
	titleText="Tree"
	descriptionText="Render options as an always-expanded hierarchy from a materialized dot-path — with cascade checkboxes and breadcrumb badges."
>
	<div class="py-3">
		<p class="lead">
			Give each option a materialized dot-path (<code>"1"</code>, <code>"1.1"</code>,
			<code>"1.1.1"</code>, …) and point <code>path-member</code> at it. Tree mode
			<strong>auto-enables</strong> as soon as a path source is present — the component derives
			parent and depth from the path and renders the options depth-first, indented by level.
		</p>
		<p>
			There is no chevron or collapse: every node is <strong>always expanded</strong>. Typing does
			an <strong>ancestor-preserving search</strong> — the tree narrows to the matching nodes plus
			their ancestors, so the indentation of the results still reads as a hierarchy.
		</p>

		<DemoPlayground
			titleText="Interactive tree"
			subtitleText="Flip cascade behaviour, value policy and breadcrumb badges on a live tree."
			{baseAttrs}
			{controls}
			{setup}
			idText="interactive-tree"
		>
			{#snippet description()}
				<ul class="mb-0">
					<li><code>checkbox-mode="cascade"</code> makes checking a node select its whole subtree (a partial branch shows a tristate dash).</li>
					<li><code>cascade-select-policy</code> controls which values are emitted — <code>rolled-up</code> collapses a full subtree to its root, <code>leaves</code> emits only leaf nodes, <code>all</code> emits every checked node.</li>
					<li><code>full-title-member</code> gives each badge a breadcrumb (<em>Fruit / Pome / Apple</em>) when <code>show-badge-full-title</code> is on — disambiguating leaves that share a name.</li>
				</ul>
			{/snippet}
		</DemoPlayground>

		<hr class="my-4" />

		<DemoPlayground
			titleText="Selectable leaves only"
			subtitleText="Mark branches as pure structure — only leaves are real choices."
			{baseAttrs}
			setup={leavesSetup}
			trailer={leavesTrailer}
			codeLang="html"
			demoNote="Branch nodes render normally (not greyed out) but have no checkbox and are skipped by keyboard navigation — only the leaves can be picked."
			idText="selectable-leaves"
		>
			{#snippet description()}
				<ul class="mb-0">
					<li><code>getIsSelectableCallback</code> receives the built node, so it can read the derived <code>node.hasChildren</code> to keep every branch non-selectable.</li>
					<li>Non-selectable nodes drop their checkbox and are skipped by Select&nbsp;All and by keyboard arrows, but stay visually normal.</li>
				</ul>
			{/snippet}
		</DemoPlayground>
	</div>
</DocLayout>
