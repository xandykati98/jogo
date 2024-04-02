import {
	type createResource,
	createSpells,
	createBoolean,
	createDay,
	createLogs,
	createInventory
} from './game';

interface Log {
	id: number;
	message: string;
	type: 'info' | 'warning' | 'end' | 'magic' | 'sell';
	day: number;
	time: Date;
}
type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
type ItemTypes = 'weapon' | 'armor' | 'consumable' | 'spell';
interface Item {
	type: ItemTypes;
	id: number;
	cost: number;
	name: string;
	description: string;
	icon: string;
	rarity: Rarity;
}

interface Consumable extends Item {
	effect: () => void;
}
type InventoryItem = Item | Consumable;

export type MagicTreeSpell = {
	id: number;
	tier: number;
	name: string;
	description: string;
	icon: string;
	cost: number;
	progress: number;
	effect: () => void;
};
export type MagicTree = {
	speed: number;
	selected: null | number;
	spells: ReturnType<typeof createSpells>;
};

export type Inventory = {
	size: number;
	items: InventoryItem[];
};

export type GameStateType = {
	endDay: () => void;
	day: ReturnType<typeof createDay>;
	gold: ReturnType<typeof createResource>;
	food: ReturnType<typeof createResource>;
	/**
	 * @description Velocidade de recuperação dos heróis
	 */
	rally: ReturnType<typeof createResource>;
	inventory: ReturnType<typeof createInventory>;
	logs: ReturnType<typeof createLogs>;
	sideInterface: {
		isMagicTreeOpen: ReturnType<typeof createBoolean>;
		isInventoryOpen: ReturnType<typeof createBoolean>;
		closeAll: () => void;
	};
};
