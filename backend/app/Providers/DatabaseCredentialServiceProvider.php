<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Aws\SecretsManager\SecretsManagerClient;
use Aws\Exception\AwsException;
use Illuminate\Support\Facades\Config;

class DatabaseCredentialServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        // Only use AWS Secrets Manager if explicitly enabled
        if (!env('USE_AWS_SECRETS', false)) {
            return;
        }

        // Create a Secrets Manager Client
        $client = new SecretsManagerClient([
            'profile' => 'default',
            'version' => 'latest',
            'region' => env('AWS_REGION', 'ap-southeast-2'),
        ]);

        try {
            $result = $client->getSecretValue([
                'SecretId' => env('AWS_SECRET_NAME', 'jobtrackingapp'),
            ]);

            dd($result);
        } catch (AwsException $e) {
            throw $e;
        }

        // Decrypts secret using the associated KMS key.
        // Override database config
        Config::set('database.connections.mysql.username', $result['SecretString']['username']);
        Config::set('database.connections.mysql.password', $result['SecretString']['password']);
        Config::set('database.connections.mysql.host', $result['SecretString']['host']);
        Config::set('database.connections.mysql.port', $result['SecretString']['port']);
        Config::set('database.connections.mysql.database', $result['SecretString']['dbname']);
    }
}
