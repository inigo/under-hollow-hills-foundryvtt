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
                    }
                }
            },
            "npc": {
                "attrTop": {},
                "attrLeft": {
                    "imagery": {
                        "label": "Imagery",
                        "description": null,
                        "customLabel": false,
                        "userLabel": false,
                        "type": "Text",
                        "value": ""
                    },
                    "craving": {
                        "label": "Craving",
                        "description": null,
                        "customLabel": false,
                        "userLabel": false,
                        "type": "Text",
                        "value": ""
                    }
                },
                "moveTypes": {
                    "gmmoves": {
                        "label": "GM Moves",
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
