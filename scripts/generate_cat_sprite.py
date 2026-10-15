from PIL import Image, ImageColor, ImageDraw

SCALE = 8
img = Image.new('RGBA', (64, 64), (0, 0, 0, 0))
d = ImageDraw.Draw(img)

outline = '#594039'
shadow = '#a87558'
caramel = '#c99570'
light = '#ddb18a'
cream = '#fff1dc'
cream_shadow = '#efd0ad'
pink = '#e9a0a8'
ink = '#493530'
ink_rgb = ImageColor.getrgb(ink)

# One thick, attached tail that rises in a soft curl on the right.
d.polygon([(38,49),(44,47),(48,42),(49,35),(50,27),(54,22),(59,21),(62,24),(62,31),(59,39),(55,47),(50,54),(44,57),(39,55)], fill=outline)
d.polygon([(43,50),(48,46),(52,40),(53,32),(54,27),(57,25),(59,27),(58,34),(55,42),(51,49),(47,53),(43,54)], fill=caramel)
d.polygon([(54,27),(57,25),(59,27),(58,32),(55,35),(53,32)], fill=light)

# Rounded, compact seated body with the chest flowing directly from the head.
d.polygon([(17,36),(42,36),(49,40),(51,49),(49,56),(44,60),(20,60),(15,56),(13,48),(14,40)], fill=outline)
d.polygon([(19,39),(41,39),(46,42),(47,50),(44,55),(40,58),(23,58),(18,54),(17,45)], fill=caramel)
d.polygon([(37,40),(44,40),(47,45),(46,51),(42,49),(39,44)], fill=shadow)
d.polygon([(24,40),(35,40),(40,44),(40,54),(37,57),(27,57),(23,53),(23,45)], fill=cream)
d.rectangle((26,51,37,56), fill=cream_shadow)
d.rectangle((28,51,35,56), fill=cream)

# Short front paws and two readable hind paws.
d.polygon([(18,51),(25,52),(25,59),(22,61),(16,59)], fill=outline)
d.polygon([(19,53),(23,53),(23,58),(20,59),(18,58)], fill=cream)
d.polygon([(35,52),(42,51),(47,56),(46,60),(39,61),(35,58)], fill=outline)
d.polygon([(37,54),(41,53),(45,56),(44,58),(39,59),(37,57)], fill=cream)
d.rectangle((20,58,22,59), fill=shadow)
d.rectangle((40,58,43,59), fill=shadow)

# Broad triangular ears, kept low and naturally joined to the head.
d.polygon([(10,22),(12,11),(17,8),(25,17),(24,23)], fill=outline)
d.polygon([(40,17),(48,8),(54,11),(57,22),(43,23)], fill=outline)
d.polygon([(12,21),(14,13),(17,10),(23,18),(23,21)], fill=caramel)
d.polygon([(44,18),(49,10),(53,13),(55,21),(44,21)], fill=caramel)
d.polygon([(15,18),(15,14),(17,11),(20,17)], fill=pink)
d.polygon([(47,17),(50,12),(52,14),(53,18)], fill=pink)

# Broad, rounded head with stepped cheeks and a gentle jaw.
d.polygon([(12,19),(18,15),(25,14),(39,14),(47,15),(53,20),(56,28),(55,36),(50,42),(43,46),(21,46),(14,42),(9,36),(8,28)], fill=outline)
d.polygon([(14,20),(20,17),(27,16),(38,16),(46,17),(50,21),(53,28),(52,35),(48,40),(41,43),(23,43),(17,40),(12,35),(11,28)], fill=caramel)

# Irregular calico markings that follow the forehead, cheeks, and muzzle.
d.polygon([(17,18),(24,16),(29,16),(27,22),(22,25),(16,24)], fill=light)
d.polygon([(43,18),(49,21),(52,27),(48,31),(44,27)], fill=shadow)
d.polygon([(13,30),(18,28),(21,33),(18,39),(14,36)], fill=shadow)

# Connected light muzzle and cheek fur; deliberately asymmetric rather than a circle.
d.polygon([(24,32),(28,30),(31,30),(34,31),(37,30),(40,32),(40,36),(37,39),(34,40),
           (30,40),(27,38),(24,36)], fill=cream)
d.rectangle((28,35,37,38), fill=cream)
d.rectangle((24,33,27,35), fill=cream_shadow)
d.rectangle((38,32,40,35), fill=cream_shadow)

