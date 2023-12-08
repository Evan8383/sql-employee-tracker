const mysql = require('mysql2');
const inquirer = require('inquirer');
const ui = new inquirer.ui.BottomBar();

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

const showWelcome = () => {
  console.log('=====================================================================================')
  console.log('                               ' + 'Internal Employee Tool')
  console.log('=====================================================================================')
};

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

const viewAllDepartments = async () => {
  const [results, info] = await db.query('SELECT name AS "Department Name" FROM department')
  console.table(results)
  promptUser();
};

const viewAllRoles = async () => {
  const [results, info] = await db.query('SELECT * FROM role')
  console.table(results)
  promptUser();
};

const viewAllEmployees = async () => {
  const [results, info] = await db.query('SELECT * FROM employee')
  console.table(results)
  promptUser();
};

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

const getListOfCurrentDepartments = async () => {
  const [currentDepartments, info] = await db.query('SELECT * FROM department')
  const departmentNames = currentDepartments.map(name => name.name)
  return departmentNames
};

const getDepartmentId = async (department) => {
  const [result, info] = await db.query('SELECT id FROM department WHERE name=?', department)
  const { id: departmentId } = result[0]
  return departmentId
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



showWelcome();
promptUser();