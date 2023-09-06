import { Note } from './components/Note';
import noteService from './services/notes';
import { useState, useEffect } from 'react';
import { Notification } from './components/Notification';

import './index.css';

function Footer () {
  return (
    <div
      style={{
        color: 'green',
        fontStyle: 'italic',
        fontSize: 16
      }}
    >
      <br />
      <em>Note app, Deparment of Computer Science, University of Cadiz 2023</em>
    </div>
  );
}

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    noteService.getAll()
      .then(initialNotes => setNotes(initialNotes));
  }, []);

  const notesToShow = showAll ? notes : notes.filter(note => note.important);

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService.update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(n => n.id !== id ? n : returnedNote));
      })
      .catch(() => {
        setErrorMessage(`The note '${note.content}' was already deleted from server`);
        setTimeout(() => setErrorMessage(null), 5000);
        setNotes(notes.filter(n => n.id !== id));
      });
  };

  const addNote = event => {
    event.preventDefault();

    const newNoteObject = {
      important: Math.random() < 0.5,
      content: newNote
    };

    noteService.create(newNoteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote));
        setNewNote('');
      });
  };

  const handleNoteChange = event => {
    setNewNote(event.target.value);
  };

  const handleImportantClick = event => {
    setShowAll(!showAll);
  };

  return (
    <div>
      <h1>Notes</h1>
      <Notification
        message={errorMessage}
      />
      <button onClick={handleImportantClick}>{showAll ? 'Important' : 'All'}</button>
      <ul>
        {notesToShow.map(note => (
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input type='text' value={newNote} onChange={handleNoteChange} />
        <button type='submit'>Save</button>
      </form>
      <Footer />
    </div>
  );
};

export default App;
