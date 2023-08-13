(() => {
    let onProcess = false;

    const antidote = (arrObj) => {
        setTimeout(() => {
            for (let i = 0; i < arrObj.length; i++) {
                setTimeout(() => {
                    arrObj[i].click();
                }, 1000 * (i + 1));
            }

            setTimeout(() => {
                // Find Delete (x) button
                const spans = document.querySelectorAll(
                    "span[data-bloks-name='bk.components.TextSpan']"
                );

                // Click Delete (x) button
                spans[spans.length - 1].click();
            }, 1000 * (arrObj.length + 5));

            setTimeout(() => {
                // Find delete confirmation button
                const buttons = document.querySelectorAll("button._a9--._a9_1");

                // Delete confirmation
                buttons[0].click();
            }, 1000 * (arrObj.length + 6));

            setTimeout(() => {
                onProcess = false;
            }, 1000 * (arrObj.length + 9));
        }, 200);
    };

    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { type } = obj;

        if (type === "ANTIDOTE") {

            let selectModeButton = document.querySelector(
                "div._aacl._aaco._aacw._aad0._aad6"
            );

            let arrObj = [];
            let somethingWrongAlert = null;
            let somethingWrongButton = null;

            setInterval(() => {

                somethingWrongAlert = document.querySelector("div._a9-v");

                if (somethingWrongAlert !== null) {
                    setTimeout(() => {
                        somethingWrongButton =
                            document.querySelector("button._a9--._a9_1");
                        somethingWrongButton.click();
                    }, 800);
                }

                if (!onProcess) {
                    selectModeButton.click();
                }

                setTimeout(() => {
                    arrObj = document.querySelectorAll(
                        ".wbloks_1 [data-bloks-name='ig.components.Icon']"
                    );

                    if (arrObj.length > 0 && !onProcess) {
                        onProcess = true;
                        antidote(arrObj);
                    }
                }, 800);
            }, 1000);
        }
    });
})();
