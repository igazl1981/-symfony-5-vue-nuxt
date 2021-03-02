# Example Nuxt Project

This project is a sample with the following requirements:

* Symfony 5
* Nuxt 2
* SSR with NodeJs rendering
* Authentication
  * JSON login with Cookie storage (httpOnly)
  * nuxt-auth  

# Setting up

Started from the minimal skeleton:

`composer create-project symfony/skeleton my_project_name`

The webapp was initialized as a nuxt app with universal type:

`npm init nuxt-app webapp`

Used additionals:

* nuxt-axios
* bootsrap
* jest (testing)
* eslint, stylelint, prettier (wouldn't be necessary as it is just sample)

## Initial setup

### Symfony

The following packages/recipes are installed:

* `composer req symfony/monolog-bundle`
* `composer req jwt-auth` (lexik and security comes with it)
* `compser req symfony/maker-bundle --dev` (useful to create entities and migration files)
* `composer require symfony/orm-pack`

For me the first `bin/console  doctrine:migrations:migrate` command failed because

> The metadata storage is not up to date, please run the sync-metadata-storage command to fix this issue.

The solution is to run `bin/console  doctrine:migrations:sync-metadata-storage` for update metadata if needed. Then the migration will go fine.

Create the User entity with `bin/console make:user` which will update:

* Create User entity in [Entity](./src/Entity) folder
* Create UserRepository in [Repository](./src/Repository) folder
* [security.yaml](./config/packages/security.yaml) 
  * set encoder to User entity
  * add a provider 
  * set provider to main firewall
    
When entities are ready use `bin/console  make:migration` which will create a file in [migrations](./migrations) folder. eg: `Version20210302104247.php`.

Then the migration can be done to update the database: `bin/console  doctrine:migrations:migrate`.

If the database is `mariadb` the `DATABASE_URL` has to contain the `serverVersion=mariadb-10.5.9`. Note the **mariadb** in the `serverVersion`.

### Webapp

The webapp got some example pages to represent auto route feature. 

There is a `fetch` part in the [more example](./webapp/pages/more/index.vue) file to show how it is rendered when it is done on the server side.

# Security 

## Symfony

Here are the security setup steps to have JSON login and some protected urls.

Add 2 entries to the security.yaml file under `security.firewalls`:
* login
* api

The `login` contains the setup for lexik's login while the `api` will set up security for the `/api/secure` endpoints.

If more info is required into the response of the login endpoint checkout [Lexik's github](https://github.com/lexik/LexikJWTAuthenticationBundle/blob/master/Resources/doc/2-data-customization.md#eventsauthentication_success---adding-public-data-to-the-jwt-response).

Add the path to the `access_control` part: 

`- { path: ^/api/secure, roles: ROLE_USER }`

or 

`- { path: ^/api/secure, roles: IS_AUTHENTICATED_FULLY }`

If the whole `/api` is secure the login endpoint has to be accessible for anonymous:

```yaml
access_control:
  - { path: ^/api/login, roles: IS_AUTHENTICATED_ANONYMOUSLY }
  - { path: ^/api,       roles: IS_AUTHENTICATED_FULLY }
```

To be able to reach the login endpoint the route has to be added to the [routes.yaml](./config/routes.yaml):

```yaml
api_login_check:
  path: /api/login_check
```

### Adding a user to the DB

First, generate an encoded password for the user: `bin/console security:encode-password`, then insert the user into the database:

The generated password is: 12345

```sql
INSERT INTO symfony.user (email, roles, password) VALUES ('test@email.com', '', '$argon2id$v=19$m=65536,t=4,p=1$gm3k26JIuddTuwIt2/oCmQ$pwpJFtmolNDqKwh2Vj2v/7ljogDM1LR2MYmsYK5xyTw')
```

Currently, Symfony's default encoder is `sodium` which does not require a `salt`.

### Checking login

When the user is inserted the following curl should return the token:

```
curl --request POST \
  --url http://localhost/api/login_check \
  --header 'Content-Type: application/json' \
  --data '{
	"username": "test@email.com",
	"password": "12345"
  }'
```

Response: 
```json
{
  "token": "..."
}
```

### Setting login to use Cookie

For setting up Lexik to use the Cookie to store the token the `token_extractors` has to be updated like:

```yaml
token_extractors:
    authorization_header:
        enabled: false
    cookie:
        enabled: true
        name: 'BEARER'
```

A Listener has to be added which will listen on `lexik_jwt_authentication.on_authentication_success`.

The class is: [AuthenticationSuccessListener.php](./src/Listener/AuthenticationSuccessListener.php) and the listener has to be configured in the [services.yaml](./config/services.yaml)

The will add the Cookie to the response with the TTL that comes from the Lexik configuration.

For the same login request the response will be empty. The listener removes it, which is not necessary if you would like to send user data on login. However nuxt/auth will not use that by default and will call for the profile endpoint to get the user data.

The response will set the Cookie with the name `BEARER`.

### Nuxt


