# Job-Tracking-App3
An application for tracking the status of job hunting for fresh university graduates.

## Prerequisites

- Node.js (20.19+ or higher) - [Download here](https://nodejs.org/)
- Make sure that your local machine has PHP, Composer, and the Laravel installer installed - [Download here](https://laravel.com/docs/12.x/installation)
- (Most Recommended) Install Laravel Herd, which bundles everything you need - [Download here](https://herd.laravel.com/)
  
## Installation

1. Clone the repository:
```
git clone git@github.com:MrKrisssZ/Job-Tracking-App.git
```
(Note: Requires SSH keys set up with GitHub. See [GitHub's SSH guide](https://docs.github.com/en/authentication/connecting-to-github-with-ssh).)

### Install backend dependencies and Configure:

1. Install dependencies
```bash
cd backend
composer install
```
2. Copy `.env.example` to `.env`

3. Update the database configuration in .env
```dotenv
DB_CONNECTION=mysql
DB_HOST=job-tracking-app-instance.cpie4i6gymip.ap-southeast-2.rds.amazonaws.com
DB_PORT=3306
DB_DATABASE=job_tracking_app
DB_USERNAME=admin
DB_PASSWORD=jobtrackingapp123456
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

### Install frontend dependencies and Run the application
```bash
cd..
cd frontend
npm install
```
```bash
npm run dev
```

## For Windows User
Suggest using powershell for backend, git bash for frontend. Because npm might be disabled on powershell and php path may not be found on git bash
