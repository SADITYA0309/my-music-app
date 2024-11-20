import React, { useState } from 'react';

const LyricsFetcher = () => {
  const [song, setSong] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [mood, setMood] = useState('');
  const [playlist, setPlaylist] = useState([]);
  const [audio, setAudio] = useState(null);

  const fetchLyrics = async () => {
    const response = await fetch(`http://localhost:5000/api/lyrics?song=${song}`);
    const data = await response.json();
    setLyrics(data.lyrics || 'No lyrics found.');
  };

  const fetchPlaylist = async () => {
    const response = await fetch(`http://localhost:5000/api/playlist?mood=${mood}`);
    const data = await response.json();
    setPlaylist(data.playlist || []);
  };

  const playSong = (songUrl) => {
    if (audio) {
      audio.pause(); // Pause current song
    }
    const newAudio = new Audio(songUrl);
    newAudio.play();
    setAudio(newAudio);
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <input
        type="text"
        value={song}
        onChange={(e) => setSong(e.target.value)}
        placeholder="Enter song name"
        className="border p-2 rounded mb-2 w-full"
      />
      <button onClick={fetchLyrics} className="bg-blue-500 text-white py-2 px-4 rounded">Fetch Lyrics</button>

      <div className="mt-4 text-gray-700">{lyrics}</div>

      <div className="mt-4">
        <select onChange={(e) => setMood(e.target.value)} className="border p-2 rounded">
          <option value="">Select Mood</option>
          <option value="happy">Happy</option>
          <option value="sad">Sad</option>
        </select>
        <button onClick={fetchPlaylist} className="bg-green-500 text-white py-2 px-4 rounded ml-2">Fetch Playlist</button>
      </div>

      {playlist.length > 0 && (
        <div className="mt-4">
          <h3 className="font-bold">Playlist:</h3>
          <ul>
            {playlist.map((songUrl, index) => (
              <li key={index} className="text-gray-600">
                <button onClick={() => playSong(songUrl)} className="text-blue-500">Play</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LyricsFetcher;
