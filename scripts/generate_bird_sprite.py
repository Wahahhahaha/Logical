from PIL import Image, ImageDraw

SCALE = 8
img = Image.new('RGBA', (64, 64), (0, 0, 0, 0))
d = ImageDraw.Draw(img)

outline = '#514653'
blue = '#91b9de'
blue_light = '#a9c9e5'
blue_shadow = '#6d86a6'
cream = '#fff1dc'
gold = '#e9b45e'
gold_shadow = '#d69a4d'
pink = '#e9a0a8'
ink = '#3f4657'

# One cohesive pear-shaped, chubby body.
d.polygon([(19, 14), (27, 10), (38, 10), (46, 14), (51, 21),
           (54, 31), (53, 43), (49, 52), (42, 58), (22, 58),
           (15, 53), (11, 44), (10, 31), (13, 21)], fill=outline)
d.polygon([(21, 16), (28, 13), (37, 13), (44, 16), (48, 22),
           (51, 31), (50, 42), (46, 50), (40, 55), (24, 55),
           (18, 51), (15, 43), (14, 31), (16, 23)], fill=blue)

# Small symmetrical wings tucked into the round silhouette.
d.polygon([(16, 27), (11, 29), (8, 35), (9, 43), (13, 47),
           (18, 44), (20, 37)], fill=outline)
d.polygon([(16, 30), (13, 32), (11, 36), (12, 42), (15, 44),
           (17, 41), (18, 36)], fill=blue_shadow)
d.polygon([(48, 27), (53, 29), (56, 35), (55, 43), (51, 47),
           (46, 44), (44, 37)], fill=outline)
d.polygon([(48, 30), (51, 32), (53, 36), (52, 42), (49, 44),
           (47, 41), (46, 36)], fill=blue_shadow)

# Soft cream face/belly patch, kept connected as one gentle light cluster.
d.polygon([(25, 17), (31, 15), (37, 15), (42, 18), (45, 24),
           (45, 32), (42, 37), (44, 44), (41, 51), (36, 54),
           (28, 54), (22, 50), (20, 43), (22, 36), (20, 30),
           (21, 22)], fill=cream)
d.polygon([(23, 40), (28, 38), (37, 38), (42, 41), (41, 49),
           (37, 53), (28, 52), (23, 48)], fill=cream)
d.rectangle((25, 45, 39, 51), fill=cream)

# Small expressive eyes with tiny highlights.
d.rectangle((23, 25, 26, 28), fill=ink)
d.rectangle((38, 25, 41, 28), fill=ink)
d.point((24, 25), fill=cream)
d.point((39, 25), fill=cream)
d.rectangle((20, 31, 22, 32), fill=pink)
d.rectangle((42, 31, 44, 32), fill=pink)

# Centered stepped beak: small, golden, and clearly bird-like.
d.polygon([(29, 30), (35, 30), (38, 33), (35, 36), (29, 36),
           (26, 33)], fill=gold_shadow)
d.polygon([(28, 31), (34, 31), (36, 33), (34, 34), (28, 34)], fill=gold)

# Two short, visible pixel feet.
d.rectangle((24, 55, 28, 59), fill=outline)
d.rectangle((36, 55, 40, 59), fill=outline)
d.rectangle((22, 58, 29, 60), fill=gold_shadow)
d.rectangle((35, 58, 42, 60), fill=gold_shadow)
d.rectangle((24, 57, 28, 59), fill=gold)
d.rectangle((37, 57, 40, 59), fill=gold)

img.resize((64 * SCALE, 64 * SCALE), Image.Resampling.NEAREST).save(
    'frontend/public/bird-pixel.png', 'PNG'
)
