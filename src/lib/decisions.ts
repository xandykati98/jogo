import { richText } from '$lib';
import { gameState } from '../stores/game';
import type { Decision } from '../stores/types';

export const timedDecisions: {
	[day: number]: Decision[];
} = {
	1: [
		{
			id: 1,
			text: 'Você herdou essa taverna, sua tarefa agora é gerenciá-la o melhor possível. Boa sorte!',
			title: 'Bem-vindo!',
			image: 'teste',
			right: {
				text: 'Vamos lá!',
				effect: {
					description: richText('Você começa a trabalhar na taverna. Ganha **100** de Ouro.'),
					activate: () => {
						gameState.gold.incrementTotal(100);
					}
				}
			},
			left: {
				text: 'Ignorar',
				effect: {
					description: richText('Você ignorou a taverna e foi embora.'),
					activate: () => {
						gameState.logs.add({
							message: 'Você ignorou a taverna e foi embora.',
							type: 'info'
						});
					}
				}
			}
		}
	]
};
