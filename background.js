        // const simulatedResponse = {
        //     isFraudulent: true,
        //     riskLevel: "high",
        //     reason: "This website has links to suspicious domains.\nThis website has links to suspicious domains."
        // };

chrome.runtime.onMessage.addListener((message, sender, sendResponse, url) => {
    if (message.type === "checkFraud") {
        console.log("Checking page for fraud: ", sender.tab.url);
        console.log("Received page content: ", message.content);

        fetch("http://nccu-group-8.work/finetune/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ url: sender.tab.url, input: message.content }) // 傳送當前頁面的 URL
        })
        .then(response => response.json())
        .then(data => {

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
            chrome.tabs.sendMessage(sender.tab.id, {
                type: "fraudCheckResult",
                isFraudulent: null,
                riskLevel: null,
                reason: "API request failed or returned invalid response"
            });
        });

    }
});
