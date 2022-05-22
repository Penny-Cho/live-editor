import axios from "axios";
import * as esbuild from "esbuild-wasm";
import localForage from "localforage";

// save npm packages in the indexedDB so that not have to re-download it again
const fileCache = localForage.createInstance({
  name: "filecache",
});

export const fetchPlugin = (inputCode: string) => {
  return {
    name: "fetch-plugin",
    setup(build: esbuild.PluginBuild) {
      // jsx type
      build.onLoad({ filter: /(^index\.js$)/ }, () => {
        return {
          loader: "jsx",
          contents: inputCode,
        };
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        // check if we have already downloaded the file,
        //         if it is, it should be in the cache.
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );
        // // if it is ithe cache, doesn't have to re-download
        if (cachedResult) {
          return cachedResult;
        }
      });

      // css type
      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);
        const escaped = data
          .replace(/\n/g, "")
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'");
        const contents = `
            const style = document.createElement("style");
            style.innerText ='${escaped}';
            document.head.appendChild(style);
        `;

        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents,
          resolveDir: new URL("./", request.responseURL).pathname,
        };

        await fileCache.setItem(args.path, result);

        return result;
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);

        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname,
        };

        await fileCache.setItem(args.path, result);

        return result;
      });
    },
  };
};
