console.log('Activate');

window.addEventListener('mouseup', wordSelected);

function wordSelected() {
    let selectedText = window.getSelection().toString().trim();
    let message = {
        text: selectedText
    }
    chrome.runtime.sendMessage(message);
}