# Wrikho

Collaborative whiteboard.

### Build Status

BackEnd ongoing.

### Technology Used

* **React.js**  
* **Javascript**  
* **Css**  
* **Html**  
* **Nodejs(16.15.1)**
* **Fabric.js**
* **@reduxjs/toolkit and react-redux**
* **socket.io**
* **Mongoose**
* **jspdf**

### For testing

* Clone repo into local system.  
* Goto the Write App directory and in the client and api run  following commands on terminal.  

            npm i           
> it will install required packages listed on package-lock.json file.  

* Run api in api directory:

            npm start       
> it will start react app

* Run client on client directory:

            npm start       
> it will start react app

### Future Plan

- [x] Added Database.
- [x] Added backend functionality.


### What achived

* Front End using react and redux store.
* Data persistence locally using fs(read,write).
* Added Database.
* Each Note has individual files.
* Can create blank Note.
* End to End real time cumunication using socket.io on specific Note.


### Demo

#### Home.
![Home Page](https://github.com/baghelshivam/Wrikho/blob/master/ReadmeAssets/Home.png)
Fectching data from database and respective files for thumbnail.

#### After opening the Note.
![Writing Interface](https://github.com/baghelshivam/Wrikho/blob/master/ReadmeAssets/NotePad.png)
Now we can preform write ,delete and select operations in the Note.
