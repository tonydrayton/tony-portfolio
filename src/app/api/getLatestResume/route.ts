import { REST } from '@discordjs/rest';
import { Routes, APIMessage } from 'discord-api-types/v9';

const getLatestResume = async () => {
	if (!process.env.DISCORD_BOT_TOKEN) {
		throw new Error('DISCORD_BOT_TOKEN is not set');
	}

	const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN);
	const messages = await rest.get(Routes.channelMessages('1289675849561542717')) as APIMessage[];
	const pdfs = messages.filter(m => m.attachments?.length > 0 && m.attachments[0].filename.endsWith('.pdf'));
	if (pdfs.length === 0) return null;
	const latestResumeMessage = pdfs[0];
	if (!latestResumeMessage) return null;
	return latestResumeMessage.attachments[0].url;
}

export async function GET(request: Request) {
	try {
		const latestResumeUrl = await getLatestResume();
		if (!latestResumeUrl) {
			return new Response('Encountered an error or there was no PDF resume found.', { status: 404 });
		}
		const pdfResponse = await fetch(latestResumeUrl);
		if (!pdfResponse.ok) {
			return new Response('Error fetching PDF from Discord.', { status: 500 });
		}

		const pdfBuffer = await pdfResponse.arrayBuffer();

		return new Response(pdfBuffer, {
			status: 200,
			headers: {
				'Content-Type': 'application/pdf',
				'Content-Disposition': 'inline; filename="Tony_Drayton_Resume.pdf"'
			},
		});
	} catch(err: any) {
		return new Response(err.message, { status: 500 });
	}
}
