# Employee Tracker Application

The **Employee Tracker Application** is a command-line tool designed to manage employee information within a company. It utilizes Node.js and MySQL to provide functionality such as viewing departments, roles, and employees, as well as adding new entries and updating employee roles.

## Important Links
  **GitHub Repo**
  - https://github.com/Evan8383/sql-employee-tracker
  **Submission Links**
  - https://watch.screencastify.com/v/DxG0hQsJ2A2mEERCGJqo

## Table of Contents

- [Overview](#overview)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Overview

Managing employee data efficiently is crucial for organizations. The **Employee Tracker Application** simplifies this process by offering a command-line interface for interacting with a MySQL database. Users can perform various operations, such as viewing existing departments, roles, and employees, adding new entries, and updating employee roles.

## Requirements

Before using the **Employee Tracker Application**, ensure that you have the following installed:

- [Node.js](https://nodejs.org/): A JavaScript runtime for executing server-side code.
- [MySQL](https://www.mysql.com/): A relational database management system.

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/employee-tracker.git
   ```
2. **Navigate to the Project Directory:**

   ```bash
   cd employee-tracker
   ```
3. **Install Dependencies:**

   ```bash
   npm install
   ```
4. **Configure MySQL Database:**

   ```javascript
    const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'employee_tracker'
    }, console.log(`Connected to the employee_tracker database.`)).promise();
    ```
    **Replace 'localhost', 'root', 'root', and 'employee_tracker' with your MySQL database details.**

5. **Run the Application:**   
   ```bash
   node index.js
   ```
# Usage

Upon running the application, you will encounter a welcome message and a menu with various options. The available functions include:

- View all departments
- View all roles
- View all employees
- Add a department
- Add a role
- Add an employee
- Update an employee role
- Exit

Follow the prompts to perform the desired function, and exit the application when finished.

# Features

**Viewing Data:**
- Display a list of all departments, roles, and employees in a tabular format.

**Adding Entries:**
- Add new departments, roles, and employees to the database.

**Updating Employee Roles:**
- Change the role of an existing employee.

# Contributing

Contributions to the development of the Employee Tracker Application are welcome. If you encounter issues or have suggestions for improvements, please open an issue on the [GitHub repository](https://github.com/Evan8383/sql-employee-tracker).

# License

This project is licensed under the [MIT License](LICENSE).