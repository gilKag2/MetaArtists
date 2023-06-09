import { Configuration, OpenAIApi } from "openai";
import * as dotenv from 'dotenv';
import Showcase from "../mongodb/models/showcase.js";

dotenv.config();

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,

// });

// const openai = new OpenAIApi(configuration);

class ShowcaseService {

  async getShowcases(artistId) {

    return getFakeShowcases(artistId);
    // try {
    //   const showcases = await Showcase.find({ artistId });
    //   return showcases;
    // } catch (e) {
    //   throw new Error('Failed to fetch showcases for the artist with id ' + artistId);
    // }
  }

  async createShowcase(artistData, prompt, userId) {
    const { artistId, artistName } = artistData;

    const generatedImageUrl = await generateArtistImage(artistName, prompt, userId);

    const lyrics = await generateArtistLyrics(artistName, prompt);

    // save showcase
    try {
      const showcase = await Showcase.create({
        artistId,
        imgUrl: generatedImageUrl,
        lyrics,
        userId
      });
      return showcase;
    } catch (e) {
      console.log(e);
      throw new Error('Failed to to create showcase');
    }

  }
}


async function generateArtistImage(artistName, prompt) {
  return getFakeShowcases()[ 0 ].imgUrl;
};

async function generateArtistLyrics(artistName, prompt) {
  return getFakeShowcases()[ 0 ].lyrics;
}


function getFakeShowcases(artistId) {
  return [
    {
      id: 1,
      artistId,
      imgUrl: 'https://res.cloudinary.com/dmjsnddmn/image/upload/v1681980326/DALL_E_2023-04-20_11.24.27_-_the_singer_Mac_Miller_drinking_in_the_lake_tgct5z.png',
      lyrics: `Verse 1:
Sittin' by the lake, feelin' so serene
Water's calm and clear, like a dream
Birds chirpin' in the trees, the breeze so clean
Everything's perfect, it's just how it seems

Chorus:
Lake life, it's the best life
The sun shines bright, and everything's alright
The water's cool and clear, it's so inviting
Lake life, it's where I feel alive

Verse 2:
Jumpin' off the dock, into the deep blue
Swimmin' all around, feelin' brand new
Splishin' and splashin', it's what we do
It's just me and my crew, havin' a good time, that's true

Chorus:
Lake life, it's the best life
The sun shines bright, and everything's alright
The water's cool and clear, it's so inviting
Lake life, it's where I feel alive

Verse 3:
Night falls, and the stars shine so bright
Gather 'round the campfire, everything's right
Stories and laughter, throughout the night
Lake life, it's the life, it's the life we like

Chorus:
Lake life, it's the best life
The sun shines bright, and everything's alright
The water's cool and clear, it's so inviting
Lake life, it's where I feel alive

Outro:
Lake life, it's where I wanna be
With my friends and family, so carefree
It's the place where I can truly see
That life's about moments, just bein' happy.`
    },
    {
      id: 2,
      artistId,
      imgUrl: 'https://res.cloudinary.com/dmjsnddmn/image/upload/v1681980326/DALL_E_2023-04-20_11.24.27_-_the_singer_Mac_Miller_drinking_in_the_lake_tgct5z.png',
      lyrics: `Verse 1:
Sittin' by the lake, feelin' so serene
Water's calm and clear, like a dream
Birds chirpin' in the trees, the breeze so clean
Everything's perfect, it's just how it seems

Chorus:
Lake life, it's the best life
The sun shines bright, and everything's alright
The water's cool and clear, it's so inviting
Lake life, it's where I feel alive

Verse 2:
Jumpin' off the dock, into the deep blue
Swimmin' all around, feelin' brand new
Splishin' and splashin', it's what we do
It's just me and my crew, havin' a good time, that's true

Chorus:
Lake life, it's the best life
The sun shines bright, and everything's alright
The water's cool and clear, it's so inviting
Lake life, it's where I feel alive

Verse 3:
Night falls, and the stars shine so bright
Gather 'round the campfire, everything's right
Stories and laughter, throughout the night
Lake life, it's the life, it's the life we like

Chorus:
Lake life, it's the best life
The sun shines bright, and everything's alright
The water's cool and clear, it's so inviting
Lake life, it's where I feel alive

Outro:
Lake life, it's where I wanna be
With my friends and family, so carefree
It's the place where I can truly see
That life's about moments, just bein' happy.`
    }
  ];
};

const showcaseService = new ShowcaseService();

export default showcaseService;