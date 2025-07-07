import Note from '../../../databases/models/note.model.js';

const createNote = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.userId;

  try {
    const note = new Note({
      title,
      content,
      userId,
    });
    await note.save();

    res.status(201).json({ message: 'Note created successfully', note });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const getAllNotes = async (req, res) => {
  const userId = req.userId;

  try {
    const notes = await Note.find({ userId });
    res.status(200).json({ message: 'Notes retrieved successfully', notes });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export { createNote, getAllNotes };