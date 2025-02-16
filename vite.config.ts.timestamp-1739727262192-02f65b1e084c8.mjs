// vite.config.ts
import { defineConfig } from "file:///Users/jackshelton/dev/open-source/v2-task-docs/node_modules/.pnpm/vite@5.3.5_@types+node@20.14.11_lightningcss@1.29.1/node_modules/vite/dist/node/index.js";
import { qwikVite } from "file:///Users/jackshelton/dev/open-source/v2-task-docs/node_modules/.pnpm/@qwik.dev+core@2.0.0-alpha.6_prettier@3.3.3_vite@5.3.5_@types+node@20.14.11_lightningcss@1.29.1_/node_modules/@qwik.dev/core/dist/optimizer.mjs";
import { qwikRouter } from "file:///Users/jackshelton/dev/open-source/v2-task-docs/node_modules/.pnpm/@qwik.dev+router@2.0.0-alpha.6_acorn@8.14.0_rollup@4.34.1_typescript@5.4.5_vite@5.3.5_@types+_f7jdo7g3nt7rsgwwyduhanriay/node_modules/@qwik.dev/router/lib/vite/index.mjs";
import tsconfigPaths from "file:///Users/jackshelton/dev/open-source/v2-task-docs/node_modules/.pnpm/vite-tsconfig-paths@4.3.2_typescript@5.4.5_vite@5.3.5_@types+node@20.14.11_lightningcss@1.29.1_/node_modules/vite-tsconfig-paths/dist/index.mjs";
import tailwindcss from "file:///Users/jackshelton/dev/open-source/v2-task-docs/node_modules/.pnpm/@tailwindcss+vite@4.0.5_vite@5.3.5_@types+node@20.14.11_lightningcss@1.29.1_/node_modules/@tailwindcss/vite/dist/index.mjs";

// package.json
var package_default = {
  name: "my-qwik-empty-starter",
  description: "Blank project with routing included",
  engines: {
    node: "^18.17.0 || ^20.3.0 || >=21.0.0"
  },
  "engines-annotation": "Mostly required by sharp which needs a Node-API v9 compatible runtime",
  private: true,
  trustedDependencies: [
    "sharp"
  ],
  "trustedDependencies-annotation": "Needed for bun to allow running install scripts",
  type: "module",
  scripts: {
    build: "qwik build",
    "build.client": "vite build",
    "build.preview": "vite build --ssr src/entry.preview.tsx",
    "build.types": "tsc --incremental --noEmit",
    deploy: `echo 'Run "npm run qwik add" to install a server adapter'`,
    dev: "vite --mode ssr",
    "dev.debug": "node --inspect-brk ./node_modules/vite/bin/vite.js --mode ssr --force",
    fmt: "prettier --write .",
    "fmt.check": "prettier --check .",
    lint: 'eslint "src/**/*.ts*"',
    preview: "qwik build preview && vite preview --open",
    start: "vite --open --mode ssr",
    qwik: "qwik"
  },
  devDependencies: {
    "@qwik-ui/headless": "^0.6.5",
    "@qwik.dev/core": "2.0.0-alpha.6",
    "@qwik.dev/router": "2.0.0-alpha.6",
    "@tailwindcss/vite": "^4.0.5",
    "@types/eslint": "8.56.10",
    "@types/estree-jsx": "^1.0.5",
    "@types/node": "20.14.11",
    "@typescript-eslint/eslint-plugin": "7.16.1",
    "@typescript-eslint/parser": "7.16.1",
    clsx: "^2.1.1",
    eslint: "8.57.0",
    "eslint-plugin-qwik": "2.0.0-alpha.6",
    prettier: "3.3.3",
    "tailwind-merge": "^3.0.1",
    tailwindcss: "^4.0.5",
    typescript: "5.4.5",
    undici: "*",
    unified: "^11.0.5",
    vite: "5.3.5",
    "vite-tsconfig-paths": "^4.2.1"
  },
  packageManager: "pnpm@9.13.2+sha512.88c9c3864450350e65a33587ab801acf946d7c814ed1134da4a924f6df5a2120fd36b46aab68f7cd1d413149112d53c7db3a4136624cfd00ff1846a0c6cef48a"
};

