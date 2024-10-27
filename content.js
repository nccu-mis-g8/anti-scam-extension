// safe modal
function injectSafeModal() {
    const safeImageUrl = chrome.runtime.getURL("images/safe.png");

    const safeModalHTML = `
        <div id="safeModal" class="modal">
            <div class="safeModal-frame">
                <img src="${safeImageUrl}" alt="safe" />
                <div class="safeModal-content">
                    <div>您嘗試進入的網站風險程度 : 安全</div>
                    <div>請安心繼續使用</div>
                </div>
            <button class="safeButton">確認</button>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', safeModalHTML);
    document.querySelector(".safeButton").addEventListener("click", () => closeModal("safe"));
    window.addEventListener("click", (event) => {
        const modal = document.getElementById("safeModal");
        if (event.target === modal) {
            closeModal("safe");
        }
    });
}

// high risk modal 
function injectHighRiskModal(reason) {
    const dangerImageUrl = chrome.runtime.getURL("images/danger.png");
    const dropDownImageUrl = chrome.runtime.getURL("images/dropDown.png");
    const closeImageUrl = chrome.runtime.getURL("images/close.png");

    const safeModalHTML = `
        <div id="highRiskModal" class="modal">
            <div class="danger-box">
                <div class="side-bar"></div>
                <div class="header">
                    <img src="${dangerImageUrl}" alt="danger" class="dangerImg" />
                    <div class="header-title">
                        <div class="header-title-content">您嘗試進入的網站風險程度：</div>
                        <div class="risk-level">高度危險</div>
                    </div>
                    <div class="functionalBtn-container">
                        <img src="${dropDownImageUrl}" alt="drop down" class="functionalBtn" id="dropDown" />
                        <img src="${closeImageUrl}" alt="close" class="functionalBtn" id="close" />
                    </div>
                </div>
                <div class="danger-details">
                    <div>詐騙風險等級：高</div>
                    <div>原因：${reason}</div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', safeModalHTML);
    document.querySelector("#close").addEventListener("click", () => closeModal("high"));
    document.querySelector("#dropDown").addEventListener("click", () => dropDownDetail("high"));
    window.addEventListener("click", (event) => {
        const modal = document.getElementById("highRiskModal");
        if (event.target === modal) {
            closeModal("high");
        }
    });
}

// middle to high risk modal
function injectMthRiskModal(reason) {
    const warnImageUrl = chrome.runtime.getURL("images/warn.png");
    const dropDownImageUrl = chrome.runtime.getURL("images/dropDown.png");
    const closeImageUrl = chrome.runtime.getURL("images/close.png");

    const mthModalHTML = `
        <div id="mthRiskModal" class="modal">
            <div class="mth-box">
                <div class="mth-side-bar"></div>
                <div class="mth-header">
                    <img src="${warnImageUrl}" alt="warn" class="mthImg" />
                    <div class="mth-header-title">
                        <div class="mth-header-title-content">您嘗試進入的網站風險程度：</div>
                        <div class="mth-risk-level">中高度危險</div>
                    </div>
                    <div class="mth-functionalBtn-container">
                        <img src="${dropDownImageUrl}" alt="drop down" class="mth-functionalBtn" id="dropDown" />
                        <img src="${closeImageUrl}" alt="close" class="mth-functionalBtn" id="close" />
                    </div>
                </div>
                <div class="mth-details">
                    <div>詐騙風險等級：中高</div>
                    <div>原因：${reason}</div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', mthModalHTML);
    document.querySelector("#close").addEventListener("click", () => closeModal("middleToHigh"));
    document.querySelector("#dropDown").addEventListener("click", () => dropDownDetail("middleToHigh"));
    window.addEventListener("click", (event) => {
        const modal = document.getElementById("mthRiskModal");
        if (event.target === modal) {
            closeModal("middleToHigh");
        }
    });
}

// middle risk modal
function injectMiddleRiskModal(reason) {
    const infoImageUrl = chrome.runtime.getURL("images/info.png");
    const dropDownImageUrl = chrome.runtime.getURL("images/dropDown.png");
    const closeImageUrl = chrome.runtime.getURL("images/close.png");

    const middleModalHTML = `
        <div id="middleRiskModal" class="modal">
            <div class="middle-box">
                <div class="middle-side-bar"></div>
                <div class="middle-header">
                    <img src="${infoImageUrl}" alt="danger" class="middleImg" />
                    <div class="middle-header-title">
                        <div class="middle-header-title-content">您嘗試進入的網站風險程度：</div>
                        <div class="middle-risk-level">中度危險</div>
                    </div>
                    <div class="middle-functionalBtn-container">
                        <img src="${dropDownImageUrl}" alt="drop down" class="middle-functionalBtn" id="dropDown" />
                        <img src="${closeImageUrl}" alt="close" class="middle-functionalBtn" id="close" />
                    </div>
                </div>
                <div class="middle-details">
                    <div>詐騙風險等級：中</div>
                    <div>原因：${reason}</div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', middleModalHTML);
    document.querySelector("#close").addEventListener("click", () => closeModal("middle"));
    document.querySelector("#dropDown").addEventListener("click", () => dropDownDetail("middle"));
    window.addEventListener("click", (event) => {
        const modal = document.getElementById("middleRiskModal");
        if (event.target === modal) {
            closeModal("middle");
        }
    });
}

