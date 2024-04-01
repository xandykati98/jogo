import { writable, get } from 'svelte/store';
import type { GameStateType } from './types';

export const createResource = (total: number = 0, growth: number = 0) => {
	const { subscribe, set, update } = writable({
		total,
		growth
	});
	return {
		subscribe,
		set,
		update,
		incrementPerTurn: (value: number) => {
			update((n) => {
				n.growth += value;
				return n;
			});
		},
		incrementTotal: (value: number) => {
			update((n) => {
				n.total += value;
				return n;
			});
		},
		getTotal: () => get({ subscribe }).total,
		getGrowth: () => get({ subscribe }).growth,
		setTotal: (value: number) => {
			update((n) => {
				n.total = value;
				return n;
			});
		}
	};
};

export const createBoolean = (value: boolean = false) => {
	const { subscribe, set, update } = writable(value);
	return {
		subscribe,
		set,
		update,
		toggle: (value: boolean) => {
			if (value !== undefined) {
				return set(value);
			}
			update((n) => !n);
		}
	};
};

export const gameState: GameStateType = {
	gold: createResource(100),
	food: createResource(100),
	interface: {
		isMagicTreeOpen: createBoolean(false)
	},
	logs: [
		{
			id: 1,
			message:
				'Bem vindo, você herdou esta taverna do seus pais, sua tarefa agora é gerencia-la o melhor possivel, boa sorte!',
			type: 'info',
			day: 1,
			// 2000-01-01 00:00:00
			time: new Date(946684800000)
		}
	]
};
