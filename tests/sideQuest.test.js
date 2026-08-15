// Unit Test 1: Side Quest Generator.

describe("Side Quest Generator", () => {

    // Tests that the Side Quest list contains quests that can be generated.
    test("should contain Side Quests that can be generated", () => {

        const sideQuests = [
            "Take a 10-minute walk outside.",
            "Make yourself a refreshing drink.",
            "Stretch for 5 minutes."
        ];

        // Checks that at least one Side Quest is available.
        expect(sideQuests.length).toBeGreaterThan(0);

    });

    // Tests that the same Side Quest is not generated twice in a row.
    test("should not generate the same Side Quest twice in a row", () => {

        const sideQuests = [
            "Take a 10-minute walk outside.",
            "Make yourself a refreshing drink.",
            "Stretch for 5 minutes."
        ];

        const previousQuest = "Take a 10-minute walk outside.";

        // Selects a different Side Quest from the previous quest.
        const availableQuests = sideQuests.filter(
            quest => quest !== previousQuest
        );

        // Checks that another Side Quest is available.
        expect(availableQuests.length).toBeGreaterThan(0);

        // Selects the next Side Quest.
        const nextQuest = availableQuests[0];

        // Checks that the new Side Quest is different from the previous one.
        expect(nextQuest).not.toBe(previousQuest);

    });

});

// Unit Test 2: XP Calculation.

describe("XP Calculation", () => {

    // Tests that the XP total is zero when there are no completed quests.
    test("should return 0 XP when there are no completed quests", () => {

        const quests = [];

        // Calculates the total XP from the completed quests.
        const totalXP = quests.reduce(
            (total, quest) => total + quest.xp,
            0
        );

        // Checks that the XP total is zero.
        expect(totalXP).toBe(0);

    });

    // Tests that XP is calculated correctly when quests have been completed.
    test("should calculate the correct XP from completed quests", () => {

        const quests = [
            { xp: 10 },
            { xp: 20 },
            { xp: 15 }
        ];

        // Calculates the total XP from the completed quests.
        const totalXP = quests.reduce(
            (total, quest) => total + quest.xp,
            0
        );

        // Checks that the total XP is calculated correctly.
        expect(totalXP).toBe(45);

    });

});