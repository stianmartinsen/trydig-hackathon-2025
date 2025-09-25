import { useLoaderData } from "react-router";
import type { Route } from "./+types/assets";
import { readdir } from "fs/promises";
import { join } from "path";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Assets - React Router App" },
    {
      name: "description",
      content: "Browse all game assets organized by category",
    },
  ];
}

export async function loader({}: Route.LoaderArgs) {
  const assetsPath = join(process.cwd(), "public", "assets");
  const folders = await readdir(assetsPath, { withFileTypes: true });

  const assetGroups: Record<string, Record<string, string[]> | string[]> = {};

  for (const folder of folders) {
    if (folder.isDirectory()) {
      const folderPath = join(assetsPath, folder.name);
      const subItems = await readdir(folderPath, { withFileTypes: true });

      // Check if this folder contains subdirectories
      const subDirs = subItems.filter((item) => item.isDirectory());
      const files = subItems.filter((item) => item.isFile());

      if (subDirs.length > 0) {
        // This folder has subdirectories (like Bomberman/Back, Front, Side)
        const subFolderGroups: Record<string, string[]> = {};

        for (const subDir of subDirs) {
          const subDirPath = join(folderPath, subDir.name);
          const subFiles = await readdir(subDirPath);

          // Filter for image files and sort them
          const imageFiles = subFiles
            .filter((file) => /\.(png|jpg|jpeg|gif|svg)$/i.test(file))
            .sort();

          subFolderGroups[subDir.name] = imageFiles;
        }

        assetGroups[folder.name] = subFolderGroups;
      } else {
        // This folder only contains files (like Blocks, Bomb, etc.)
        const imageFiles = files
          .filter((file) => /\.(png|jpg|jpeg|gif|svg)$/i.test(file.name))
          .map((file) => file.name)
          .sort();

        assetGroups[folder.name] = imageFiles;
      }
    }
  }

  return { assetGroups };
}

export default function Assets() {
  const { assetGroups } = useLoaderData<typeof loader>();

  const renderAssetGrid = (files: string[], basePath: string) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {files.map((file) => (
        <div key={file} className="text-center">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2">
            <img
              src={`/assets/${basePath}/${file}`}
              alt={file}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-gray-600 truncate" title={file}>
            {file}
          </p>
        </div>
      ))}
    </div>
  );

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1 className="text-3xl font-bold mb-8">Game Assets</h1>

      <div className="space-y-8">
        {Object.entries(assetGroups).map(([folderName, folderData]) => (
          <div key={folderName} className="border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 capitalize">
              {folderName}
            </h2>

            {Array.isArray(folderData) ? (
              // Simple folder with direct files
              <>
                {renderAssetGrid(folderData, folderName)}
                <p className="text-sm text-gray-500 mt-4">
                  {folderData.length}{" "}
                  {folderData.length === 1 ? "asset" : "assets"}
                </p>
              </>
            ) : (
              // Folder with subfolders
              <div className="space-y-6">
                {Object.entries(folderData).map(([subFolderName, files]) => (
                  <div key={subFolderName}>
                    <h3 className="text-lg font-medium mb-3 capitalize">
                      {subFolderName}
                    </h3>
                    {renderAssetGrid(files, `${folderName}/${subFolderName}`)}
                    <p className="text-sm text-gray-500 mt-2">
                      {files.length} {files.length === 1 ? "asset" : "assets"}
                    </p>
                  </div>
                ))}
                <p className="text-sm text-gray-500 mt-4">
                  Total:{" "}
                  {Object.values(folderData).reduce(
                    (sum, files) => sum + files.length,
                    0
                  )}{" "}
                  assets
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {Object.keys(assetGroups).length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No assets found.</p>
        </div>
      )}
    </main>
  );
}
