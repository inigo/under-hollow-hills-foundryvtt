/**
 * Displays Summer / Winter imagery in the Description area of the character sheet.
 */
export const configImagery = () => {
    Hooks.on("renderActorSheet", async function (app, html, data) {
        console.info("Rendering actor sheet");
        const actor = app.actor;
        // Non-characters may have imagery, but it can be listed in a text block rather than changing regularly
        if (actor.type!=="character") return;
        const bio = html.find('.cell.cell--bio')[0];

        /*
        We're storing the imagery, and the current checked status, in the "biography" slot, as an object:
            { rawtext: "Summer thing| Winter thing\nAnother | More", checked: [ true, false ] }
        and then updating that on changes.
        */

        const getBio = () => actor.system.details.biography.value;
        const setBio = async (newBio) => {
            let existingBio = getBio() ?? {};
            if (! existingBio.rawtext) existingBio = { rawtext: "", checked: [] };
            existingBio["rawtext"] = newBio;
            await actor.update({ system: { ["details.biography.value"]: existingBio } })
        };
        const setChecked = async (number, value) => {
            let existingBio = getBio() ?? {};
            if (! existingBio.checked) existingBio = { rawtext: "", checked: [] };

            let checked = existingBio.checked;
            const setNthValue = (n, v) => {
                if (n >= checked.length) {
                    checked.length = n + 1;
                    checked.fill(false, checked.length, n);
                }
                checked[n] = v;
            }
            setNthValue(number, value);

            await actor.update({ system: { ["details.biography.value"]: existingBio } })
        };

        const parseImageryFn = (rawText, checkedValues) => {
            let offset = 0;
            return rawText.split("\n")
                .map(s => s.trim())
                .filter(s => s.length > 0)
                .map((item) => {
                    const [left = "", right = ""] = item.split("|")
                        .map((s) => s.trim());
                    const checked = checkedValues[offset++] ?? false;
                    return {left, right, checked};
                });
        };

        const renderValuesFn = (values) => {
            let number = 0;
            return `<div class="imageryValues">`+values.map(v =>
                `<choose>
                    <label>
                        <span>${v.left}</span>
                        <input type="checkbox" data-number="${number++}" ${v.checked ? "checked" : ""}>
                        <span>${v.right}</span>
                    </label>
                </choose>`).join("\n")+`</div>`
        };
        const renderEditor = (v) => {
            return `
                <button class="showImageryEditor">Edit values</button>
                <div class="imageryEditorContainer" style="display: none">
                    <textarea>${v}</textarea>
                    <p>Enter Summer | Winter pairs divided by a |, each on a new line. Don't forget pronouns!</p>
                    <button class="updateImagery">Update</button>
                </div>
            `;
        }

        const display = () => {
            const text = getBio()?.rawtext ?? "More mushrooms, the bullfrog | Fish bones\nLuminous eyes | Bristly hair";
            const checkedValues = getBio()?.checked ?? [];

            const values = parseImageryFn(text, checkedValues);
            bio.innerHTML = renderValuesFn(values) + renderEditor(text);

            const showButton = bio.querySelector(".showImageryEditor");
            const imageryValues = bio.querySelector(".imageryValues");
            const imageryEditingContainer = bio.querySelector(".imageryEditorContainer");
            const imageryEditor = bio.querySelector(".imageryEditorContainer textarea");
            const updateButton = bio.querySelector(".updateImagery");
            const checkboxes = bio.querySelectorAll("input[type='checkbox']");

            showButton.addEventListener("click", () => { imageryValues.style.display = "none"; imageryEditingContainer.style.display = "block"; showButton.style.display = "none"; });
            updateButton.addEventListener("click", async ()=>  { await setBio(imageryEditor.value); display(); });
            checkboxes.forEach(c => c.addEventListener("change", async () => {
                const number = c.dataset.number;
                const value = c.checked;
                // Delay the call to update to allow the CSS transitions to fire first
                setTimeout(async () => {
                    await setChecked(number, value);
                }, 250);
            }));
        }

        display();
    });
}
