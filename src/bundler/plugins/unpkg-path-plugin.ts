import * as esbuild from "esbuild-wasm";

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",

    setup(build: esbuild.PluginBuild) {
      // handling root file index.js
      build.onResolve({ filter: /(^index\.js)$/ }, () => {
        return { path: "index.js", namespace: "a" };
      });

      // handling relative path ./ or ../
      build.onResolve({ filter: /^\.+\// }, (args: any) => {
        return {
          namespace: "a",
          path: new URL(args.path, "https://unpkg.com" + args.resolveDir + "/")
            .href,
        };
      });

      // handling main file of a moudle
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        return {
          namespace: "a",
          path: `https://unpkg.com/${args.path}`,
        };
      });
    },
  };
};
