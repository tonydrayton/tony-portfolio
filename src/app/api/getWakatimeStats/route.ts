import { WakatimeSummaryResult } from "@/lib/types";

const getWakatimeStats = async () => {
	const res = await fetch('https://wakatime.com/api/v1/users/tonydrayton/stats');
	const data = await res.json() as WakatimeSummaryResult;
	return data;
}

export async function GET(request: Request) {
	try {
		const wakatimeStats = await getWakatimeStats();
		return new Response(JSON.stringify(wakatimeStats), {
			status: 200,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	} catch (err: any) {
		return new Response(JSON.stringify({
			message: 'Error fetching Wakatime stats ' + err.message,
			error: err
		}), { status: 500 });
	}
}
