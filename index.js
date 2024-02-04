const Jimp = require('jimp');
const { writeFileSync } = require('fs');
const argv = process.argv;
const { Fore } = require('./colorama');
const package = require("./package.json");

async function imageToAscii(filePath) {
    try {
        const image = await Jimp.read(filePath);
        image.resize(image.bitmap.width*2, image.bitmap.height);
        let width = image.bitmap.width;
        let height = image.bitmap.height;
        let filename = filePath + '.txt';
        let asciiChars = '@$B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\|()1{}[]?-_+~<>i!lI;:,"^`\'. '.split('').reverse(); // '@#S%?*+;:,. '
        for (let i = 0; i < argv.length; i++) {
            const arg = argv[i];
            if (arg === '--size' || arg === 's' || arg === '-s') {
                image.resize(eval(argv[i+1]), eval(argv[i+2]));
                width = image.bitmap.width;
                height = image.bitmap.height;
                continue;
            } else if (arg === '--reverse' || arg === 'r' || arg === '-r') {
                asciiChars=asciiChars.reverse();
                continue;
            } else if (arg === '--eval' || arg === 'e' || arg === '-e') {
                eval(argv[i+1]);
            } else if (arg === '--out' || arg === 'o' || arg === '-o') {
                filename = argv[i+1];
            }
        }

        let asciiArt = '';

        for (let y = 0; y < height; y++) {
            asciiArt += (argv.includes("--reverse") || argv.includes("-r") || argv.includes("r"))?Fore.Reverse:"";
            for (let x = 0; x < width; x++) {
                const pixelColor = Jimp.intToRGBA(image.getPixelColor(x, y));
                const gray = 0.2126 * pixelColor.r + 0.7152 * pixelColor.g + 0.0722 * pixelColor.b;
                const index = Math.floor((gray * (asciiChars.length - 1)) / 255);
                const asciiChar = asciiChars[index];
                asciiArt += asciiChar;
            }
            asciiArt += (argv.includes("--reverse") || argv.includes("-r") || argv.includes("r"))?Fore.Reset+'\n':"\n";
        }
        if (argv.includes("--log") || argv.includes("-l") || argv.includes("l")){
            console.log((argv.includes("--reverse") || argv.includes("-r") || argv.includes("r"))?Fore.Reverse+asciiArt+Fore.Reset:asciiArt);
            process.exit(0);
        }
        writeFileSync(filename, asciiArt);
        console.log(Fore.Yellow + 'Info:' + Fore.Reset, 'Ascii text was successfully written to the file named ' + Fore.Green + `"${filename}"` + Fore.Reset + '.');
    } catch (error) {
        console.error(Fore.Red + 'Error:' + Fore.Reset, error.message);
    }
}
if(!(argv.includes("--noinfo") || argv.includes("-i") || argv.includes("i"))) {
    console.log(Fore.Yellow + '\n\n                     image2ascii ' + package.version + Fore.Reset);
    console.log('    Simple "open-source" image to ASCII text converter.\n');
}
if (argv.length < 3 || argv.includes("--help") || argv.includes("h") || argv.includes("-h")) {
    console.log(Fore.Green + '    Usage' + Fore.Reset + `: ./image2ascii <${Fore.Bright}*${Fore.Reset}input_file_path> <arguments>`);
    console.log('    Or you can simply drag and drop the files you want to cut into ' + Fore.Green + 'image2ascii.exe' + Fore.Reset + '.\n');
    console.log(Fore.Yellow + '    Arguments' + Fore.Reset + `:\n`);
    console.log(Fore.BrightBlue + '    --help' + Fore.Reset + ' or ' + Fore.BrightBlue + '-h' + Fore.Reset + `: show this menu.\n`);
    console.log(Fore.BrightBlue + '    --out' + Fore.Reset + ' or ' + Fore.BrightBlue + '-o' + Fore.Reset + `: resize image to specified width and height.\n` + Fore.Green + '    Usage' + Fore.Reset + `: --out <output_file_path>\n`);
    console.log(Fore.BrightBlue + '    --size' + Fore.Reset + ' or ' + Fore.BrightBlue + '-s' + Fore.Reset + `: resize image to specified width and height.\n` + Fore.Green + '    Usage' + Fore.Reset + `: --size <width> <height>\n`);
    console.log(Fore.BrightBlue + '    --reverse' + Fore.Reset + ' or ' + Fore.BrightBlue + '-r' + Fore.Reset + `: reverse the ascii characters.\n`);
    console.log(Fore.BrightBlue + '    --eval' + Fore.Reset + ' or ' + Fore.BrightBlue + '-e' + Fore.Reset + `: evaluate the specified javascript code.\n` + Fore.Green + '    Usage' + Fore.Reset + `: --eval "<javascript code>"\n`);
    console.log(Fore.BrightBlue + '    --log' + Fore.Reset + ' or ' + Fore.BrightBlue + '-l' + Fore.Reset + `: print the ascii text to the console.\n`);
    console.log(Fore.BrightBlue + '    --noinfo' + Fore.Reset + ' or ' + Fore.BrightBlue + '-i' + Fore.Reset + `: disable write info to console.\n`);
    console.log("");
    process.exit(0);
}

imageToAscii(argv[2]);
