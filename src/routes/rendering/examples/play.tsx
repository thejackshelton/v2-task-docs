import { $, component$, useSignal, useTask$ } from "@qwik.dev/core";

export default component$(() => {
	const count = useSignal(0);
	const dblCount = useSignal(1);

	const someAsyncWork = $(async (param: number) => {
		await new Promise((resolve) => setTimeout(resolve, 1000));
		console.log("someAsyncWork", param);
	});

	useTask$(async ({ track }) => {
		track(() => count.value);
		someAsyncWork(1);
	});

	useTask$(async ({ track }) => {
		track(() => count.value);
		someAsyncWork(2);
	});

	useTask$(async ({ track }) => {
		track(() => count.value);
		someAsyncWork(3);
	});

	return (
		<div>
			<button onClick$={() => (count.value += 1)}>
				Count: {count.value}/{dblCount.value}
			</button>
		</div>
	);
});
