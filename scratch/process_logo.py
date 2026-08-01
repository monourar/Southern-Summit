import os
from PIL import Image

src_path = r"C:\Users\Mohamed Nour\.gemini\antigravity\brain\1e2bb089-944c-4680-a164-a5ba19cb90ad\.user_uploaded\media__1785596472818.png"
public_dir = r"e:\Downloads\website-2\public"

os.makedirs(public_dir, exist_ok=True)

# Open source image
img = Image.open(src_path).convert("RGBA")

# 1. High-res logo mark
img.save(os.path.join(public_dir, "logo.png"), "PNG")
print("Saved logo.png")

# 2. Favicon 16x16
f16 = img.resize((16, 16), Image.Resampling.LANCZOS)
f16.save(os.path.join(public_dir, "favicon-16x16.png"), "PNG")
print("Saved favicon-16x16.png")

# 3. Favicon 32x32
f32 = img.resize((32, 32), Image.Resampling.LANCZOS)
f32.save(os.path.join(public_dir, "favicon-32x32.png"), "PNG")
print("Saved favicon-32x32.png")

# 4. Apple Touch Icon 180x180
f180 = img.resize((180, 180), Image.Resampling.LANCZOS)
f180.save(os.path.join(public_dir, "apple-touch-icon.png"), "PNG")
print("Saved apple-touch-icon.png")

# 5. Favicon ICO (contains 16x16, 32x32, 48x48)
img.save(os.path.join(public_dir, "favicon.ico"), format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
print("Saved favicon.ico")
