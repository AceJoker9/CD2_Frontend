import React, { useState, useEffect } from "react";
import axios from "axios";
import NavigationBar from "./NavigationBar";
import SearchBar from "./SearchBar";
import MusicTable from "./MusicTable";

function App() {
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    getAllSongs();
  }, []);

  async function getAllSongs() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/tracks/");
      setSongs(response.data);
      setFilteredSongs(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  function handleFilterChange(event) {
    setFilter(event.target.value);
    filterSongs(event.target.value);
  }

  function filterSongs(filter) {
    if (filter === "") {
      setFilteredSongs(songs);
    } else {
      const filtered = songs.filter(
        (song) =>
          song.title.toLowerCase().includes(filter.toLowerCase()) ||
          song.album.toLowerCase().includes(filter.toLowerCase()) ||
          song.artist.toLowerCase().includes(filter.toLowerCase()) ||
          song.genre.toLowerCase().includes(filter.toLowerCase()) ||
          song.release_date.toLowerCase().includes(filter.toLowerCase())
      );
      setFilteredSongs(filtered);
    }
  }

  async function handleDelete(id) {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/tracks/delete/${id}/`);
      setSongs(songs.filter((song) => song.id !== id));
      setFilteredSongs(filteredSongs.filter((song) => song.id !== id));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <NavigationBar />
      <SearchBar filter={filter} handleFilterChange={handleFilterChange} />
      <MusicTable songs={filteredSongs} onDelete={handleDelete} />
      <button onClick={addSong}>Add Song</button>
    </div>
  );
}

export default App;
