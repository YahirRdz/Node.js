const express = require("express");
const router = express.Router();
const {
  getAllEmployees,
  createEmployee,
  deleteEmployee,
  getEmployee,
  updateEmployee,
} = require("../../controllers/employeesController");

const data = {};
data.employees = require("../../data/employees.json");

router
  .route("/")
  .get(getAllEmployees)
  .post(createEmployee)
  .put(updateEmployee)
  .delete(deleteEmployee);

router.route("/:id").get(getEmployee);

module.exports = router;
