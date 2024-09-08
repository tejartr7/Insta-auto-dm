const fs = require('fs');
const path = require('path');
const readline = require("readline");
const dotenv = require("dotenv");
const { IgApiClient } = require("instagram-private-api");
const ig = new IgApiClient();
dotenv.config();

// Delay function to introduce gaps between operations
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Initialize user input interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to log in to Instagram
async function login() {
  ig.state.generateDevice(process.env.username);
  try {
    await ig.account.login(process.env.username, process.env.password);
    console.log("Logged in successfully!");
  } catch (error) {
    console.error(`Error during login: ${error.message}`);
  }
}

// Load DM history from JSON file
function loadDmHistory() {
  const filePath = path.join(__dirname, 'dmHistory.json');
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
  }
  const rawData = fs.readFileSync(filePath);
  return JSON.parse(rawData);
}

// Save DM history to JSON file
function saveDmHistory(dmHistory) {
  const filePath = path.join(__dirname, 'dmHistory.json');
  fs.writeFileSync(filePath, JSON.stringify(dmHistory, null, 2));
}

// Auto-follow function (limited to 50 people)
async function autoFollow(accountIdToFollow) {
  try {
    const followersFeed = ig.feed.accountFollowers(accountIdToFollow);
    const followers = await followersFeed.items();
    const maxFollowCount = Math.min(followers.length, 50);

    for (let i = 0; i < maxFollowCount; i++) {
      const follower = followers[i];
      try {
        await ig.friendship.create(follower.pk);
        console.log(`Followed ${follower.username}`);
      } catch (error) {
        console.log(`Failed to follow ${follower.username}: ${error.message}`);
      }

      await delay(5 * 60 * 1000); // 5 minutes
    }
    console.log(`Followed ${maxFollowCount} people.`);
  } catch (error) {
    console.error(`Error during auto-follow: ${error.message}`);
  }
}

// Auto-DM function
async function autoDM() {
  const message = `Hi there! 😊

I noticed you're into tech, and I’m a content creator who shares insights on software development, SaaS, web development, coding, DSA, and app development. Feel free to check out my profile: https://www.instagram.com/weblancerdev/ If you like what you see, I’d be thrilled if you followed me and shared my content with your friends!

Thanks a lot!`;

  let dmHistory = loadDmHistory(); // Load DM history from file

  try {
    const userId = await ig.user.getIdByUsername(process.env.username);
    const followingFeed = ig.feed.accountFollowing(userId);
    const followingUsers = await followingFeed.items();

    for (let i = 0; i < Math.min(15, followingUsers.length); i++) {
      const user = followingUsers[i];
      const username = user.username;

      // Skip if already DMed
      if (dmHistory.includes(username)) {
        console.log(`Already messaged ${username}, skipping...`);
        continue;
      }

      try {
        // Send DM to the user
        const userId = await ig.user.getIdByUsername(username);
        const thread = ig.entity.directThread([userId.toString()]);
        await thread.broadcastText(message);
        console.log(`Message sent to ${username}`);

        // Add user to DM history and save the updated history
        dmHistory.push(username);
        saveDmHistory(dmHistory);
      } catch (error) {
        console.log(`Failed to send message to ${username}: ${error.message}`);
      }

      // Wait 10 minutes before sending the next message
      await delay(10 * 60 * 1000); // 10 minutes
    }
  } catch (error) {
    console.error(`Error during auto-DM: ${error.message}`);
  }
}

// Auto-unfollow function
async function autoUnfollow() {
  try {
    const followingFeed = ig.feed.accountFollowing(process.env.userId);
    const followingUsers = await followingFeed.items();

    for (let i = 0; i < followingUsers.length; i++) {
      const user = followingUsers[i];
      try {
        await ig.friendship.destroy(user.pk);
        console.log(`Unfollowed ${user.username}`);
      } catch (error) {
        console.log(`Failed to unfollow ${user.username}: ${error.message}`);
      }

      await delay(5 * 60 * 1000); // 5 minutes
    }
  } catch (error) {
    console.error(`Error during auto-unfollow: ${error.message}`);
  }
}

// Main function to handle user input
async function main() {
  await login(); // Log in first

  rl.question("Enter 1 to follow, 2 to send auto DMs, or 3 to unfollow: ", async (input) => {
    if (input === "1") {
      rl.question("Enter the account ID to follow their followers: ", async (accountId) => {
        await autoFollow(accountId);
        rl.close();
      });
    } else if (input === "2") {
      await autoDM();
      rl.close();
    } else if (input === "3") {
      await autoUnfollow();
      rl.close();
    } else {
      console.log("Invalid input. Please enter 1, 2, or 3.");
      rl.close();
    }
  });
}

main();
