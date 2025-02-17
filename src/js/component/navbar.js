import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
    const { store, actions } = useContext(Context);

    console.log("Favorites:", store.favorites); // Depuración: Ver favoritos en consola

    return (
        <nav className="navbar navbar-light bg-light mb-3 px-4">
            <Link to="/">
                <img
                    src="https://1000marcas.net/wp-content/uploads/2019/12/logo-StarWars.png"
                    alt="Star Wars Logo"
                    style={{ height: "50px" }}
                />
            </Link>
            <div className="ml-auto">
                <div className="dropdown">
                    <button
                        className="btn btn-primary dropdown-toggle"
                        type="button"
                        id="favoritesDropdown"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        Favorites {store.favorites.length}
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="favoritesDropdown">
                        {store.favorites.length === 0 ? (
                            <li className="dropdown-item text-center">No favorites yet</li>
                        ) : (
                            store.favorites.map((fav, index) => (
                                <li key={index} className="dropdown-item d-flex justify-content-between">
                                    <Link to={`/single/${fav.uid}`} className="text-decoration-none text-dark">
                                        {fav.name}
                                    </Link>
                                    <button
                                        className="btn btn-sm btn-danger ms-2"
                                        onClick={() => actions.toggleFavorite(fav, fav.type)}
                                    >
                                        ❌
                                    </button>

                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};
