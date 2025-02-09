import { component$, useTask$ } from "@qwik.dev/core";

export default component$(() => {
	useTask$(() => {
		console.log("I run when the component is first created!");
	});

	return <div>Hello World</div>;
});
