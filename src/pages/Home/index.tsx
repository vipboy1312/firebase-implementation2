import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { db } from "../../config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
export default function Home() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  const [movieList, setMovieList] = useState<any[]>();

  // New Movie States
  const [newMovieTitle, setNewMovieTitle] = useState<string>("");
  const [newReleaseDate, setNewReleaseDate] = useState<string>("");
  const [isNewMovieOscar, setIsNewMovieOscar] = useState<boolean>(false);
  const moviesCollectionRef = collection(db, "movies");

  // Update Title State
  const [updatedTitle, setUpdatedTitle] = useState<string>("");
  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getMovieList();
  }, []);

  const handleSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        receivedOscar: isNewMovieOscar,
        userId: auth?.currentUser?.uid,
      });
      getMovieList();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteMovie = async (id: string) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
    getMovieList();
  };
  const handleUpdateTitle = async (id: string) => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, { title: updatedTitle });
    getMovieList();
  };
  return (
    <div>
      <h1>Welcome, {auth.currentUser?.displayName}</h1>
      <Link to="/">
        <button>Sign In</button>
      </Link>
      <button onClick={handleLogout}>Logout</button>
      <div>
        <h1>Movie List</h1>
        <div>
          <input
            type="text"
            placeholder="Movie Title..."
            onChange={(e) => setNewMovieTitle(e.target.value)}
          />
          <input
            type="number"
            placeholder="Release Date..."
            onChange={(e) => setNewReleaseDate(e.target.value)}
          />
          <label>
            <input
              type="checkbox"
              checked={isNewMovieOscar}
              onChange={(e) => setIsNewMovieOscar(e.target.checked)}
            />
            Received An Oscar
          </label>
          <button onClick={handleSubmitMovie}>Submit Movie</button>
        </div>
        {movieList?.map((movie) => (
          <div>
            <h1 style={{ color: movie.receivedOscar ? "green" : "red" }}>
              {movie.title}
            </h1>
            <p>{movie.releaseDate}</p>
            <button onClick={() => handleDeleteMovie(movie.id)}>
              Delete Movie
            </button>
            <input
              type="text"
              placeholder="New Title..."
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            <button onClick={() => handleUpdateTitle(movie.id)}>
              Update Title
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
