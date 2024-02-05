
# PixCii

![NodeJS](https://img.shields.io/badge/Node.JS-%23378D3B.svg?style=for-the-badge&logo=node.js&logoColor=white) ![Node Version](https://img.shields.io/static/v1?label=Version&message=18.18.0&style=for-the-badge&labelColor=4BAE4F&color=2E7D32&logo=node.js&logoColor=ffffff) ![LICENSE](https://img.shields.io/static/v1?label=LICENSE&message=GPL-V3&style=for-the-badge) [<img alt="downloadbtn" src="https://dabuttonfactory.com/button.png?t=Download&f=Ubuntu-Bold&ts=30&tc=fff&hp=15&vp=15&c=6&bgt=unicolored&bgc=238636&bs=4&bc=37914a" width="77px">](https://github.com/sanalzio/PixCii/releases)

**Free image to ASCII text converter software.**
[What is the free software?](https://en.wikipedia.org/wiki/Free_software)

```


                     PixCii X.X.X
    Simple "open-source" image to ASCII text converter.

    Usage: ./pixcii <*input_file_path> <arguments>
    Or you can simply drag and drop the files you want to cut into executable file.

    Arguments:

    --help or -h: show undetailed help menu.

    --deatiledhelp or -dh: show this menu.

    --out or -o: set output file path.
    Usage: --out <output_file_path>

    --size or -s: resize image to specified width and height.
    Usage: --size <width (pixels)> <height (pixels)>

    --reverse or -r: reverse the ascii characters.

    --log or -l: print the ascii text to the console.

    --noinfo or -i: disable write info to console.

    --savesize or -ss: disable the resizing performed to maintain the aspect ratio..

    +<JIMP_Function>: run specified JIMP function before converting to ascii.
    Example: +resize(90,24)

    --exec or -e: execute the specified javascript code.
    Usage: --exec "<javascript code>"

    --onconverted or -onconed: execute the specified javascript code on converted.
    Example: --onconed "<javascript code>"

    --onsaved or -onsvd: execute the specified javascript code on saved.
    Example: --onsvd "<javascript code>"

    --onstart or -onst: execute the specified javascript code on start.
    Example: --onst "<javascript code>"

    --beforeconverting or -befcon: execute the specified javascript code before converting.
    Example: --befcon "<javascript code>"
    
    --execcmd or -ec: execute the specified Shell code.
    Usage: --execcmd "<Shell code>"
    
```

- [PixCii](#pixcii)
  - [Istallation](#istallation)
  - [Build](#build)
  -  [Scripting](#scripting)
  - [Usage](#usage)
    - [Run like this:](#run-like-this)
    - [Examples](#examples)
  - [License](#license)

## Istallation
[<img alt="downloadbtn" src="https://dabuttonfactory.com/button.png?t=Download&f=Ubuntu-Bold&ts=30&tc=fff&hp=15&vp=15&c=6&bgt=unicolored&bgc=238636&bs=4&bc=37914a" width="100px">](https://github.com/sanalzio/PixCii/releases)

Download PixCii latest relase from [here](https://github.com/sanalzio/PixCii/releases). Or  you can [build](#build) from source. 

## Build
```bash
git clone https://github.com/sanalzio/PixCii
cd PixCii
npm install
node index.js
```
## Scripting
You can use scripting to execute JavaScript code or execute Shell code. For better information look Detailed Information.

### Using --exec Argument
```bash
pixcii image.png --exec "console.log(\"Hello World! from --exec arg\");"
```
Output: Hello World! from --exec arg
### Using runCmd Function
```bash
pixcii image.png --exec "runCmd(\"Hello World! from runCmd function\");"
```
Output: Hello World! from runCmd function

### Using --execcmd Argument
```bash
pixcii image.png --execcmd "echo Hello World! from --execcmd arg"
```
Output:  Hello World! from --execcmd arg
## Usage

### Run like this:
```bash
pixcii <input_file_path> <arguments>
```

> [!TIP]
> **Or you can simply drag and drop the files you want to cut into executable file**

### Examples
```bash
pixcii image.png
pixcii image.png --size 100 50 --reverse --out output.txt
pixcii image.png --size 100 50 --reverse --log
pixcii image.png --size 100 50 --reverse --exec "console.log(\"Done :D\");"
```

## License
[GPL-V3](https://www.gnu.org/licenses/gpl-3.0.en.html#license-text)

