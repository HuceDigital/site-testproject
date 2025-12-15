import * as migration_20251027_095711 from './20251027_095711';
import * as migration_20251027_222637 from './20251027_222637';

export const migrations = [
  {
    up: migration_20251027_095711.up,
    down: migration_20251027_095711.down,
    name: '20251027_095711',
  },
  {
    up: migration_20251027_222637.up,
    down: migration_20251027_222637.down,
    name: '20251027_222637'
  },
];