// src/mdx/recma-provide-comp.ts
function isNamedFunction(node, name) {
  return Boolean(node.id?.name === name);
}
var recmaProvideComponents = () => {
  let id = 0;
  return (tree) => {
    const replacement = [];
    for (const _node of tree.body) {
      const node = _node;
      if (node.type === "FunctionDeclaration" && node.id) {
        if (isNamedFunction(node, "MDXContent") || isNamedFunction(node, "_createMdxContent")) {
          const symbolName = `${node.id?.name || "mdx"}_${id++}`;
          const declarations = [
            {
              id: node.id,
              type: "VariableDeclarator",
              init: {
                type: "CallExpression",
                callee: {
                  type: "Identifier",
                  name: "_componentQrl"
                },
                arguments: [
                  {
                    type: "CallExpression",
                    callee: {
                      type: "Identifier",
                      name: "_inlinedQrl"
                    },
                    arguments: [
                      {
                        type: "ArrowFunctionExpression",
                        id: null,
                        params: node.params,
                        body: node.body,
                        async: node.async,
                        generator: node.generator
                      },
                      {
                        type: "Literal",
                        value: symbolName,
                        raw: String.raw`"${symbolName}"`
                      },
                      {
                        type: "ArrayExpression",
                        elements: []
                      }
                    ]
                  }
                ]
              }
            }
          ];
          const newNode = {
            type: "VariableDeclaration",
            kind: "const",
            declarations
          };
          replacement.push(newNode);
          continue;
        }
      }
      replacement.push(_node);
    }
    tree.body = replacement;
    tree.body.unshift({
      type: "ImportDeclaration",
      specifiers: [
        {
          type: "ImportSpecifier",
          imported: { type: "Identifier", name: "componentQrl" },
          local: { type: "Identifier", name: "_componentQrl" }
        },
        {
          type: "ImportSpecifier",
          imported: { type: "Identifier", name: "inlinedQrl" },
          local: { type: "Identifier", name: "_inlinedQrl" }
        }
      ],
      source: { type: "Literal", value: "@builder.io/qwik" }
    });
  };
};

