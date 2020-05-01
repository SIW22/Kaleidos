# #TRENDING  


## Wireframes
---
![ERD](public/images/coversheet.jpg)
![ERD](public/images/login.jpg)
![ERD](public/images/register.jpg)
![ERD](public/images/browseall.jpg)
![ERD](public/images/bybrand.jpg)
![ERD](public/images/bystyle.jpg)
![ERD](public/images/byprice.jpg)
![ERD](public/images/cart.jpg)
![ERD](public/images/purchase.jpg)

## User Stories

-Users are greeted with a splash page with branding id;
-Before loading the site, users may login or register a new account.
-Users can add images and descriptions of virtually anything.
-Once added, items added can be edited or deleted.
-1 user may have numerous collections of items, which can be sorted by category. 


---

LOGO:
- clicking on logo will lead back to home page


HOME PAGE:
- root route
- logo and app name
- slogan of our app
- include navigation 
    - BROWSE BY: all, category, type
    - create account


USERS:
- login/registration
- session tied to login
- logout



## DB Models and ERD
---
### ERD:
![ERD](public/images/models.jpg)


### MODELS:
- clothing
- users

### SCHEMA ATTRIBUTES:
USER:
- full name: String,
- username: String,
- email: String,
- password: String

PRODUCT:
- Category: String,
- Item name: String,
- description: String,
- image: data

## Technologies Used
---
- HTML
- CSS
- MongoDB
- Express
- JavaScript
- DOM Manipulation
- jQuery/Vanilla JS
- Session
- Mongo-Connect
- Dropzone
- Multiparty
- Cloudinary
- Dotenv

## BONUS/PLANNED FEATURES:
- better CSS

### CRUD
- full CRUD functionality for all users. 
