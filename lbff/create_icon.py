import zlib
import struct

def make_png(width, height):
    # PNG signature
    png = b'\x89PNG\r\n\x1a\n'

    # IHDR chunk
    ihdr = struct.pack('!I4sIIBBBBB', 13, b'IHDR', width, height, 8, 2, 0, 0, 0)
    ihdr += struct.pack('!I', zlib.crc32(ihdr[4:]))
    png += ihdr

    # IDAT chunk
    # RGB data: 3 bytes per pixel
    # Scanline: 1 byte filter type (0) + width * 3 bytes
    line_size = 1 + width * 3
    raw_data = b''
    for _ in range(height):
        raw_data += b'\x00' # Filter type 0
        # Blue pixels (0, 0, 255)
        raw_data += b'\x00\x00\xff' * width

    compressed = zlib.compress(raw_data)
    idat = struct.pack('!I4s', len(compressed), b'IDAT') + compressed
    idat += struct.pack('!I', zlib.crc32(idat[4:]))
    png += idat

    # IEND chunk
    iend = struct.pack('!I4s', 0, b'IEND')
    iend += struct.pack('!I', zlib.crc32(iend[4:]))
    png += iend

    return png

with open('build/icon.png', 'wb') as f:
    f.write(make_png(256, 256))

print("Icon created successfully")