// vite.config.ts
var { dependencies = {}, devDependencies = {} } = package_default;
errorOnDuplicatesPkgDeps(devDependencies, dependencies);
var vite_config_default = defineConfig(({ command, mode }) => {
  return {
    plugins: [
      tailwindcss(),
      qwikRouter({
        mdx: {
          providerImportSource: "~/mdx/provider",
          recmaPlugins: [recmaProvideComponents]
        }
      }),
      qwikVite(),
      tsconfigPaths()
    ],
    // This tells Vite which dependencies to pre-build in dev mode.
    optimizeDeps: {
      // Put problematic deps that break bundling here, mostly those with binaries.
      // For example ['better-sqlite3'] if you use that in server functions.
      exclude: []
    },
    /**
     * This is an advanced setting. It improves the bundling of your server code. To use it, make sure you understand when your consumed packages are dependencies or dev dependencies. (otherwise things will break in production)
     */
    // ssr:
    //   command === "build" && mode === "production"
    //     ? {
    //         // All dev dependencies should be bundled in the server build
    //         noExternal: Object.keys(devDependencies),
    //         // Anything marked as a dependency will not be bundled
    //         // These should only be production binary deps (including deps of deps), CLI deps, and their module graph
    //         // If a dep-of-dep needs to be external, add it here
    //         // For example, if something uses `bcrypt` but you don't have it as a dep, you can write
    //         // external: [...Object.keys(dependencies), 'bcrypt']
    //         external: Object.keys(dependencies),
    //       }
    //     : undefined,
    server: {
      headers: {
        // Don't cache the server response in dev mode
        "Cache-Control": "public, max-age=0"
      }
    },
    preview: {
      headers: {
        // Do cache the server response in preview (non-adapter production build)
        "Cache-Control": "public, max-age=600"
      }
    }
  };
});
function errorOnDuplicatesPkgDeps(devDependencies2, dependencies2) {
  let msg = "";
  const duplicateDeps = Object.keys(devDependencies2).filter(
    (dep) => dependencies2[dep]
  );
  const qwikPkg = Object.keys(dependencies2).filter(
    (value) => /qwik/i.test(value)
  );
  msg = `Move qwik packages ${qwikPkg.join(", ")} to devDependencies`;
  if (qwikPkg.length > 0) {
    throw new Error(msg);
  }
  msg = `
    Warning: The dependency "${duplicateDeps.join(", ")}" is listed in both "devDependencies" and "dependencies".
    Please move the duplicated dependencies to "devDependencies" only and remove it from "dependencies"
  `;
  if (duplicateDeps.length > 0) {
    throw new Error(msg);
  }
}
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIiwgInNyYy9tZHgvcmVjbWEtcHJvdmlkZS1jb21wLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2phY2tzaGVsdG9uL2Rldi9vcGVuLXNvdXJjZS92Mi10YXNrLWRvY3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9qYWNrc2hlbHRvbi9kZXYvb3Blbi1zb3VyY2UvdjItdGFzay1kb2NzL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9qYWNrc2hlbHRvbi9kZXYvb3Blbi1zb3VyY2UvdjItdGFzay1kb2NzL3ZpdGUuY29uZmlnLnRzXCI7LyoqXG4gKiBUaGlzIGlzIHRoZSBiYXNlIGNvbmZpZyBmb3Igdml0ZS5cbiAqIFdoZW4gYnVpbGRpbmcsIHRoZSBhZGFwdGVyIGNvbmZpZyBpcyB1c2VkIHdoaWNoIGxvYWRzIHRoaXMgZmlsZSBhbmQgZXh0ZW5kcyBpdC5cbiAqL1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCB0eXBlIFVzZXJDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHsgcXdpa1ZpdGUgfSBmcm9tIFwiQHF3aWsuZGV2L2NvcmUvb3B0aW1pemVyXCI7XG5pbXBvcnQgeyBxd2lrUm91dGVyIH0gZnJvbSBcIkBxd2lrLmRldi9yb3V0ZXIvdml0ZVwiO1xuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSBcInZpdGUtdHNjb25maWctcGF0aHNcIjtcbmltcG9ydCB0YWlsd2luZGNzcyBmcm9tIFwiQHRhaWx3aW5kY3NzL3ZpdGVcIjtcbmltcG9ydCBwa2cgZnJvbSBcIi4vcGFja2FnZS5qc29uXCI7XG5pbXBvcnQgeyByZWNtYVByb3ZpZGVDb21wb25lbnRzIH0gZnJvbSBcIi4vc3JjL21keC9yZWNtYS1wcm92aWRlLWNvbXBcIjtcblxudHlwZSBQa2dEZXAgPSBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+O1xuY29uc3QgeyBkZXBlbmRlbmNpZXMgPSB7fSwgZGV2RGVwZW5kZW5jaWVzID0ge30gfSA9IHBrZyBhcyBhbnkgYXMge1xuXHRkZXBlbmRlbmNpZXM6IFBrZ0RlcDtcblx0ZGV2RGVwZW5kZW5jaWVzOiBQa2dEZXA7XG5cdFtrZXk6IHN0cmluZ106IHVua25vd247XG59O1xuZXJyb3JPbkR1cGxpY2F0ZXNQa2dEZXBzKGRldkRlcGVuZGVuY2llcywgZGVwZW5kZW5jaWVzKTtcblxuLyoqXG4gKiBOb3RlIHRoYXQgVml0ZSBub3JtYWxseSBzdGFydHMgZnJvbSBgaW5kZXguaHRtbGAgYnV0IHRoZSBxd2lrQ2l0eSBwbHVnaW4gbWFrZXMgc3RhcnQgYXQgYHNyYy9lbnRyeS5zc3IudHN4YCBpbnN0ZWFkLlxuICovXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgY29tbWFuZCwgbW9kZSB9KTogVXNlckNvbmZpZyA9PiB7XG5cdHJldHVybiB7XG5cdFx0cGx1Z2luczogW1xuXHRcdFx0dGFpbHdpbmRjc3MoKSxcblx0XHRcdHF3aWtSb3V0ZXIoe1xuXHRcdFx0XHRtZHg6IHtcblx0XHRcdFx0XHRwcm92aWRlckltcG9ydFNvdXJjZTogXCJ+L21keC9wcm92aWRlclwiLFxuXHRcdFx0XHRcdHJlY21hUGx1Z2luczogW3JlY21hUHJvdmlkZUNvbXBvbmVudHNdLFxuXHRcdFx0XHR9LFxuXHRcdFx0fSksXG5cdFx0XHRxd2lrVml0ZSgpLFxuXHRcdFx0dHNjb25maWdQYXRocygpLFxuXHRcdF0sXG5cdFx0Ly8gVGhpcyB0ZWxscyBWaXRlIHdoaWNoIGRlcGVuZGVuY2llcyB0byBwcmUtYnVpbGQgaW4gZGV2IG1vZGUuXG5cdFx0b3B0aW1pemVEZXBzOiB7XG5cdFx0XHQvLyBQdXQgcHJvYmxlbWF0aWMgZGVwcyB0aGF0IGJyZWFrIGJ1bmRsaW5nIGhlcmUsIG1vc3RseSB0aG9zZSB3aXRoIGJpbmFyaWVzLlxuXHRcdFx0Ly8gRm9yIGV4YW1wbGUgWydiZXR0ZXItc3FsaXRlMyddIGlmIHlvdSB1c2UgdGhhdCBpbiBzZXJ2ZXIgZnVuY3Rpb25zLlxuXHRcdFx0ZXhjbHVkZTogW10sXG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIFRoaXMgaXMgYW4gYWR2YW5jZWQgc2V0dGluZy4gSXQgaW1wcm92ZXMgdGhlIGJ1bmRsaW5nIG9mIHlvdXIgc2VydmVyIGNvZGUuIFRvIHVzZSBpdCwgbWFrZSBzdXJlIHlvdSB1bmRlcnN0YW5kIHdoZW4geW91ciBjb25zdW1lZCBwYWNrYWdlcyBhcmUgZGVwZW5kZW5jaWVzIG9yIGRldiBkZXBlbmRlbmNpZXMuIChvdGhlcndpc2UgdGhpbmdzIHdpbGwgYnJlYWsgaW4gcHJvZHVjdGlvbilcblx0XHQgKi9cblx0XHQvLyBzc3I6XG5cdFx0Ly8gICBjb21tYW5kID09PSBcImJ1aWxkXCIgJiYgbW9kZSA9PT0gXCJwcm9kdWN0aW9uXCJcblx0XHQvLyAgICAgPyB7XG5cdFx0Ly8gICAgICAgICAvLyBBbGwgZGV2IGRlcGVuZGVuY2llcyBzaG91bGQgYmUgYnVuZGxlZCBpbiB0aGUgc2VydmVyIGJ1aWxkXG5cdFx0Ly8gICAgICAgICBub0V4dGVybmFsOiBPYmplY3Qua2V5cyhkZXZEZXBlbmRlbmNpZXMpLFxuXHRcdC8vICAgICAgICAgLy8gQW55dGhpbmcgbWFya2VkIGFzIGEgZGVwZW5kZW5jeSB3aWxsIG5vdCBiZSBidW5kbGVkXG5cdFx0Ly8gICAgICAgICAvLyBUaGVzZSBzaG91bGQgb25seSBiZSBwcm9kdWN0aW9uIGJpbmFyeSBkZXBzIChpbmNsdWRpbmcgZGVwcyBvZiBkZXBzKSwgQ0xJIGRlcHMsIGFuZCB0aGVpciBtb2R1bGUgZ3JhcGhcblx0XHQvLyAgICAgICAgIC8vIElmIGEgZGVwLW9mLWRlcCBuZWVkcyB0byBiZSBleHRlcm5hbCwgYWRkIGl0IGhlcmVcblx0XHQvLyAgICAgICAgIC8vIEZvciBleGFtcGxlLCBpZiBzb21ldGhpbmcgdXNlcyBgYmNyeXB0YCBidXQgeW91IGRvbid0IGhhdmUgaXQgYXMgYSBkZXAsIHlvdSBjYW4gd3JpdGVcblx0XHQvLyAgICAgICAgIC8vIGV4dGVybmFsOiBbLi4uT2JqZWN0LmtleXMoZGVwZW5kZW5jaWVzKSwgJ2JjcnlwdCddXG5cdFx0Ly8gICAgICAgICBleHRlcm5hbDogT2JqZWN0LmtleXMoZGVwZW5kZW5jaWVzKSxcblx0XHQvLyAgICAgICB9XG5cdFx0Ly8gICAgIDogdW5kZWZpbmVkLFxuXG5cdFx0c2VydmVyOiB7XG5cdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdC8vIERvbid0IGNhY2hlIHRoZSBzZXJ2ZXIgcmVzcG9uc2UgaW4gZGV2IG1vZGVcblx0XHRcdFx0XCJDYWNoZS1Db250cm9sXCI6IFwicHVibGljLCBtYXgtYWdlPTBcIixcblx0XHRcdH0sXG5cdFx0fSxcblx0XHRwcmV2aWV3OiB7XG5cdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdC8vIERvIGNhY2hlIHRoZSBzZXJ2ZXIgcmVzcG9uc2UgaW4gcHJldmlldyAobm9uLWFkYXB0ZXIgcHJvZHVjdGlvbiBidWlsZClcblx0XHRcdFx0XCJDYWNoZS1Db250cm9sXCI6IFwicHVibGljLCBtYXgtYWdlPTYwMFwiLFxuXHRcdFx0fSxcblx0XHR9LFxuXHR9O1xufSk7XG5cbi8vICoqKiB1dGlscyAqKipcblxuLyoqXG4gKiBGdW5jdGlvbiB0byBpZGVudGlmeSBkdXBsaWNhdGUgZGVwZW5kZW5jaWVzIGFuZCB0aHJvdyBhbiBlcnJvclxuICogQHBhcmFtIHtPYmplY3R9IGRldkRlcGVuZGVuY2llcyAtIExpc3Qgb2YgZGV2ZWxvcG1lbnQgZGVwZW5kZW5jaWVzXG4gKiBAcGFyYW0ge09iamVjdH0gZGVwZW5kZW5jaWVzIC0gTGlzdCBvZiBwcm9kdWN0aW9uIGRlcGVuZGVuY2llc1xuICovXG5mdW5jdGlvbiBlcnJvck9uRHVwbGljYXRlc1BrZ0RlcHMoXG5cdGRldkRlcGVuZGVuY2llczogUGtnRGVwLFxuXHRkZXBlbmRlbmNpZXM6IFBrZ0RlcCxcbikge1xuXHRsZXQgbXNnID0gXCJcIjtcblx0Ly8gQ3JlYXRlIGFuIGFycmF5ICdkdXBsaWNhdGVEZXBzJyBieSBmaWx0ZXJpbmcgZGV2RGVwZW5kZW5jaWVzLlxuXHQvLyBJZiBhIGRlcGVuZGVuY3kgYWxzbyBleGlzdHMgaW4gZGVwZW5kZW5jaWVzLCBpdCBpcyBjb25zaWRlcmVkIGEgZHVwbGljYXRlLlxuXHRjb25zdCBkdXBsaWNhdGVEZXBzID0gT2JqZWN0LmtleXMoZGV2RGVwZW5kZW5jaWVzKS5maWx0ZXIoXG5cdFx0KGRlcCkgPT4gZGVwZW5kZW5jaWVzW2RlcF0sXG5cdCk7XG5cblx0Ly8gaW5jbHVkZSBhbnkga25vd24gcXdpayBwYWNrYWdlc1xuXHRjb25zdCBxd2lrUGtnID0gT2JqZWN0LmtleXMoZGVwZW5kZW5jaWVzKS5maWx0ZXIoKHZhbHVlKSA9PlxuXHRcdC9xd2lrL2kudGVzdCh2YWx1ZSksXG5cdCk7XG5cblx0Ly8gYW55IGVycm9ycyBmb3IgbWlzc2luZyBcInF3aWstY2l0eS1wbGFuXCJcblx0Ly8gW1BMVUdJTl9FUlJPUl06IEludmFsaWQgbW9kdWxlIFwiQHF3aWstcm91dGVyLWNvbmZpZ1wiIGlzIG5vdCBhIHZhbGlkIHBhY2thZ2Vcblx0bXNnID0gYE1vdmUgcXdpayBwYWNrYWdlcyAke3F3aWtQa2cuam9pbihcIiwgXCIpfSB0byBkZXZEZXBlbmRlbmNpZXNgO1xuXG5cdGlmIChxd2lrUGtnLmxlbmd0aCA+IDApIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IobXNnKTtcblx0fVxuXG5cdC8vIEZvcm1hdCB0aGUgZXJyb3IgbWVzc2FnZSB3aXRoIHRoZSBkdXBsaWNhdGVzIGxpc3QuXG5cdC8vIFRoZSBgam9pbmAgZnVuY3Rpb24gaXMgdXNlZCB0byByZXByZXNlbnQgdGhlIGVsZW1lbnRzIG9mIHRoZSAnZHVwbGljYXRlRGVwcycgYXJyYXkgYXMgYSBjb21tYS1zZXBhcmF0ZWQgc3RyaW5nLlxuXHRtc2cgPSBgXG4gICAgV2FybmluZzogVGhlIGRlcGVuZGVuY3kgXCIke2R1cGxpY2F0ZURlcHMuam9pbihcIiwgXCIpfVwiIGlzIGxpc3RlZCBpbiBib3RoIFwiZGV2RGVwZW5kZW5jaWVzXCIgYW5kIFwiZGVwZW5kZW5jaWVzXCIuXG4gICAgUGxlYXNlIG1vdmUgdGhlIGR1cGxpY2F0ZWQgZGVwZW5kZW5jaWVzIHRvIFwiZGV2RGVwZW5kZW5jaWVzXCIgb25seSBhbmQgcmVtb3ZlIGl0IGZyb20gXCJkZXBlbmRlbmNpZXNcIlxuICBgO1xuXG5cdC8vIFRocm93IGFuIGVycm9yIHdpdGggdGhlIGNvbnN0cnVjdGVkIG1lc3NhZ2UuXG5cdGlmIChkdXBsaWNhdGVEZXBzLmxlbmd0aCA+IDApIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IobXNnKTtcblx0fVxufVxuIiwgIntcblx0XCJuYW1lXCI6IFwibXktcXdpay1lbXB0eS1zdGFydGVyXCIsXG5cdFwiZGVzY3JpcHRpb25cIjogXCJCbGFuayBwcm9qZWN0IHdpdGggcm91dGluZyBpbmNsdWRlZFwiLFxuXHRcImVuZ2luZXNcIjoge1xuXHRcdFwibm9kZVwiOiBcIl4xOC4xNy4wIHx8IF4yMC4zLjAgfHwgPj0yMS4wLjBcIlxuXHR9LFxuXHRcImVuZ2luZXMtYW5ub3RhdGlvblwiOiBcIk1vc3RseSByZXF1aXJlZCBieSBzaGFycCB3aGljaCBuZWVkcyBhIE5vZGUtQVBJIHY5IGNvbXBhdGlibGUgcnVudGltZVwiLFxuXHRcInByaXZhdGVcIjogdHJ1ZSxcblx0XCJ0cnVzdGVkRGVwZW5kZW5jaWVzXCI6IFtcblx0XHRcInNoYXJwXCJcblx0XSxcblx0XCJ0cnVzdGVkRGVwZW5kZW5jaWVzLWFubm90YXRpb25cIjogXCJOZWVkZWQgZm9yIGJ1biB0byBhbGxvdyBydW5uaW5nIGluc3RhbGwgc2NyaXB0c1wiLFxuXHRcInR5cGVcIjogXCJtb2R1bGVcIixcblx0XCJzY3JpcHRzXCI6IHtcblx0XHRcImJ1aWxkXCI6IFwicXdpayBidWlsZFwiLFxuXHRcdFwiYnVpbGQuY2xpZW50XCI6IFwidml0ZSBidWlsZFwiLFxuXHRcdFwiYnVpbGQucHJldmlld1wiOiBcInZpdGUgYnVpbGQgLS1zc3Igc3JjL2VudHJ5LnByZXZpZXcudHN4XCIsXG5cdFx0XCJidWlsZC50eXBlc1wiOiBcInRzYyAtLWluY3JlbWVudGFsIC0tbm9FbWl0XCIsXG5cdFx0XCJkZXBsb3lcIjogXCJlY2hvICdSdW4gXFxcIm5wbSBydW4gcXdpayBhZGRcXFwiIHRvIGluc3RhbGwgYSBzZXJ2ZXIgYWRhcHRlcidcIixcblx0XHRcImRldlwiOiBcInZpdGUgLS1tb2RlIHNzclwiLFxuXHRcdFwiZGV2LmRlYnVnXCI6IFwibm9kZSAtLWluc3BlY3QtYnJrIC4vbm9kZV9tb2R1bGVzL3ZpdGUvYmluL3ZpdGUuanMgLS1tb2RlIHNzciAtLWZvcmNlXCIsXG5cdFx0XCJmbXRcIjogXCJwcmV0dGllciAtLXdyaXRlIC5cIixcblx0XHRcImZtdC5jaGVja1wiOiBcInByZXR0aWVyIC0tY2hlY2sgLlwiLFxuXHRcdFwibGludFwiOiBcImVzbGludCBcXFwic3JjLyoqLyoudHMqXFxcIlwiLFxuXHRcdFwicHJldmlld1wiOiBcInF3aWsgYnVpbGQgcHJldmlldyAmJiB2aXRlIHByZXZpZXcgLS1vcGVuXCIsXG5cdFx0XCJzdGFydFwiOiBcInZpdGUgLS1vcGVuIC0tbW9kZSBzc3JcIixcblx0XHRcInF3aWtcIjogXCJxd2lrXCJcblx0fSxcblx0XCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuXHRcdFwiQHF3aWstdWkvaGVhZGxlc3NcIjogXCJeMC42LjVcIixcblx0XHRcIkBxd2lrLmRldi9jb3JlXCI6IFwiMi4wLjAtYWxwaGEuNlwiLFxuXHRcdFwiQHF3aWsuZGV2L3JvdXRlclwiOiBcIjIuMC4wLWFscGhhLjZcIixcblx0XHRcIkB0YWlsd2luZGNzcy92aXRlXCI6IFwiXjQuMC41XCIsXG5cdFx0XCJAdHlwZXMvZXNsaW50XCI6IFwiOC41Ni4xMFwiLFxuXHRcdFwiQHR5cGVzL2VzdHJlZS1qc3hcIjogXCJeMS4wLjVcIixcblx0XHRcIkB0eXBlcy9ub2RlXCI6IFwiMjAuMTQuMTFcIixcblx0XHRcIkB0eXBlc2NyaXB0LWVzbGludC9lc2xpbnQtcGx1Z2luXCI6IFwiNy4xNi4xXCIsXG5cdFx0XCJAdHlwZXNjcmlwdC1lc2xpbnQvcGFyc2VyXCI6IFwiNy4xNi4xXCIsXG5cdFx0XCJjbHN4XCI6IFwiXjIuMS4xXCIsXG5cdFx0XCJlc2xpbnRcIjogXCI4LjU3LjBcIixcblx0XHRcImVzbGludC1wbHVnaW4tcXdpa1wiOiBcIjIuMC4wLWFscGhhLjZcIixcblx0XHRcInByZXR0aWVyXCI6IFwiMy4zLjNcIixcblx0XHRcInRhaWx3aW5kLW1lcmdlXCI6IFwiXjMuMC4xXCIsXG5cdFx0XCJ0YWlsd2luZGNzc1wiOiBcIl40LjAuNVwiLFxuXHRcdFwidHlwZXNjcmlwdFwiOiBcIjUuNC41XCIsXG5cdFx0XCJ1bmRpY2lcIjogXCIqXCIsXG5cdFx0XCJ1bmlmaWVkXCI6IFwiXjExLjAuNVwiLFxuXHRcdFwidml0ZVwiOiBcIjUuMy41XCIsXG5cdFx0XCJ2aXRlLXRzY29uZmlnLXBhdGhzXCI6IFwiXjQuMi4xXCJcblx0fSxcblx0XCJwYWNrYWdlTWFuYWdlclwiOiBcInBucG1AOS4xMy4yK3NoYTUxMi44OGM5YzM4NjQ0NTAzNTBlNjVhMzM1ODdhYjgwMWFjZjk0NmQ3YzgxNGVkMTEzNGRhNGE5MjRmNmRmNWEyMTIwZmQzNmI0NmFhYjY4ZjdjZDFkNDEzMTQ5MTEyZDUzYzdkYjNhNDEzNjYyNGNmZDAwZmYxODQ2YTBjNmNlZjQ4YVwiXG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9qYWNrc2hlbHRvbi9kZXYvb3Blbi1zb3VyY2UvdjItdGFzay1kb2NzL3NyYy9tZHhcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9qYWNrc2hlbHRvbi9kZXYvb3Blbi1zb3VyY2UvdjItdGFzay1kb2NzL3NyYy9tZHgvcmVjbWEtcHJvdmlkZS1jb21wLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9qYWNrc2hlbHRvbi9kZXYvb3Blbi1zb3VyY2UvdjItdGFzay1kb2NzL3NyYy9tZHgvcmVjbWEtcHJvdmlkZS1jb21wLnRzXCI7aW1wb3J0IHR5cGUge1xuXHRDYWxsRXhwcmVzc2lvbixcblx0RnVuY3Rpb25EZWNsYXJhdGlvbixcblx0TGl0ZXJhbCxcblx0Tm9kZSxcblx0UHJvZ3JhbSxcblx0VmFyaWFibGVEZWNsYXJhdGlvbixcblx0VmFyaWFibGVEZWNsYXJhdG9yLFxufSBmcm9tIFwiZXN0cmVlLWpzeFwiO1xuXG5pbXBvcnQgdHlwZSB7IFBsdWdpbiB9IGZyb20gXCJ1bmlmaWVkXCI7XG5cbmZ1bmN0aW9uIGlzTmFtZWRGdW5jdGlvbihub2RlOiBGdW5jdGlvbkRlY2xhcmF0aW9uLCBuYW1lOiBzdHJpbmcpIHtcblx0cmV0dXJuIEJvb2xlYW4obm9kZS5pZD8ubmFtZSA9PT0gbmFtZSk7XG59XG5cbi8vIGJpb21lLWlnbm9yZSBsaW50L3N1c3BpY2lvdXMvbm9FeHBsaWNpdEFueTogPGV4cGxhbmF0aW9uPlxuZXhwb3J0IGNvbnN0IHJlY21hUHJvdmlkZUNvbXBvbmVudHM6IFBsdWdpbjxhbnksIFByb2dyYW0+ID0gKCkgPT4ge1xuXHRsZXQgaWQgPSAwO1xuXHRyZXR1cm4gKHRyZWUpID0+IHtcblx0XHRjb25zdCByZXBsYWNlbWVudCA9IFtdO1xuXHRcdGZvciAoY29uc3QgX25vZGUgb2YgdHJlZS5ib2R5KSB7XG5cdFx0XHRjb25zdCBub2RlID0gX25vZGUgYXMgTm9kZTtcblx0XHRcdGlmIChub2RlLnR5cGUgPT09IFwiRnVuY3Rpb25EZWNsYXJhdGlvblwiICYmIG5vZGUuaWQpIHtcblx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdGlzTmFtZWRGdW5jdGlvbihub2RlLCBcIk1EWENvbnRlbnRcIikgfHxcblx0XHRcdFx0XHRpc05hbWVkRnVuY3Rpb24obm9kZSwgXCJfY3JlYXRlTWR4Q29udGVudFwiKVxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHQgKiBUcmFuc2Zvcm1zIGZ1bmN0aW9uIE1EWENvbnRlbnQgKHByb3BzID0ge30pIHsuLi59XG5cdFx0XHRcdFx0ICogdG8gY29uc3QgTURYQ29udGVudCA9IF9jb21wb25lbnRRcmwoX2lubGluZWRRcmwoZnVuY3Rpb24gKHByb3BzID0ge30pIHsuLi59LCAnc3ltYm9sTmFtZScsIFtdKSlcblx0XHRcdFx0XHQgKiBhbGxvd3MgdXNpbmcgUXdpayBob29rcyBpbnNpZGVcblx0XHRcdFx0XHQgKiAgKi9cblx0XHRcdFx0XHRjb25zdCBzeW1ib2xOYW1lID0gYCR7bm9kZS5pZD8ubmFtZSB8fCBcIm1keFwifV8ke2lkKyt9YDtcblx0XHRcdFx0XHRjb25zdCBkZWNsYXJhdGlvbnM6IFZhcmlhYmxlRGVjbGFyYXRvcltdID0gW1xuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRpZDogbm9kZS5pZCxcblx0XHRcdFx0XHRcdFx0dHlwZTogXCJWYXJpYWJsZURlY2xhcmF0b3JcIixcblx0XHRcdFx0XHRcdFx0aW5pdDoge1xuXHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiQ2FsbEV4cHJlc3Npb25cIixcblx0XHRcdFx0XHRcdFx0XHRjYWxsZWU6IHtcblx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiSWRlbnRpZmllclwiLFxuXHRcdFx0XHRcdFx0XHRcdFx0bmFtZTogXCJfY29tcG9uZW50UXJsXCIsXG5cdFx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0XHRhcmd1bWVudHM6IFtcblx0XHRcdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJDYWxsRXhwcmVzc2lvblwiLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjYWxsZWU6IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcIklkZW50aWZpZXJcIixcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRuYW1lOiBcIl9pbmxpbmVkUXJsXCIsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGFyZ3VtZW50czogW1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiQXJyb3dGdW5jdGlvbkV4cHJlc3Npb25cIixcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlkOiBudWxsLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cGFyYW1zOiBub2RlLnBhcmFtcyxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGJvZHk6IG5vZGUuYm9keSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGFzeW5jOiBub2RlLmFzeW5jLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Z2VuZXJhdG9yOiBub2RlLmdlbmVyYXRvcixcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiTGl0ZXJhbFwiLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dmFsdWU6IHN5bWJvbE5hbWUsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyYXc6IFN0cmluZy5yYXdgXCIke3N5bWJvbE5hbWV9XCJgLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0gYXMgTGl0ZXJhbCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcIkFycmF5RXhwcmVzc2lvblwiLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZWxlbWVudHM6IFtdLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdF0sXG5cdFx0XHRcdFx0XHRcdFx0XHR9IGFzIENhbGxFeHByZXNzaW9uLFxuXHRcdFx0XHRcdFx0XHRcdF0sXG5cdFx0XHRcdFx0XHRcdH0gYXMgQ2FsbEV4cHJlc3Npb24sXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdF07XG5cdFx0XHRcdFx0Y29uc3QgbmV3Tm9kZTogVmFyaWFibGVEZWNsYXJhdGlvbiA9IHtcblx0XHRcdFx0XHRcdHR5cGU6IFwiVmFyaWFibGVEZWNsYXJhdGlvblwiLFxuXHRcdFx0XHRcdFx0a2luZDogXCJjb25zdFwiLFxuXHRcdFx0XHRcdFx0ZGVjbGFyYXRpb25zLFxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0cmVwbGFjZW1lbnQucHVzaChuZXdOb2RlKTtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmVwbGFjZW1lbnQucHVzaChfbm9kZSk7XG5cdFx0fVxuXHRcdHRyZWUuYm9keSA9IHJlcGxhY2VtZW50O1xuXHRcdHRyZWUuYm9keS51bnNoaWZ0KHtcblx0XHRcdHR5cGU6IFwiSW1wb3J0RGVjbGFyYXRpb25cIixcblx0XHRcdHNwZWNpZmllcnM6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHR5cGU6IFwiSW1wb3J0U3BlY2lmaWVyXCIsXG5cdFx0XHRcdFx0aW1wb3J0ZWQ6IHsgdHlwZTogXCJJZGVudGlmaWVyXCIsIG5hbWU6IFwiY29tcG9uZW50UXJsXCIgfSxcblx0XHRcdFx0XHRsb2NhbDogeyB0eXBlOiBcIklkZW50aWZpZXJcIiwgbmFtZTogXCJfY29tcG9uZW50UXJsXCIgfSxcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHR5cGU6IFwiSW1wb3J0U3BlY2lmaWVyXCIsXG5cdFx0XHRcdFx0aW1wb3J0ZWQ6IHsgdHlwZTogXCJJZGVudGlmaWVyXCIsIG5hbWU6IFwiaW5saW5lZFFybFwiIH0sXG5cdFx0XHRcdFx0bG9jYWw6IHsgdHlwZTogXCJJZGVudGlmaWVyXCIsIG5hbWU6IFwiX2lubGluZWRRcmxcIiB9LFxuXHRcdFx0XHR9LFxuXHRcdFx0XSxcblx0XHRcdHNvdXJjZTogeyB0eXBlOiBcIkxpdGVyYWxcIiwgdmFsdWU6IFwiQGJ1aWxkZXIuaW8vcXdpa1wiIH0s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
