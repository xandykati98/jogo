import { gameState, shop } from '../stores/game';

export const RenovaçãoVeloz = {
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
};
export const PersuasãoComida = {
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
};
export const PersuasãoOuro = {
	id: 3,
	tier: 1,
	name: 'Persuasão - Ouro',
	description: 'Os items da loja agora custam 10% menos.',
	icon: 'coin',
	cost: 3,
	progress: 0,
	effect: () => {
		shop.tax.incrementTotal(-0.1);
	}
};
