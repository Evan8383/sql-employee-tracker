const mysql = require('mysql2');
const inquirer = require('inquirer');

// DATABASE CONNECTION
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'root',
    database: 'employee_tracker'
  },
  console.log(`Connected to the courses_db database.`)
).promise();

// ARRAY OF INQUIRER PROMPTS
const dbFunctions = [
  {
    name: 'selectedFunction',
    message: 'Choose a database function:',
    type: 'list',
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
];

// FUNCTION TO PRINT WELCOME LOGO
const showWelcome = () => {
  console.log('=====================================================================================')
  console.log('                               ' + 'Internal Employee Tool')
  console.log('=====================================================================================')
};

// CORE APP FUNCTIONALITY
const promptUser = async () => {
  const data = await inquirer.prompt(dbFunctions)
  const { selectedFunction } = data
  handleSelectedFunction(selectedFunction)
};
const handleSelectedFunction = (selectedFunction) => {
  switch (selectedFunction) {
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
      addNewDepartment();
      break;
    case 'Add a role':
      addNewRole();
      break;
    case 'Add an employee':
      addNewEmployee();
      break;
    case 'Update an employee role':
      updateEmployeeRole();
      break;
    case 'Exit':
      process.exit();
  }
};

// GET ALL QUERIES
const viewAllDepartments = async () => {
  const [results, info] = await db.query('SELECT * FROM department')
  console.table(results)
  promptUser();
};
const viewAllRoles = async () => {
  const [results, info] = await db.query('SELECT role.id, title, department.name, salary FROM role INNER JOIN department ON department_id=department.id')
  console.table(results)
  promptUser();
};
const viewAllEmployees = async () => {
  const [results, info] = await db.query('SELECT e.id, e.first_name, e.last_name, role.title, department.name, role.salary, m.first_name AS manager FROM employee e LEFT JOIN role ON role_id=role.id LEFT JOIN department on role.department_id=department.id LEFT JOIN employee m ON e.manager_id = m.id ORDER BY e.last_name ASC')
  console.table(results)
  promptUser();
};

// INSERT FUNCTIONS
const addNewDepartment = async () => {
  const questions = [
    {
      message: 'Enter the name of the new department:',
      type: 'input',
      name: 'newDepartmentName'
      // Add a validate function later
    }
  ]
  const userInput = await inquirer.prompt(questions)
  const { newDepartmentName } = userInput
  await db.query('INSERT INTO department (name) VALUES (?)', newDepartmentName)
  console.log('')
  console.log(`${newDepartmentName} has been added as a department.`)
  console.log('')

  promptUser();
};
const addNewRole = async () => {
  const questions = [
    {
      message: 'Enter the title of the new role:',
      type: 'input',
      name: 'newTitleName'
      // Add a validate function later
    },
    {
      message: 'Enter the salary for the new role as an integer:',
      type: 'input',
      name: 'newRoleSalary'
    },
    {
      message: 'Select the department the new role will be apart of:',
      type: 'list',
      name: 'newRoleDepartment',
      choices: getListOfCurrentDepartments
    }

  ]
  const userInput = await inquirer.prompt(questions)
  const { newTitleName, newRoleSalary, newRoleDepartment } = userInput

  await db.query('INSERT INTO role (title, salary, department_id) VALUES (?,?,?)',
    [newTitleName, newRoleSalary, await getDepartmentId(newRoleDepartment)])
  console.log('')
  console.table(`${newTitleName} has been added as a role.`)
  console.log('')

  promptUser();
};
const addNewEmployee = async () => {
  const questions = [
    {
      message: "Enter the employees first name:",
      type: "input",
      name: "newEmployeeFirstName"
    },
    {
      message: "Enter the employees last name:",
      type: "input",
      name: "newEmployeeLastName"
    },
    {
      message: "Select the employees role:",
      type: "list",
      name: "newEmployeeRole",
      choices: getListOfCurrentRoles
    },
    {
      message: `Select the new employees manager`,
      type: "list",
      name: "newEmployeeManager",
      choices: getListOfCurrentManagers
    }
  ]
  const userInput = await inquirer.prompt(questions)
  const { newEmployeeFirstName, newEmployeeLastName, newEmployeeRole, newEmployeeManager } = userInput
  try {
    if (newEmployeeManager === 'No Manager') {
      await db.query('INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)',
        [newEmployeeFirstName, newEmployeeLastName, await getRoleId(newEmployeeRole)])
    } else {
      await db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
        [newEmployeeFirstName, newEmployeeLastName, await getRoleId(newEmployeeRole), await getEmployeeId(newEmployeeManager)])
    }
    viewAllEmployees();
  } catch (err) {
    console.error(err)
    promptUser();
  }
};

// UPDATE FUNCTIONS
const updateEmployeeRole = async () => {
  const questions = [
    {
      message: 'Select the employee you would like to update:',
      type: 'list',
      name: 'employeeToUpdate',
      choices: getListOfCurrentEmployees
    },
    {
      message: 'Select the employees new role:',
      type: 'list',
      name: 'employeeNewRole',
      choices: getListOfCurrentRoles
    }
  ]
  const userInput = await inquirer.prompt(questions)
  const { employeeToUpdate, employeeNewRole } = userInput
  await db.query('UPDATE employee SET role_id=? WHERE id=?',
    [await getRoleId(employeeNewRole), await getEmployeeId(employeeToUpdate)])
  console.table(`Updated ${employeeToUpdate}'s role.`)
  promptUser();
};

// HELPER FUNCTIONS TO CREATE ARRAYS FROM TABLE DATA
const getListOfCurrentDepartments = async () => {
  const [currentDepartments, info] = await db.query('SELECT * FROM department')
  const departmentNames = currentDepartments.map(name => name.name)
  return departmentNames;
};
const getListOfCurrentRoles = async () => {
  const [currentRoles, info] = await db.query('SELECT * FROM role')
  const roleNames = currentRoles.map(name => name.title)
  return roleNames;
};
const getListOfCurrentManagers = async () => {
  const [currentManagers, info] = await db.query('SELECT * FROM employee WHERE manager_id IS NULL')
  const managerNames = currentManagers.map(name => name.first_name)
  managerNames.unshift('No Manager')
  return managerNames;
};
const getListOfCurrentEmployees = async () => {
  const [results, info] = await db.query('SELECT first_name FROM employee')
  const employeeNames = results.map(name => name.first_name)
  return employeeNames
};

// HELPER FUNCTIONS TO GET IDs INTEGER VALUE 
const getDepartmentId = async (department) => {
  const [results, info] = await db.query('SELECT id FROM department WHERE name=?', department)
  const { id: departmentId } = results[0]
  return departmentId
};
const getRoleId = async (role) => {
  const [results, info] = await db.query('SELECT id FROM role WHERE title=?', role)
  const { id: roleId } = results[0]
  return roleId;
};
const getEmployeeId = async (employee) => {
  const [results, info] = await db.query('SELECT id FROM employee WHERE first_name=?', employee)
  const { id } = results[0]
  return id;
};


showWelcome();
promptUser();