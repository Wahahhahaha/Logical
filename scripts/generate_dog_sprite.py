from PIL import Image, ImageDraw

SCALE = 8
img = Image.new('RGBA', (64, 64), (0, 0, 0, 0))
d = ImageDraw.Draw(img)

outline = '#594039'
fur = '#c99570'
fur_light = '#ddb18a'
ear = '#956448'
cream = '#fff1dc'
cream_shadow = '#efd0ad'
pink = '#e9a0a8'
ink = '#493530'

# Compact seated body, with a cream chest flowing into two short front paws.
d.polygon([(17, 37), (42, 37), (49, 42), (50, 52), (46, 59), (39, 61),
           (24, 61), (17, 58), (14, 51), (15, 42)], fill=outline)
d.polygon([(20, 40), (40, 40), (45, 44), (46, 52), (43, 57), (38, 59),
           (25, 59), (20, 55), (18, 48), (19, 43)], fill=fur)
d.polygon([(25, 40), (36, 40), (40, 44), (40, 55), (37, 58), (27, 58),
           (23, 54), (23, 45)], fill=cream)
d.rectangle((26, 51, 37, 57), fill=cream_shadow)
d.rectangle((28, 51, 35, 56), fill=cream)

# Small hind paws and distinct front paws.
d.polygon([(17, 52), (25, 52), (25, 60), (21, 62), (16, 59)], fill=outline)
d.polygon([(19, 54), (23, 54), (23, 59), (20, 60), (18, 58)], fill=cream)
d.polygon([(35, 52), (43, 52), (48, 57), (46, 61), (39, 62), (35, 58)], fill=outline)
d.polygon([(37, 54), (41, 54), (45, 57), (44, 59), (39, 60), (37, 58)], fill=cream)
d.rectangle((20, 59, 22, 60), fill=fur_light)
d.rectangle((40, 59, 43, 60), fill=fur_light)

# Short curved tail peeking around the right side of the body.
d.polygon([(42, 48), (47, 46), (50, 41), (51, 35), (55, 32), (60, 34),
           (61, 39), (58, 45), (54, 50), (49, 54), (44, 55)], fill=outline)
d.polygon([(46, 49), (50, 46), (53, 41), (54, 36), (56, 35), (58, 36),
           (57, 41), (54, 46), (50, 50), (47, 52)], fill=fur_light)

# Broad, rounded head.
d.polygon([(13, 18), (19, 13), (27, 11), (38, 11), (46, 14), (52, 19),
           (55, 28), (54, 37), (49, 43), (42, 47), (22, 47), (15, 43),
           (10, 36), (9, 27)], fill=outline)
d.polygon([(16, 19), (21, 16), (28, 14), (37, 14), (44, 16), (49, 20),
           (52, 28), (51, 35), (47, 40), (40, 44), (24, 44), (18, 40),
           (13, 35), (12, 28)], fill=fur)

# Rounded floppy ears, clearly different from pointed cat ears.
d.polygon([(14, 18), (9, 17), (5, 21), (5, 31), (8, 38), (14, 40),
           (19, 36), (19, 24)], fill=outline)
d.polygon([(13, 20), (10, 20), (8, 23), (8, 31), (10, 35), (14, 36),
           (16, 33), (16, 25)], fill=ear)
d.polygon([(49, 18), (55, 17), (59, 21), (59, 31), (56, 38), (50, 40),
           (45, 36), (45, 24)], fill=outline)
d.polygon([(50, 20), (54, 20), (56, 23), (56, 31), (54, 35), (50, 36),
           (48, 33), (48, 25)], fill=ear)

# Narrow cream forehead stripe, integrated with the small muzzle.
d.polygon([(29, 14), (35, 14), (36, 20), (35, 26), (37, 30), (34, 34),
           (29, 34), (27, 30), (29, 26), (28, 20)], fill=cream)
d.polygon([(25, 31), (29, 29), (35, 29), (40, 32), (41, 36), (38, 40),
           (33, 42), (27, 40), (23, 36)], fill=cream)
d.rectangle((27, 36, 38, 40), fill=cream)
d.rectangle((24, 34, 27, 37), fill=cream_shadow)
d.rectangle((38, 33, 41, 37), fill=cream_shadow)

# Friendly dark eyes, blush, and a compact canine nose-mouth unit.
d.rectangle((21, 27, 24, 30), fill=ink)
d.rectangle((40, 27, 43, 30), fill=ink)
d.point((22, 27), fill=cream)
d.point((41, 27), fill=cream)
d.rectangle((20, 34, 22, 35), fill=pink)
d.rectangle((42, 34, 44, 35), fill=pink)
d.rectangle((31, 32, 34, 34), fill=ink)
d.rectangle((32, 34, 33, 35), fill=ink)
d.line([(32, 35), (28, 37), (26, 36)], fill=ink, width=1)
d.line([(33, 35), (37, 37), (39, 36)], fill=ink, width=1)

img.resize((64 * SCALE, 64 * SCALE), Image.Resampling.NEAREST).save(
    'frontend/public/dog-pixel.png', 'PNG'
)
