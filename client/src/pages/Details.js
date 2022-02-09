import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Card, Button } from "react-bootstrap";

function Details() {
  const { id } = useParams();
  const [pokemonData, setPokemonData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [displayStatus, setDisplayStatus] = useState("About");
  const [pokemonAbilities, setPokemonAbilities] = useState("");
  const [pokemonTypes, setPokemonTypes] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        console.log(response);
        if (response.status === 200) {
          setPokemonData(response.data);

          const abilities = response.data.abilities.map((ability) => {
            return ability.ability.name;
          });
          setPokemonAbilities(abilities.join(", "));

          const types = response.data.types.map((type) => {
            return type.type.name;
          });
          setPokemonTypes(types.join(", "));

          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        setError(err);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setDisplayStatus(value);
  };

  if (loading) {
    return <h3>Loading...</h3>;
  }

  if (error) {
    return <h3>{error}</h3>;
  }

  return (
    <Container className="mt-3">
      <Card className="mx-auto" style={{ maxWidth: "25rem" }}>
        <Card.Img
          variant="top"
          src={pokemonData.sprites.other["official-artwork"].front_default}
        />
        <Card.Body className="mb-5">
          <Card.Title>{pokemonData.name}</Card.Title>
          <Card.Text>Type: {pokemonTypes}</Card.Text>
          <Button
            className="me-1 mb-2"
            onClick={handleChange}
            value="About"
            variant="primary"
          >
            About
          </Button>
          <Button
            className="me-1 mb-2"
            onClick={handleChange}
            value="Stats"
            variant="primary"
          >
            Base Stats
          </Button>
          <Button
            className="me-1 mb-2"
            onClick={handleChange}
            value="Evolution"
            variant="primary"
          >
            Evolution
          </Button>
          <Button
            className="me-1 mb-2"
            onClick={handleChange}
            value="Moves"
            variant="primary"
          >
            Moves
          </Button>
          {displayStatus === "About" && (
            <div>
              <Card.Text>Height: {pokemonData.height / 10} m</Card.Text>
              <Card.Text>Weight: {pokemonData.weight / 10} kg</Card.Text>
              <Card.Text>Abilities: {pokemonAbilities}</Card.Text>
            </div>
          )}
          {displayStatus === "Stats" && (
            <div>
              <Card.Text>HP: {pokemonData.stats[0].base_stat}</Card.Text>
              <Card.Text>Attack: {pokemonData.stats[1].base_stat}</Card.Text>
              <Card.Text>Defense: {pokemonData.stats[2].base_stat}</Card.Text>
              <Card.Text>Sp. Atk: {pokemonData.stats[3].base_stat}</Card.Text>
              <Card.Text>Sp. Def: {pokemonData.stats[4].base_stat}</Card.Text>
            </div>
          )}
          {displayStatus === "Evolution" && (
            <div>
              <Card.Text>Evolution</Card.Text>
            </div>
          )}
          {displayStatus === "Moves" && (
            <div>
              <ul>
                {pokemonData.moves.map((move) => (
                  <li key={move.move.name}>{move.move.name}</li>
                ))}
              </ul>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Details;
