document.getElementById("save").addEventListener("click", () => {
    let category = document.getElementById("category").value;
    let time = document.getElementById("time").value;

    if (!category || !time) {
        document.getElementById("status").innerText = "Please enter all fields!";
        return;
    }

    let userData = { category, time };

    chrome.runtime.sendMessage({ type: "saveData", data: userData }, (response) => {
        if (response.status === "success") {
            document.getElementById("status").innerText = "Preferences saved!";
        }
    });
});
