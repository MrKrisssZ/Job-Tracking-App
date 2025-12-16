# Job-Tracking-App3
An application for tracking the status of job hunting for fresh university graduates.

## Prerequisites

- Node.js (20.19+ or higher) - [Download here](https://nodejs.org/)

## Installation

1. Clone the repository:
git clone git@github.com:MrKrisssZ/Job-Tracking-App.git
(Note: Requires SSH keys set up with GitHub. See [GitHub's SSH guide](https://docs.github.com/en/authentication/connecting-to-github-with-ssh).)

3. Install backend dependencies:
```bash
cd backend
composer install
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Run the application:
```bash
npm run dev
```

SHA256:+DiY3wvvV6TuJJhbpZisF/zLDA0zPMSvHdkr4UvCOqU."

5:52 PM
This message shows you the fingerprint of your SSH key - it's like a unique identifier or "digest" of your key.

Breaking it down:

ED25519: The type of encryption algorithm used for your key
SHA256: The hashing algorithm used to create the fingerprint
+DiY3wvvV6TuJJhbpZisF/zLDA0zPMSvHdkr4UvCOqU: The actual fingerprint (a shortened representation of your key)
Why fingerprints matter:

Since public keys are long strings of characters (hundreds of characters), fingerprints provide a shorter, human-readable way to identify and verify keys.

Common scenarios where you see this:

First time connecting to a server: SSH shows you the server's fingerprint and asks "Are you sure you want to continue?" You can verify this matches the server's known fingerprint to prevent man-in-the-middle attacks.
Verifying your own key: When you add a key to GitHub, GitHub displays its fingerprint. You can compare this with your local key's fingerprint to ensure you uploaded the correct key.
