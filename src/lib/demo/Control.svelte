<script lang="ts">
	import type { ControlDef, DemoConfig } from './codegen';

	interface Props {
		def: ControlDef;
		config: DemoConfig;
	}

	let { def, config = $bindable() }: Props = $props();

	const id = `ctl-${def.key}-${Math.random().toString(36).slice(2, 8)}`;
</script>

<div class="demo-control">
	{#if def.type === 'toggle'}
		<div class="form-check form-switch">
			<input
				class="form-check-input"
				type="checkbox"
				role="switch"
				{id}
				checked={config[def.key] === true || config[def.key] === 'true'}
				onchange={(e) => (config[def.key] = e.currentTarget.checked)}
			/>
			<label class="form-check-label" for={id}>{def.label}</label>
		</div>
	{:else if def.type === 'select'}
		<label class="form-label" for={id}>{def.label}</label>
		<select
			class="form-select form-select-sm"
			{id}
			value={String(config[def.key])}
			onchange={(e) => (config[def.key] = e.currentTarget.value)}
		>
			{#each def.options ?? [] as opt (opt.value)}
				<option value={opt.value}>{opt.label}</option>
			{/each}
		</select>
	{:else if def.type === 'number'}
		<label class="form-label" for={id}>{def.label}</label>
		<input
			class="form-control form-control-sm"
			type="number"
			{id}
			min={def.min}
			max={def.max}
			step={def.step ?? 1}
			value={config[def.key]}
			oninput={(e) =>
				(config[def.key] = e.currentTarget.value === '' ? '' : Number(e.currentTarget.value))}
		/>
	{:else}
		<label class="form-label" for={id}>{def.label}</label>
		<input
			class="form-control form-control-sm"
			type="text"
			{id}
			value={config[def.key]}
			oninput={(e) => (config[def.key] = e.currentTarget.value)}
		/>
	{/if}

	{#if def.hint}
		<div class="form-text small">{def.hint}</div>
	{/if}
</div>

<style>
	.demo-control {
		margin-bottom: 0.85rem;
	}
	.form-label {
		margin-bottom: 0.25rem;
		font-size: 0.8rem;
		font-weight: 600;
	}
</style>
