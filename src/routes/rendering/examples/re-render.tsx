import { component$, useSignal } from "@qwik.dev/core";

export default component$(() => {
	const isRendered = useSignal(false);

	return (
		<div>
			<button
				type="button"
				onClick$={() => {
					isRendered.value = !isRendered.value;
				}}
			>
				Click me
			</button>
			{isRendered.value && <NewComponent />}
		</div>
	);
});

export const NewComponent = component$(() => {
	console.log("NewComponent rendered");
	return <div>Hello</div>;
});
