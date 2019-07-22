import * as fs from 'fs';
import * as path from 'path';
import * as pimage from 'pureimage';

const assets = path.resolve('..', 'assets');

const cards = require(path.resolve(assets, 'cards.json'));

const actionCardTemplate = path.resolve(assets, 'template_action_card.png');
const actionCardPrefix = path.join(assets, 'action_card_');

async function generateCards() {
  for (const card of cards.actionCards) {
    await generateCard(
      actionCardPrefix,
      card,
      actionCardTemplate,
      drawActionCard
    );
  }
}

async function generateCard(
  outputPathPrefix: string,
  card: any,
  templatePath: any,
  drawCard: Function
) {
  await pimage
    .decodePNGFromStream(fs.createReadStream(templatePath))
    .then(async (templateImage: any) => {
      const image: pimage.Bitmap = pimage.make(
        templateImage.width,
        templateImage.height
      );
      const ctx: pimage.Context = image.getContext('2d');

      ctx.drawImage(templateImage);

      drawCard(card, ctx);

      const path = outputPathPrefix + card.id + '.png';

      pimage.encodePNGToStream(image, fs.createWriteStream(path));
    })
    .catch((e: any) => console.log(e));
}

function drawActionCard(card: any, ctx: pimage.Context): void {
  drawCardMetadata(card.metadata, ctx);
}

function drawCardMetadata(metadata: any, ctx: pimage.Context): void {
  ctx.fillStyle = '#000000';
  ctx.font = '48pt Arial';
  ctx.fillText(metadata.name, 20, 200);
}

const font = pimage.registerFont(path.join(assets, 'Arial.ttf'), 'Arial');
font.load(() => generateCards());
