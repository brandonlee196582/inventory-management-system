# Inventory Management Solution

# Purpose
 This project offers a possible inventory management solution. Without logging in, this system renders a home page containing a list of items pulled from a database and considers this user to be a guest. 

# Guest Actions:
The guest user can then click an item from the list to display the item’s details. The details page contains a button that then allows you to return to the home page. The guest user can also filter the results by typing in the “Item Name” text box, clicking the “Manager” dropdown, or by typing in the “Item Description” text box. The guest is able to stack these filters to further refine their results.

# Account creation:
From the home page a user can select the create account link or click login and select the create account link to create an inventory manager account. Proper implementation of this application would require the user to submit for an account then have their access verified before account creation. The current implementation creates the account once the form is submitted. Once submitted the user will be navigated to the login screen and can enter the created credentials to login. The password is stored in the database as a hash.

# Inventory manager home screen:
The inventory manager home screen looks very similar to the guest screen with a few differences. First you will notice the table is pre-filtered by the logged in user. The inventory manager also has access to the add and delete item buttons. As the user filters the results there will be a button at the top of the screen to return to the initial filtered state.

# Adding new items:
The inventory manager can add new items by clicking the “Add Item” button and filling out the add item form. The form contains some basic validation to ensure the fields are not left blank. The manager can click cancel to return to the list if they do not with to create a new item or click save to create the item. After saving the user is navigated back to the filtered list view and can see their newly created part.

# Viewing and updating an items values:
An inventory manager has access to update an item’s values by clicking on an item within the table. This opens the detail item view. Inside the window the user will see all the items' properties. The manager can then click the edit item button to modify the properties. The user will then select save to commit the changes and will be sent back to the view only detail page. They can then click the return to list button to see their changes reflected in the table view.

# Deleting an item:
The inventory manager has access to delete an item from the table view by clicking the delete item button. After deleting the item the item is removed from the table view.

# Project setup
Create a postgres database name imsdb to be used later in the setup. This database must exist within your machine's local storage.

# This project is setup to run with docker on the following ports:
    app-imd-db: 5432 
    app-ims-api: 3001 
    app-ims-frontend: 3000

# Docker-compose setup:
    This project contains a basic docker compose file that will need to be configured as follows.
        (line 9)
            - POSTGRES_USER={replace with username}
        (line 10)
            - POSTGRES_PASSWORD={replace with postgres password}
        (line 14)
            - {replace with path to local postgres data}:/var/postgresql/data
        (line 26)
            - DB_CONN_STRING=”postgres://{replace with your username}:{your postgres password}@app-ims-db:5432/imsdb

# Run project:
    After configuration enter the command below withing the root folder:
        docker-compose up

# Frontend access:
    You can access the front end by navigating to http://localhost:3000 withing a web browser

# Api access and routes:
    You can access the api by navigating to http://localhost:3001 you have access to the routes below
        GET:
            /
                returns server status
            /item
                returns a list of all items
            /user
                returns a list of all users (list only contains the id and username to make it more difficult to access hashes)
            /item/:id
                returns a single item by id
            /user/:id
                returns a single user by id
        POST:
            /item
                creates a new item, object example {"user_id":9,"item_name":"item","description":"desc","quantity":"3"}
            /user
                creates a new user, object example {"first_name": "name", "last_name": "name", "username": "username", "password": "bcrypt password hash"}
            /Login
                returns a user object containing password hash, object example {"username": "username"}
            /Username
                returns a boolean to determine if a username is unique (if unique it returns true), object example {"username": "username"}
        PATCH
            /item
                updates an item's properties, object example {"user_id":9,"item_name":"item","description":"desc","quantity":"3"}
            /user
                !! currently disabled for security concerns !!
        DELETE
            /item/:id
                deletes an item by its id
            /user/:id
                deletes a user by its id

