import { FC } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import {
  addCharacterToFollowingList,
  removeCharacterToFollowingList
} from 'features/following/following.slices';
import { Card } from 'features/card';
import CardBody from 'features/card/card-body.component';
import { FollowingButtonComponent } from 'features/following/button';
import Character from 'features/characters/characters.types';

type CharacterCardProps = {
  character: Character;
};

const CharacterCard: FC<CharacterCardProps> = ({ character }: CharacterCardProps) => {
  const dispatch = useAppDispatch();
  const followingIds = useAppSelector((state) => state.following.followingIds);

  const onToggleFavorite = (character: Character, setFav: boolean) => {
    if (setFav) {
      dispatch(addCharacterToFollowingList(character.id));
    } else {
      dispatch(removeCharacterToFollowingList(character.id));
    }
  };

  return (
    <Card key={character.id}>
      <Card.Image>
        <img src={character.image} alt={character.name} />
      </Card.Image>
      <CardBody>
        <span>{character.name}</span>
        <FollowingButtonComponent
          isFav={followingIds.indexOf(character.id) >= 0}
          onToggleFavorite={(setFav) => onToggleFavorite(character, setFav)}
        />
      </CardBody>
    </Card>
  );
};

export default CharacterCard;
