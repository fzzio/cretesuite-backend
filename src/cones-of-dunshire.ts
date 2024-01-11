import { Role } from './utils/role';
export class Character {
  role: string;
  health: number;
  strength: number;

  // only applies to alchemist
  vilesAvailable?: number;

  constructor(role: string, health: number, strength: number) {
    this.role = role;
    this.health = health;
    this.strength = strength;

    if (this.health > 10) {
      throw new Error('health must not be greater than 10')
    }
    if (this.health < 0) {
      throw new Error('health must not be negative')
    }
    if (this.strength > 20) {
      throw new Error('strength must not be greater than 20')
    }
    if (this.strength < 0) {
      throw new Error('strength must not be negative')
    }
  }

  static create(role: string, health: number, strength: number) {
    return new Character(role, health, strength)
  }
}

export class ConesOfDunshire {
  characters: Array<Character>;

  constructor(characters = [] as Array<Character>) {
    this.characters = characters;
  }

  static takeTurn(characters = [] as Array<Character>) {
    return new ConesOfDunshire(characters).takeTurn()
  }

  takeTurn() {
    return this.characters.map(character => {
      switch (character.role) {
        case Role.MAVERICK:
          return this.handleMaverick(character);
        case Role.ALCHEMIST:
          return this.handleAlchemist(character);
        case Role.LEDGERMAN:
          return this.handleLedgerman(character);
        case Role.FARMER:
          return this.handleFarmer(character);
        default:
          return this.handleOther(character);
      }
    });
  }

  private handleMaverick(character: Character): Character {
    if (character.strength < 40) {
      if (character.health < 6) {
        character.strength = character.strength + 1
      }
      if (character.health < 11) {
        character.strength = character.strength + 1
      }
    }
    if (character.health > 0) {
      character.health = character.health - 1;
    }
    return character;
  }

  private handleAlchemist(character: Character): Character {
    if (character.strength < 20) {
      if (character.strength < 11) {
        character.strength = character.strength + 1
      }
      if (character.health > 0) {
        character.health = character.health - 1;
      }
      if (character.health < 6) {
        character.strength = character.strength - character.strength
      }
    }
    character.vilesAvailable = Math.ceil(character.strength / 2)
    return character;
  }

  private handleLedgerman(character: Character): Character {
    return character;
  }

  private handleFarmer(character: Character): Character {
    if (character.health > 0) {
      character.health = character.health - 2;
    }
    if (character.strength > 0) {
      character.strength = character.strength - 1;
    }
    if (character.health <= 5 && character.strength > 0) {
      character.strength = character.strength - 1;
    }
    if (character.health <= 0) {
      character.strength = 20;
    }
    return character;
  }

  private handleOther(character: Character): Character {
    if (character.strength > 0) {
      character.strength = character.strength - 1
    }

    if (character.health > 0) {
      character.health = character.health - 1;
    }

    return character;
  }
}
