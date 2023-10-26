# TaskWeb - Backend
If you’re running your own business you’ll want to spend more time on the service you provide and less time on keeping track of receipts, taxes and invoices. That’s why you need an organized system.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Project Configuration](#project-configuration)
- [Author](#author)

## Overview

### The challenge

the idea of this project arises from the need to have a workspace where we could have absolute control over the behavior of the application and the metrics that it produces 
because in the current environment of Demos that is handled in New Relic many of us have had problems of permissions or authorizations at the time of wanting to access some services. 
So developing this project will open doors to test services such as CodeStream, Vulnerability Management, Change Tracking as well as the performance of Hackthons on the installation of 
the agents in the Backend, Frontend and Databases.

### Links

- repository URL: [https://github.com/Omared250/TodoWeb]

## My process

### Built with

## Frontend

- Semantic HTML5 markup
- CSS custom properties
- BootStrap 5
- Material UI
- [React JS]
- [Vite]

## Backend

- [Node JS]
- Express JS

## Data Base
- Mongo DDBB

### What I learned

With this project I had the opportunity to learn more about ReactJS, NodeJS and Mongo DDBB as well as strengthen my knowledge about React Router V6.

```
export const useSignStore = () => {

    const dispatch = useDispatch();

    const { isModalOpen, signPage } = useSelector( state => state.sign );

    const openModal = ( signValue ) => {
        dispatch( onOpenModal( signValue ) );
    };

    const closeModal = () => {
        dispatch( onCloseModal() );
    };

    return {
        //* Properties
        isModalOpen,
        signPage,

        //* Methods
        openModal,
        closeModal,
    }

};
```
## Project Configuration

If you want to test the application on your local machine keep in mind that inside the CalendarApi.js Axios is calling an Environment Variable that for security reasons is not recommended to be updated in the repository files. security reasons it is not recommended to upload in the repository files so in order to run the project locally in good form you must create outside the SRC folder a file called .env where you can create these environment variables PORT, DB_CNN, SECRET_JWT_SEED, GETEVENTS_MICROSERVICE, CREATEEVENTS_MICROSERVICE, UPDATEEVENTS_MICROSERVICE, DELETEEVENTS_MICROSERVICE and assign the value of each one as you prefer then the application will work in normal state. Also do not forget to download the Frontend repository of this project [HERE](https://github.com/Omared250/TodoWeb)
## Author

- Github - [Omar Ascanio](https://github.com/Omared250)
