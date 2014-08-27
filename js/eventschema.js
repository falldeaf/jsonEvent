eventschema = {

        "type": "array",
        "title": "Events",
        "items": {
            "type": "object",
            "title": "event",
            "oneOf": [
                {
                    "title": "Non-Interactive",
                    "properties": {
                        "action": {
                            "type": "string",
                            "enum": [
              "noninteractive"
            ],
                            "options": {
                                "hidden": true
                            }
                        }
                    },
                    "type": "object",
                    "additionalProperties": true,
                    "required": [
          "action"
        ]
      },
                {
                    "title": "Add Sprite",
                    "properties": {
                        "action": {
                            "type": "string",
                            "enum": [
              "addsprite"
            ],
                            "options": {
                                "hidden": true
                            }
                        },
                        "name": {
                            "type": "string"
                        }
                    },
                    "type": "object",
                    "additionalProperties": true,
                    "required": [
          "action",
          "name"
        ]
      },
                {
                    "title": "Spawn Car",
                    "properties": {
                        "action": {
                            "type": "string",
                            "enum": [
              "spawncar"
            ],
                            "options": {
                                "hidden": true
                            }
                        },
                        "image": {
                            "type": "string"
                        },
                        "anim": {
                            "type": "boolean"
                        },
                        "direction": {
                            "type": "string",
                            "enum": [
              "driveforward",
              "drivebackward",
              "drivesideways"
            ]
                        },
                        "x": {
                            "type": "integer"
                        },
                        "y": {
                            "type": "integer"
                        }
                    },
                    "type": "object",
                    "additionalProperties": true,
                    "required": [
          "action",
          "image",
          "anim",
          "direction",
          "x",
          "y"
        ]
      },
                {
                    "title": "Car Direction",
                    "properties": {
                        "action": {
                            "type": "string",
                            "enum": [
              "cardirection"
            ],
                            "options": {
                                "hidden": true
                            }
                        },
                        "index": {
                            "type": "integer"
                        }
                    },
                    "type": "object",
                    "additionalProperties": true,
                    "required": [
          "action",
          "index"
        ]
      },
                {
                    "title": "Tween To",
                    "properties": {
                        "action": {
                            "type": "string",
                            "enum": [
              "tweento"
            ],
                            "options": {
                                "hidden": true
                            }
                        },
                        "index": {
                            "type": "integer"
                        },
                        "x": {
                            "type": "integer"
                        },
                        "y": {
                            "type": "integer"
                        },
                        "time": {
                            "type": "integer"
                        },
                        "ease": {
                            "type": "string",
                            "enum": [
              "start",
              "stop",
              "cont"
            ]
                        },
                        "direction": {
                            "type": "string",
                            "enum": [
              "up",
              "down",
              "left",
              "right"
            ]
                        },
                        "blocking": {
                            "type": "boolean"
                        }
                    },
                    "type": "object",
                    "additionalProperties": true,
                    "required": [
          "action",
          "index",
          "x",
          "y"
        ]
      },
                {
                    "title": "Blowup Prop",
                    "properties": {
                        "action": {
                            "type": "string",
                            "enum": [
              "blowup"
            ],
                            "options": {
                                "hidden": true
                            }
                        },
                        "index": {
                            "type": "integer"
                        }
                    },
                    "type": "object",
                    "additionalProperties": true,
                    "required": [
          "action",
          "index"
        ]
      },
                {
                    "title": "Add NPC",
                    "properties": {
                        "action": {
                            "type": "string",
                            "enum": [
              "addnpc"
            ],
                            "options": {
                                "hidden": true
                            }
                        },
                        "name": {
                            "type": "string"
                        }
                    },
                    "type": "object",
                    "additionalProperties": true,
                    "required": [
          "action",
          "name"
        ]
      },
                {
                    "title": "Spawn NPC",
                    "properties": {
                        "action": {
                            "type": "string",
                            "enum": [
              "spawnnpc"
            ],
                            "options": {
                                "hidden": true
                            }
                        },
                        "image": {
                            "type": "string"
                        },
                        "dialogue": {
                            "type": "string",
                            "format": "json"
                        },
                        "x": {
                            "type": "integer"
                        },
                        "y": {
                            "type": "integer"
                        },
                        "mobility": {
                            "type": "string",
                            "enum": [
              "stopped",
              "slow",
              "fast",
              "constant",
              "constantfast"
            ]
                        }
                    },
                    "type": "object",
                    "additionalProperties": true,
                    "required": [
          "action",
          "image",
          "dialogue",
          "x",
          "y"
        ]
      },
                {
                    "title": "Direction NPC",
                    "properties": {
                        "action": {
                            "type": "string",
                            "enum": [
              "directionnpc"
            ],
                            "options": {
                                "hidden": true
                            }
                        },
                        "index": {
                            "type": "integer"
                        },
                        "direction": {
                            "type": "string",
                            "enum": [
              "up",
              "down",
              "left",
              "right"
            ]
                        }
                    },
                    "type": "object",
                    "additionalProperties": true,
                    "required": [
          "action",
          "index",
          "direction"
        ]
      },
                {
                    "title": "Move",
                    "properties": {
                        "action": {
                            "type": "string",
                            "enum": [
              "move"
            ],
                            "options": {
                                "hidden": true
                            }
                        },
                        "index": {
                            "type": "integer"
                        },
                        "x": {
                            "type": "integer"
                        },
                        "y": {
                            "type": "integer"
                        }
                    },
                    "type": "object",
                    "additionalProperties": true,
                    "required": [
          "action",
          "index",
          "x",
          "y"
        ]
      },
                {
                    "title": "Move To",
                    "properties": {
                        "action": {
                            "type": "string",
                            "enum": [
              "moveto"
            ],
                            "options": {
                                "hidden": true
                            }
                        },
                        "index": {
                            "type": "integer"
                        },
                        "x": {
                            "type": "integer"
                        },
                        "y": {
                            "type": "integer"
                        }
                    },
                    "type": "object",
                    "additionalProperties": true,
                    "required": [
          "action",
          "index",
          "x",
          "y"
        ]
      },
                {
                    "title": "Process",
                    "properties": {
                        "action": {
                            "type": "string",
                            "enum": [
              "process"
            ],
                            "options": {
                                "hidden": true
                            }
                        }
                    },
                    "type": "object",
                    "additionalProperties": true,
                    "required": [
          "action"
        ]
      },
                {
                    "title": "Teleport",
                    "properties": {
                        "action": {
                            "type": "string",
                            "enum": [
              "teleport"
            ],
                            "options": {
                                "hidden": true
                            }
                        },
                        "index": {
                            "type": "integer"
                        },
                        "hide": {
                            "type": "boolean"
                        },
                        "x": {
                            "type": "integer"
                        },
                        "y": {
                            "type": "integer"
                        }
                    },
                    "type": "object",
                    "additionalProperties": true,
                    "required": [
          "action",
          "index",
          "x",
          "y"
        ]
      },
                {
                    "title": "Dialogue",
                    "properties": {
                        "action": {
                            "type": "string",
                            "enum": [
              "dialogue"
            ],
                            "options": {
                                "hidden": true
                            }
                        },
                        "message_script": {
                            "type": "object",
                            "properties": {
                                "verses": {
                                    "type": "array",
                                    "format": "format",
                                    "title": "verses",
                                    "uniqueItems": true,
                                    "items": {
                                        "type": "object",
                                        "title": "verses",
                                        "properties": {
                                            "item": {
                                                "type": "string"
                                            },
                                            "speech": {
                                                "type": "array",
                                                "format": "table",
                                                "items": {
                                                    "type": "string"
                                                }
                                            },
                                            "speakers": {
                                                "type": "array",
                                                "format": "table",
                                                "items": {
                                                    "type": "string"
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "type": "object",
                    "additionalProperties": true,
                    "required": [
          "action",
          "message_script"
        ]
      },
                {
                    "title": "Follow NPC",
                    "properties": {
                        "action": {
                            "type": "string",
                            "enum": [
              "follow"
            ],
                            "options": {
                                "hidden": true
                            }
                        },
                        "index": {
                            "type": "integer"
                        }
                    },
                    "type": "object",
                    "additionalProperties": true,
                    "required": [
          "action",
          "index"
        ]
      },
                {
                    "title": "Murder NPC",
                    "properties": {
                        "action": {
                            "type": "string",
                            "enum": [
              "addnpc"
            ],
                            "options": {
                                "hidden": true
                            }
                        },
                        "index": {
                            "type": "integer"
                        }
                    },
                    "type": "object",
                    "additionalProperties": true,
                    "required": [
          "action",
          "index"
        ]
      },
                {
                    "title": "Move Viewport",
                    "properties": {
                        "action": {
                            "type": "string",
                            "enum": [
              "viewport"
            ],
                            "options": {
                                "hidden": true
                            }
                        },
                        "x": {
                            "type": "integer"
                        },
                        "y": {
                            "type": "integer"
                        }
                    },
                    "type": "object",
                    "additionalProperties": true,
                    "required": [
          "action",
          "x",
          "y"
        ]
      },
                {
                    "title": "Sound Effect",
                    "properties": {
                        "action": {
                            "type": "string",
                            "enum": [
              "sfx"
            ],
                            "options": {
                                "hidden": true
                            }
                        },
                        "snd": {
                            "type": "string"
                        },
                        "volume": {
                            "type": "integer",
                            "default": 100,
                            "format": "range"
                        },
                        "loop": {
                            "type": "boolean"
                        },
                        "blocking": {
                            "type": "booelan"
                        }
                    },
                    "type": "object",
                    "additionalProperties": true,
                    "required": [
          "action",
          "snd"
        ]
      },
                {
                    "title": "Delay",
                    "properties": {
                        "action": {
                            "type": "string",
                            "enum": [
              "delay"
            ],
                            "options": {
                                "hidden": true
                            }
                        },
                        "delay": {
                            "type": "integer"
                        }
                    },
                    "type": "object",
                    "additionalProperties": true,
                    "required": [
          "action",
          "delay"
        ]
      },
                {
                    "title": "Open Gate",
                    "properties": {
                        "action": {
                            "type": "string",
                            "enum": [
              "gate"
            ],
                            "options": {
                                "hidden": true
                            }
                        },
                        "uid": {
                            "type": "string"
                        }
                    },
                    "type": "object",
                    "additionalProperties": true,
                    "required": [
          "action",
          "uid"
        ]
      },
                {
                    "title": "End Cutscene",
                    "properties": {
                        "action": {
                            "type": "string",
                            "enum": [
              "end"
            ],
                            "options": {
                                "hidden": true
                            }
                        }
                    },
                    "type": "object",
                    "additionalProperties": true,
                    "required": [
          "action"
        ]
      }
    ]
        }
};