from PIL import Image
import sys
import os

def colorize_image(img, hex_color):
    """
    Colorise uniquement les pixels non transparents d'une image RGBA.
    
    Args:
        img (PIL.Image): image ouverte en RGBA
        hex_color (str): couleur hex (#RRGGBB)
    
    Returns:
        PIL.Image: image colorisée
    """
    img = img.convert("RGBA")
    width, height = img.size
    hex_color = hex_color.lstrip('#')
    r, g, b = tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))
    
    result = Image.new("RGBA", img.size)
    
    for x in range(width):
        for y in range(height):
            pixel = img.getpixel((x, y))
            alpha = pixel[3]
            if alpha != 0:  # seulement si pixel non transparent
                result.putpixel((x, y), (r, g, b, alpha))
            else:
                result.putpixel((x, y), (0, 0, 0, 0))  # conserve la transparence
    
    return result

def colorize_folder(input_folder, output_folder, hex_color):
    """
    Colorise tous les PNG d'un dossier et sauvegarde dans un autre dossier.
    """
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)
    
    for filename in os.listdir(input_folder):
        if filename.lower().endswith(".png"):
            input_path = os.path.join(input_folder, filename)
            output_path = os.path.join(output_folder, filename)
            
            img = Image.open(input_path)
            img_colored = colorize_image(img, hex_color)
            img_colored.save(output_path, "PNG")
            print(f"Colorisé : {filename}")

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Usage: python colorize_folder.py input_folder output_folder #RRGGBB")
    else:
        input_folder = sys.argv[1]
        output_folder = sys.argv[2]
        hex_color = sys.argv[3]
        colorize_folder(input_folder, output_folder, hex_color)
