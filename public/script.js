// List of possible Side Quests that can be randomly generated.
 const sideQuests = [
    "Mini Expedition: Take a 10-minute walk and explore your surroundings.",
    "Potion Refill: Make yourself a refreshing drink and recharge your energy.",
    "Character Stretch: Stretch for 5 minutes and prepare your character for the next quest.",
    "Listen to your favourite song without doing anything else.",
    "Spend 10 minutes doing something creative.",
    "Read a few pages of a book you enjoy.",
    "Take a short break from your screen.",
    "Write down three things you are grateful for.",
    "Tidy one small area of your room.",
    "Spend 15 minutes doing something that makes you happy.",
    "Message a friend you have not spoken to recently.",
    "Call someone you care about.",
    "Ask a friend to go for a walk with you.",
    "NPC Interaction: Tell someone something you appreciate about them.",
    "Play a board game or card game.",
    "Explore somewhere nearby that you have never visited.",
    "Take a different route when going for a walk.",
    "Sit outside and enjoy the fresh air.",
    "Take some photographs of things you find interesting.",
    "Visit a park or peaceful outdoor space.",
    "Make yourself a favourite snack.",
    "Try drawing something without worrying about making it perfect.",
    "Write a short story about a completely random idea.",
    "Doodle for 10 minutes.",
    "Try a new recipe.",
    "Make a playlist for your current mood.",
    "Dance to one of your favourite songs.",
    "Build a blanket fort.",
    "Watch a funny video and allow yourself to laugh.",
    "Play a game just for fun.",
    "Do absolutely nothing for 10 minutes.",
    "Digital Escape: Put your phone away and enjoy some quiet time.",
    "Respawn: Take five slow, deep breaths and reset your character.",
    "Spend 10 minutes away from social media.",
    "Have a screen-free snack break.",
    "Make your bed and enjoy the feeling of a tidy room.",
    "Organise one small part of your workspace.",
    "Clear five unnecessary items from your room.",
    "Write down something you are proud of yourself for.",
    "Write down one thing you are looking forward to.",
    "Give yourself a proper break from studying or working.",
    "Put on your favourite outfit just because.",
    "Make your favourite drink and enjoy it slowly.",
    "Listen to a song from your childhood.",
    "Watch an episode of something you enjoy.",
    "Spend some time with a pet.",
    "Look out the window and notice what is happening outside.",
    "Go outside and look at the sky.",
    "Treasure Hunt: Find something in your room that you have not used in a while.",
    "Mystery Quest: Pick a random small area and spend five minutes tidying it.",
    "Soundtrack Quest: Choose a song that matches your current mood.",
    "Memory Lane: Look at an old photo and remember the story behind it.",
    "Window Watch: Sit by a window for five minutes and notice what is happening outside.",
    "Tiny Adventure: Visit somewhere nearby that you normally walk past.",
    "Lucky Dip: Pick a random book, open it to a random page and read it.",
    "Boss Battle: Spend five minutes tackling one tiny task you have been putting off.",
    "Inventory Check: Remove five unnecessary items from your bag, desk or workspace.",
    "Achievement Unlocked: Write down one thing you have accomplished recently that you are proud of.",
    "Balance Challenge: Try to balance a random object on your head for 10 seconds.",
    "Main Character Moment: Pretend you are the main character in a movie for five minutes.",
    "Superhero Origin Story: Make up a ridiculous superhero name for yourself.",
    "Character Impression: Do your best impression of a video game character.",
    "Wear mismatched socks for the rest of the day.",
    "Give yourself a silly challenge.",
    "Create a ridiculous nickname for yourself.",
    "Have a mini dance party in your room.",
    "Do your best victory celebration.",
    "Make a cup of tea or coffee and pretend you are in a cosy café.",
    "Spend 15 minutes doing something that makes you lose track of time."
];

// Stores the current Side Quest.
let currentQuest = "";

// Stores the previous Side Quest so the same quest is not generated twice in a row.
let previousQuest = "";

// Finds the elements from the HTML that we need to use.
const generatedHabit = document.getElementById("generated-habit");
const generateButton = document.getElementById("generate-button");
const acceptButton = document.getElementById("accept-button");
const rejectButton = document.getElementById("reject-button");

// Load saved Side Quests and total XP when the page opens.
document.addEventListener("DOMContentLoaded", () => {
    loadQuests();
    loadXP();
});

// LOAD TOTAL XP.
async function loadXP() {

    // Requests the total XP from the server.
    try {

        const response = await fetch("http://localhost:3000/xp");

        if (!response.ok) {

            const errorData = await response.json();

            console.error("Error loading total XP:", errorData);

            alert(`Error loading XP: ${errorData.message || errorData.error || "Unknown error"}`);

            return;
        }

        // Gets the total XP returned by the server.
        const result = await response.json();

        // Displays the total XP on the webpage.
        document.getElementById("total-xp").textContent = result.totalXP;

    } catch (error) {

        console.error("Error loading total XP:", error);

        alert("A network error occurred while loading XP. Please make sure the server is running.");

    }
}

// GENERATE SIDE QUEST.
generateButton.addEventListener("click", () => {

    // Generates a random number based on the number of Side Quests.
    let randomIndex = Math.floor(Math.random() * sideQuests.length);

    // Prevents the same Side Quest from being generated twice in a row.
    while (sideQuests[randomIndex] === previousQuest) {
        randomIndex = Math.floor(Math.random() * sideQuests.length);
    }

    // Selects and stores the randomly generated Side Quest.
    currentQuest = sideQuests[randomIndex];

    // Stores this quest as the previous quest.
    previousQuest = currentQuest;

    // Displays the Side Quest on the webpage.
    generatedHabit.textContent = currentQuest;

});

