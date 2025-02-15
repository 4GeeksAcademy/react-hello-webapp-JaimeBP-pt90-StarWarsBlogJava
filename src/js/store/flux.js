const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            characters: [], // Almacenar personajes
            vehicles: [], // Almacenar vehículos
            planets: [], // Almacenar planetas
            favorites: [] // Lista de favoritos
        },
        actions: {
            // Obtener datos de la API
            loadData: async () => {
                try {
                    // Fetch de personajes
                    let peopleResponse = await fetch("https://www.swapi.tech/api/people");
                    let peopleData = await peopleResponse.json();
                    
                    // Fetch de vehículos
                    let vehiclesResponse = await fetch("https://www.swapi.tech/api/vehicles");
                    let vehiclesData = await vehiclesResponse.json();
                    
                    // Fetch de planetas
                    let planetsResponse = await fetch("https://www.swapi.tech/api/planets");
                    let planetsData = await planetsResponse.json();
                    
                    // Guardar los datos en el store
                    setStore({
                        characters: peopleData.results,
                        vehicles: vehiclesData.results,
                        planets: planetsData.results
                    });
                } catch (error) {
                    console.error("Error fetching data: ", error);
                }
            },
            
            // Agregar o quitar favoritos
            toggleFavorite: (item) => {
                const store = getStore();
                const exists = store.favorites.some(fav => fav.uid === item.uid);
                if (exists) {
                    setStore({ favorites: store.favorites.filter(fav => fav.uid !== item.uid) });
                } else {
                    setStore({ favorites: [...store.favorites, item] });
                }
            }
        }
    };
};

export default getState;
