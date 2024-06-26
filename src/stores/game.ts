import { writable, get, type Writable } from 'svelte/store';
import type {
	Consumable,
	GameStateType,
	Inventory,
	GeneralItem,
	Item,
	Log,
	MagicTree,
	MagicTreeSpell,
	Shop,
	Decision,
	Hero,
	EquipableItem,
	HeroSkill,
	Slot
} from './types';
import { createId, richText } from '$lib';
import { Enlatados, MagiaCaçadaI } from '$lib/items';
import { PersuasãoComida, PersuasãoOuro, RenovaçãoVeloz } from '$lib/spells';
import { timedDecisions } from '$lib/decisions';
import { Bruxa } from '$lib/heroes';

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

export const createNumber = (value: number = 0) => {
	const { subscribe, set, update } = writable(value);
	return {
		subscribe,
		set,
		update,
		increment: (value: number) => {
			update((n) => n + value);
		},
		decrement: (value: number) => {
			update((n) => n - value);
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
	speed: createResource(1),
	selected: writable<null | number>(null),
	spells: createSpells([RenovaçãoVeloz, PersuasãoComida, PersuasãoOuro])
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

export interface LogCreate extends Omit<Log, 'day' | 'time' | 'id'> {}
export const createLogs = () => {
	const { subscribe, set, update } = writable<Log[]>([]); // Specify the type of the initial value as an empty array of type Log[]
	return {
		subscribe,
		set,
		update,
		add: (log: LogCreate | Log) => {
			let createdLog = log;
			if (!('id' in createdLog)) {
				createdLog = { ...createdLog, id: createId() };
			}
			if (!('day' in createdLog) || !('time' in createdLog)) {
				update((n): Log[] => [
					...n,
					{
						...createdLog,
						day: get(gameState.day),
						time: new Date()
					} as Log
				]);
			} else {
				update((n) => [...n, createdLog as Log]);
			}
		},
		remove: (id: number) => {
			update((n) => n.filter((log) => log.id !== id));
		}
	};
};

export interface GeneralItemCreate extends Omit<GeneralItem, 'id'> {}
export interface EquipableItemCreate extends Omit<EquipableItem, 'id'> {}

export const createEquipableItem = (item: EquipableItemCreate) => {
	const { subscribe, set, update } = writable<EquipableItem>({
		...item,
		id: createId()
	});

	return {
		subscribe,
		set,
		update,
		equip: () => {
			update((n) => {
				n.equip();
				return n;
			});
		},
		unEquip: () => {
			update((n) => {
				n.unEquip();
				return n;
			});
		}
	};
};

export const createSlot = (item: EquipableItem | null) => {
	const { subscribe, set, update } = writable<EquipableItem | null>(item);

	return {
		subscribe,
		set,
		update,
		equip: () => {
			get({ subscribe })?.equip();
		},
		unEquip: () => {
			get({ subscribe })?.unEquip();
		}
	};
};

const createHero = (hero: Hero) => {
	interface HeroStore extends Hero {
		slots: {
			[key: string]: Writable<Slot>;
		};
	}
	const { subscribe, set, update } = writable<HeroStore>({
		...hero,
		slots: {
			weapon: createSlot(hero.slots.weapon),
			chestplate: createSlot(null),
			legs: createSlot(null),
			boots: createSlot(null),
			gloves: createSlot(null),
			ring: createSlot(null),
			necklace: createSlot(null),
			head: createSlot(null)
		}
	});
	return {
		subscribe,
		set,
		update
	};
};

type CreateInventoryOptions = {
	size?: number;
};
export const createInventory = (options?: CreateInventoryOptions) => {
	const { subscribe, set, update } = writable<Inventory>({
		size: options?.size || 25,
		items: []
	});
	return {
		subscribe,
		set,
		update,
		add: (item: GeneralItem | GeneralItemCreate) => {
			update((n) => {
				if (n.items.length < n.size) {
					if (!('id' in item)) {
						n.items.push({
							...item,
							id: createId()
						});
					} else {
						n.items.push(item);
					}
				} else {
					gameState.logs.add({
						message: 'Seu inventário está cheio!',
						type: 'warning'
					});
				}
				return n;
			});
		},
		remove: (id: number) => {
			update((n) => {
				n.items = n.items.filter((item) => item.id !== id);
				return n;
			});
		}
	};
};

export const shop: Shop = {
	tax: createResource(2),
	items: createInventory({ size: Infinity })
};
export const gameState: GameStateType = {
	day: createDay(),
	gold: createResource(100),
	food: createResource(100),
	rally: createResource(1),
	inventory: createInventory(),
	sideInterface: {
		isMagicTreeOpen: createBoolean(false),
		isInventoryOpen: createBoolean(false),
		isShopOpen: createBoolean(false),
		isHeroesOpen: createBoolean(false),
		closeAll: () => {
			for (const key in gameState.sideInterface) {
				const item = gameState.sideInterface[key as keyof GameStateType['sideInterface']];
				if (key !== 'closeAll' && item) {
					(item as ReturnType<typeof createBoolean>).set(false);
				}
			}
		}
	},
	endDay() {
		if (get(decisions).length > 0) {
			gameState.logs.add({
				message: `Conclua todas as decisões antes de avançar para o próximo dia.`,
				type: 'magic'
			});
			return;
		}

		gameState.day.increment();

		/**
		 * @description Atualiza as decisões predefinidas por dia
		 */
		decisions.set(timedDecisions[get(gameState.day)] || []);

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
		const selectedSpell = get(magicTree.spells).find(
			(spell) => spell.id === get(magicTree.selected)
		);
		if (selectedSpell) {
			magicTree.spells.updateProgress(
				selectedSpell.id,
				selectedSpell.progress + get(magicTree.speed).total
			);
			if (selectedSpell.progress >= selectedSpell.cost) {
				selectedSpell.effect();
				magicTree.selected.set(null);
				// add spell completion to logs
				gameState.logs.add({
					message: `Magia ${selectedSpell.name} concluída.`,
					type: 'magic'
				});
			}
		}
		/**
		 * @description Verifica se o jogador faliu, caso sim, encerra o jogo.
		 */
		if (gameState.gold.getTotal() < 0) {
			gameState.logs.add({
				message: `Você faliu!`,
				type: 'end'
			});
			// TODO: fazer isso ficar bonito
			alert('Game over: Você faliu!');
		}
		gameState.logs.add({
			message: `Dia ${get(gameState.day)} iniciado.`,
			type: 'info'
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

const createDecisions = () => {
	const { subscribe, set, update } = writable<Decision[]>([]);
	return {
		subscribe,
		set,
		update,
		add: (decision: Decision) => {
			update((n) => [...n, decision]);
		},
		addToFront: (decision: Decision) => {
			update((n) => [decision, ...n]);
		},
		remove: (id: number) => {
			update((n) => n.filter((decision) => decision.id !== id));
		}
	};
};

export const decisions = createDecisions();

export const createHeroes = () => {
	const { subscribe, set, update } = writable<Hero[]>([]);
	return {
		subscribe,
		set,
		update,
		add: (hero: any) => {
			update((n) => [...n, hero]);
		},
		remove: (id: number) => {
			update((n) => n.filter((hero) => hero.id !== id));
		}
	};
};

export const heroes = createHeroes();

const onStart = () => {
	gameState.inventory.add(Enlatados);

	gameState.inventory.add(MagiaCaçadaI);

	shop.items.add(Enlatados);

	heroes.add(Bruxa);

	decisions.set(timedDecisions[1]);
};

onStart();
