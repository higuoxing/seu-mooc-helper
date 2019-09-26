/// First time initialization.
chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.local.set({
    auto_play: true,
    auto_answer: true,
  }, function () {
    console.log("Initialized");
  });
});
