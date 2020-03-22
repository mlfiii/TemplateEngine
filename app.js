//Specify which modules and files to require

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const render = require("./lib/htmlRenderer");

//Where will files resolve to
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");




//Employee array
let employees = []

// Write code to use inquirer to gather information about the development team members,
//Used to ask questions about employees
function collectEmployeeInfo() {
    inquirer.prompt([
        {
            type: "list",
            name: "whichEmployeeType",
            message: "Please select which employee type:",
            choices: ["Manager", "Engineer", "Intern"]
        },
        {
            type: "input",
            name: "name",
            message: "Employee name:"
        },
        {
            type: "input",
            name: "id",
            message: "Employee ID:"
        },
        {
            type: "input",
            name: "email",
            message: "Email:"
        }
    ]).then((data) => {
        const { whichEmployeeType } = data


        switch (whichEmployeeType) {

            case "Manager":
                createManager(data)
                break;
            case "Engineer":
                createEngineer(data)
                break;
            case "Intern":
                createIntern(data)
                break;
            default:
                break;
        }
    })
}

// and to create objects for each team member (using the correct classes as blueprints!)
//Used to ask more questions about the manager employee and generate the html
function createManager(employeeInfo) {
    inquirer.prompt([{
        type: "input",
        message: "Office number?",
        name: "officeNumber"
    },
    {
        type: "confirm",
        name: "moreEmployees",
        message: "More employees?"
    }
    ]).then((data) => {

        const { name, id, email } = employeeInfo
        const { officeNumber } = data

        //Create object
        let newManager = new Manager(name, id, email, officeNumber)

        //Push to the employee array
        employees.push(newManager)

        //If there are more employees to generate collect employee information otherwise go to generate html
        if (data.moreEmployees) {
            collectEmployeeInfo()
        } else {
            doneCreatingEmployees()
        }
    })
}

//Used to ask more questions about the engineer employee and generate the html
function createEngineer(employeeInfo) {
    inquirer.prompt([{
        type: "input",
        message: "Github login:",
        name: "github"
    },
    {
        type: "confirm",
        name: "moreEmployees",
        message: "More employees?"
    }]).then((data) => {

        const { name, id, email } = employeeInfo
        const { github } = data

        //Create object
        let newEngineer = new Engineer(name, id, email, github)

        //Push to the employee array
        employees.push(newEngineer)

        //If there are more employees to generate collect employee information otherwise go to generate html
        if (data.moreEmployees) {
            collectEmployeeInfo()
        } else {
            doneCreatingEmployees()
        }
    })
}

//Used to ask more questions about the intern employee and generate the html
function createIntern(employeeInfo) {
    inquirer.prompt([{
        type: "input",
        message: "School Name?",
        name: "school"
    },
    {
        type: "confirm",
        name: "moreEmployees",
        message: "More employees?"

    }
    ]).then((data) => {

        const { name, id, email } = employeeInfo
        const { school } = data

        //Create object
        let newIntern = new Intern(name, id, email, school)

        //Push to the employee array
        employees.push(newIntern)

        //If there are more employees to generate collect employee information otherwise go to generate html
        if (data.moreEmployees) {
            collectEmployeeInfo()
        } else {
            doneCreatingEmployees()
        }
    })
}

function doneCreatingEmployees() {

    fs.writeFile(outputPath, render(employees), (err, data) => {
        if (err) throw err;

        console.log("File written to folder")
    })
}

//Used start to run the full application
collectEmployeeInfo()
