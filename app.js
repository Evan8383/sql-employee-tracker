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

const getSelectedFunction = async () => {
    const data = await inquirer.prompt(dbFunctions)
    const { selectedFunction } = data
    handleSelectedFunction(selectedFunction)
}

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
            getSelectedFunction();
            break;
        case 'Add a role':
            getSelectedFunction();
            break;
        case 'Add an employee':
            getSelectedFunction();
            break;
        case 'Update an employee role':
            getSelectedFunction();
            break;
        case 'Exit':
            process.exit();
    }
}

const viewAllDepartments = async () => {
    const [results, info] = await db.query('SELECT * FROM department')
    console.table(results)
    getSelectedFunction();
};
const viewAllRoles = async () => {
    const [results, info] = await db.query('SELECT * FROM role')
    console.table(results)
    getSelectedFunction();
};
const viewAllEmployees = async () => {
    const [results, info] = await db.query('SELECT * FROM employee')
    console.table(results)
    getSelectedFunction();
};

getSelectedFunction()