document.addEventListener("DOMContentLoaded", function () {
    const dateInput = document.getElementById("datePicker");
    const tarotCardInput = document.getElementById("tarotCard");
    const spellsInput = document.getElementById("spells");
    const reflectionInput = document.getElementById("reflection");
    const downloadButton = document.getElementById("downloadBtn");

    downloadButton.addEventListener("click", function () {
        const date = dateInput.value ? new Date(dateInput.value).toDateString() : "No date selected";
        const tarotCard = tarotCardInput.value.trim() || "None recorded";
        const spells = spellsInput.value.trim() || "None recorded";
        const reflection = reflectionInput.value.trim() || "None recorded";

        const content = `SPELL DIARY ENTRY\n=================\nDate: ${date}\n\nTAROT CARD OF THE DAY:\n${tarotCard}\n\nSPELLS OF THE DAY:\n${spells}\n\nREFLECTION OF THE DAY:\n${reflection}`;

        const blob = new Blob([content], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement("a");
        a.href = url;
        a.download = `spell-diary-${date.replace(/\s+/g, '-')}.txt`;
        document.body.appendChild(a);
        a.click();
        
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
});
