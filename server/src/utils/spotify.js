export const convertArtistsResults = (artistsData) => {
  return artistsData.map(artist => {
    return { id: artist.data.uri.split(':')[ 2 ], name: artist.data.profile.name, img: artist.data.visuals?.avatarImage?.sources[ 0 ]?.url };
  });
};

export const convertArtistData = (artistData) => {
  return {
    id: artistData.id,
    name: artistData.profile.name,
    bio: artistData.profile.biography.text,
    img: artistData.visuals.img,
    url: artistData.visuals.avatarImage.sources[ 0 ]?.url
  };
};

export const convertRelatedArtistsData = (relatedArtists) => {
  return relatedArtists.slice(0, 5).map(artist => {
    return { id: artist.id, name: artist.name, img: artist.images[ 0 ]?.url };
  });
};