# Face: square eyes, blush, nose, W mouth, whiskers.
d.rectangle((24,28,26,30), fill=ink)
d.rectangle((38,28,40,30), fill=ink)
d.point((24,28), fill=cream)
d.point((38,28), fill=cream)
d.rectangle((17,34,19,35), fill=pink)
d.rectangle((43,34,45,35), fill=pink)
d.rectangle((31,32,33,33), fill=ink)
d.point((32,32), fill=pink)
d.point((32,34), fill=ink)
d.line([(32,34),(29,36),(27,35)], fill=ink, width=1)
d.line([(32,34),(35,36),(37,35)], fill=ink, width=1)
d.line([(20,34),(14,33)], fill=outline, width=1)
d.line([(20,36),(14,37)], fill=outline, width=1)
d.line([(44,34),(50,33)], fill=outline, width=1)
d.line([(44,36),(50,37)], fill=outline, width=1)

def save_scaled(source, path):
    source.resize((512, 512), Image.Resampling.NEAREST).save(path, 'PNG')


save_scaled(img, 'frontend/public/cat-pixel.png')

# Keep the original silhouette, but provide a body/tail split so the tail can
# wag from its attachment point without rotating the whole character.
body = img.copy()
tail = Image.new('RGBA', img.size, (0, 0, 0, 0))
tail_draw = ImageDraw.Draw(tail)
# Redraw only the original tail geometry on its own transparent canvas. This
# avoids carrying any cheek, ear, or torso pixels into the animated layer.
tail_draw.polygon([(38,49),(44,47),(48,42),(49,35),(50,27),(54,22),(59,21),(62,24),(62,31),(59,39),(55,47),(50,54),(44,57),(39,55)], fill=outline)
tail_draw.polygon([(43,50),(48,46),(52,40),(53,32),(54,27),(57,25),(59,27),(58,34),(55,42),(51,49),(47,53),(43,54)], fill=caramel)
tail_draw.polygon([(54,27),(57,25),(59,27),(58,32),(55,35),(53,32)], fill=light)
for y in range(64):
    # Right edge of the fixed body silhouette. The tail extends underneath
    # this edge at the lower-right joint, so rotation never exposes a hole.
    body_edge = None
    if 26 <= y <= 35:
        body_edge = 54
    elif 36 <= y <= 40:
        body_edge = 49
    elif 41 <= y <= 45:
        body_edge = 50
    elif 46 <= y <= 55:
        body_edge = 50
    for x in range(64):
        if body_edge is not None and x >= body_edge:
            body.putpixel((x, y), (0, 0, 0, 0))
save_scaled(body, 'frontend/public/cat-pixel-body.png')
save_scaled(tail, 'frontend/public/cat-pixel-tail.png')


def expression_variant(name, eye_mode):
    variant = body.copy()
    variant_draw = ImageDraw.Draw(variant)
    # Restore the small eye clusters from nearby fur, then redraw only the
    # expression pixels. This keeps every marking, outline, and proportion
    # identical to the base sprite.
    for x0 in (24, 38):
        sample = variant.getpixel((x0 - 2, 28))
        for y in range(27, 31):
            for x in range(x0, x0 + 3):
                variant.putpixel((x, y), sample)
    if eye_mode == 'blink':
        for x0 in (24, 38):
            for x in range(x0, x0 + 3):
                variant.putpixel((x, 29), ink_rgb)
    elif eye_mode == 'happy':
        for x0 in (24, 38):
            variant.putpixel((x0, 29), ink_rgb)
            variant.putpixel((x0 + 1, 28), ink_rgb)
            variant.putpixel((x0 + 2, 29), ink_rgb)
    elif eye_mode == 'thinking':
        variant_draw.rectangle((24, 28, 26, 30), fill=ink)
        variant_draw.rectangle((39, 27, 41, 29), fill=ink)
    elif eye_mode == 'sad':
        for x0 in (24, 38):
            variant.putpixel((x0, 28), ink_rgb)
            variant.putpixel((x0 + 1, 29), ink_rgb)
            variant.putpixel((x0 + 2, 28), ink_rgb)
    save_scaled(variant, f'frontend/public/cat-pixel-{name}.png')


for name, mode in [('blink', 'blink'), ('happy', 'happy'), ('thinking', 'thinking'), ('sad', 'sad')]:
    expression_variant(name, mode)
