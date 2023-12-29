export const configSheet = async () => {

    game.pbta.sheetConfig = {
        "rollFormula": "2d6",
        "rollResults": {
            "success": {
                "start": 10,
                "end": null,
                "label": "10+ Hit"
            },
            "partial": {
                "start": 7,
                "end": 9,
                "label": "Hit"
            },
            "failure": {
                "start": null,
                "end": 6,
                "label": "Miss"
            }
        },
        "actorTypes": {
            "character": {
                "stats": {
                    "plusThree": {
                        "label": "Plus three (0)",
                        "value": 3
                    },
                    "plusTwo": {
                        "label": "Plus two (3)",
                        "value": 2
                    },
                    "plusOne": {
                        "label": "Plus one (5)",
                        "value": 1
                    },
                    "zero": {
                        "label": "Zero (2)",
                        "value": 0
                    },
                    "minusOne": {
                        "label": "Minus one (2)",
                        "value": -1
                    },
                    "minusTwo": {
                        "label": "Minus two (0)",
                        "value": -2
                    }
                },
                "attrTop": {},
                "attrLeft": {},
                "moveTypes": {
                    "specific": {
                        "label": "Playbook Plays",
                        "moves": []
                    },
                    "obvious": {
                        "label": "Obvious Plays",
                        "moves": []
                    },
                    "obviousnoroll": {
                        "label": "Obvious Plays (no roll)",
                        "moves": []
                    }
                },
                "equipmentTypes": {
                    "trappings": {
                        "label": "Trappings",
                        "moves": []
                    },
                    "consequences": {
                        "label": "Consequences",
                        "moves": []
                    },
                    "bindings": {
                        "label": "Bindings",
                        "moves": []
                    }
                }
            },
            "npc": {
                "attrTop": {},
                "attrLeft": {},
                "moveTypes": {
                    "gmmoves": {
                        "label": "GM Moves",
                        "moves": []
                    }
                }
            },
            "playbill": {
                label: "Playbill",
                "attrTop": {},
                "attrLeft": {},
                "moveTypes": {
                    "performancemoves": {
                        "label": "The Power of Your Performance",
                        "moves": []
                    }
                }
            }
        }
    }

    await game.settings.set('pbta', 'advForward', true);
    await game.settings.set('pbta', 'hideRollFormula', true);
    await game.settings.set('pbta', 'hideForward', false);
    await game.settings.set('pbta', 'hideOngoing', false);
    await game.settings.set('pbta', 'hideRollMode', true);
    await game.settings.set('pbta', 'hideUses', true);
}

Hooks.once('init', () => {
    game.settings.register('under-hollow-hills-for-pbta', 'firstTime', {
        name: "First Time Flag",
        hint: "Used to track if this is the first time the module is loaded in a game.",
        scope: "world",  // This makes the setting specific to each world
        config: false,  // This specifies that the setting does not appear in the settings menu
        type: Boolean,
        default: false,  // Default value is false, indicating the message hasn't been shown yet
    });
});


Hooks.once('ready', async () => {
    if (game.settings.get('under-hollow-hills-for-pbta', 'firstTime') === false) {
        console.info("Sending first time welcome message");
        let chatData = {
            user: game.user.id,
            speaker: ChatMessage.getSpeaker(),
            content: "<p><b>Roll up! Roll up! The Circus is here!</b></p>" +
                "<p>Please create characters via the Actor tab, select an appropriate Playbook (you can see the options in <em>Compendium Packs | Playbooks</em>), " +
                "then drag in the Obvious Plays and your Playbook-specific Plays from <em>Compendium Packs | Plays</em> (you can drag the whole containing folder), the Playbook-specific Trappings from " +
                "<em>Compendium Packs | Trappings</em>, the appropriate Consequences from <em>Compendium Packs | Consequences</em>, and the appropriate Bindings from the <em>Compendium Packs | Bindings</em>.</p>" +
                "<p>For each of your Plays that have an associated roll, edit the Play on your character sheet and choose a <em>Roll</em> - you should have three with 'Plus two', " +
                "two with 'Zero', two with 'Minus one', and the remainder should be 'Plus one'. These are only your plays’ starting rolls; you’ll have many opportunities to change them.</p>" +
                "<p>In the <em>Description</em> section of your character sheet, enter your Imagery (for fairies, this will be for Summer and for Winter; for mortals the names differ but " +
                "the mechanism is the same). See your Playbook for suggested imagery.</p>" +
                "<p>NPCs and the Playbill are created as Actors. They do not have attributes - you can add information about them as free text in their Descriptions.</p>"
        };
        ChatMessage.create(chatData, {});
        await game.settings.set('under-hollow-hills-for-pbta', 'firstTime', true);
    }
});
