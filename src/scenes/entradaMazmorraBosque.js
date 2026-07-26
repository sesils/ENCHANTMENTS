import Phaser from "phaser";
import GameScene from "./game-scene.js";
import Player from '../game-objects/player/player.js'

import bosqueAssets from '../../assets/sprites/bosque.png'
import dungeonAssets from '../../assets/sprites/dungeon.png'
import entradaMazmorraBosque from '../../assets/mapas/entradaMazmorraBosque.json'

export default class EntradaMazmorraBosque extends GameScene {
    constructor() {
        super({ key: 'entradaMazmorraBosque' });
    }

    init(data) {
        this.mapName = data.mapaKey;
        this.spawnX = data.x;
        this.spawnY = data.y;
        this.playerStats = data.stats;
    }

    preload(){
        this.load.image('bosqueAssets', bosqueAssets);
        this.load.image('dungeonAssets', dungeonAssets);
        this.load.tilemapTiledJSON('entradaMazmorraBosque', entradaMazmorraBosque);
    }
    create() {
        const map = this.make.tilemap({ key: 'entradaMazmorraBosque' });

        const tilesets = [
            map.addTilesetImage('bosque', 'bosqueAssets'),
            map.addTilesetImage('Dungeon_Tileset', 'dungeonAssets')
        ];
      
        
        
        map.layers.forEach(layerData => {
            const layer = map.createLayer(layerData.name, tilesets, 0, 0); 
        });

                this.player = new Player(this, this.spawnX, this.spawnY,this.playerStats);
        this.player.setDepth(1);

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        if (map.widthInPixels > this.cameras.main.width || map.heightInPixels > this.cameras.main.height) {
            this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
            this.player.setCollideWorldBounds(true);
            this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        } else {
            this.cameras.main.stopFollow();
            
        const xCentral = (map.widthInPixels / 2);
        const yCentral = (map.heightInPixels / 2);
        this.cameras.main.centerOn(xCentral, yCentral);
        }
    }

}