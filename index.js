const inquirer = require('inquirer');
const fs = require('fs');
const mysql = require('mysql2');

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'your password',
  database: 'workforce_db',
});

// Connect to the database
connection.connect((err) => {
  // if (err) throw err; 
  console.log('Connected to the database.');
  // Call a function to start the application
  start();
},
 console.log(`Connected to the workforce_db database.`)
);

// Function to start the application
function start() {
  // Prompt the user with options
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'Exit'
        ]
      }
    ])
    .then((answer) => {
      // Perform action based on user's choice
      switch (answer.action) {
        case 'View all departments':
          viewAllDepartments();
          break;
        case 'View all roles':
          viewAllRoles();
          break;
        case 'View all employees':
          viewAllEmployees();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a role':
          addRole();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Update an employee role':
          updateEmployeeRole();
          break;
        case 'Exit':
          exit();
          break;
      }
    });
}

// Function to view all departments
function viewAllDepartments() {
  connection.query('SELECT * FROM department', (err, results) => {
    if (err) throw err;

    console.table(results);
    start();
  });
}


// Function to view all roles
function viewAllRoles() {
  connection.query('SELECT * FROM role', (err, results) => {
    if (err) throw err;

    console.table(results);
    start();
  });
}

// Function to view all employees
function viewAllEmployees() {
  connection.query('SELECT * FROM employee', (err, results) => {
    if (err) throw err;

    console.table(results);
    start();
  });
}

// Function to add a department
function addDepartment() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'departmentName',
        message: 'Enter the department name:',
      },
    ])
    .then((answer) => {
      connection.query('INSERT INTO department SET ?', { name: answer.departmentName }, (err, result) => {
        if (err) throw err;

        console.log('Department added!');
        start();
      });
    });
}

// Function to add a role
function addRole() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'roleTitle',
        message: 'Enter the role title:',
      },
      {
        type: 'input',
        name: 'roleSalary',
        message: 'Enter the role salary:',
      },
      {
        type: 'input',
        name: 'departmentId',
        message: 'Enter the department ID for the role:',
      },
    ])
    .then((answer) => {
      connection.query('INSERT INTO role SET ?', {
        title: answer.roleTitle,
        salary: answer.roleSalary,
        department_id: answer.departmentId,
      }, (err, result) => {
        if (err) throw err;

        console.log('Role added!');
        start();
      });
    });
}

// Function to add an employee
function addEmployee() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'employeeFirstName',
        message: 'Enter the employee first name:',
      },
      {
        type: 'input',
        name: 'employeeLastName',
        message: 'Enter the employee last name:',
      },
      {
        type: 'input',
        name: 'roleId',
        message: 'Enter the role ID for the employee:',
      },
      {
        type: 'input',
        name: 'managerId',
        message: 'Enter the manager ID for the employee (optional):',
      },
    ])
    .then((answer) => {
      connection.query('INSERT INTO employee SET ?', {
        first_name: answer.employeeFirstName,
        last_name: answer.employeeLastName,
        role_id: answer.roleId,
        manager_id: answer.managerId || null,
      }, (err, result) => {
        if (err) throw err;

        console.log('Employee added!');
        start();
      });
    });
}

// Function to update an employee role
function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'employeeId',
        message: 'Enter the ID of the employee whose role you want to update:',
      },
      {
        type: 'input',
        name: 'newRoleId',
        message: 'Enter the new role ID for the employee:',
      },
    ])
    .then((answer) => {
      connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [answer.newRoleId, answer.employeeId], (err, result) => {
        if (err) throw err;

        console.log('Employee role updated!');
        start();
      });
    });
}

// Function to exit the application
function exit() {
  console.log('See ya later!');
  connection.end();
}