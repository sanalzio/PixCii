const Jimp = require('jimp');
const { writeFileSync } = require('fs');
const argv = process.argv;
const { Fore } = require('./colorama');

async function imageToAscii(filePath) {
    try {
        const image = await Jimp.read(filePath);
        const width = image.bitmap.width;
        const height = image.bitmap.height;
        const asciiChars = ['@', '#', 'S', '%', '?', '*', '+', ';', ':', ',', '.'];

        let asciiArt = '';

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const pixelColor = Jimp.intToRGBA(image.getPixelColor(x, y));
                const gray = 0.2126 * pixelColor.r + 0.7152 * pixelColor.g + 0.0722 * pixelColor.b;
                const index = Math.floor((gray * (asciiChars.length - 1)) / 255);
                const asciiChar = asciiChars[index];
                asciiArt += asciiChar;
            }
            asciiArt += '\n';
        }

        let filename = argv.length === 4 ? argv[3] : filePath + '.txt';
        writeFileSync(filename, asciiArt);
        console.error(Fore.Yellow + 'Info:' + Fore.Reset, 'Ascii text was successfully written to the file named ' + Fore.Green + `"${filename}"` + Fore.Reset + '.');
    } catch (error) {
        console.error(Fore.Red + 'Error:' + Fore.Reset, error.message);
    }
}

console.log(Fore.Yellow + '\n\n                         image2ascii' + Fore.Reset);
console.log('    Simple "open-source" image to ASCII text converter.\n');

if (argv.length < 3) {
    console.log(Fore.Green + '    Usage' + Fore.Reset + `: image2ascii <${Fore.Bright}*${Fore.Reset}input_file_path> <output_file_path>`);
    console.log('    Or you can simply run ' + Fore.Green + 'image2ascii <input_file_path>' + Fore.Reset + '.');
    console.log('    Or you can simply drag and drop the files you want to cut into ' + Fore.Green + 'image2ascii.exe' + Fore.Reset + '.\n\n');
    process.exit(1);
}

imageToAscii(argv[2]);
