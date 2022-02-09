import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import PokemonCard from "../components/PokemonCard";

function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=8&offset=${offset}`
        );

        response.data.results.forEach(async (pokemon) => {
          const result = await axios.get(pokemon.url);
          console.log(result.data);
          setPokemonList((oldPokemonList) => [...oldPokemonList, result.data]);
          setLoading(false);
        });
      } catch (err) {
        console.log(err);
        setError(err);
        setLoading(false)
      }
    }
    fetchData();

    // console.log(pokemonList);
  }, [offset]);

  const handleNext = () => {
    //   console.log('next lakukan');
      setOffset(offset + 8)
  }

  if (loading) {
    return <h3>Loading...</h3>;
  }

  if (error) {
    return <h3>{error}</h3>;
  }

  return (
    <Container>
      <h1>Pokedex</h1>
      <Row>
        {pokemonList.map((pokemon) => (
          <Col key={pokemon.id} xs={6} className="mt-3">
            <PokemonCard pokemon={pokemon} />
          </Col>
        ))}
      </Row>
      <Button className="my-4" onClick={handleNext} variant="primary">
        Show next
      </Button>
    </Container>
  );
}

export default Home;
