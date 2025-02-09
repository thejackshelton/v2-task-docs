import type { Component, PropsOf } from "@qwik.dev/core";
import { Slot, component$ } from "@qwik.dev/core";
import { Showcase } from "./showcase";
import { cn } from "~/utils/cn";
export const components: Record<string, Component> = {
	p: component$<PropsOf<"p">>(({ ...props }) => {
		return (
			<p
				{...props}
				class={cn(
					"leading-7 text-cool-700 [&:not(:first-child)]:mt-6",
					props.class,
				)}
			>
				<Slot />
			</p>
		);
	}),
	h1: component$<PropsOf<"h1">>(({ ...props }) => {
		return (
			<h1
				{...props}
				class={cn(
					"mt-2 scroll-m-20 text-4xl font-bold tracking-tight text-cool-700",
					props.class,
				)}
			>
				<Slot />
			</h1>
		);
	}),
	h2: component$<PropsOf<"h2">>(({ ...props }) => {
		return (
			<h2
				{...props}
				class={[
					cn(
						"mb-8 mt-20 scroll-mt-24 border-b-2 pb-2 text-2xl font-extrabold",
						props.class,
					),
				]}
			>
				<Slot />
			</h2>
		);
	}),
	h3: component$<PropsOf<"h3">>(({ ...props }) => {
		return (
			<h3
				{...props}
				class={[
					cn("mb-6 mt-8 scroll-mt-20 text-xl font-semibold", props.class),
				]}
			>
				<Slot />
			</h3>
		);
	}),
	h4: component$<PropsOf<"h4">>(({ ...props }) => {
		return (
			<h4
				{...props}
				class={cn(
					"mt-8 scroll-m-20 text-xl font-semibold tracking-tight text-cool-700",
					props.class,
				)}
			>
				<Slot />
			</h4>
		);
	}),
	h5: component$<PropsOf<"h5">>(({ ...props }) => {
		return (
			<h5
				{...props}
				class={cn(
					"mt-8 scroll-m-20 text-lg font-semibold tracking-tight text-cool-700",
					props.class,
				)}
			>
				<Slot />
			</h5>
		);
	}),
	a: component$<PropsOf<"a">>(({ ...props }) => {
		return (
			<a
				{...props}
				class={cn(
					"font-medium text-cool-700 underline underline-offset-4",
					props.class,
				)}
				target="_blank"
				rel="noreferrer"
			>
				<Slot />
			</a>
		);
	}),
	ul: component$<PropsOf<"ul">>(({ ...props }) => {
		return (
			<ul
				{...props}
				class={cn("my-6 ml-6 list-disc text-cool-700", props.class)}
			>
				<Slot />
			</ul>
		);
	}),
	ol: component$<PropsOf<"ol">>(({ ...props }) => {
		return (
			<ol
				{...props}
				class={cn("my-6 ml-6 list-decimal text-cool-700", props.class)}
			>
				<Slot />
			</ol>
		);
	}),
	li: component$<PropsOf<"li">>(({ ...props }) => {
		return (
			<li {...props} class={cn("mt-2 text-cool-700", props.class)}>
				<Slot />
			</li>
		);
	}),
	blockquote: component$<PropsOf<"blockquote">>(({ ...props }) => {
		return (
			<blockquote
				{...props}
				class={cn(
					"mt-6 border-l-2 border-cool-300 pl-6 italic text-cool-700 [&>*]:text-cool-600",
					props.class,
				)}
			>
				<Slot />
			</blockquote>
		);
	}),
	hr: component$<PropsOf<"hr">>(({ ...props }) => {
		return (
			<hr {...props} class={cn("my-6 border-cool-200 md:my-8", props.class)} />
		);
	}),
	img: component$<PropsOf<"img">>(({ alt, ...props }) => {
		return (
			<img
				{...props}
				alt={alt}
				class={cn("rounded-md border border-cool-200", props.class)}
			/>
		);
	}),
	pre: component$<PropsOf<"pre">>(({ ...props }) => {
		return (
			<pre
				{...props}
				class={cn(
					"mb-4 mt-6 overflow-x-auto rounded-lg bg-kunai-blue-50 py-4 text-cool-700 bg-neutral-900",
					props.class,
				)}
			>
				<Slot />
			</pre>
		);
	}),
	code: component$<PropsOf<"code">>(({ ...props }) => {
		return (
			<code
				{...props}
				class={cn(
					"py-[0.2rem]font-mono relative rounded box-decoration-clone px-[0.3rem] py-1 text-sm text-cool-700",
					props.class,
				)}
			>
				<Slot />
			</code>
		);
	}),
	table: component$<PropsOf<"table">>(({ ...props }) => {
		return (
			<table
				{...props}
				class={cn(
					"mt-6 w-full border-collapse border border-cool-200",
					props.class,
				)}
			>
				<Slot />
			</table>
		);
	}),
	th: component$<PropsOf<"th">>(({ ...props }) => {
		return (
			<th
				{...props}
				class={cn(
					"border border-cool-200 px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
					props.class,
				)}
			>
				<Slot />
			</th>
		);
	}),
	td: component$<PropsOf<"td">>(({ ...props }) => {
		return (
			<td
				{...props}
				class={cn(
					"border border-cool-200 px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
					props.class,
				)}
			>
				<Slot />
			</td>
		);
	}),
	tr: component$<PropsOf<"tr">>(({ ...props }) => {
		return (
			<tr
				{...props}
				class={cn(
					"m-0 border-t border-cool-300 p-0 even:bg-cool-100",
					props.class,
				)}
			/>
		);
	}),
	Showcase,
};
