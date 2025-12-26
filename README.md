# Job-Tracking-App
An application for tracking the status of job hunting for fresh university graduates.

## Click here for the deployed version - [Click Me](http://job-tracking-app-yesheng.s3-website-ap-southeast-2.amazonaws.com)

## For Local Development
### Prerequisites

- Node.js (20.19+ or higher)
- Make sure that your local machine has PHP, Composer, and the Laravel installer installed
- (Most Recommended) For this application, please install Laravel Herd, which bundles everything you need - [Download here](https://herd.laravel.com/)
- MySQL for local database - [Download here](https://dev.mysql.com/downloads/) Or, if you don't want to configure your local database, please reach out to me for AWS database credential (zhongyeshengd@gmail.com)
  
### Installation

1. Clone the repository:
```
git clone git@github.com:MrKrisssZ/Job-Tracking-App.git
```
(Note: Requires SSH keys set up with GitHub. See [GitHub's SSH guide](https://docs.github.com/en/authentication/connecting-to-github-with-ssh).)

#### Install backend dependencies and Configure:

1. Install dependencies
```bash
cd backend
composer install
```
2. Copy `.env.example` to `.env`

3. Update the database configuration in .env (Reach out to me if you don't want to configure locally)
```dotenv
DB_CONNECTION=
DB_HOST=
DB_PORT=
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=
```

4. Generate JWT secret key and Copy it
```bash
php artisan jwt:secret
```

5. Update the JWT configuration in .env
```dotenv
JWT_SECRET=paste the secret key here
```

5. Run Migrations
```bash
php artisan migrate
```

#### Install frontend dependencies and Run the application
```bash
cd..
cd frontend
npm install
```
```bash
npm run dev
```

### For Windows User
Suggest using powershell for backend, git bash for frontend. Because npm might be disabled on powershell and php path may not be found on git bash
