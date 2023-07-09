import React from "react";
import axios from "axios";

const MusicTable = ({ songs, onDelete }) => {

  async function handleDelete(id) {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/tracks/delete/${id}/`);
      onDelete(id);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Artist</th>
            <th>Album</th>
            <th>Release Date</th>
            <th>Genre</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song) => (
            <tr key={song.id}>
              <td>{song.title}</td>
              <td>{song.artist}</td>
              <td>{song.album}</td>
              <td>{song.release_date}</td>
              <td>{song.genre}</td>
              <td>
                <button onClick={() => handleDelete(song.id)}>Delete</button>
                {/* Add button or link to trigger modal for editing */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MusicTable;


