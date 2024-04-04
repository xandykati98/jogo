import {
	type createResource,
	createSpells,
	createBoolean,
	createDay,
	createLogs,
	createInventory
} from './game';
import type { Writable } from 'svelte/store';

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
export interface EquipableItem extends Item {
	/**
	 * @description Stats que o item dá ao ser equipado
	 */
	plusStats?: {
		strength?: number;
		intelligence?: number;
		dexterity?: number;
	};
	equip: () => void;
	unEquip: () => void;
}

interface Consumable extends Item {
	effect: () => void;
}
type GeneralItem = Item | Consumable;

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
	speed: ReturnType<typeof createResource>;
	selected: Writable<null | number>;
	spells: ReturnType<typeof createSpells>;
};

export type Inventory = {
	size: number;
	items: GeneralItem[];
};

export type Shop = {
	tax: ReturnType<typeof createResource>;
	items: ReturnType<typeof createInventory>;
};

export type HeroSkill = {
	id: number;
	name: string;
	description: string;
	icon: string;
	tier: number;
	effect: () => void;
};

export interface Hero {
	id: number;
	name: string;
	description: string;
	icon: string;
	image: string;
	level: Writable<number>;
	experience: Writable<number>;
	health: Writable<number>;
	mana: Writable<number>;
	stats: {
		strength: Writable<number>;
		intelligence: Writable<number>;
		dexterity: Writable<number>;
	};
	skills: {
		[type: string]: {
			name: string;
			description: string;
			color: string;
			icon: string;
			tree: HeroSkill[];
		};
	};
	slots: {
		weapon: Writable<null | EquipableItem>;
		chestplate: Writable<null | EquipableItem>;
		legs: Writable<null | EquipableItem>;
		boots: Writable<null | EquipableItem>;
		gloves: Writable<null | EquipableItem>;
		ring: Writable<null | EquipableItem>;
		necklace: Writable<null | EquipableItem>;
		head: Writable<null | EquipableItem>;
	};
}

export interface Decision {
	id: number;
	text: string;
	title: string;
	image: string;
	right: {
		text: string;
		effect: {
			description: string;
			activate: () => void;
		};
	};
	left: {
		text: string;
		effect: {
			description: string;
			activate: () => void;
		};
	};
}

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
		isShopOpen: ReturnType<typeof createBoolean>;
		isHeroesOpen: ReturnType<typeof createBoolean>;
		closeAll: () => void;
	};
};
