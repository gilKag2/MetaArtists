export const convertArtistsResults = (artistsData) => {
  return artistsData.map(artist => {
    return { id: artist.data.uri, name: artist.data.profile.name, img: artist.data.visuals?.avatarImage?.sources[ 0 ]?.url };
  });
};