function dropDownDetail(level) {
    if (level === "high") {
        const toggleButton = document.querySelector("#dropDown");
        const details = document.querySelector(".danger-details");

        if (details.style.maxHeight) {
            details.style.maxHeight = null;
            details.classList.remove("danger-details-open")
            toggleButton.classList.remove("rotated");
        } else {
            details.style.maxHeight = details.scrollHeight + "px";
            details.classList.add("danger-details-open")
            toggleButton.classList.add("rotated");
        }
    } else if (level === "middleToHigh") {
        const toggleButton = document.querySelector("#dropDown");
        const details = document.querySelector(".mth-details");

        if (details.style.maxHeight) {
            details.style.maxHeight = null;
            details.classList.remove("mth-details-open")
            toggleButton.classList.remove("rotated");
        } else {
            details.style.maxHeight = details.scrollHeight + "px";
            details.classList.add("mth-details-open")
            toggleButton.classList.add("rotated");
        }
    } else if (level === "middle") {
        const toggleButton = document.querySelector("#dropDown");
        const details = document.querySelector(".middle-details");

        if (details.style.maxHeight) {
            details.style.maxHeight = null;
            details.classList.remove("middle-details-open")
            toggleButton.classList.remove("rotated");
        } else {
            details.style.maxHeight = details.scrollHeight + "px";
            details.classList.add("middle-details-open")
            toggleButton.classList.add("rotated");
        }
    }
}

function injectModalByRiskLevel(riskLevel, reason) {
    if (riskLevel === "safe") {
        injectSafeModal();
        document.getElementById("safeModal").style.display = "flex";
    } else if (riskLevel === "high") {
        injectHighRiskModal(reason);
        document.getElementById("highRiskModal").style.display = "flex";
    } else if (riskLevel === "middleToHigh") {
        injectMthRiskModal(reason);
        document.getElementById("mthRiskModal").style.display = "flex";
    } else if (riskLevel === "middle") {
        injectMiddleRiskModal(reason);
        document.getElementById("middleRiskModal").style.display = "flex";
    }
}

// 關閉模態
function closeModal(level) {
    if (level === "safe") {
        const modal = document.getElementById("safeModal");
        modal.style.display = "none";
    } else if (level === "high") {
        const modal = document.getElementById("highRiskModal");
        modal.style.display = "none";
    } else if (level === "middleToHigh") {
        const modal = document.getElementById("mthRiskModal");
        modal.style.display = "none";
    } else if (level === "middle") {
        const modal = document.getElementById("middleRiskModal");
        modal.style.display = "none";
    }
}

// 獲取整個網頁的 HTML，包括所有標籤
const fullPageContent = document.documentElement.outerHTML;
console.log("Full page content:", fullPageContent);

// 模擬發送訊息到 background.js 檢查詐騙（可以省略API請求的部分）
chrome.runtime.sendMessage({
    type: "checkFraud",
    content: fullPageContent // 將完整的頁面內容發送到背景腳本
});

// 接收 background.js 的回應
chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "fraudCheckResult") {
        const { isFraudulent, riskLevel, reason } = message; 
        if (isFraudulent) {
            injectModalByRiskLevel(riskLevel, reason); // 如果是詐騙，顯示模態
        }
    }
});
