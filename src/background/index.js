/*global chrome*/
import config from "../config";
import { syncFolder } from "../chrome";
// If your extension doesn't need a background script, just leave this file empty

// messageInBackground();

// This needs to be an export due to typescript implementation limitation of needing '--isolatedModules' tsconfig
export function messageInBackground() {
  console.log("I can run your javascript like any other code in your project");
  console.log("just do not forget, I cannot render anything !");
}

chrome.runtime.onInstalled.addListener(() => {
  // chrome.storage.sync.clear();

  console.log("111111111111111111111111111111111");

  syncFolder(null, config.rootFolder, (folder) => {
    syncFolder(folder.id, config.tempFolder);
    syncFolder(folder.id, config.mainFolder);
  });
});
