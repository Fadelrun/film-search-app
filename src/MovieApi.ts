export const fetchMovies = async (query: string, page: number = 1) => {
    try {
        const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=45b26b3a&plot=full&page=${page}`);
        
        if (!response.ok) {
            throw new Error('Network error or bad request');
        }

        const data = await response.json();

        if (data.Error) {
            throw new Error(data.Error);
        }

        return data.Search || []; 

    } catch (error) {
        console.error("Error loading data:", error);
        throw new Error('There was an error loading movies'); 
    }
};
