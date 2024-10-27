// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     console.log("Message received in background script: ", message);  // 調試語句

//     if (message.type === "showContent") {
//         console.log("Received content from the page:", message.content);
//     }
// });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "checkFraud") {
        console.log("Checking page for fraud: ", sender.tab.url);
        console.log("Received page content: ", message.content); // 顯示完整的頁面內容

        const simulatedResponse = {
            isFraudulent: true,
            riskLevel: "high",
            reason: "This website has links to suspicious domains."
        };


        // 發送結果回到 content.js
        chrome.tabs.sendMessage(sender.tab.id, {
            type: "fraudCheckResult",
            ...simulatedResponse
        });
    }
});
