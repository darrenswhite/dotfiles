import * as fs from 'fs';
import * as path from 'path';
import * as pimage from 'pureimage';

const assets = path.resolve('..', 'assets');

const cards = require(path.resolve(assets, 'cards.json'));

const actionCardTemplate = path.resolve(assets, 'template_action_card.png');

async function generateCards() {
  for (const card of cards.actionCards) {
    await generateCard(
      path.join(assets, 'action_card_'),
      card,
      actionCardTemplate
    );
  }
}

async function generateCard(prefix: string, card: any, template: any) {
  await pimage
    .decodePNGFromStream(fs.createReadStream(template))
    .then(async (templateImage: any) => {
      const image: pimage.Bitmap = pimage.make(
        templateImage.width,
        templateImage.height
      );
      const ctx: pimage.Context = image.getContext('2d');

      ctx.drawImage(templateImage);

      const path = prefix + card.id + '.png';

      pimage.encodePNGToStream(image, fs.createWriteStream(path));
    })
    .catch((e: any) => console.log(e));
}

generateCards();
