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
git clone https://github.com/your-username/instagram-automation-bot.git
cd instagram-automation-bot
