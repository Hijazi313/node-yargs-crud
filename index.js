const fs = require("fs");
const chalk = require("chalk");
const yargs = require("yargs");
const notes = require("./notes");

// Create  Add command
yargs.command({
  command: "add",
  describe: "Add a new Note ",
  builder: {
    title: {
      describe: "Add a New Note Title",
      demandOption: true,
      type: "string"
    },
    body: {
      describe: "Add New Note Body",
      demandOption: true,
      type: "string"
    }
  },
  handler: argv => {
    notes.addNote(argv.title, argv.body);
  }
});

// Create Remove Command
yargs.command({
  command: "remove",
  describe: "Remove A Note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string"
    }
  },
  handler: argv => {
    notes.removeNote(argv.title);
  }
});

// Create List Command

yargs.command({
  command: "list",
  describe: "Notes List",
  handler: () => {
    notes.listNotes();
  }
});

// Create read Command
yargs.command({
  command: "read",
  describe: "Read Notes",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string"
    }
  },
  handler: argv => {
    notes.readNote(argv.title);
  }
});

const command = process.argv[2];
if (command === "add") {
  console.log("adding Node");
} else if (command === "remove") {
  console.log("Removing Node");
}
yargs.parse();
