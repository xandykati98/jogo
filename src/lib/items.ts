import { richText } from '$lib';
import { gameState } from '../stores/game';
import type { Consumable, EquipableItem, GeneralItem, Item } from '../stores/types';

export const Enlatados: Omit<Consumable & GeneralItem, 'id'> = {
	type: 'consumable',
	name: 'Enlatados',
	description: richText('Comida enlatada, use para ganhar mais **20 de comida**.'),
	icon: 'food_can',
	cost: 10,
	rarity: 'common',
	effect: () => {
		gameState.food.incrementTotal(20);
	}
};

export const MagiaCaçadaI: Omit<Consumable & GeneralItem, 'id'> = {
	type: 'spell',
	name: 'Magia: Caçada I',
	description: richText('Encontra **duas** quests de caçada.'),
	icon: 'hunt_spell',
	cost: 45,
	rarity: 'rare',
	effect: () => {
		// TODO
	}
};

export const Cajado: Omit<EquipableItem & GeneralItem, 'id'> = {
	name: 'Cajado',
	description: richText('Um cajado simples.'),
	icon: 'staff',
	type: 'weapon',
	cost: 100,
	rarity: 'rare',
	plusStats: {
		intelligence: 5
	},
	equip: () => {},
	unEquip: () => {}
};
