import { writable, get } from 'svelte/store';
import type { GameStateType, Log, MagicTree, MagicTreeSpell } from './types';
import { createLogId } from '$lib';

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
		toggle: (value?: boolean) => {
			if (value !== undefined) {
				return set(value);
			}
			update((n) => !n);
		}
	};
};

export const createSpells = (spells: MagicTreeSpell[]) => {
	const { subscribe, set, update } = writable<MagicTreeSpell[]>(spells);
	return {
		subscribe,
		set,
		update,
		add: (spell: MagicTreeSpell) => {
			update((n) => [...n, spell]);
		},
		updateProgress: (id: number, progress: number) => {
			update((n) => {
				const spell = n.find((spell) => spell.id === id);
				if (spell) {
					spell.progress = progress;
				}
				return n;
			});
		},
		remove: (id: number) => {
			update((n) => n.filter((spell) => spell.id !== id));
		}
	};
};

export const magicTree: MagicTree = {
	speed: 1,
	selected: null,
	spells: createSpells([
		{
			id: 1,
			tier: 1,
			name: 'Renovação Veloz',
			description:
				'Após derrotas em batalha, esta magia acelera a recuperação dos heróis em 10%, permitindo que retornem à luta com mais rapidez.',
			icon: 'helmet',
			cost: 4,
			progress: 0,
			effect: () => {
				gameState.rally.incrementTotal(0.1);
			}
		},
		{
			id: 2,
			tier: 1,
			name: 'Persuasão - Comida',
			description: 'Comprar comida na loja de suprimentos agora custa 10% menos.',
			icon: 'no_coin',
			cost: 4,
			progress: 0,
			effect: () => {
				// TODO
			}
		}
	])
};

export const createDay = () => {
	const { subscribe, set, update } = writable(1);
	return {
		subscribe,
		set,
		update,
		increment: () => {
			update((n) => n + 1);
		}
	};
};

export const createLogs = () => {
	const { subscribe, set, update } = writable<Log[]>([]); // Specify the type of the initial value as an empty array of type Log[]
	return {
		subscribe,
		set,
		update,
		add: (log: Log) => {
			update((n): Log[] => [...n, log]);
		},
		remove: (id: number) => {
			update((n) => n.filter((log) => log.id !== id));
		}
	};
};

export const gameState: GameStateType = {
	day: createDay(),
	gold: createResource(100),
	food: createResource(100),
	rally: createResource(1),
	interface: {
		isMagicTreeOpen: createBoolean(false)
	},
	endDay() {
		gameState.day.increment();
		/**
		 * @description Atualiza o ouro do jogador com o crescimento diário.
		 */
		gameState.gold.update(($gold) => {
			$gold.total += $gold.growth;
			return $gold;
		});

		/**
		 * @description Atualiza a comida do jogador com o crescimento diário.
		 */
		gameState.food.update(($food) => {
			$food.total += $food.growth;
			return $food;
		});

		/**
		 * @description Pesquisa as magias
		 */
		const selectedSpell = get(magicTree.spells).find((spell) => spell.id === magicTree.selected);
		if (selectedSpell) {
			magicTree.spells.updateProgress(selectedSpell.id, selectedSpell.progress + magicTree.speed);
			if (selectedSpell.progress >= selectedSpell.cost) {
				selectedSpell.effect();
				magicTree.selected = null;
				// add spell completion to logs
				gameState.logs.add({
					id: createLogId(),
					message: `Magia ${selectedSpell.name} concluída.`,
					type: 'magic',
					day: get(gameState.day),
					time: new Date()
				});
			}
		}
		/**
		 * @description Verifica se o jogador faliu, caso sim, encerra o jogo.
		 */
		if (gameState.gold.getTotal() < 0) {
			gameState.logs.add({
				id: createLogId(),
				message: `Você faliu!`,
				type: 'end',
				day: get(gameState.day),
				time: new Date()
			});
			// TODO: fazer isso ficar bonito
			alert('Game over: Você faliu!');
		}
		gameState.logs.add({
			id: createLogId(),
			message: `Dia ${get(gameState.day)} iniciado.`,
			type: 'info',
			day: get(gameState.day),
			time: new Date()
		});

		console.log({ gameState, magicTree });
	},
	logs: createLogs()
};

// on start

gameState.logs.add({
	id: 1,
	message:
		'Bem vindo, você herdou esta taverna do seus pais, sua tarefa agora é gerencia-la o melhor possível, boa sorte!',
	type: 'info',
	day: 1,
	// 2000-01-01 00:00:00
	time: new Date(946684800000)
});
