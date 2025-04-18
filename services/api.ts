export const TMDB_CONFIG = {
   BASE_URL: 'https://api.themoviedb.org/3',
   API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
   headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
   }
}


export const fetchMovies = async ({ query }: { query: string }) => {
   const endpoint = query ?
      `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}` :
      `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

   const response = await fetch(endpoint, {
      method: 'GET',
      headers: TMDB_CONFIG.headers,
   });

   if (!response.ok) {
      //@ts-ignore
      throw new Error("Faild to fetch movie", response.statusText);
   }

   const data = await response.json();
   return data.results;

}


export const fetchTrendingMovies = async(): Promise<TrendingMovies[]> => {
   const endpoint = `${TMDB_CONFIG.BASE_URL}/trending/movie/day?language=en-US`;

   const response = await fetch(endpoint,{
      method: 'GET',
      headers: TMDB_CONFIG.headers
   });

   if(!response.ok){
      //@ts-ignore
      throw new Error("Faild to fetch movie", response.statusText);
   }

   const data = await response.json()
   return data.results;
   
}


export const fetchMovieDetails = async(movieId: string): Promise<MovieDetails> => {

   try{
     const response = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,{
         method: 'GET',
         headers: TMDB_CONFIG.headers
     })

      
     if(!response.ok) {
      //@ts-ignore
      throw new Error("Faild to fetch movie details", response.statusText);
     }
     
     const data = await response.json()
     return data;
   }
   catch(error){
     console.log(error);
     throw error;
   }

}


export const fetchHorrorMovies = async(): Promise<Movie[]> => {
   try {
      const response = await fetch(`${TMDB_CONFIG.BASE_URL}/discover/movie?api_key=${TMDB_CONFIG.API_KEY}&with_genres=27`,{
         method: 'GET',
         headers: TMDB_CONFIG.headers
      })

      if(!response.ok){
         //@ts-ignore
         throw new Error('Faild to fetch movie deatails', response.statusText)
      }
      const data = await response.json();
      return data.results;

   } catch (error) {
      console.log(error);
      throw error;
   }
}


export const fetchActionMovies = async(): Promise<Movie[]> => {
   try {
      const respons = await fetch(`${TMDB_CONFIG.BASE_URL}/discover/movie?api_key=${TMDB_CONFIG.API_KEY}&with_genres=28`,{
         method: 'GET',
         headers: TMDB_CONFIG.headers
      })
      
      if(!respons.ok){
         //@ts-ignore
         throw new Error('Faild to fetch movie details', respons.statusText)
      }

      const data = await respons.json();
      return data.results;
      
   } catch (error) {
      console.log(error);
      throw error;
   }
}
