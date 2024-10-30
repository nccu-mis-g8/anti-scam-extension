document.addEventListener("DOMContentLoaded", function() {
    // 獲取當前活動頁面的 URL 並顯示給使用者
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const currentUrl = tabs[0].url;
        document.getElementById("url").value = currentUrl;
    });

    // 報告按鈕的點擊事件
    document.getElementById("reportButton").addEventListener("click", function() {
        const url = document.getElementById("url").value;
        let problem = "";

        const selectedValues = Array.from(document.querySelectorAll('.custom-checkbox:checked'))
        .map(checkbox => checkbox.value);
        
        selectedValues.forEach((value, index) => {
            problem += `${index + 1}. ${value}\n`;  // 每個值前加上編號，換行
        });

        // 獲取 "其他" 輸入框的值
        const otherReason = document.getElementById("other-reason-input").value;
        if (otherReason) {
            problem += `${selectedValues.length + 1}. ${otherReason}`; // 編號接著前面的
        }

        if (problem === "") {
            alert("請至少選取或輸入一個原因");
            return;
        }

        fetch("http://nccu-group-8.work/finetune/report", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ url: url, problem: problem })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            alert("報告送出成功!");
            document.getElementById("other-reason-input").value = "";

            // 取消所有 checkbox 的選取
            document.querySelectorAll('.custom-checkbox:checked').forEach(checkbox => {
                checkbox.checked = false;
            });
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Failed to submit the report. Please try again.");
        });
    });
});
