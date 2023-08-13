import { getActiveTabUrl } from "./utils.js";

document.addEventListener("DOMContentLoaded", async () => {
    const activeTab = await getActiveTabUrl();
    console.log(activeTab);

    if (
        !activeTab.url.includes(
            "instagram.com/your_activity/interactions/comments"
        )
    ) {
        const container = document.getElementsByClassName("container")[0];

        container.innerHTML =
            '<div class="title">Make sure the active tab is https://www.instagram.com/your_activity/interactions/comments.</div>';
        return;
    }

    var antidoteButton = document.getElementById("antidote");

    antidoteButton.addEventListener("click", async function () {
        chrome.tabs.sendMessage(activeTab.id, {
            type: "ANTIDOTE",
        });
    });
});
