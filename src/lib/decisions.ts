import type { Decision } from '../stores/types';

export const timedDecisions: {
	[day: number]: Decision[];
} = {
	1: [
		{
			id: 1,
			text: 'Você encontra um grupo de viajantes que estão dispostos a trocar informações por comida. O que você faz?',
			title: 'Viajantes',
			image: 'teste',
			right: {
				text: 'Trocar por informações',
				effect: () => {}
			},
			left: {
				text: 'Ignorar',
				effect: () => {}
			}
		},
		{
			id: 2,
			text: 'Você encontra uma poção misteriosa no chão. O que você faz?',
			title: 'Poção',
			image: 'teste',
			right: {
				text: 'Beber',
				effect: () => {}
			},
			left: {
				text: 'Ignorar',
				effect: () => {}
			}
		}
	]
};
