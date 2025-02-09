import { component$, useSignal, useTask$ } from "@qwik.dev/core";

export default component$(() => {
	const isComponentRendered = useSignal(false);

	return (
		<>
			<button onClick$={() => (isComponentRendered.value = true)}>
				Render component with task
			</button>
			{isComponentRendered.value && <TaskComponent />}
		</>
	);
});

const TaskComponent = component$(() => {
	useTask$(() => {
		console.log("TaskComponent task running");
	});

	return <div>Component with task rendered!</div>;
});
