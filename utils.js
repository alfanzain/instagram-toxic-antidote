export async function getActiveTabUrl() {
    const tabs = await chrome.tabs.query({
        currentWindow: true,
        active: true,
    });

    return tabs[0];
}
