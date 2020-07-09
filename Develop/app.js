

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];
const idArray = [];

function appMenu() {

//Accepting manager's details via inquirer prompt
  function createManager() {
    console.log("Please build your team");
    inquirer.prompt([
      {
        type: "input",
        name: "managerName",
        message: "Please Enter your Manager's Name?",
        validate: answer => {
          if (answer !== "") {
            return true;
          }
          return "You need to enter atleast one character. It cannot be BLANK";
        }
      },
      {
        type: "input",
        name: "managerId",
        message: "Please Enter your Manager's ID?",
        validate: answer => {
          const pass = answer.match(
            /^[1-9]\d*$/
          );
          if (pass) {
            return true;
          }
          return "Please enter a number greater than zero";
        }
      },
      {
        type: "input",
        name: "managerEmail",
        message: "Please Enter Your Manager's Email?",
        validate: answer => {
          const pass = answer.match(
            /\S+@\S+\.\S+/
          );
          if (pass) {
            return true;
          }
          return "Please enter a valid email address.";
        }
      },
      {
        type: "input",
        name: "managerOfficeNumber",
        message: "Please Enter your Manager's Office Number?",
        validate: answer => {
          const pass = answer.match(
            /^[1-9]\d*$/
          );
          if (pass) {
            return true;
          }
          return "Please enter a number greater than zero.";
        }
      }
    ]).then(answers => {
      const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
      teamMembers.push(manager);
      idArray.push(answers.managerId);
      createTeam();
    });
  }

  //Function for creating team based on user choice
  function createTeam() {

    inquirer.prompt([
      {
        type: "list",
        name: "memberChoice",
        message: "Please Enter the type of team member you would like to add?",
        choices: [
          "Engineer",
          "Intern",
          "I don't want to add any more team members"
        ]
      }
    ]).then(userChoice => {
      switch(userChoice.memberChoice) {
      case "Engineer":
        addEngineer();
        break;
      case "Intern":
        addIntern();
        break;
      default:
        buildTeam();
      }
    });
  }

  //Function for accepting engineer's details and adding Engineer as a team member
  function addEngineer() {
    inquirer.prompt([
      {
        type: "input",
        name: "engineerName",
        message: "Please Enter your Engineer's Name?",
        validate: answer => {
          if (answer !== "") {
            return true;
          }
          return "Please enter at least one character. It cannot be BLANK";
        }
      },
      {
        type: "input",
        name: "engineerId",
        message: "Please Enter your Engineer's Id?",
        validate: answer => {
          const pass = answer.match(
            /^[1-9]\d*$/
          );
          if (pass) {
            if (idArray.includes(answer)) {
              return "This ID already Exists. Please enter a different number.";
            } else {
              return true;
            }
                        
          }
          return "Please enter a number greater than zero.";
        }
      },
      {
        type: "input",
        name: "engineerEmail",
        message: "Please Enter your Engineer's Email?",
        validate: answer => {
          const pass = answer.match(
            /\S+@\S+\.\S+/
          );
          if (pass) {
            return true;
          }
          return "Please enter a valid email address.";
        }
      },
      {
        type: "input",
        name: "engineerGithub",
        message: "Please Enter your Engineer's GitHub username?",
        validate: answer => {
          if (answer !== "") {
            return true;
          }
          return "Please enter at least one character.It cannot be BLANK";
        }
      }
    ]).then(answers => {
      const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
      teamMembers.push(engineer);
      idArray.push(answers.engineerId);
      createTeam();
    });
  }

  //Function for accepting intern details and adding intern as a team member
  function addIntern() {
    inquirer.prompt([
      {
        type: "input",
        name: "internName",
        message: "Please Enter your Intern's Name?",
        validate: answer => {
          if (answer !== "") {
            return true;
          }
          return "Please enter at least one character.It cannot be BLANK";
        }
      },
      {
        type: "input",
        name: "internId",
        message: "What is your intern's id?",
        validate: answer => {
          const pass = answer.match(
            /^[1-9]\d*$/
          );
          if (pass) {
            if (idArray.includes(answer)) {
              return "This ID already Exists. Please enter a different number.";
            } else {
              return true;
            }
                        
          }
          return "Please enter a number greater than zero.";
        }
      },
      {
        type: "input",
        name: "internEmail",
        message: "Please Enter your Intern's Email?",
        validate: answer => {
          const pass = answer.match(
            /\S+@\S+\.\S+/
          );
          if (pass) {
            return true;
          }
          return "Please enter a valid email address.";
        }
      },
      {
        type: "input",
        name: "internSchool",
        message: "Please Enter your Intern's School?",
        validate: answer => {
          if (answer !== "") {
            return true;
          }
          return "Please enter at least one character.It cannot be BLANK";
        }
      }
    ]).then(answers => {
      const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
      teamMembers.push(intern);
      idArray.push(answers.internId);
      createTeam();
    });
  }

  function buildTeam() {
    // Create an output directory if the output path doesn't exist
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
  }
  createManager();
}

appMenu();


