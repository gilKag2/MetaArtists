import React, { useEffect } from 'react';
import axios from 'axios';
const TopArtists = () => {
  useEffect(() => {
    axios.get('http://localhost:3000').then(response => {
      console.log(response.data);
    }).catch(err => console.log(err));
  }, []);
  return (
    <div>TopArtists</div>
  );
};

export default TopArtists;