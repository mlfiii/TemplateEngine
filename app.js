const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Employee = require("./lib/Employee");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
//Adapted from http://www.penandpaperprogrammer.com/blog/2018/12/16/repeating-questions-with-inquirerjs
const collectEmployeeInfo = async (inputs = []) => {
    const prompts = [
        {
            type: "input",
            name: "name",
            message: "What is the name?"
        },
        {
            type: "input",
            name: "id",
            message: "Manager's ID?"
        },
        {
            type: "input",
            name: "title",
            message: "What is the title?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the email?"
        },
        {
            type: 'confirm',
            name: 'again',
            message: 'Enter another employee? ',
            default: true
        }
    ];

    const { again, ...answers } = await inquirer.prompt(prompts);
    const newInputs = [...inputs, answers];
    return again ? collectEmployeeInfo(newInputs) : newInputs;
};

const main = async () => {
    const inputs = await collectEmployeeInfo();
    // console.log(inputs);
};
// and to create objects for each team member (using the correct classes as blueprints!)



// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```


//Used to run the overall code.
async function init() {

    try {
        // const numemps = await getHowManyEmployees();
        // console.log(numemps)


        const answers = await collectEmployeeInfo();



        console.log(answers)


        // const github = await getUserData(answers)

        // const mdfile = await generateHTML(answers, github);

        // await writeFileAsync("readme.md", mdfile);

        // console.log("Successfully wrote to readme.md");
    } catch (err) {
        console.log(err);
    }
}

//Used too start he code.
init();
