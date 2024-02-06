const Jimp = require('jimp');
const { writeFileSync } = require('fs');
const argv = process.argv;
const { Fore } = require('./colorama');
const package = require("./package.json");
const { exec } = require("child_process");

function runCmd(cmd){
    exec(cmd, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});
}
async function imageToAscii(filePath) {
    try {
        let on_converted = "";
        let on_saved = "";
        let before_converting = "";
        let on_start = "";
        const image = await Jimp.read(filePath);
        if(!(argv.includes("--savesize") || argv.includes("-ss") || argv.includes("ss"))) {
            image.resize(image.bitmap.width*2, image.bitmap.height);
        }
        let width = image.bitmap.width;
        let height = image.bitmap.height;
        let filename = filePath + '.txt';
        let asciiChars = '@$B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\|()1{}[]?-_+~<>i!lI;:,"^`\'. '.split('').reverse(); // '@#S%?*+;:,. '
        for (let i = 0; i < argv.length; i++) {
            const arg = argv[i];
            if (arg.startsWith("+")) {
                eval("image."+arg.slice(1));
            } else if (arg === '--size' || arg === 's' || arg === '-s') {
                image.resize(eval(argv[i+1]), eval(argv[i+2]));
            } else if (arg === '--reverse' || arg === 'r' || arg === '-r') {
                asciiChars=asciiChars.reverse();
            } else if (arg === '--exec' || arg === 'e' || arg === '-e') {
                eval(argv[i+1]);
            } else if (arg === '--out' || arg === 'o' || arg === '-o') {
                filename = argv[i+1];
            } else if (arg === '--onconverted' || arg === '-onconed') {
                on_converted = argv[i+1];
            } else if (arg === '--onsaved' || arg === '-onsvd') {
                on_saved = argv[i+1];
            } else if (arg === '--onstart' || arg === '-onst') {
                on_start = argv[i+1];
            } else if (arg === '--beforeconverting' || arg === '-befcon') {
                before_converting = argv[i+1];
            } else if (arg === '--execcmd' || arg === '-ec') {
                runCmd(argv[i+1]);
            }
        }
        eval(on_start);
        width = image.bitmap.width;
        height = image.bitmap.height;

        let asciiArt = '';

        eval(before_converting);
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
        eval(on_converted);
        if (argv.includes("--log") || argv.includes("-l") || argv.includes("l")){
            console.log((argv.includes("--reverse") || argv.includes("-r") || argv.includes("r"))?Fore.Reverse+asciiArt+Fore.Reset:asciiArt);
            process.exit(0);
        }
        writeFileSync(filename, asciiArt);
        eval(on_saved);
        console.log(Fore.Yellow + 'Info:' + Fore.Reset, 'Ascii text was successfully written to the file named ' + Fore.Green + `"${filename}"` + Fore.Reset + '.');
    } catch (error) {
        console.error(Fore.Red + 'Error:' + Fore.Reset, error.message);
    }
}
if(!(argv.includes("--noinfo") || argv.includes("-i") || argv.includes("i"))) {
    console.log(Fore.Yellow + '\n\n                     PixCii ' + package.version + Fore.Reset);
    console.log('    Simple "open-source" image to ASCII text converter.\n');
}
if (argv.length < 3 || argv.includes("--help") || argv.includes("h") || argv.includes("-h") || argv.includes("?")) {
    console.log(Fore.Green + '    Usage' + Fore.Reset + `: ./pixcii <${Fore.Bright}*${Fore.Reset}input_file_path> <arguments>`);
    console.log('    Or you can simply drag and drop the files you want to cut into executable file.\n');
    console.log(Fore.Yellow + '    Arguments' + Fore.Reset + `:\n`);
    console.log(Fore.BrightBlue + '    --help' + Fore.Reset + ' or ' + Fore.BrightBlue + '-h' + Fore.Reset + `: show this menu.\n`);
    console.log(Fore.BrightBlue + '    --deatiledhelp' + Fore.Reset + ' or ' + Fore.BrightBlue + '-dh' + Fore.Reset + `: show detailed help menu.\n`);
    console.log(Fore.BrightBlue + '    --out' + Fore.Reset + ' or ' + Fore.BrightBlue + '-o' + Fore.Reset + `: set output file path.\n` + Fore.Green + '    Usage' + Fore.Reset + `: --out <output_file_path>\n`);
    console.log(Fore.BrightBlue + '    --size' + Fore.Reset + ' or ' + Fore.BrightBlue + '-s' + Fore.Reset + `: resize image to specified width and height.\n` + Fore.Green + '    Usage' + Fore.Reset + `: --size <width (pixels)> <height (pixels)>\n`);
    console.log(Fore.BrightBlue + '    --reverse' + Fore.Reset + ' or ' + Fore.BrightBlue + '-r' + Fore.Reset + `: reverse the ascii characters.\n`);
    console.log(Fore.BrightBlue + '    --log' + Fore.Reset + ' or ' + Fore.BrightBlue + '-l' + Fore.Reset + `: print the ascii text to the console.\n`);
    console.log(Fore.BrightBlue + '    --noinfo' + Fore.Reset + ' or ' + Fore.BrightBlue + '-i' + Fore.Reset + `: disable write info to console.\n`);
    console.log(Fore.BrightBlue + '    --savesize' + Fore.Reset + ' or ' + Fore.BrightBlue + '-ss' + Fore.Reset + `: disable the resizing performed to maintain the aspect ratio..\n`);
    console.log("");
    process.exit(0);
} else if (argv.length < 3 || argv.includes("--deatiledhelp") || argv.includes("dh") || argv.includes("-dh") || argv.includes("?+")) {
    console.log(Fore.Green + '    Usage' + Fore.Reset + `: ./pixcii <${Fore.Bright}*${Fore.Reset}input_file_path> <arguments>`);
    console.log('    Or you can simply drag and drop the files you want to cut into executable file.\n');
    console.log(Fore.Yellow + '    Arguments' + Fore.Reset + `:\n`);
    console.log(Fore.BrightBlue + '    --help' + Fore.Reset + ' or ' + Fore.BrightBlue + '-h' + Fore.Reset + `: show undetailed help menu.\n`);
    console.log(Fore.BrightBlue + '    --deatiledhelp' + Fore.Reset + ' or ' + Fore.BrightBlue + '-dh' + Fore.Reset + `: show this menu.\n`);
    console.log(Fore.BrightBlue + '    --out' + Fore.Reset + ' or ' + Fore.BrightBlue + '-o' + Fore.Reset + `: set output file path.\n` + Fore.Green + '    Usage' + Fore.Reset + `: --out <output_file_path>\n`);
    console.log(Fore.BrightBlue + '    --size' + Fore.Reset + ' or ' + Fore.BrightBlue + '-s' + Fore.Reset + `: resize image to specified width and height.\n` + Fore.Green + '    Usage' + Fore.Reset + `: --size <width (pixels)> <height (pixels)>\n`);
    console.log(Fore.BrightBlue + '    --reverse' + Fore.Reset + ' or ' + Fore.BrightBlue + '-r' + Fore.Reset + `: reverse the ascii characters.\n`);
    console.log(Fore.BrightBlue + '    --log' + Fore.Reset + ' or ' + Fore.BrightBlue + '-l' + Fore.Reset + `: print the ascii text to the console.\n`);
    console.log(Fore.BrightBlue + '    --noinfo' + Fore.Reset + ' or ' + Fore.BrightBlue + '-i' + Fore.Reset + `: disable write info to console.\n`);
    console.log(Fore.BrightBlue + '    --savesize' + Fore.Reset + ' or ' + Fore.BrightBlue + '-ss' + Fore.Reset + `: disable the resizing performed to maintain the aspect ratio..\n`);
    console.log(Fore.BrightBlue + '    +<JIMP_Function>' + Fore.Reset + `: run specified JIMP function before converting to ascii.\n` + Fore.Green + '    Example' + Fore.Reset + `: +resize(90,24)\n`);
    console.log(Fore.BrightBlue + '    --exec' + Fore.Reset + ' or ' + Fore.BrightBlue + '-e' + Fore.Reset + `: execute the specified javascript code.\n` + Fore.Green + '    Usage' + Fore.Reset + `: --exec "<javascript code>"\n`);
    console.log(Fore.BrightBlue + '    --onconverted' + Fore.Reset + ' or ' + Fore.BrightBlue + '-onconed' + Fore.Reset + `: execute the specified javascript code on converted.\n` + Fore.Green + '    Example' + Fore.Reset + `: --onconed "<javascript code>"\n`);
    console.log(Fore.BrightBlue + '    --onsaved' + Fore.Reset + ' or ' + Fore.BrightBlue + '-onsvd' + Fore.Reset + `: execute the specified javascript code on saved.\n` + Fore.Green + '    Example' + Fore.Reset + `: --onsvd "<javascript code>"\n`);
    console.log(Fore.BrightBlue + '    --onstart' + Fore.Reset + ' or ' + Fore.BrightBlue + '-onst' + Fore.Reset + `: execute the specified javascript code on start.\n` + Fore.Green + '    Example' + Fore.Reset + `: --onst "<javascript code>"\n`);
    console.log(Fore.BrightBlue + '    --beforeconverting' + Fore.Reset + ' or ' + Fore.BrightBlue + '-befcon' + Fore.Reset + `: execute the specified javascript code before converting.\n` + Fore.Green + '    Example' + Fore.Reset + `: --befcon "<javascript code>"\n`);
    console.log(Fore.BrightBlue + '    --execcmd' + Fore.Reset + ' or ' + Fore.BrightBlue + '-ec' + Fore.Reset + `: execute the specified Shell code.\n` + Fore.Green + '    Usage' + Fore.Reset + `: --execcmd "<Shell code>"\n`);
    console.log("");
    process.exit(0);
}

imageToAscii(argv[2]);


