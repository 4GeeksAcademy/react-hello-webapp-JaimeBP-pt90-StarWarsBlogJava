import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import "../../styles/index.css";

export const Home = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container-fluid mt-5">
            {/* PERSONAJES */}
            <h2 className="text-danger">Characters</h2>
            <div className="row">
                {store.characters.map(character => (
                    <div key={character.uid} className="col-md-4">
                        <div className="card mb-3">
                            <img
                                src={`https://starwars-visualguide.com/assets/img/characters/${character.uid}.jpg`}
                                className="card-img-top"
                                alt={character.name}
                                onError={(e) => e.target.src = "https://via.placeholder.com/400x200"}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{character.name}</h5>
                                <p className="card-text">Gender: {character.gender ? character.gender : "Unknown"}</p>
                                <Link to={`/people/${character.uid}`} className="btn btn-primary">Learn more!</Link>
                                <button
                                    className="btn btn-outline-warning ms-2"
                                    onClick={() => actions.toggleFavorite(character)}
                                >
                                    ❤️
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* VEHÍCULOS */}
            <h2 className="text-danger mt-4">Vehicles</h2>
            <div className="row">
                {store.vehicles.map(vehicle => (
                    <div key={vehicle.uid} className="col-md-4">
                        <div className="card mb-3">
                            <img
                                src={`https://starwars-visualguide.com/assets/img/vehicles/${vehicle.uid}.jpg`}
                                className="card-img-top"
                                alt={vehicle.name}
                                onError={(e) => e.target.src = "https://via.placeholder.com/400x200"}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{vehicle.name}</h5>
                                <p className="card-text">Model: {vehicle.model ? vehicle.model : "Unknown"}</p>
                                <Link to={`/vehicles/${vehicle.uid}`} className="btn btn-primary">Learn more!</Link>
                                <button
                                    className="btn btn-outline-warning ms-2"
                                    onClick={() => actions.toggleFavorite(vehicle)}
                                >
                                    ❤️
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* PLANETAS */}
            <h2 className="text-danger mt-4">Planets</h2>
            <div className="row">
                {store.planets.map(planet => (
                    <div key={planet.uid} className="col-md-4">
                        <div className="card mb-3">
                            <img
                                src={`https://starwars-visualguide.com/assets/img/planets/${planet.uid}.jpg`}
                                className="card-img-top"
                                alt={planet.name}
                                onError={(e) => e.target.src = "https://via.placeholder.com/400x200"}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{planet.name}</h5>
                                <p className="card-text">Climate: {planet.climate ? planet.climate : "Unknown"}</p>
                                <Link to={`/planets/${planet.uid}`} className="btn btn-primary">Learn more!</Link>
                                <button
                                    className="btn btn-outline-warning ms-2"
                                    onClick={() => actions.toggleFavorite(planet)}
                                >
                                    ❤️
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
