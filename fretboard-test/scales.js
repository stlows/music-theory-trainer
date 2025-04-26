const scales = [
    {
        name: 'Minor pentatonic',
        isScale: true,
        shapes: [
            {
                shape: "G",
                notes: [
                    {   
                        string: 6,
                        frets: [
                            {fret: 0, note: 'R'},
                            {fret: 3, note: 'm3'}
                        ]
                    },
                    {   
                        string: 5,
                        frets: [
                            {fret: 0, note: 'P4'},
                            {fret: 2, note: 'P5'}
                        ]
                    },
                    {   
                        string: 4,
                        frets: [
                            {fret: 0, note: 'm7'},
                            {fret: 2, note: 'R'}
                        ]
                    },
                    {   
                        string: 3,
                        frets: [
                            {fret: 0, note: 'm3'},
                            {fret: 2, note: 'P4'}
                        ]
                    },
                    {   
                        string: 2,
                        frets: [
                            {fret: 0, note: 'P5'},
                            {fret: 3, note: 'm7'}
                        ]
                    },
                    {   
                        string: 1,
                        frets: [
                            {fret: 0, note: 'R'},
                            {fret: 3, note: 'm3'}
                        ]
                    },
                ]
            },
            {
                shape: "E",
                notes: [
                    {   
                        string: 6,
                        frets: [
                            {fret: 3, note: 'm3'},
                            {fret: 5, note: 'P4'}
                        ]
                    },
                    {   
                        string: 5,
                        frets: [
                            {fret: 2, note: 'P5'},
                            {fret: 5, note: 'm7'}
                        ]
                    },
                    {   
                        string: 4,
                        frets: [
                            {fret: 2, note: 'R'},
                            {fret: 5, note: 'm3'}
                        ]
                    },
                    {   
                        string: 3,
                        frets: [
                            {fret: 2, note: 'P4'},
                            {fret: 4, note: 'P5'}
                        ]
                    },
                    {   
                        string: 2,
                        frets: [
                            {fret: 3, note: 'm7'},
                            {fret: 5, note: 'R'}
                        ]
                    },
                    {   
                        string: 1,
                        frets: [
                            {fret: 3, note: 'm3'},
                            {fret: 5, note: 'P4'}
                        ]
                    },
                ],
            },
            {
                shape: "D",
                notes: [
                    {   
                        string: 6,
                        frets: [
                            {fret: 5, note: 'P4'},
                            {fret: 7, note: 'P5'}
                        ]
                    },
                    {   
                        string: 5,
                        frets: [
                            {fret: 5, note: 'm7'},
                            {fret: 7, note: 'R'}
                        ]
                    },
                    {   
                        string: 4,
                        frets: [
                            {fret: 5, note: 'm3'},
                            {fret: 7, note: 'P4'}
                        ]
                    },
                    {   
                        string: 3,
                        frets: [
                            {fret: 4, note: 'P5'},
                            {fret: 7, note: 'm7'}
                        ]
                    },
                    {   
                        string: 2,
                        frets: [
                            {fret: 5, note: 'R'},
                            {fret: 8, note: 'm3'}
                        ]
                    },
                    {   
                        string: 1,
                        frets: [
                            {fret: 5, note: 'P4'},
                            {fret: 7, note: 'P5'}
                        ]
                    },
                ],
            },
            {
                shape: "C",
                notes: [
                    {   
                        string: 6,
                        frets: [
                            {fret: 7, note: 'P5'},
                            {fret: 10, note: 'm7'}
                        ]
                    },
                    {   
                        string: 5,
                        frets: [
                            {fret: 7, note: 'R'},
                            {fret: 10, note: 'm3'}
                        ]
                    },
                    {   
                        string: 4,
                        frets: [
                            {fret: 7, note: 'P4'},
                            {fret: 9, note: 'P5'}
                        ]
                    },
                    {   
                        string: 3,
                        frets: [
                            {fret: 7, note: 'm7'},
                            {fret: 9, note: 'R'}
                        ]
                    },
                    {   
                        string: 2,
                        frets: [
                            {fret: 8, note: 'm3'},
                            {fret: 10, note: 'P4'}
                        ]
                    },
                    {   
                        string: 1,
                        frets: [
                            {fret: 7, note: 'P5'},
                            {fret: 10, note: 'm7'}
                        ]
                    },
                ],
            },
            {
                shape: "A",
                notes: [
                    {   
                        string: 6,
                        frets: [
                            {fret: 10, note: 'm7'},
                            {fret: 12, note: 'R'}
                        ]
                    },
                    {   
                        string: 5,
                        frets: [
                            {fret: 10, note: 'm3'},
                            {fret: 12, note: 'P4'}
                        ]
                    },
                    {   
                        string: 4,
                        frets: [
                            {fret: 9, note: 'P5'},
                            {fret: 12, note: 'm7'}
                        ]
                    },
                    {   
                        string: 3,
                        frets: [
                            {fret: 9, note: 'R'},
                            {fret: 12, note: 'm3'}
                        ]
                    },
                    {   
                        string: 2,
                        frets: [
                            {fret: 10, note: 'P4'},
                            {fret: 12, note: 'P5'}
                        ]
                    },
                    {   
                        string: 1,
                        frets: [
                            {fret: 10, note: 'm7'},
                            {fret: 12, note: 'R'}
                        ]
                    },
                ],
            }
        ]
    },
    {
        name: 'Major pentatonic',
        isScale: true,
        shapes: [
            {
                shape: "G",
                notes: [
                    {   
                        string: 6,
                        frets: [
                            {fret: 9, note: 'M6'},
                            {fret: 12, note: 'R'}
                        ]
                    },
                    {   
                        string: 5,
                        frets: [
                            {fret: 9, note: 'M2'},
                            {fret: 11, note: 'M3'}
                        ]
                    },
                    {   
                        string: 4,
                        frets: [
                            {fret: 9, note: 'P5'},
                            {fret: 11, note: 'M6'}
                        ]
                    },
                    {   
                        string: 3,
                        frets: [
                            {fret: 9, note: 'R'},
                            {fret: 11, note: 'M2'}
                        ]
                    },
                    {   
                        string: 2,
                        frets: [
                            {fret: 9, note: 'M3'},
                            {fret: 12, note: 'P5'}
                        ]
                    },
                    {   
                        string: 1,
                        frets: [
                            {fret: 9, note: 'M6'},
                            {fret: 12, note: 'R'}
                        ]
                    },
                ]
            },
            {
                shape: "E",
                notes: [
                    {   
                        string: 6,
                        frets: [
                            {fret: 12, note: 'R'},
                            {fret: 14, note: 'M2'}
                        ]
                    },
                    {   
                        string: 5,
                        frets: [
                            {fret: 11, note: 'M3'},
                            {fret: 14, note: 'P5'}
                        ]
                    },
                    {   
                        string: 4,
                        frets: [
                            {fret: 11, note: 'M6'},
                            {fret: 14, note: 'R'}
                        ]
                    },
                    {   
                        string: 3,
                        frets: [
                            {fret: 11, note: 'M2'},
                            {fret: 13, note: 'M3'}
                        ]
                    },
                    {   
                        string: 2,
                        frets: [
                            {fret: 12, note: 'P5'},
                            {fret: 14, note: 'M6'}
                        ]
                    },
                    {   
                        string: 1,
                        frets: [
                            {fret: 12, note: 'R'},
                            {fret: 14, note: 'M2'}
                        ]
                    },
                ],
            },
            {
                shape: "D",
                notes: [
                    {   
                        string: 6,
                        frets: [
                            {fret: 2, note: 'M2'},
                            {fret: 4, note: 'M3'}
                        ]
                    },
                    {   
                        string: 5,
                        frets: [
                            {fret: 2, note: 'P5'},
                            {fret: 4, note: 'M6'}
                        ]
                    },
                    {   
                        string: 4,
                        frets: [
                            {fret: 2, note: 'R'},
                            {fret: 4, note: 'M2'}
                        ]
                    },
                    {   
                        string: 3,
                        frets: [
                            {fret: 1, note: 'M3'},
                            {fret: 4, note: 'P5'}
                        ]
                    },
                    {   
                        string: 2,
                        frets: [
                            {fret: 2, note: 'M6'},
                            {fret: 5, note: 'R'}
                        ]
                    },
                    {   
                        string: 1,
                        frets: [
                            {fret: 2, note: 'M2'},
                            {fret: 4, note: 'M3'}
                        ]
                    },
                ],
            },
            {
                shape: "C",
                notes: [
                    {   
                        string: 6,
                        frets: [
                            {fret: 4, note: 'M3'},
                            {fret: 7, note: 'P5'}
                        ]
                    },
                    {   
                        string: 5,
                        frets: [
                            {fret: 4, note: 'M6'},
                            {fret: 7, note: 'R'}
                        ]
                    },
                    {   
                        string: 4,
                        frets: [
                            {fret: 4, note: 'M2'},
                            {fret: 6, note: 'M3'}
                        ]
                    },
                    {   
                        string: 3,
                        frets: [
                            {fret: 4, note: 'P5'},
                            {fret: 6, note: 'M6'}
                        ]
                    },
                    {   
                        string: 2,
                        frets: [
                            {fret: 5, note: 'R'},
                            {fret: 7, note: 'M2'}
                        ]
                    },
                    {   
                        string: 1,
                        frets: [
                            {fret: 4, note: 'M3'},
                            {fret: 7, note: 'P5'}
                        ]
                    },
                ],
            },
            {
                shape: "A",
                notes: [
                    {   
                        string: 6,
                        frets: [
                            {fret: 7, note: 'P5'},
                            {fret: 9, note: 'M6'}
                        ]
                    },
                    {   
                        string: 5,
                        frets: [
                            {fret: 7, note: 'R'},
                            {fret: 9, note: 'M2'}
                        ]
                    },
                    {   
                        string: 4,
                        frets: [
                            {fret: 6, note: 'M3'},
                            {fret: 9, note: 'P5'}
                        ]
                    },
                    {   
                        string: 3,
                        frets: [
                            {fret: 6, note: 'M6'},
                            {fret: 9, note: 'R'}
                        ]
                    },
                    {   
                        string: 2,
                        frets: [
                            {fret: 7, note: 'M2'},
                            {fret: 9, note: 'M3'}
                        ]
                    },
                    {   
                        string: 1,
                        frets: [
                            {fret: 7, note: 'P5'},
                            {fret: 9, note: 'M6'}
                        ]
                    },
                ],
            }
        ]
    },
    {
        name: 'Major chord',
        isScale: false,
        shapes: [
            {
                shape: "E",
                notes: [
                    {   
                        string: 6,
                        frets: [
                            {fret: 0, note: 'R'}
                        ]
                    },
                    {   
                        string: 5,
                        frets: [
                            {fret: 2, note: 'P5'}
                        ]
                    },
                    {   
                        string: 4,
                        frets: [
                            {fret: 2, note: 'R'},
                        ]
                    },
                    {   
                        string: 3,
                        frets: [
                            {fret: 1, note: 'M3'}
                        ]
                    },
                    {   
                        string: 2,
                        frets: [
                            {fret: 0, note: 'P5'},
                        ]
                    },
                    {   
                        string: 1,
                        frets: [
                            {fret: 0, note: 'R'},
                        ]
                    },
                ]
            },
            {
                shape: "D",
                notes: [
                    {   
                        string: 4,
                        frets: [
                            {fret: 2, note: 'R'},
                        ]
                    },
                    {   
                        string: 3,
                        frets: [
                            {fret: 4, note: 'P5'}
                        ]
                    },
                    {   
                        string: 2,
                        frets: [
                            {fret: 5, note: 'R'}
                        ]
                    },
                    {   
                        string: 1,
                        frets: [
                            {fret: 4, note: 'M3'},
                        ]
                    },
                ],
            },
            {
                shape: "C",
                notes: [
                    {   
                        string: 5,
                        frets: [
                            {fret: 7, note: 'R'}
                        ]
                    },
                    {   
                        string: 4,
                        frets: [
                            {fret: 6, note: 'M3'},
                        ]
                    },
                    {   
                        string: 3,
                        frets: [
                            {fret: 4, note: 'P5'},
                        ]
                    },
                    {   
                        string: 2,
                        frets: [
                            {fret: 5, note: 'R'},
                        ]
                    },
                    {   
                        string: 1,
                        frets: [
                            {fret: 4, note: 'M3'},
                        ]
                    },
                ],
            },
            {
                shape: "A",
                notes: [
                    {   
                        string: 5,
                        frets: [
                            {fret: 7, note: 'R'},
                        ]
                    },
                    {   
                        string: 4,
                        frets: [
                            {fret: 9, note: 'P5'}
                        ]
                    },
                    {   
                        string: 3,
                        frets: [
                            {fret: 9, note: 'R'}
                        ]
                    },
                    {   
                        string: 2,
                        frets: [
                            {fret: 9, note: 'M3'},
                        ]
                    },
                    {   
                        string: 1,
                        frets: [
                            {fret: 7, note: 'P5'},
                        ]
                    },
                ],
            },
            {
                shape: "G",
                notes: [
                    {   
                        string: 6,
                        frets: [
                            {fret: 12, note: 'R'}
                        ]
                    },
                    {   
                        string: 5,
                        frets: [
                            {fret: 11, note: 'M3'},
                        ]
                    },
                    {   
                        string: 4,
                        frets: [
                            {fret: 9, note: 'P5'},
                        ]
                    },
                    {   
                        string: 3,
                        frets: [
                            {fret: 9, note: 'R'},
                        ]
                    },
                    {   
                        string: 2,
                        frets: [
                            {fret: 9, note: 'M3'},
                        ]
                    },
                    {   
                        string: 1,
                        frets: [
                            {fret: 12, note: 'R'}
                        ]
                    },
                ],
            }
        ]
    },
    {
        name: 'Major triad',
        isScale: false,
        shapes: [
            {
                shape: "E",
                notes: [
                    {   
                        string: 4,
                        frets: [
                            {fret: 2, note: 'R'},
                        ]
                    },
                    {   
                        string: 3,
                        frets: [
                            {fret: 1, note: 'M3'}
                        ]
                    },
                    {   
                        string: 2,
                        frets: [
                            {fret: 0, note: 'P5'},
                        ]
                    },
                ]
            },
            {
                shape: "D",
                notes: [
                    {   
                        string: 3,
                        frets: [
                            {fret: 4, note: 'P5'}
                        ]
                    },
                    {   
                        string: 2,
                        frets: [
                            {fret: 5, note: 'R'}
                        ]
                    },
                    {   
                        string: 1,
                        frets: [
                            {fret: 4, note: 'M3'},
                        ]
                    },
                ],
            },
            {
                shape: "C",
                notes: [
                    {   
                        string: 5,
                        frets: [
                            {fret: 7, note: 'R'}
                        ]
                    },
                    {   
                        string: 4,
                        frets: [
                            {fret: 6, note: 'M3'},
                        ]
                    },
                    {   
                        string: 3,
                        frets: [
                            {fret: 4, note: 'P5'},
                        ]
                    },
                ],
            },
            {
                shape: "A",
                notes: [
                    {   
                        string: 3,
                        frets: [
                            {fret: 9, note: 'R'}
                        ]
                    },
                    {   
                        string: 2,
                        frets: [
                            {fret: 9, note: 'M3'},
                        ]
                    },
                    {   
                        string: 1,
                        frets: [
                            {fret: 7, note: 'P5'},
                        ]
                    },
                ],
            },
            {
                shape: "G",
                notes: [
                    {   
                        string: 6,
                        frets: [
                            {fret: 12, note: 'R'}
                        ]
                    },
                    {   
                        string: 5,
                        frets: [
                            {fret: 11, note: 'M3'},
                        ]
                    },
                    {   
                        string: 4,
                        frets: [
                            {fret: 9, note: 'P5'},
                        ]
                    },
                ],
            }
        ]
    }
]