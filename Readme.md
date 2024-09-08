# Instagram Automation Bot

This Node.js-based Instagram bot automates the following tasks:
- Auto-following followers of a specified Instagram account (up to 50 users).
- Auto-sending Direct Messages (DMs) to users you're following.
- Auto-unfollowing users.

The bot uses the `instagram-private-api` package to interact with Instagram. It also includes functionality to prevent sending duplicate DMs by storing DMed users in a JSON file.

## Features

1. **Auto-Follow**: Follow up to 50 followers of a specified Instagram account.
2. **Auto-DM**: Send a pre-defined message to a limited number of users you're following. Users who have already been DMed are skipped.
3. **Auto-Unfollow**: Unfollow all users you're currently following.

## Prerequisites

- Node.js (v14 or higher)
- An Instagram account
- Access to the Instagram API via the `instagram-private-api` library

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/tejartr7/Insta-auto-dm
cd Insta-auto-dm
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create the .env File

Create a `.env` file in the root of the project and add your Instagram credentials:

```bash
touch .env
```

Populate the `.env` file with:

```makefile
username=your_instagram_username
password=your_instagram_password
userId=your_instagram_user_id
```

### 4. Create a DM History File

To ensure users don't receive duplicate DMs, the bot uses a `dmHistory.json` file to keep track of users it has already messaged. You need to create this file:

```bash
touch dmHistory.json
```

Then, initialize it with an empty array:

```json
[]
```

### 5. Run the Bot

Use this command to start the bot:

```bash
node index.js
```

You will be prompted with options to:
- Enter 1 to follow followers of a specified account.
- Enter 2 to auto-send DMs to users you're following.
- Enter 3 to unfollow all users you're following.

## Environment Variables

Make sure to configure the following environment variables in your `.env` file:

```plaintext
username=your_instagram_username  # Your Instagram username
password=your_instagram_password  # Your Instagram password
userId=your_instagram_user_id      # Your Instagram user ID
```

## Available Options

Once logged in, the bot will prompt you to choose one of the following options:

1. **Auto-Follow**: Follow up to 50 followers of the specified account, with a 5-minute delay between each follow.
2. **Auto-DM**: Send a predefined message to up to 15 users you're following (ensuring you don't DM the same user twice).
3. **Auto-Unfollow**: Unfollow all users you're following, with a 5-minute delay between each unfollow.

## Example Prompts

### Auto-Follow Example

```bash
Enter 1 to follow, 2 to send auto DMs, or 3 to unfollow: 1
Enter the account ID to follow their followers: <account_id_here>
```

### Auto-DM Example

```bash
Enter 1 to follow, 2 to send auto DMs, or 3 to unfollow: 2
```

### Auto-Unfollow Example

```bash
Enter 1 to follow, 2 to send auto DMs, or 3 to unfollow: 3
```

## License

This project is licensed under the MIT License.