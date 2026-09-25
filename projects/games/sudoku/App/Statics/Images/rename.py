import os
from re import findall
for filename in os.listdir('.'):
    if findall(r'(#[1-9])', filename):
        os.rename(filename, "Q_%s.PNG" % findall(r'(#[0-9]+)', filename)[0])
        # print()