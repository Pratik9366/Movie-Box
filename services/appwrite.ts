import { Client, Databases, ID, Query } from 'react-native-appwrite'

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
const WATCHLIST_ID = process.env.EXPO_PUBLIC_APPWRITE_WATCHLIST_COLLECTION_ID!;

const client = new Client().setEndpoint('https://cloud.appwrite.io/v1').setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)
const database = new Databases(client)

// todo: track the search made by the user and upload it in the db
export const updateSearchCount = async (query: string, movie: Movie) => {
   try {
      const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
         Query.equal('searchTerm', query)
      ])
      // todo: cheack if a record of that search has already been stored
      // todo: if a document is found imcrement search feild
      // todo: if no document is found => create a new document in appwrite database with update count -> 1
      if (result.documents.length > 0) {
         const existingMovie = result.documents[0];

         await database.updateDocument(DATABASE_ID, COLLECTION_ID, existingMovie.$id, {
            count: existingMovie.count + 1
         })
      } else {
         await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
            searchTerm: query,
            movie_id: movie.id,
            count: 1,
            title: movie.title,
            poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
         })
      }
   } catch (error) {
      console.log(error);
      throw error;
   }

}


// todo: fetching that searched data from appwrite db
export const getLastViewMovies = async (): Promise<LastViewMovies[] | undefined> => {
   try {
      const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
         Query.limit(5),
         Query.orderDesc('count')
      ])
      
      //console.log(result);
      
      return result.documents as unknown as LastViewMovies[];

   } catch (error) {
      console.log(error);
      return undefined;
   }
}

// todo: track the watchlist button add by the user to upload the movie in the db

export const addToWatchList = async (movie: WatchListMovies) => {
   await database.createDocument(DATABASE_ID, WATCHLIST_ID, ID.unique(), {
      title: movie.title,
      movie_id: movie.movie_id,
      poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_url}`
   })
}


// todo: fetching that watchlist data from db

export const getWatchlistMovies = async (): Promise<WatchListMovies[] | undefined> => {
   try {
      const result = await database.listDocuments(DATABASE_ID, WATCHLIST_ID);
      return result.documents as unknown as WatchListMovies[];
   } catch (error) {
      console.log(error);
      return undefined;
   }
}