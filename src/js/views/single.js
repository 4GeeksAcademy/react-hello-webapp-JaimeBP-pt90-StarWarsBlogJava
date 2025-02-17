import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useLocation } from "react-router-dom";

export const Single = () => {
    const { store, actions } = useContext(Context);
    const { theid } = useParams();
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    // Determinar si es un personaje, vehículo o planeta
    const location = useLocation(); // Obtiene la ruta actual
    let entityType = "";

    if (location.pathname.includes("people")) {
        entityType = "people";
    } else if (location.pathname.includes("vehicles")) {
        entityType = "vehicles";
    } else if (location.pathname.includes("planets")) {
        entityType = "planets";
    }

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                console.log(`Fetching details for ${entityType} with ID: ${theid}`);

                let response = await fetch(`https://www.swapi.tech/api/${entityType}/${theid}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                let data = await response.json();
                if (!data.result || !data.result.properties) {
                    throw new Error("Data format incorrect: No 'properties' found in response.");
                }

                setDetails({
                    ...data.result.properties,
                    description: data.result.description // ← Ahora sí toma la descripción correcta
                });
            } catch (error) {
                console.error("Error fetching details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [theid]);

    if (loading) return <h2 className="text-center mt-5">Loading...</h2>;

    if (!details) return <h2 className="text-center mt-5 text-danger">Error loading details!</h2>;

    return (
        <div className="container mt-5">
            <div className="row">
                {/* IMAGEN */}
                <div className="col-md-4">
                    <img
                        src={`https://starwars-visualguide.com/assets/img/${entityType}/${theid}.jpg`}
                        className="img-fluid rounded"
                        alt={details.name}
                        onError={(e) => e.target.src = "https://via.placeholder.com/400x200"}
                    />
                </div>

                {/* INFORMACIÓN */}
                <div className="col-md-8">
                    <h1 className="text-danger">{details.name}</h1>
                    <p className="lead">
                        {details.description || "No description available for this entity."}
                    </p>

                    <ul className="list-group">
                        {entityType === "people" && (
                            <>
                                <li className="list-group-item"><strong>Height:</strong> {details.height || "Unknown"}</li>
                                <li className="list-group-item"><strong>Mass:</strong> {details.mass || "Unknown"}</li>
                                <li className="list-group-item"><strong>Hair Color:</strong> {details.hair_color || "Unknown"}</li>
                                <li className="list-group-item"><strong>Skin Color:</strong> {details.skin_color || "Unknown"}</li>
                                <li className="list-group-item"><strong>Eye Color:</strong> {details.eye_color || "Unknown"}</li>
                                <li className="list-group-item"><strong>Birth Year:</strong> {details.birth_year || "Unknown"}</li>
                                <li className="list-group-item"><strong>Gender:</strong> {details.gender || "Unknown"}</li>
                            </>
                        )}

                        {entityType === "vehicles" && (
                            <>
                                <li className="list-group-item"><strong>Model:</strong> {details.model || "Unknown"}</li>
                                <li className="list-group-item"><strong>Manufacturer:</strong> {details.manufacturer || "Unknown"}</li>
                                <li className="list-group-item"><strong>Cost:</strong> {details.cost_in_credits || "Unknown"} credits</li>
                                <li className="list-group-item"><strong>Speed:</strong> {details.max_atmosphering_speed || "Unknown"}</li>
                                <li className="list-group-item"><strong>Crew:</strong> {details.crew || "Unknown"}</li>
                                <li className="list-group-item"><strong>Passengers:</strong> {details.passengers || "Unknown"}</li>
                            </>
                        )}

                        {entityType === "planets" && (
                            <>
                                <li className="list-group-item"><strong>Climate:</strong> {details.climate || "Unknown"}</li>
                                <li className="list-group-item"><strong>Terrain:</strong> {details.terrain || "Unknown"}</li>
                                <li className="list-group-item"><strong>Diameter:</strong> {details.diameter || "Unknown"} km</li>
                                <li className="list-group-item"><strong>Population:</strong> {details.population || "Unknown"}</li>
                                <li className="list-group-item"><strong>Orbital Period:</strong> {details.orbital_period || "Unknown"} days</li>
                                <li className="list-group-item"><strong>Rotation Period:</strong> {details.rotation_period || "Unknown"} hours</li>
                            </>
                        )}
                    </ul>


                    {/* BOTONES */}
                    <div className="mt-4">
                        <Link to="/" className="btn btn-secondary">Back Home</Link>
                        <button
                            className="btn btn-outline-warning ms-3"
                            onClick={() => actions.toggleFavorite({ uid: theid, name: details.name })}
                        >
                            ❤️ Add to Favorites
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
