const axios = require('axios');

const API_URL = 'https://api.deezer.com';

module.exports = class Api {
  getChart() {
    return axios.get(`${API_URL}/chart`).then(res => ({
      albums: res.data.albums.data.map(album => ({
        id: album.id,
        name: album.name,
        picture: album.picture_big,
      })),
      artists: res.data.artists.data.map(artist => ({
        id: artist.id,
        name: artist.name,
      })),
      playlists: res.data.playlists.data.map(playlist => ({
        id: playlist.id,
        name: playlist.name,
      })),
      tracks: res.data.tracks.data.map(track => ({
        id: track.id,
        name: track.name,
        src: track.preview,
      })),
    }));
  }

  getPlaylist(id) {
    return axios.get(`${API_URL}/playlist/${id}`).then(res => ({
      tracks: res.data.tracks.data.map(track => ({
        id: track.id,
        name: track.title,
        artist: {
          id: track.artist.id,
          name: track.artist.name,
        },
        src: track.preview,
      })),
    }));
  }

  getTrack(id) {
    return axios.get(`${API_URL}/track/${id}`).then(res => ({
      id: res.data.id,
      name: res.data.title,
      artist: {
        id: res.data.artist.id,
        name: res.data.artist.name,
      },
      src: res.data.preview,
    }));
  }

}