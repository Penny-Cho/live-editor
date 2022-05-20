import axios from "axios";
import * as esbuild from "esbuild-wasm";
import localForage from "localforage";

// save npm packages in the indexedDB so that not have to re-download it again
const fileCache = localForage.createInstance({
  name: "filecache",
});

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log("onResolve", args);
        if (args.path === "index.js") {
          return { path: args.path, namespace: "a" };
        }

        if (args.path.includes("./" || args.path.includes("../"))) {
          return {
            namespace: "a",
            path: new URL(
              args.path,
              "https://unpkg.com" + args.resolveDir + "/"
            ).href,
          };
        }
        return {
          namespace: "a",
          path: `https://unpkg.com/${args.path}`,
        };
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log("onLoad", args);

        if (args.path === "index.js") {
          return {
            loader: "jsx",
            contents: `
              const message = require("react");
              console.log(message);
            `,
          };
        }

        // check if we have already downloaded the file,
        // if it is, it should be in the cache.
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );

        // if it is ithe cache, doesn't have to re-download
        if (cachedResult) {
          return cachedResult;
        }

        const { data, request } = await axios.get(args.path);
        //if it is the first tiem, store the response in cache

        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname,
        };

        await fileCache.setItem(args.path, result);
      });
    },
  };
};
