# Image 2 Ascii

![NodeJS](https://img.shields.io/badge/Node.JS-%23378D3B.svg?style=for-the-badge&logo=node.js&logoColor=white) ![Node Version](https://img.shields.io/static/v1?label=Version&message=18.18.0&style=for-the-badge&labelColor=4BAE4F&color=2E7D32&logo=node.js&logoColor=ffffff) ![LICENSE](https://img.shields.io/static/v1?label=LICENSE&message=MIT&style=for-the-badge) [<img alt="downloadbtn" src="https://dabuttonfactory.com/button.png?t=Download&f=Ubuntu-Bold&ts=30&tc=fff&hp=15&vp=15&c=6&bgt=unicolored&bgc=238636&bs=4&bc=37914a" width="77px">](https://github.com/sanalzio/image2ascii/releases)

**Simple "open-source" image to ASCII text converter.**

```


                     image2ascii X.X.X
    Simple "open-source" image to ASCII text converter.

    Usage: ./image2ascii <*input_file_path> <arguments>
    Or you can simply drag and drop the files you want to cut into image2ascii.exe.

    Arguments:

    --help or -h: show this menu.

    --out or -o: resize image to specified width and height.
    Usage: --out <output_file_path>

    --size or -s: resize image to specified width and height.
    Usage: --size <width> <height>

    --reverse or -r: reverse the ascii characters.

    --eval or -e: evaluate the specified javascript code.
    Usage: --eval "<javascript code>"

    --log or -l: print the ascii text to the console.

    --noinfo or -i: disable write info to console.


```

- [Image 2 Ascii](#image-2-ascii)
  - [Istallation](#istallation)
  - [Usage](#usage)
    - [Run like this:](#run-like-this)
    - [Examples](#examples)
  - [License](#license)

## Istallation
[<img alt="downloadbtn" src="https://dabuttonfactory.com/button.png?t=Download&f=Ubuntu-Bold&ts=30&tc=fff&hp=15&vp=15&c=6&bgt=unicolored&bgc=238636&bs=4&bc=37914a" width="100px">](https://github.com/sanalzio/image2ascii/releases)

Download image2ascii latest relase from [here](https://github.com/sanalzio/image2ascii/releases).

## Usage

### Run like this:
```bash
image2ascii <input_file_path> <arguments>
```

> [!TIP]
> **Or you can simply drag and drop the files you want to cut into image2ascii.exe**

### Examples
```bash
image2ascii image.png
image2ascii image.png --size 100 50 --reverse --out output.txt
image2ascii image.png --size 100 50 --reverse --log
image2ascii image.png --eval "console.log('Hello World')"
```

## License
[MIT](https://mit-license.org/)
