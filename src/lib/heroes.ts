import type { Hero } from '../stores/types';
import { Cajado } from './items';

export const Bruxa: Hero = {
	id: 1,
	name: 'Bruxa',
	description: 'Uma bruxa que usa magia negra para controlar seus inimigos.',
	type: 'mage',
	race: 'human',
	icon: 'bruxa',
	image: 'bruxa',
	level: 1,
	experience: 0,
	health: 100,
	mana: 100,
	stats: {
		strength: 5,
		intelligence: 15,
		dexterity: 10
	},
	skills: {
		arcano: {
			name: 'Arcano',
			description: 'Ataques arcanos que causa dano mágico.',
			color: '#ff00ff',
			icon: 'arcano',
			available: true,
			tree: [
				{
					id: 1,
					name: 'Bola de Fogo',
					tier: 1,
					description: 'Lança uma bola de fogo que causa dano mágico.',
					effect: () => {
						console.log('Bola de Fogo');
					},
					available: true,
					icon: 'bola-de-fogo',
					cooldown: 1
				}
			]
		}
	},
	slots: {
		weapon: Cajado,
		chestplate: null,
		legs: null,
		boots: null,
		gloves: null,
		ring: null,
		necklace: null,
		head: null
	}
};
