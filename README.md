# <employee-tracker>
# **Employee Tracker**

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![NPM](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)

## **Description**

This application will help keep track of a company’s employee information using a MySQL database. It uses Inquirer to help the user navigate a database easily with prompts and choices that will run MySQL2 queries in the background then populate them in the console with an easy to read table thanks to console.table. The user will be able to view and add departments, employees, and roles. Employee roles can be updated as well. 

The packages required for this application include Inquirer, MySQL2, Console.Table, Node, and Dot Env for stronger security. I have included a .env.EXAMPLE file to let the user know how to format their credentials when running MySQL2. A strong understanding of MySQL commands and syntax were necessary to write this application’s code. The entire application can be used from the command line.

## **Installation & Usage**
Initiate Node.js by running ‘npm i’ in the GitBash terminal. Make sure to run the MySQL shell and run the Schema commands then Seed your database. Once all packages have been installed simply run the ‘npm start’ command to run the application. This will begin Inquirer prompts and present the user with options to View, Add, or Update Departments, Employees, or Roles. ‘View’ commands will present the user with a table of the selected data in the console. ‘Add’ commands will prompt the user to enter information about the Department, Employee, or Role they are adding then add it to the database. Lastly, the ‘Update Role’ command will ask the user which employee and which role they are updating and update that in the database. See below for walkthrough video. 

[Walkthrough Video](https://drive.google.com/file/d/1-G4_R59hF59wdqZxH9I0jgkl1xgfBjtU/view?usp=sharing)
