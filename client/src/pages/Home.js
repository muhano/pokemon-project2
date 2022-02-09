import axios from "axios";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=8&offset=0"
        );
        // console.log(response.data, "<-------");
        // if (response) {
        //   // setLoading(false)
        //   setPokemonList(response.data);
        //   setLoading(false);
        // }
        response.data.results.forEach(async (pokemon) => {
            const result = await axios.get(pokemon.url)
            console.log(result.data);
            setPokemonList(oldPokemonList => [...oldPokemonList, result.data])
            setLoading(false)
        })
      } catch (err) {
        console.log(err);
        setError(err);
      }
    }
    fetchData();

    // console.log(pokemonList);
  }, []);

  if (loading) {
    return <h3>Loading...</h3>;
  }

  if (error) {
    return <h3>{error}</h3>;
  }

  return (
    <Container>
      <h1>Pokedex</h1>
      {pokemonList.map((pokemon) => (
        <div key={pokemon.id}>
            <img src={pokemon.sprites.other['official-artwork'].front_default} alt="Italian Trulli"></img>
          <p >{pokemon.name}</p>
        </div>
      ))}
    </Container>
  );
}

export default Home;
