import { Note } from './components/Note';
import noteService from './services/notes';
import { useState, useEffect } from 'react';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    noteService.getAll()
      .then(respones => setNotes(respones.data));
  }, []);

  const notesToShow = showAll ? notes : notes.filter(note => note.important);

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService.update(id, changedNote)
      .then(response => {
        setNotes(notes.map(n => n.id !== id ? n : response.data));
      });
  };

  const addNote = event => {
    event.preventDefault();

    const newNoteObject = {
      important: Math.random() < 0.5,
      content: newNote
    };

    noteService.create(newNoteObject)
      .then(response => {
        setNotes(notes.concat(response.data));
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
    </div>
  );
};

export default App;
