# Chosen Legends POC

# Running locally

```
npm install

npm run dev
```

Open http://localhost:3000

# Running production (Docker)

```
docker-compose build

docker-compose up -d
```

Open http://localhost:8080

# Generating cards

1. First convert `cards.json` to csv files using `./card-converter.js`.
2. Open `cards.cmp` with CardMaker.
3. `File` > `Export Project to Images`.
4. Set Format as Png.
5. Click OK.
6. Delete the old spritesheet JSON and PNG files.
7. Generate the new spritesheet using `spritesheet-js *.png`.
