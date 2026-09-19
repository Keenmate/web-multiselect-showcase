<script lang="ts">
	import type { ApiRow } from './api-data';

	interface Props {
		rows: ApiRow[];
		nameHeader?: string;
		showDefault?: boolean;
	}

	let { rows, nameHeader = 'Name', showDefault = true }: Props = $props();
</script>

<div class="table-responsive">
	<table class="table table-sm table-striped align-middle api-table">
		<thead>
			<tr>
				<th style="min-width: 12rem;">{nameHeader}</th>
				<th style="min-width: 10rem;">Type</th>
				{#if showDefault}<th style="min-width: 6rem;">Default</th>{/if}
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			{#each rows as row (row.name)}
				<tr>
					<td>
						<code>{row.name}</code>
						{#if row.since}<span class="badge bg-success-subtle text-success-emphasis ms-1">{row.since}</span>{/if}
						{#if row.deprecated}<span class="badge bg-warning-subtle text-warning-emphasis ms-1">deprecated</span>{/if}
					</td>
					<td><code class="text-nowrap-code">{row.type}</code></td>
					{#if showDefault}<td>{#if row.default}<code>{row.default}</code>{:else}<span class="text-muted">—</span>{/if}</td>{/if}
					<td>{@html row.description}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.api-table code {
		font-size: 0.82rem;
		white-space: normal;
		word-break: break-word;
	}
	.api-table td {
		font-size: 0.9rem;
	}
</style>
