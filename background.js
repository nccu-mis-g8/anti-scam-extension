// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     console.log("Message received in background script: ", message);  // 調試語句

//     if (message.type === "showContent") {
//         console.log("Received content from the page:", message.content);
//     }
// });

chrome.runtime.onMessage.addListener((message, sender, sendResponse, url) => {
    if (message.type === "checkFraud") {
        console.log("Checking page for fraud: ", sender.tab.url);
        console.log("Received page content: ", message.content); // 顯示完整的頁面內容



        // const simulatedResponse = {
        //     isFraudulent: true,
        //     riskLevel: "high",
        //     reason: "This website has links to suspicious domains.\nThis website has links to suspicious domains."
        // };

        fetch("http://nccu-group-8.work/finetune/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ url: sender.tab.url }) // 傳送當前頁面的 URL
        })
        .then(response => response.json())
        .then(data => {
            console.log("API Response: ", data);

            // 將 API 回傳的數據發送回 content.js
            chrome.tabs.sendMessage(sender.tab.id, {
                type: "fraudCheckResult",
                isFraudulent: data.FraudOrNot,
                riskLevel: data.Risk_result,
                reason: data.ModelResponse
            });
        })
        .catch(error => {
            console.error("API request failed: ", error);
        });


        // 發送結果回到 content.js
        // chrome.tabs.sendMessage(sender.tab.id, {
        //     type: "fraudCheckResult",
        //     ...simulatedResponse
        // });
    }
});