// ACCEPT SIDE QUEST.
acceptButton.addEventListener("click", async () => {

    // Checks whether the user has generated a Side Quest first.
    if (!currentQuest) {
        alert("Please spin for a Side Quest first!");
        return;
    }

    // Gives the accepted Side Quest 10 XP.
    const xp = 10;

    try {

        // Sends the accepted Side Quest to the backend.
        const response = await fetch("http://localhost:3000/quests", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                habit: currentQuest,
                xp: xp
            })

        });

        const result = await response.json();

        // Checks whether the server accepted the request.
        if (!response.ok) {

            console.error("Error adding Side Quest:", result);

            alert(`Error adding Side Quest: ${result.message || result.error || "Unknown error"}`);

            return;
        }

        // Confirms that the Side Quest was saved.
        console.log("Side Quest added successfully:", result);

        alert("Side Quest accepted and added to your Quest Log! 🎮");

        // Refreshes the Quest Log.
        loadQuests();

        // Clears the current Side Quest after it has been accepted.
        currentQuest = "";

        generatedHabit.textContent = "Spin to discover your next Side Quest!";

    } catch (error) {

        // Handles network or server errors.
        console.error("Error adding Side Quest:", error);

        alert("A network error occurred. Please make sure the server is running.");

    }

});

// REJECT SIDE QUEST.
rejectButton.addEventListener("click", () => {

    // Checks whether a Side Quest has been generated.
    if (!currentQuest) {
        alert("Please spin for a Side Quest first!");
        return;
    }

    // Removes the current Side Quest.
    currentQuest = "";

    // Resets the generator display.
    generatedHabit.textContent = "Spin again to discover a new Side Quest!";

});

// LOAD QUESTS.
async function loadQuests() {

    // Requests all accepted Side Quests from the server.
    try {

        const response = await fetch("http://localhost:3000/quests");

        if (!response.ok) {

            const errorData = await response.json();

            console.error("Error fetching Side Quests:", errorData);

            alert(`Error loading Side Quests: ${errorData.message || errorData.error || "Unknown error"}`);

            return;
        }

        // Gets the Side Quests returned by the server.
        const quests = await response.json();

        // Finds the table body where the quests will be displayed.
        const tbody = document.getElementById("quest-table-body");

        // Removes the old table contents before loading the quests.
        tbody.innerHTML = "";

        // Displays a message if there are no accepted Side Quests.
        if (quests.length === 0) {

            tbody.innerHTML = `
                <tr>
                    <td colspan="4">No Side Quests yet. Your next adventure awaits! 🎮</td>
                </tr>
            `;

            return;
        }

        // Adds each Side Quest to the table.
        quests.forEach(quest => {

            const row = document.createElement("tr");

            if (quest.status === "Completed") {
                row.classList.add("completed-quest");
            }

            row.innerHTML = `
                <td>${quest.habit}</td>

                <td>${quest.status}</td>

                <td>${quest.xp} XP</td>

                <td>
                    ${
                        quest.status === "Active"
                            ? `<button onclick="completeQuest(${quest.id})">Complete Quest</button>`
                            : "Completed ✓"
                    }

                    <button onclick="deleteQuest(${quest.id})">
                        Delete Quest
                    </button>
                </td>
            `;

            // Adds the new row to the Quest Log.
            tbody.appendChild(row);

        });

    } catch (error) {

        console.error("Error fetching Side Quests:", error);

        alert("A network error occurred. Please make sure the server is running.");

    }
}

// COMPLETE QUEST.
async function completeQuest(id) {

    // Asks the user to confirm that they have completed the Side Quest.
    if (!confirm("Have you completed this Side Quest?")) {
        return;
    }

    try {

        // Sends a request to the server to update the quest.
        const response = await fetch(`http://localhost:3000/quests/${id}`, {

            method: "PATCH",

            headers: {
                "Content-Type": "application/json"
            }

        });

        const result = await response.json();

        // Checks whether the server successfully updated the quest.
        if (!response.ok) {

            console.error("Error completing Side Quest:", result);

            alert(`Error completing Side Quest: ${result.message || result.error || "Unknown error"}`);

            return;
        }

        // Confirms that the Side Quest was completed.
        alert("Side Quest completed! You earned your XP! ⭐");

        // Refreshes the Quest Log and total XP.
        loadQuests();
        loadXP();

    } catch (error) {

        console.error("Error completing Side Quest:", error);

        alert("A network error occurred. Please make sure the server is running.");

    }

}

// DELETE QUEST.
async function deleteQuest(id) {

    // Asks the user to confirm before deleting the Side Quest.
    if (!confirm(`Are you sure you want to delete this Side Quest? This action cannot be undone!`)) {
        return;
    }

    try {

        // Sends a request to the server to delete the Side Quest.
        const response = await fetch(`http://localhost:3000/quests/${id}`, {

            method: "DELETE"

        });

        const result = await response.json();

        // Checks whether the server successfully deleted the Side Quest.
        if (!response.ok) {

            console.error(`Error deleting Side Quest ID ${id}:`, result);

            alert(`Error deleting Side Quest: ${result.message || result.error || "Unknown error"}`);

            return;
        }

        // Confirms that the Side Quest was deleted.
        console.log("Side Quest deleted:", result);

        alert(result.message || "Side Quest deleted successfully :)");

        // Refreshes the Quest Log and total XP after the quest is deleted.
        loadQuests();
        loadXP();

    } catch (error) {

        // Handles network or server errors.
        console.error("Error deleting Side Quest:", error);

        alert("A network error occurred. Please make sure the server is running.");

    }

}