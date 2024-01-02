// const Manager = require("./lib/Manager");
// const Engineer = require("./lib/Engineer.js");
// const Intern = require("./lib/Intern");
// import inquirer from "inquirer";
// // const inquirer = require("inquirer");
// const path = require("path");
// const fs = require("fs");
import Manager from './lib/Manager.js';
import Engineer from './lib/Engineer.js';
import Intern from './lib/Intern.js';
import inquirer from 'inquirer';

import fs from 'fs';

import render from "./src/page-template.js";

// TODO: Write Code to gather information about the development team members, and render the HTML file.

const team = [];

async function promptManager() {
  console.log('Enter information for the team manager:');
  const { name, id, email, officeNumber } = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Manager\'s Name:',
    },
    {
      type: 'input',
      name: 'id',
      message: 'Manager\'s ID:',
    },
    {
      type: 'input',
      name: 'email',
      message: 'Manager\'s Email:',
    },
    {
      type: 'input',
      name: 'officeNumber',
      message: 'Manager\'s Office Number:',
    },
  ]);
  team.push(new Manager(name, id, email, officeNumber));
}

async function promptEngineer() {
  console.log('Enter information for an engineer:');
  const { name, id, email, github } = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Engineer\'s Name:',
    },
    {
      type: 'input',
      name: 'id',
      message: 'Engineer\'s ID:',
    },
    {
      type: 'input',
      name: 'email',
      message: 'Engineer\'s Email:',
    },
    {
      type: 'input',
      name: 'github',
      message: 'Engineer\'s GitHub Username:',
    },
  ]);
  team.push(new Engineer(name, id, email, github));
}

async function promptIntern() {
  console.log('Enter information for an intern:');
  const { name, id, email, school } = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Intern\'s Name:',
    },
    {
      type: 'input',
      name: 'id',
      message: 'Intern\'s ID:',
    },
    {
      type: 'input',
      name: 'email',
      message: 'Intern\'s Email:',
    },
    {
      type: 'input',
      name: 'school',
      message: 'Intern\'s School:',
    },
  ]);
  team.push(new Intern(name, id, email, school));
}

async function main() {
  await promptManager();

  let addMember = true;
  while (addMember) {
    const { choice } = await inquirer.prompt({
      type: 'list',
      name: 'choice',
      message: 'Choose an option:',
      choices: ['Add an engineer', 'Add an intern', 'Finish building the team'],
    });

    switch (choice) {
      case 'Add an engineer':
        await promptEngineer();
        break;
      case 'Add an intern':
        await promptIntern();
        break;
      case 'Finish building the team':
        addMember = false;
        break;
    }
  }

  const html = render(team);


  const outputPath = './output/team2.html';
  fs.writeFile(outputPath, html, (err) => {
    if (err) throw err;
    console.log(`Team information written to ${outputPath}`);
  });
}

main();