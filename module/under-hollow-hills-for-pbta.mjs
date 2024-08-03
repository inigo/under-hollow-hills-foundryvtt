import {configSheet} from "./helper/config-sheet.mjs";
import {configImagery} from "./helper/imagery.mjs";

Hooks.once('init', () => {
   game.settings.register('under-hollow-hills-for-pbta', 'settings-override', {
      name: "Under Hollow Hills",
      default: false,
      type: Boolean,
      scope: 'world',
      config: true,
      hint: "Under Hollow Hills",
      requiresReload: true
   });
});

Hooks.once('pbtaSheetConfig', () => {
   // Disable the PBTA sheet config form, and replace it with our own
   game.settings.set('pbta', 'sheetConfigOverride', true);
   configSheet();
})

if (game?.pbta) {
   game.pbta.sheetMigration = (source) => {
      console.log("Running sheetMigration for Under Hollow Hills");
      if (source.details?.biography?.value?.rawtext) {
         const serializedBio = JSON.stringify(source.details.biography.value);
         source.details.biography = {
            label: game.i18n.localize("PBTA.Biography"),
            value: serializedBio
         };
         console.log("Biography successfully migrated");
      }
   }
}

configImagery();
