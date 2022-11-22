const inquirer = require('inquirer');
const db = require('./connection');
require('console.table');

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
  db.promise().query('SELECT * FROM department;')
    .then(([results]) => {
      console.table(results);
    }).then(() => beginPrompts())
};

function viewRoles() {
  db.promise().query('SELECT role.id, role.title, department.name AS department, role.salary FROM role INNER JOIN department ON role.department_id=department.id;')
    .then(([results]) => {
      console.table(results);
    }).then(() => beginPrompts())
};

function viewEmployees() {
  db.promise().query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, manager.first_name AS manager FROM employee INNER JOIN role on employee.role_id=role.id INNER JOIN department ON role.department_id=department.id LEFT JOIN employee manager on manager.id = employee.manager_id;')
    .then(([results]) => {
      console.table(results);
    }).then(() => beginPrompts())
};

function addDepartment() {
  inquirer.prompt([{
    type: 'input',
    name: 'department',
    message: 'What is the department name?'
  }]).then((answer) => {
    db.promise().query(`INSERT INTO department (name) VALUES ('${answer.department}')`)
    console.log(`${answer.department} department added`)
  }).then(() => beginPrompts());
};

function addRole() {
  db.promise().query('SELECT * FROM department;')
    .then(([results]) => {
      const departments = results.map(({ id, name }) => ({
        value: id,
        name: name
      }));
      inquirer.prompt([
        {
          type: 'input',
          name: 'role',
          message: 'What is the name of the role?'
        },
        {
          type: 'number',
          name: 'salary',
          message: 'What is the salary for this role?'
        },
        {
          type: 'list',
          name: 'dep',
          message: 'What department does this role belong to?',
          choices: departments
        }
      ]).then((answer) => {
        db.promise().query(`INSERT INTO role (title, salary, department_id) VALUES ('${answer.role}', '${answer.salary}', '${answer.dep}')`)
        console.log(`${answer.role} role added`)
      }).then(() => beginPrompts());
    });
};

function addEmployee() {
  db.promise().query('SELECT * FROM employee;')
    .then(([results]) => {
      const managerArray = results.filter((word) => {
        return (word.manager_id === null)
      }).map(({ id, first_name, last_name }) => ({
        value: id,
        name: `${first_name} ${last_name}`
      }));
      db.promise().query('SELECT * FROM role;')
        .then(([roles]) => {
          const roleArray = roles.map(({ id, title }) => ({
            value: id,
            name: title
          }))
          inquirer.prompt([
            {
              type: 'input',
              name: 'first',
              message: "What is the employee's first name?"
            },
            {
              type: 'input',
              name: 'last',
              message: "What is the employee's last name?"
            },
            {
              type: 'list',
              name: 'role',
              message: "What is the employee's role?",
              choices: roleArray
            },
            {
              type: 'list',
              name: 'manager',
              message: "Who is their manager?",
              choices: managerArray
            }
          ]).then((answer) => {
            db.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answer.first}', '${answer.last}', '${answer.role}', '${answer.manager}');`)
            console.log('Employee added');
          }).then(() => beginPrompts());
        });
    })
};

function updateRole() {
  db.promise().query('SELECT employee.id, employee.first_name, employee.last_name, role.title, role.id, manager.first_name AS manager FROM employee INNER JOIN role on employee.role_id=role.id LEFT JOIN employee manager on manager.id=employee.manager_id;')
    .then(([results]) => {
      const employeeArray = results.map(({ id, first_name, last_name }) => ({
        value: id,
        name: `${first_name} ${last_name}`
      }));
      const rolesArray = results.map(({ id, title }) => ({
        value: id,
        name: title
      }));
      inquirer.prompt([
        {
          type: 'list',
          name: 'employee',
          message: "Which employee's do you want to update?",
          choices: employeeArray
        },
        {
          type: 'list',
          name: 'role',
          message: 'Which role do you want to assign to the employee?',
          choices: rolesArray
        }
      ]).then((answer) => {
        db.promise().query(`UPDATE employee SET role_id=${answer.role} WHERE id=${answer.employee};`)
        console.log("Employee's role updated");
      }).then(() => beginPrompts());
    });
};

beginPrompts();