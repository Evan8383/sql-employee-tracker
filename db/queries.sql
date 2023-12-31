SELECT
  e.first_name,
  role.title,
  department.name,
  m.first_name AS manager
FROM
  employee e
  LEFT JOIN role ON role_id = role.id
  LEFT JOIN department ON role.department_id = department.id
  LEFT JOIN employee m ON e.manager_id = m.id
ORDER BY
  e.first_name ASC;

SELECT
  employee.id,
  e.first_name,
  e.last_name,
  role.title,
  department.name,
  role.salary,
  m.first_name AS manager
FROM
  employee e
  LEFT JOIN role ON role_id = role.id
  LEFT JOIN department on role.department_id = department.id
  LEFT JOIN employee m ON e.manager_id = m.id