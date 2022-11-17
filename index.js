const inquirer = require('inquirer');

function beginPrompts() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'start',
      message: 'What would you like to do?',
      choices: [ 
        'View All Departments', 
        'View All Roles', 
        'View All Employees', 
        'Add A Department', 
        'Add A Role', 
        'Add Employee', 
        'Update Employee Role' 
      ],
    },
  ]).then((answers) => {
    const selected = answers.start;

    if (selected === 'View All Departments') {
      viewDepartments();
    } else if (selected === 'View All Roles') {
      viewRoles();
    } else if (selected === 'View All Employees') {
      viewEmployees();
    } else if (selected === 'Add A Department') {
      addDepartment();
    } else if (selected === 'Add A Role') {
      addRole();
    } else if (selected === 'Add Employee') {
      addEmployee();
    } else if (selected === 'Update Employee Role') {
      updateRole();
    };
  });
};

function viewDepartments() {
  console.log(departments);
  beginPrompts();
};

function viewRoles() {
  console.log(roles);
  beginPrompts();

};

function viewEmployees() {
  console.log(employees);
  beginPrompts();

};

function addDepartment() {
  console.log(`${this} Department added`);
  beginPrompts();

};

function addRole() {
  console.log(`${this} Role added`);
  beginPrompts();

};

function addEmployee() {
  console.log(`Employee ${this} added`);
  beginPrompts();

};

function updateRole() {
  console.log(role);
  beginPrompts();

};

