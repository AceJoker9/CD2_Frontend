import React, {useState, useEffect} from "react";
import axios from "axios";
import NavigationBar from "./NavigationBar";
import SearchBar from "./SearchBar";
import MusicTable from "./MusicTable";




let songs = [
  {"id": 1, "title": "Billie Jean", "artist": "Michael Jackson", "album": "Thriller", "release_date": "1982", "genre": "R&B"},
  {"id": 2, "title": "Purple Rain", "artist": "Prince", "album": "Purple Rain", "release_date": "1984", "genre": "R&B"},
  {"id": 3, "title": "Super Freak", "artist": "Rick James", "album": "Street Songs", "release_date": "1981", "genre": "R&B"},
  {"id": 4, "title": "I Wanna Dance with Somebody", "artist": "Whitney Houston", "album": "I'm your baby tonight", "release_date": "1981", "genre": "R&B"},
  {"id": 5, "title": "Rock with You", "artist": "Michael Jackson", "album": "Off The Wall", "release_date": "1979", "genre": "R&B"},
  {"id": 6, "title": "Sweet Child o' Mine", "artist": "Guns N' Roses", "album": "Appetite for Destruction", "release_date": "1987", "genre": "R&B"},
]

function App () {
  const [songs, setSongs] = useState([]);


  useEffect(() => {
    getAllSongs();
    console.log('Hello World');
},[]);

  async function getAllSongs() {
    const response = await axios.get('http://127.0.0.1:8000/api/tracks/');
    console.log (response.data);
    setSongs(response.data)
  }
  return (
    <div>
      <NavigationBar />
      <SearchBar />
      <MusicTable />
      
      <button onClick [() => getAllSongs()] > Get All Songs </button>
    </div>
  );
};

export default App;
