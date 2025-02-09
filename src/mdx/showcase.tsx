import {
	type Component,
	type PropsOf,
	component$,
	useSignal,
	useTask$,
} from "@qwik.dev/core";
import { Carousel } from "@qwik-ui/headless";

import { useLocation } from "@qwik.dev/router";
import { Highlight } from "./highlight";

type ShowcaseProps = PropsOf<"div"> & {
	name?: string;
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const metaGlobComponents: Record<string, any> = import.meta.glob(
	"/src/routes/**/examples/*.tsx",
	{
		import: "default",
		eager: false,
	},
);

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const rawComponents: Record<string, any> = import.meta.glob(
	"/src/routes/**/examples/*.tsx",
	{
		query: "raw",
		import: "default",
		eager: false,
	},
);

export const Showcase = component$<ShowcaseProps>(({ name }) => {
	const location = useLocation();
	const componentPath = `/src/routes${location.url.pathname}examples/${name}.tsx`;

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const MetaGlobComponentSig = useSignal<Component<any>>();
	const componentCodeSig = useSignal<string>();

	useTask$(async () => {
		try {
			// eslint-disable-next-line qwik/valid-lexical-scope
			MetaGlobComponentSig.value = await metaGlobComponents[componentPath]();
			componentCodeSig.value = await rawComponents[componentPath]();
		} catch (e) {
			throw new Error(`Unable to load path ${componentPath}`);
		}
	});

	return (
		<Carousel.Root class="my-4">
			<Carousel.Pagination data-pagefind-ignore class="flex gap-2 py-4">
				<Carousel.Bullet class="bg-neutral-800 p-2 rounded-md hover:bg-neutral-700 transition-colors outline-neutral-600 data-active:bg-indigo-950">
					Preview
				</Carousel.Bullet>
				<Carousel.Bullet class=" bg-neutral-800 p-2 rounded-md hover:bg-neutral-700 transition-colors outline-neutral-600 data-active:bg-indigo-950">
					Code
				</Carousel.Bullet>
			</Carousel.Pagination>

			<Carousel.Slide class="rounded-md overflow-hidden border-2 border-indigo-950">
				<section class={"bg-neutral-900 flex flex-col items-center py-12 px-6"}>
					{MetaGlobComponentSig.value && <MetaGlobComponentSig.value />}
				</section>
			</Carousel.Slide>
			<Carousel.Slide class="rounded-md overflow-clip text-sm">
				<Highlight code={componentCodeSig.value || ""} />
			</Carousel.Slide>
		</Carousel.Root>
	);
});
