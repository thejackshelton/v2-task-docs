import { component$, useSignal, useTask$ } from "@qwik.dev/core";

export default component$(() => {
	const testSig = useSignal(0);

	testSig.value = 1;

	useTask$(({ track }) => {
		track(() => testSig.value);

		console.log("Task ran");
	});

	return <div>Hello!</div>;
});
