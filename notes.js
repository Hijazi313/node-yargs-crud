const fs = require("fs");
const chalk = require("chalk");

// Add Note Functionality
const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find(note => note.title === title);
  if (!duplicateNote) {
    notes.push({
      title,
      body
    });
    saveNote(notes);
    console.log(chalk.inverse.green("New Note Added"));
  } else {
    console.log(chalk.inverse.red("Note Title Already Taken"));
  }
};

// Read Note Functionality
const readNote = title => {
  const notes = loadNotes();
  const findNote = notes.find(note => note.title === title);
  if (findNote) {
    console.log(`${chalk.inverse(findNote.title)}    ${findNote.body}`);
  } else {
    console.log(chalk.inverse.red("Can't Find This Note"));
  }
};

// Remove Note from data.json Functionality
const removeNote = title => {
  const Notes = loadNotes();

  const filteredNotes = Notes.filter(note => note.title !== title);

  if (Notes.length > filteredNotes.length) {
    console.log(chalk.inverse.green("Removed Note"));
    saveNote(filteredNotes);
  } else {
    console.log(chalk.inverse.red("No Note Found"));
  }
};

// Save Note Functionality
// Data will be stored in JSON Format
const saveNote = notes => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

// Read All Notes Functionality
const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.inverse("Your Notes"));

  notes.forEach((note, i) =>
    console.log(`${i + 1} :    ${chalk.bold(note.title)}     ${note.body}`)
  );
};

// Fetch  Notes from data.json file Functionality
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (err) {
    return [];
  }
};

// Export all functions
module.exports = {
  addNote,
  removeNote,
  listNotes,
  readNote
};
