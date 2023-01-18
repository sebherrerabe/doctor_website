from lxml import etree

def is_file_svg(file):
    try:
        root = etree.fromstring(file.read())
        if root.tag == '{http://www.w3.org/2000/svg}svg':
            return True
        else:
            return False
    except etree.XMLSyntaxError:
        return False