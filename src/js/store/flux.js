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

                    // Obtener detalles individuales de cada entidad
                    const fetchDetails = async (entity, category) => {
                        const response = await fetch(`https://www.swapi.tech/api/${category}/${entity.uid}`);
                        const data = await response.json();
                        return { ...entity, ...data.result.properties }; // Agregar propiedades al objeto
                    };

                    // Mapear cada entidad con sus detalles
                    let characters = await Promise.all(peopleData.results.map(person => fetchDetails(person, "people")));
                    let vehicles = await Promise.all(vehiclesData.results.map(vehicle => fetchDetails(vehicle, "vehicles")));
                    let planets = await Promise.all(planetsData.results.map(planet => fetchDetails(planet, "planets")));

                    // Guardar los datos en el store
                    setStore({ characters, vehicles, planets });

                } catch (error) {
                    console.error("Error fetching data: ", error);
                }
            },

            // Agregar o quitar favoritos
            toggleFavorite: (item, entityType) => {
                const store = getStore();
                const exists = store.favorites.some(fav => fav.uid === item.uid && fav.type === entityType);

                if (exists) {
                    // Si ya está en favoritos, lo eliminamos filtrando por UID y tipo
                    setStore({
                        favorites: store.favorites.filter(fav => !(fav.uid === item.uid && fav.type === entityType))
                    });
                } else {
                    // Si no está en favoritos, lo añadimos con su tipo
                    setStore({
                        favorites: [...store.favorites, { ...item, type: entityType }]
                    });
                }
            }

        }
    };
};

export default getState;
