import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function PokemonCard({ pokemon }) {
    const [pokemonTypes, setPokemonTypes] = useState("")

    useEffect(() => {
        const types = pokemon.types.map((type) => {
            return type.type.name;
          });
          setPokemonTypes(types.join(", "));
    },[])

  return (
    <Card className="h-100" style={{ maxWidth: "20rem" }}>
      <Link to={`/pokemon/${pokemon.id}`}>
        <Card.Img
          style={{ width: "100%", height: "15vw", objectFit: "contain" }}
          variant="top"
          src={pokemon.sprites.other['official-artwork'].front_default}
        />
      </Link>
      <Card.Body>
        <Card.Title>{pokemon.name}</Card.Title>
        <Card.Text>Type: {pokemonTypes}</Card.Text>
        {/* <Card.Text>{item.price}</Card.Text> */}
      </Card.Body>
    </Card>
  );
}

export default PokemonCard;
