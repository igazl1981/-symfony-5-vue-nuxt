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

### Webapp

The webapp got some example pages to represent auto route feature. 

There is a `fetch` part in the [more example](./webapp/pages/more/index.vue) file to show how it is rendered when it is done on the server side.

# Security 

Here are the security setup steps to have JSON login and some protected urls.


