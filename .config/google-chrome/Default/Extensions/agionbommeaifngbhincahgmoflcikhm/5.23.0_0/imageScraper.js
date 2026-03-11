var __webpack_exports__ = {};
// Scrap images from a page
// Calling by popup.js

(function (_window$frameElement) {
  var ID_SCRAPING_FRAME = 'bbf98b9d-7a7f-48fb-a5b2-03c45332969e';

  // ignore iframe for scraping (initIframeScraper.js)
  if (window !== window.top && ((_window$frameElement = window.frameElement) === null || _window$frameElement === void 0 ? void 0 : _window$frameElement.id) === ID_SCRAPING_FRAME) return;

  /**
   * Convert SVG text into base64 text
   * @param svgText - SVG tag in string format
   * @return {string} - base64 version of SVG
   */
  function svgToBase64(svgText) {
    if (!svgText) return null;
    var bytes = new TextEncoder().encode(svgText);
    var binary = Array.from(bytes, function (b) {
      return String.fromCharCode(b);
    }).join('');
    return "data:image/svg+xml;base64,".concat(btoa(binary));
  }

  /**
   * Finds all elements referenced by the SVG and includes them in the SVG
   * @param {SVGElement} svg - SVG element
   * @returns {string} - Full SVG with external references included
   */
  function getCompleteSVGString(svg) {
    // Clone the SVG to avoid changing the original
    var svgClone = svg.cloneNode(true);
    var referencedIds = new Set();

    // Function to extract ID from URL (e.g. url(#myId) -> myId)
    function extractIdFromUrl(url) {
      if (!url) return null;
      var match = url.match(/url\(['"]?#([^'")]+)['"]?\)/);
      return match ? match[1] : null;
    }

    // Function to extract ID from href/xlink:href
    function extractIdFromHref(href) {
      if (!href) return null;
      return href.startsWith('#') ? href.substring(1) : href;
    }

    // Collect all the IDs referenced by the SVG
    function collectReferencedIds(element) {
      // Checking href and xlink:href
      var href = element.getAttribute('href') || element.getAttribute('xlink:href');
      if (href && href.startsWith('#')) {
        // Replaces xlink:href with href, as the link becomes internal
        element.removeAttribute('xlink:href');
        element.setAttribute('href', href);
        var id = extractIdFromHref(href);
        if (id) referencedIds.add(id);
      }

      // Checking styles for url(#id)
      var style = element.getAttribute('style') || '';
      var styleUrlId = extractIdFromUrl(style);
      if (styleUrlId) referencedIds.add(styleUrlId);

      // Checking computed styles
      try {
        var computedStyle = window.getComputedStyle(element);
        var clipPath = computedStyle.clipPath;
        var mask = computedStyle.mask;
        var filter = computedStyle.filter;
        [clipPath, mask, filter].forEach(function (prop) {
          if (prop && prop !== 'none') {
            var _id = extractIdFromUrl(prop);
            if (_id) referencedIds.add(_id);
          }
        });
      } catch (e) {
        // Ignoring computed styles errors
      }

      // Recursively check child elements
      Array.from(element.children).forEach(function (child) {
        collectReferencedIds(child);
      });
    }
    svgClone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    // Collecting all links from the cloned SVG
    collectReferencedIds(svgClone);

    // Find all elements referenced by SVG
    var referencedElements = [];
    referencedIds.forEach(function (id) {
      // Finding an element in a document
      var element = document.getElementById(id);
      if (element && element !== svg && !svg.contains(element)) {
        // Clone an element to include it in the SVG
        var clonedElement = element.cloneNode(true);
        // Make sure the clone has an ID
        clonedElement.setAttribute('id', id);
        referencedElements.push(clonedElement);
      }
    });

    // If there are external links, add them to <defs>
    if (referencedElements.length > 0) {
      var defs = svgClone.querySelector('defs');
      if (!defs) {
        defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        svgClone.insertBefore(defs, svgClone.firstChild);
      }

      // Add all found elements to defs
      referencedElements.forEach(function (elem) {
        try {
          // We check if such an element already exists in defs
          if (!defs.querySelector("#".concat(elem.id))) {
            defs.appendChild(elem);
          }
        } catch (e) {
          // Ignore errors during appending
        }
      });
    }
    return svgClone.outerHTML;
  }
  var imageManager = {
    imageType: {
      IMG: 'IMG',
      TEXT: 'TEXT',
      LINK: 'LINK',
      INPUT_IMG: 'INPUT_IMG',
      BACKGROUND: 'BACKGROUND',
      DATAURL: 'DATAURL'
    },
    imgList: [],
    getImages: function getImages() {
      this.imgList = [];
      var imgs = document.getElementsByTagName('img');
      for (var i = 0; i < imgs.length; i++) {
        var img = imgs[i];
        var newImg = new Image();
        newImg.src = img.src;
        var width = 0;
        var height = 0;
        width = parseInt(img.naturalWidth);
        height = parseInt(img.naturalHeight);
        nwidth = parseInt(newImg.width);
        nheight = parseInt(newImg.height);
        width = nwidth > width ? nwidth : width;
        height = nheight > height ? nheight : height;
        this.addImg(imageManager.imageType.IMG, img.src, width, height);
      }
      imgs = document.images;
      if (imgs && imgs.length > 0) {
        for (var i = 0; i < imgs.length; i++) {
          try {
            var img = imgs[i];
            var newImg = new Image();
            newImg.src = img.currentSrc;
            var width = 0;
            var height = 0;
            width = parseInt(img.naturalWidth);
            height = parseInt(img.naturalHeight);
            nwidth = parseInt(newImg.width);
            nheight = parseInt(newImg.height);
            width = nwidth > width ? nwidth : width;
            height = nheight > height ? nheight : height;
            newImg = null;
            this.addImg(imageManager.imageType.IMG, img.currentSrc, width, height);
          } catch (e) {}
        }
      }
      try {
        imgs = imageManager.querySelectorAllShadows('img');
        if (imgs && imgs.length > 0) {
          for (var i = 0; i < imgs.length; i++) {
            try {
              var img = imgs[i];
              var newImg = new Image();
              newImg.src = img.currentSrc;
              var width = 0;
              var height = 0;
              width = parseInt(img.naturalWidth);
              height = parseInt(img.naturalHeight);
              nwidth = parseInt(newImg.width);
              nheight = parseInt(newImg.height);
              width = nwidth > width ? nwidth : width;
              height = nheight > height ? nheight : height;
              newImg = null;
              this.addImg(imageManager.imageType.IMG, img.currentSrc, width, height);
            } catch (e) {}
          }
        }
      } catch (e) {
        // experimental feature lets catch everything
      }
      var sources = document.getElementsByTagName('source');
      if (sources && sources.length > 0) {
        for (var i = 0; i < sources.length; i++) {
          try {
            var source = sources[i];
            if (!source.srcset) continue;
            var newImg = new Image();
            newImg.src = source.srcset;
            var width = parseInt(newImg.naturalWidth);
            var height = parseInt(newImg.naturalHeight);
            nwidth = parseInt(newImg.width);
            nheight = parseInt(newImg.height);
            width = nwidth > width ? nwidth : width;
            height = nheight > height ? nheight : height;
            this.addImg(imageManager.imageType.IMG, newImg.src, width, height);
            newImg = null;
          } catch (e) {}
        }
      }
      var srcsets = document.querySelectorAll('img[srcset]');
      if (srcsets && srcsets.length > 0) {
        for (var i = 0; i < srcsets.length; i++) {
          try {
            var img = srcsets[i];
            if (!img.srcset) continue;
            var srcset = img.srcset.split(', ');
            for (var j = 0; j < srcset.length; j++) {
              try {
                var src = srcset[j];
                src = src.substring(0, src.indexOf(' ') != -1 ? src.indexOf(' ') : src.length);
                var newImg = new Image();
                newImg.src = src;
                src = newImg.src;
                var width = parseInt(newImg.naturalWidth);
                var height = parseInt(newImg.naturalHeight);
                nwidth = parseInt(newImg.width);
                nheight = parseInt(newImg.height);
                width = nwidth > width ? nwidth : width;
                height = nheight > height ? nheight : height;
                newImg = null;
                console.log("adding img from srcset: ".concat(src, " w: ").concat(width, " h:").concat(height));
                this.addImg(imageManager.imageType.IMG, src, width, height);
              } catch (e) {
                console.error('cannot add image of srcset: ');
              }
            }
          } catch (e) {}
        }
      }
      var inputs = document.getElementsByTagName('input');
      for (var i = 0; i < inputs.length; i++) {
        var input = inputs[i];
        var type = input.type;
        if (type.toUpperCase() == 'IMAGE') {
          var src = input.src;
          this.addImg(imageManager.imageType.INPUT_IMG, src, 0, 0);
        }
      }
      var links = document.getElementsByTagName('a');
      for (var i = 0; i < links.length; i++) {
        var link = links[i];
        var href = link.href;
        if (href.endsWith('.jpg') || href.endsWith('.jpeg') || href.endsWith('.bmp') || href.endsWith('.ico') || href.endsWith('.gif') || href.endsWith('.png')) {
          this.addImg(imageManager.imageType.LINK, href, 0, 0);
        }
      }
      var svgs = document.getElementsByTagName('svg');
      for (var i = 0; i < svgs.length; i++) {
        try {
          var svg = svgs[i];
          var svgString = getCompleteSVGString(svg);
          var dataUrl = svgToBase64(svgString);
          this.addImg(imageManager.imageType.DATAURL, dataUrl, 0, 0);
        } catch (e) {}
      }
      var url;
      var B = [];
      var A = document.getElementsByTagName('*');
      A = B.slice.call(A, 0, A.length);
      while (A.length) {
        url = imageManager.deepCss(A.shift(), 'background-image');
        try {
          if (url && url != 'none') {
            var re = /url\(['"]?([^")]+)/g;
            var matches;
            while ((matches = re.exec(url)) != null) {
              var src = matches[1];
              if (src && imageManager.arrayIndexOf(B, src) == -1) {
                var newImg = new Image();
                newImg.src = src;
                src = newImg.src;
                this.addImg(imageManager.imageType.BACKGROUND, src, 0, 0);
              }
            }
          }
        } catch (e) {
          console.error('cannot add image background-image');
        }
      }
      url, B = [], A = document.getElementsByTagName('*');
      A = B.slice.call(A, 0, A.length);
      while (A.length) {
        url = imageManager.deepCss(A.shift(), 'background');
        try {
          if (url && url != 'none') {
            var re = /url\(['"]?([^")]+)/g;
            var matches;
            while ((matches = re.exec(url)) != null) {
              var src = matches[1];
              if (src && imageManager.arrayIndexOf(B, src) == -1) {
                var newImg = new Image();
                newImg.src = src;
                src = newImg.src;
                this.addImg(imageManager.imageType.BACKGROUND, src, 0, 0);
              }
            }
          }
        } catch (e) {
          console.error('cannot add image background-image');
        }
      }
      try {
        var urls = document.body.innerHTML.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?//=]*)/gi).filter(function (itm, i, a) {
          return i == a.indexOf(itm);
        });
        for (var i = 0; i < urls.length; i++) if (urls[i].match(/.*(\.png|\.svg|\.jpg|\.gif|\.jpeg|\.bmp|\.ico|\.webp|\.tif|\.apng|\.jfif|\.pjpeg|\.pjp).*/i) != null) this.addImg(imageManager.imageType.LINK, urls[i], 0, 0);
      } catch (e) {
        console.log("getImages error retreiving images by url: ".concat(e));
      }
      // move popup into html of the page
      /* https://github.com/mitchas/Keyframes.app/tree/master/Keyframes.app%20(Extension)/js
      $.get(chrome.extension.getURL('popup.html'), function (data) {
        debugger;
        $("body").append(data);
      });
      */
      return this.imgList;
    },
    addImg: function addImg(d, f, c, a) {
      this.imgList.push({
        type: d,
        src: f,
        width: c,
        height: a
      });
    },
    getUniqueImagesSrcs: function getUniqueImagesSrcs() {
      var images = imageManager.getImages();
      var imagesStrArray = new Array();
      for (var i = 0; i < images.length; i++) {
        imagesStrArray[imagesStrArray.length] = images[i].src;
      }
      var uniques = imagesStrArray.reverse().filter(function (e, i, arr) {
        return arr.indexOf(e, i + 1) === -1;
      }).reverse();
      return uniques;
    },
    deepCss: function deepCss(who, css) {
      if (!who || !who.style) return '';
      var sty = css.replace(/\-([a-z])/g, function (a, b) {
        return b.toUpperCase();
      });
      if (who.currentStyle) {
        return who.style[sty] || who.currentStyle[sty] || '';
      }
      var dv = document.defaultView || window;
      return who.style[sty] || dv.getComputedStyle(who, '').getPropertyValue(css) || '';
    },
    arrayIndexOf: function arrayIndexOf(array, what, index) {
      index = index || 0;
      var L = array.length;
      while (index < L) {
        if (array[index] === what) return index;
        ++index;
      }
      return -1;
    },
    querySelectorAllShadows: function querySelectorAllShadows(selector) {
      var el = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.body;
      // recurse on childShadows
      var childShadows = Array.from(el.querySelectorAll('*')).map(function (el) {
        return el.shadowRoot;
      }).filter(Boolean);

      // console.log('[querySelectorAllShadows]', selector, el, `(${childShadows.length} shadowRoots)`);

      var childResults = childShadows.map(function (child) {
        return imageManager.querySelectorAllShadows(selector, child);
      });

      // fuse all results into singular, flat array
      var result = Array.from(el.querySelectorAll(selector));
      return result.concat(childResults).flat();
    }
  };
  var result = {
    images: imageManager.getUniqueImagesSrcs(),
    title: document.title,
    isTop: window.top == window.self,
    origin: window.location.origin
  };
  try {
    result.isArc = getComputedStyle(document.documentElement).getPropertyValue('--arc-palette-title');
  } catch (e) {
    // empty string
  }
  return result;
})();

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2VTY3JhcGVyLmpzIiwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7O0FBR0E7O0FBRUE7QUFBQTtBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBR0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2ltYWdleWUvLi9zcmMvbGVnYWN5L2ltYWdlU2NyYXBlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBTY3JhcCBpbWFnZXMgZnJvbSBhIHBhZ2Vcbi8vIENhbGxpbmcgYnkgcG9wdXAuanNcblxuKCgpID0+IHtcbiAgY29uc3QgSURfU0NSQVBJTkdfRlJBTUUgPSAnYmJmOThiOWQtN2E3Zi00OGZiLWE1YjItMDNjNDUzMzI5NjllJztcblxuICAvLyBpZ25vcmUgaWZyYW1lIGZvciBzY3JhcGluZyAoaW5pdElmcmFtZVNjcmFwZXIuanMpXG4gIGlmICh3aW5kb3cgIT09IHdpbmRvdy50b3AgJiYgd2luZG93LmZyYW1lRWxlbWVudD8uaWQgPT09IElEX1NDUkFQSU5HX0ZSQU1FKSByZXR1cm47XG5cbiAgLyoqXG4gICAqIENvbnZlcnQgU1ZHIHRleHQgaW50byBiYXNlNjQgdGV4dFxuICAgKiBAcGFyYW0gc3ZnVGV4dCAtIFNWRyB0YWcgaW4gc3RyaW5nIGZvcm1hdFxuICAgKiBAcmV0dXJuIHtzdHJpbmd9IC0gYmFzZTY0IHZlcnNpb24gb2YgU1ZHXG4gICAqL1xuICBmdW5jdGlvbiBzdmdUb0Jhc2U2NChzdmdUZXh0KSB7XG4gICAgaWYgKCFzdmdUZXh0KSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCBieXRlcyA9IG5ldyBUZXh0RW5jb2RlcigpLmVuY29kZShzdmdUZXh0KTtcbiAgICBjb25zdCBiaW5hcnkgPSBBcnJheS5mcm9tKGJ5dGVzLCBiID0+IFN0cmluZy5mcm9tQ2hhckNvZGUoYikpLmpvaW4oJycpO1xuICAgIHJldHVybiBgZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCwke2J0b2EoYmluYXJ5KX1gO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmRzIGFsbCBlbGVtZW50cyByZWZlcmVuY2VkIGJ5IHRoZSBTVkcgYW5kIGluY2x1ZGVzIHRoZW0gaW4gdGhlIFNWR1xuICAgKiBAcGFyYW0ge1NWR0VsZW1lbnR9IHN2ZyAtIFNWRyBlbGVtZW50XG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IC0gRnVsbCBTVkcgd2l0aCBleHRlcm5hbCByZWZlcmVuY2VzIGluY2x1ZGVkXG4gICAqL1xuICBmdW5jdGlvbiBnZXRDb21wbGV0ZVNWR1N0cmluZyhzdmcpIHtcbiAgICAvLyBDbG9uZSB0aGUgU1ZHIHRvIGF2b2lkIGNoYW5naW5nIHRoZSBvcmlnaW5hbFxuICAgIGNvbnN0IHN2Z0Nsb25lID0gc3ZnLmNsb25lTm9kZSh0cnVlKTtcbiAgICBjb25zdCByZWZlcmVuY2VkSWRzID0gbmV3IFNldCgpO1xuXG4gICAgLy8gRnVuY3Rpb24gdG8gZXh0cmFjdCBJRCBmcm9tIFVSTCAoZS5nLiB1cmwoI215SWQpIC0+IG15SWQpXG4gICAgZnVuY3Rpb24gZXh0cmFjdElkRnJvbVVybCh1cmwpIHtcbiAgICAgIGlmICghdXJsKSByZXR1cm4gbnVsbDtcbiAgICAgIGNvbnN0IG1hdGNoID0gdXJsLm1hdGNoKC91cmxcXChbJ1wiXT8jKFteJ1wiKV0rKVsnXCJdP1xcKS8pO1xuICAgICAgcmV0dXJuIG1hdGNoID8gbWF0Y2hbMV0gOiBudWxsO1xuICAgIH1cblxuICAgIC8vIEZ1bmN0aW9uIHRvIGV4dHJhY3QgSUQgZnJvbSBocmVmL3hsaW5rOmhyZWZcbiAgICBmdW5jdGlvbiBleHRyYWN0SWRGcm9tSHJlZihocmVmKSB7XG4gICAgICBpZiAoIWhyZWYpIHJldHVybiBudWxsO1xuICAgICAgcmV0dXJuIGhyZWYuc3RhcnRzV2l0aCgnIycpID8gaHJlZi5zdWJzdHJpbmcoMSkgOiBocmVmO1xuICAgIH1cblxuICAgIC8vIENvbGxlY3QgYWxsIHRoZSBJRHMgcmVmZXJlbmNlZCBieSB0aGUgU1ZHXG4gICAgZnVuY3Rpb24gY29sbGVjdFJlZmVyZW5jZWRJZHMoZWxlbWVudCkge1xuICAgICAgLy8gQ2hlY2tpbmcgaHJlZiBhbmQgeGxpbms6aHJlZlxuICAgICAgY29uc3QgaHJlZiA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdocmVmJykgfHwgZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3hsaW5rOmhyZWYnKTtcbiAgICAgIGlmIChocmVmICYmIGhyZWYuc3RhcnRzV2l0aCgnIycpKSB7XG4gICAgICAgIC8vIFJlcGxhY2VzIHhsaW5rOmhyZWYgd2l0aCBocmVmLCBhcyB0aGUgbGluayBiZWNvbWVzIGludGVybmFsXG4gICAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCd4bGluazpocmVmJyk7XG4gICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG5cbiAgICAgICAgY29uc3QgaWQgPSBleHRyYWN0SWRGcm9tSHJlZihocmVmKTtcbiAgICAgICAgaWYgKGlkKSByZWZlcmVuY2VkSWRzLmFkZChpZCk7XG4gICAgICB9XG5cbiAgICAgIC8vIENoZWNraW5nIHN0eWxlcyBmb3IgdXJsKCNpZClcbiAgICAgIGNvbnN0IHN0eWxlID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3N0eWxlJykgfHwgJyc7XG4gICAgICBjb25zdCBzdHlsZVVybElkID0gZXh0cmFjdElkRnJvbVVybChzdHlsZSk7XG4gICAgICBpZiAoc3R5bGVVcmxJZCkgcmVmZXJlbmNlZElkcy5hZGQoc3R5bGVVcmxJZCk7XG5cbiAgICAgIC8vIENoZWNraW5nIGNvbXB1dGVkIHN0eWxlc1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgY29tcHV0ZWRTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xuICAgICAgICBjb25zdCB7IGNsaXBQYXRoIH0gPSBjb21wdXRlZFN0eWxlO1xuICAgICAgICBjb25zdCB7IG1hc2sgfSA9IGNvbXB1dGVkU3R5bGU7XG4gICAgICAgIGNvbnN0IHsgZmlsdGVyIH0gPSBjb21wdXRlZFN0eWxlO1xuXG4gICAgICAgIFtjbGlwUGF0aCwgbWFzaywgZmlsdGVyXS5mb3JFYWNoKHByb3AgPT4ge1xuICAgICAgICAgIGlmIChwcm9wICYmIHByb3AgIT09ICdub25lJykge1xuICAgICAgICAgICAgY29uc3QgaWQgPSBleHRyYWN0SWRGcm9tVXJsKHByb3ApO1xuICAgICAgICAgICAgaWYgKGlkKSByZWZlcmVuY2VkSWRzLmFkZChpZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gSWdub3JpbmcgY29tcHV0ZWQgc3R5bGVzIGVycm9yc1xuICAgICAgfVxuXG4gICAgICAvLyBSZWN1cnNpdmVseSBjaGVjayBjaGlsZCBlbGVtZW50c1xuICAgICAgQXJyYXkuZnJvbShlbGVtZW50LmNoaWxkcmVuKS5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgICAgY29sbGVjdFJlZmVyZW5jZWRJZHMoY2hpbGQpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3ZnQ2xvbmUuc2V0QXR0cmlidXRlKCd4bWxucycsICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycpO1xuXG4gICAgLy8gQ29sbGVjdGluZyBhbGwgbGlua3MgZnJvbSB0aGUgY2xvbmVkIFNWR1xuICAgIGNvbGxlY3RSZWZlcmVuY2VkSWRzKHN2Z0Nsb25lKTtcblxuICAgIC8vIEZpbmQgYWxsIGVsZW1lbnRzIHJlZmVyZW5jZWQgYnkgU1ZHXG4gICAgY29uc3QgcmVmZXJlbmNlZEVsZW1lbnRzID0gW107XG4gICAgcmVmZXJlbmNlZElkcy5mb3JFYWNoKGlkID0+IHtcbiAgICAgIC8vIEZpbmRpbmcgYW4gZWxlbWVudCBpbiBhIGRvY3VtZW50XG4gICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgICAgaWYgKGVsZW1lbnQgJiYgZWxlbWVudCAhPT0gc3ZnICYmICFzdmcuY29udGFpbnMoZWxlbWVudCkpIHtcbiAgICAgICAgLy8gQ2xvbmUgYW4gZWxlbWVudCB0byBpbmNsdWRlIGl0IGluIHRoZSBTVkdcbiAgICAgICAgY29uc3QgY2xvbmVkRWxlbWVudCA9IGVsZW1lbnQuY2xvbmVOb2RlKHRydWUpO1xuICAgICAgICAvLyBNYWtlIHN1cmUgdGhlIGNsb25lIGhhcyBhbiBJRFxuICAgICAgICBjbG9uZWRFbGVtZW50LnNldEF0dHJpYnV0ZSgnaWQnLCBpZCk7XG4gICAgICAgIHJlZmVyZW5jZWRFbGVtZW50cy5wdXNoKGNsb25lZEVsZW1lbnQpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gSWYgdGhlcmUgYXJlIGV4dGVybmFsIGxpbmtzLCBhZGQgdGhlbSB0byA8ZGVmcz5cbiAgICBpZiAocmVmZXJlbmNlZEVsZW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgIGxldCBkZWZzID0gc3ZnQ2xvbmUucXVlcnlTZWxlY3RvcignZGVmcycpO1xuICAgICAgaWYgKCFkZWZzKSB7XG4gICAgICAgIGRlZnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ2RlZnMnKTtcbiAgICAgICAgc3ZnQ2xvbmUuaW5zZXJ0QmVmb3JlKGRlZnMsIHN2Z0Nsb25lLmZpcnN0Q2hpbGQpO1xuICAgICAgfVxuXG4gICAgICAvLyBBZGQgYWxsIGZvdW5kIGVsZW1lbnRzIHRvIGRlZnNcbiAgICAgIHJlZmVyZW5jZWRFbGVtZW50cy5mb3JFYWNoKGVsZW0gPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIC8vIFdlIGNoZWNrIGlmIHN1Y2ggYW4gZWxlbWVudCBhbHJlYWR5IGV4aXN0cyBpbiBkZWZzXG4gICAgICAgICAgaWYgKCFkZWZzLnF1ZXJ5U2VsZWN0b3IoYCMke2VsZW0uaWR9YCkpIHtcbiAgICAgICAgICAgIGRlZnMuYXBwZW5kQ2hpbGQoZWxlbSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgLy8gSWdub3JlIGVycm9ycyBkdXJpbmcgYXBwZW5kaW5nXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBzdmdDbG9uZS5vdXRlckhUTUw7XG4gIH1cblxuICB2YXIgaW1hZ2VNYW5hZ2VyID0ge1xuICAgIGltYWdlVHlwZToge1xuICAgICAgSU1HOiAnSU1HJyxcbiAgICAgIFRFWFQ6ICdURVhUJyxcbiAgICAgIExJTks6ICdMSU5LJyxcbiAgICAgIElOUFVUX0lNRzogJ0lOUFVUX0lNRycsXG4gICAgICBCQUNLR1JPVU5EOiAnQkFDS0dST1VORCcsXG4gICAgICBEQVRBVVJMOiAnREFUQVVSTCcsXG4gICAgfSxcbiAgICBpbWdMaXN0OiBbXSxcbiAgICBnZXRJbWFnZXMoKSB7XG4gICAgICB0aGlzLmltZ0xpc3QgPSBbXTtcbiAgICAgIGxldCBpbWdzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2ltZycpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbWdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBpbWcgPSBpbWdzW2ldO1xuICAgICAgICB2YXIgbmV3SW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgIG5ld0ltZy5zcmMgPSBpbWcuc3JjO1xuICAgICAgICB2YXIgd2lkdGggPSAwO1xuICAgICAgICB2YXIgaGVpZ2h0ID0gMDtcbiAgICAgICAgd2lkdGggPSBwYXJzZUludChpbWcubmF0dXJhbFdpZHRoKTtcbiAgICAgICAgaGVpZ2h0ID0gcGFyc2VJbnQoaW1nLm5hdHVyYWxIZWlnaHQpO1xuICAgICAgICBud2lkdGggPSBwYXJzZUludChuZXdJbWcud2lkdGgpO1xuICAgICAgICBuaGVpZ2h0ID0gcGFyc2VJbnQobmV3SW1nLmhlaWdodCk7XG4gICAgICAgIHdpZHRoID0gbndpZHRoID4gd2lkdGggPyBud2lkdGggOiB3aWR0aDtcbiAgICAgICAgaGVpZ2h0ID0gbmhlaWdodCA+IGhlaWdodCA/IG5oZWlnaHQgOiBoZWlnaHQ7XG4gICAgICAgIHRoaXMuYWRkSW1nKGltYWdlTWFuYWdlci5pbWFnZVR5cGUuSU1HLCBpbWcuc3JjLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgIH1cbiAgICAgIGltZ3MgPSBkb2N1bWVudC5pbWFnZXM7XG4gICAgICBpZiAoaW1ncyAmJiBpbWdzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbWdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHZhciBpbWcgPSBpbWdzW2ldO1xuICAgICAgICAgICAgdmFyIG5ld0ltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgICAgbmV3SW1nLnNyYyA9IGltZy5jdXJyZW50U3JjO1xuICAgICAgICAgICAgdmFyIHdpZHRoID0gMDtcbiAgICAgICAgICAgIHZhciBoZWlnaHQgPSAwO1xuICAgICAgICAgICAgd2lkdGggPSBwYXJzZUludChpbWcubmF0dXJhbFdpZHRoKTtcbiAgICAgICAgICAgIGhlaWdodCA9IHBhcnNlSW50KGltZy5uYXR1cmFsSGVpZ2h0KTtcbiAgICAgICAgICAgIG53aWR0aCA9IHBhcnNlSW50KG5ld0ltZy53aWR0aCk7XG4gICAgICAgICAgICBuaGVpZ2h0ID0gcGFyc2VJbnQobmV3SW1nLmhlaWdodCk7XG4gICAgICAgICAgICB3aWR0aCA9IG53aWR0aCA+IHdpZHRoID8gbndpZHRoIDogd2lkdGg7XG4gICAgICAgICAgICBoZWlnaHQgPSBuaGVpZ2h0ID4gaGVpZ2h0ID8gbmhlaWdodCA6IGhlaWdodDtcbiAgICAgICAgICAgIG5ld0ltZyA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLmFkZEltZyhpbWFnZU1hbmFnZXIuaW1hZ2VUeXBlLklNRywgaW1nLmN1cnJlbnRTcmMsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRyeSB7XG4gICAgICAgIGltZ3MgPSBpbWFnZU1hbmFnZXIucXVlcnlTZWxlY3RvckFsbFNoYWRvd3MoJ2ltZycpO1xuICAgICAgICBpZiAoaW1ncyAmJiBpbWdzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGltZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIHZhciBpbWcgPSBpbWdzW2ldO1xuICAgICAgICAgICAgICB2YXIgbmV3SW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgICAgIG5ld0ltZy5zcmMgPSBpbWcuY3VycmVudFNyYztcbiAgICAgICAgICAgICAgdmFyIHdpZHRoID0gMDtcbiAgICAgICAgICAgICAgdmFyIGhlaWdodCA9IDA7XG4gICAgICAgICAgICAgIHdpZHRoID0gcGFyc2VJbnQoaW1nLm5hdHVyYWxXaWR0aCk7XG4gICAgICAgICAgICAgIGhlaWdodCA9IHBhcnNlSW50KGltZy5uYXR1cmFsSGVpZ2h0KTtcbiAgICAgICAgICAgICAgbndpZHRoID0gcGFyc2VJbnQobmV3SW1nLndpZHRoKTtcbiAgICAgICAgICAgICAgbmhlaWdodCA9IHBhcnNlSW50KG5ld0ltZy5oZWlnaHQpO1xuICAgICAgICAgICAgICB3aWR0aCA9IG53aWR0aCA+IHdpZHRoID8gbndpZHRoIDogd2lkdGg7XG4gICAgICAgICAgICAgIGhlaWdodCA9IG5oZWlnaHQgPiBoZWlnaHQgPyBuaGVpZ2h0IDogaGVpZ2h0O1xuICAgICAgICAgICAgICBuZXdJbWcgPSBudWxsO1xuICAgICAgICAgICAgICB0aGlzLmFkZEltZyhpbWFnZU1hbmFnZXIuaW1hZ2VUeXBlLklNRywgaW1nLmN1cnJlbnRTcmMsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge31cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gZXhwZXJpbWVudGFsIGZlYXR1cmUgbGV0cyBjYXRjaCBldmVyeXRoaW5nXG4gICAgICB9XG4gICAgICBjb25zdCBzb3VyY2VzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NvdXJjZScpO1xuICAgICAgaWYgKHNvdXJjZXMgJiYgc291cmNlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc291cmNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBzb3VyY2UgPSBzb3VyY2VzW2ldO1xuICAgICAgICAgICAgaWYgKCFzb3VyY2Uuc3Jjc2V0KSBjb250aW51ZTtcbiAgICAgICAgICAgIHZhciBuZXdJbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgIG5ld0ltZy5zcmMgPSBzb3VyY2Uuc3Jjc2V0O1xuICAgICAgICAgICAgdmFyIHdpZHRoID0gcGFyc2VJbnQobmV3SW1nLm5hdHVyYWxXaWR0aCk7XG4gICAgICAgICAgICB2YXIgaGVpZ2h0ID0gcGFyc2VJbnQobmV3SW1nLm5hdHVyYWxIZWlnaHQpO1xuICAgICAgICAgICAgbndpZHRoID0gcGFyc2VJbnQobmV3SW1nLndpZHRoKTtcbiAgICAgICAgICAgIG5oZWlnaHQgPSBwYXJzZUludChuZXdJbWcuaGVpZ2h0KTtcbiAgICAgICAgICAgIHdpZHRoID0gbndpZHRoID4gd2lkdGggPyBud2lkdGggOiB3aWR0aDtcbiAgICAgICAgICAgIGhlaWdodCA9IG5oZWlnaHQgPiBoZWlnaHQgPyBuaGVpZ2h0IDogaGVpZ2h0O1xuICAgICAgICAgICAgdGhpcy5hZGRJbWcoaW1hZ2VNYW5hZ2VyLmltYWdlVHlwZS5JTUcsIG5ld0ltZy5zcmMsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICAgICAgbmV3SW1nID0gbnVsbDtcbiAgICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHNyY3NldHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbWdbc3Jjc2V0XScpO1xuICAgICAgaWYgKHNyY3NldHMgJiYgc3Jjc2V0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3Jjc2V0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgaW1nID0gc3Jjc2V0c1tpXTtcbiAgICAgICAgICAgIGlmICghaW1nLnNyY3NldCkgY29udGludWU7XG4gICAgICAgICAgICBjb25zdCBzcmNzZXQgPSBpbWcuc3Jjc2V0LnNwbGl0KCcsICcpO1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzcmNzZXQubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB2YXIgc3JjID0gc3Jjc2V0W2pdO1xuICAgICAgICAgICAgICAgIHNyYyA9IHNyYy5zdWJzdHJpbmcoMCwgc3JjLmluZGV4T2YoJyAnKSAhPSAtMSA/IHNyYy5pbmRleE9mKCcgJykgOiBzcmMubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICB2YXIgbmV3SW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgICAgICAgbmV3SW1nLnNyYyA9IHNyYztcbiAgICAgICAgICAgICAgICBzcmMgPSBuZXdJbWcuc3JjO1xuICAgICAgICAgICAgICAgIHZhciB3aWR0aCA9IHBhcnNlSW50KG5ld0ltZy5uYXR1cmFsV2lkdGgpO1xuICAgICAgICAgICAgICAgIHZhciBoZWlnaHQgPSBwYXJzZUludChuZXdJbWcubmF0dXJhbEhlaWdodCk7XG4gICAgICAgICAgICAgICAgbndpZHRoID0gcGFyc2VJbnQobmV3SW1nLndpZHRoKTtcbiAgICAgICAgICAgICAgICBuaGVpZ2h0ID0gcGFyc2VJbnQobmV3SW1nLmhlaWdodCk7XG4gICAgICAgICAgICAgICAgd2lkdGggPSBud2lkdGggPiB3aWR0aCA/IG53aWR0aCA6IHdpZHRoO1xuICAgICAgICAgICAgICAgIGhlaWdodCA9IG5oZWlnaHQgPiBoZWlnaHQgPyBuaGVpZ2h0IDogaGVpZ2h0O1xuICAgICAgICAgICAgICAgIG5ld0ltZyA9IG51bGw7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYGFkZGluZyBpbWcgZnJvbSBzcmNzZXQ6ICR7c3JjfSB3OiAke3dpZHRofSBoOiR7aGVpZ2h0fWApO1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkSW1nKGltYWdlTWFuYWdlci5pbWFnZVR5cGUuSU1HLCBzcmMsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignY2Fubm90IGFkZCBpbWFnZSBvZiBzcmNzZXQ6ICcpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBjYXRjaCAoZSkge31cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBpbnB1dHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW5wdXQnKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5wdXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGlucHV0ID0gaW5wdXRzW2ldO1xuICAgICAgICBjb25zdCB7IHR5cGUgfSA9IGlucHV0O1xuICAgICAgICBpZiAodHlwZS50b1VwcGVyQ2FzZSgpID09ICdJTUFHRScpIHtcbiAgICAgICAgICB2YXIgeyBzcmMgfSA9IGlucHV0O1xuICAgICAgICAgIHRoaXMuYWRkSW1nKGltYWdlTWFuYWdlci5pbWFnZVR5cGUuSU5QVVRfSU1HLCBzcmMsIDAsIDApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb25zdCBsaW5rcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdhJyk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpbmtzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGxpbmsgPSBsaW5rc1tpXTtcbiAgICAgICAgY29uc3QgeyBocmVmIH0gPSBsaW5rO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgaHJlZi5lbmRzV2l0aCgnLmpwZycpIHx8XG4gICAgICAgICAgaHJlZi5lbmRzV2l0aCgnLmpwZWcnKSB8fFxuICAgICAgICAgIGhyZWYuZW5kc1dpdGgoJy5ibXAnKSB8fFxuICAgICAgICAgIGhyZWYuZW5kc1dpdGgoJy5pY28nKSB8fFxuICAgICAgICAgIGhyZWYuZW5kc1dpdGgoJy5naWYnKSB8fFxuICAgICAgICAgIGhyZWYuZW5kc1dpdGgoJy5wbmcnKVxuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLmFkZEltZyhpbWFnZU1hbmFnZXIuaW1hZ2VUeXBlLkxJTkssIGhyZWYsIDAsIDApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb25zdCBzdmdzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3N2ZycpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3Qgc3ZnID0gc3Znc1tpXTtcbiAgICAgICAgICBjb25zdCBzdmdTdHJpbmcgPSBnZXRDb21wbGV0ZVNWR1N0cmluZyhzdmcpO1xuICAgICAgICAgIGNvbnN0IGRhdGFVcmwgPSBzdmdUb0Jhc2U2NChzdmdTdHJpbmcpO1xuICAgICAgICAgIHRoaXMuYWRkSW1nKGltYWdlTWFuYWdlci5pbWFnZVR5cGUuREFUQVVSTCwgZGF0YVVybCwgMCwgMCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHsgXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxldCB1cmw7XG4gICAgICBsZXQgQiA9IFtdO1xuICAgICAgbGV0IEEgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnKicpO1xuICAgICAgQSA9IEIuc2xpY2UuY2FsbChBLCAwLCBBLmxlbmd0aCk7XG4gICAgICB3aGlsZSAoQS5sZW5ndGgpIHtcbiAgICAgICAgdXJsID0gaW1hZ2VNYW5hZ2VyLmRlZXBDc3MoQS5zaGlmdCgpLCAnYmFja2dyb3VuZC1pbWFnZScpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmICh1cmwgJiYgdXJsICE9ICdub25lJykge1xuICAgICAgICAgICAgdmFyIHJlID0gL3VybFxcKFsnXCJdPyhbXlwiKV0rKS9nO1xuICAgICAgICAgICAgdmFyIG1hdGNoZXM7XG4gICAgICAgICAgICB3aGlsZSAoKG1hdGNoZXMgPSByZS5leGVjKHVybCkpICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgdmFyIHNyYyA9IG1hdGNoZXNbMV07XG4gICAgICAgICAgICAgIGlmIChzcmMgJiYgaW1hZ2VNYW5hZ2VyLmFycmF5SW5kZXhPZihCLCBzcmMpID09IC0xKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5ld0ltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgICAgICAgIG5ld0ltZy5zcmMgPSBzcmM7XG4gICAgICAgICAgICAgICAgc3JjID0gbmV3SW1nLnNyYztcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEltZyhpbWFnZU1hbmFnZXIuaW1hZ2VUeXBlLkJBQ0tHUk9VTkQsIHNyYywgMCwgMCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdjYW5ub3QgYWRkIGltYWdlIGJhY2tncm91bmQtaW1hZ2UnKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB1cmwsIChCID0gW10pLCAoQSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCcqJykpO1xuICAgICAgQSA9IEIuc2xpY2UuY2FsbChBLCAwLCBBLmxlbmd0aCk7XG4gICAgICB3aGlsZSAoQS5sZW5ndGgpIHtcbiAgICAgICAgdXJsID0gaW1hZ2VNYW5hZ2VyLmRlZXBDc3MoQS5zaGlmdCgpLCAnYmFja2dyb3VuZCcpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmICh1cmwgJiYgdXJsICE9ICdub25lJykge1xuICAgICAgICAgICAgdmFyIHJlID0gL3VybFxcKFsnXCJdPyhbXlwiKV0rKS9nO1xuICAgICAgICAgICAgdmFyIG1hdGNoZXM7XG4gICAgICAgICAgICB3aGlsZSAoKG1hdGNoZXMgPSByZS5leGVjKHVybCkpICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgdmFyIHNyYyA9IG1hdGNoZXNbMV07XG4gICAgICAgICAgICAgIGlmIChzcmMgJiYgaW1hZ2VNYW5hZ2VyLmFycmF5SW5kZXhPZihCLCBzcmMpID09IC0xKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5ld0ltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgICAgICAgIG5ld0ltZy5zcmMgPSBzcmM7XG4gICAgICAgICAgICAgICAgc3JjID0gbmV3SW1nLnNyYztcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEltZyhpbWFnZU1hbmFnZXIuaW1hZ2VUeXBlLkJBQ0tHUk9VTkQsIHNyYywgMCwgMCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdjYW5ub3QgYWRkIGltYWdlIGJhY2tncm91bmQtaW1hZ2UnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgdXJscyA9IGRvY3VtZW50LmJvZHkuaW5uZXJIVE1MXG4gICAgICAgICAgLm1hdGNoKC9odHRwcz86XFwvXFwvKHd3d1xcLik/Wy1hLXpBLVowLTlAOiUuX1xcK34jPV17MiwyNTZ9XFwuW2Etel17Miw0fVxcYihbLWEtekEtWjAtOUA6JV9cXCsufiM/Ly89XSopL2dpKVxuICAgICAgICAgIC5maWx0ZXIoKGl0bSwgaSwgYSkgPT4gaSA9PSBhLmluZGV4T2YoaXRtKSk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdXJscy5sZW5ndGg7IGkrKylcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICB1cmxzW2ldLm1hdGNoKFxuICAgICAgICAgICAgICAvLiooXFwucG5nfFxcLnN2Z3xcXC5qcGd8XFwuZ2lmfFxcLmpwZWd8XFwuYm1wfFxcLmljb3xcXC53ZWJwfFxcLnRpZnxcXC5hcG5nfFxcLmpmaWZ8XFwucGpwZWd8XFwucGpwKS4qL2ksXG4gICAgICAgICAgICApICE9IG51bGxcbiAgICAgICAgICApXG4gICAgICAgICAgICB0aGlzLmFkZEltZyhpbWFnZU1hbmFnZXIuaW1hZ2VUeXBlLkxJTkssIHVybHNbaV0sIDAsIDApO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhgZ2V0SW1hZ2VzIGVycm9yIHJldHJlaXZpbmcgaW1hZ2VzIGJ5IHVybDogJHtlfWApO1xuICAgICAgfVxuICAgICAgLy8gbW92ZSBwb3B1cCBpbnRvIGh0bWwgb2YgdGhlIHBhZ2VcbiAgICAgIC8qIGh0dHBzOi8vZ2l0aHViLmNvbS9taXRjaGFzL0tleWZyYW1lcy5hcHAvdHJlZS9tYXN0ZXIvS2V5ZnJhbWVzLmFwcCUyMChFeHRlbnNpb24pL2pzXG4gICAgJC5nZXQoY2hyb21lLmV4dGVuc2lvbi5nZXRVUkwoJ3BvcHVwLmh0bWwnKSwgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgZGVidWdnZXI7XG4gICAgICAgICQoXCJib2R5XCIpLmFwcGVuZChkYXRhKTtcbiAgICB9KTtcbiAgICAqL1xuICAgICAgcmV0dXJuIHRoaXMuaW1nTGlzdDtcbiAgICB9LFxuICAgIGFkZEltZyhkLCBmLCBjLCBhKSB7XG4gICAgICB0aGlzLmltZ0xpc3QucHVzaCh7XG4gICAgICAgIHR5cGU6IGQsXG4gICAgICAgIHNyYzogZixcbiAgICAgICAgd2lkdGg6IGMsXG4gICAgICAgIGhlaWdodDogYSxcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgZ2V0VW5pcXVlSW1hZ2VzU3JjcygpIHtcbiAgICAgIGNvbnN0IGltYWdlcyA9IGltYWdlTWFuYWdlci5nZXRJbWFnZXMoKTtcbiAgICAgIGNvbnN0IGltYWdlc1N0ckFycmF5ID0gbmV3IEFycmF5KCk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGltYWdlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpbWFnZXNTdHJBcnJheVtpbWFnZXNTdHJBcnJheS5sZW5ndGhdID0gaW1hZ2VzW2ldLnNyYztcbiAgICAgIH1cbiAgICAgIGNvbnN0IHVuaXF1ZXMgPSBpbWFnZXNTdHJBcnJheVxuICAgICAgICAucmV2ZXJzZSgpXG4gICAgICAgIC5maWx0ZXIoKGUsIGksIGFycikgPT4gYXJyLmluZGV4T2YoZSwgaSArIDEpID09PSAtMSlcbiAgICAgICAgLnJldmVyc2UoKTtcbiAgICAgIHJldHVybiB1bmlxdWVzO1xuICAgIH0sXG4gICAgZGVlcENzcyh3aG8sIGNzcykge1xuICAgICAgaWYgKCF3aG8gfHwgIXdoby5zdHlsZSkgcmV0dXJuICcnO1xuICAgICAgY29uc3Qgc3R5ID0gY3NzLnJlcGxhY2UoL1xcLShbYS16XSkvZywgKGEsIGIpID0+IGIudG9VcHBlckNhc2UoKSk7XG4gICAgICBpZiAod2hvLmN1cnJlbnRTdHlsZSkge1xuICAgICAgICByZXR1cm4gd2hvLnN0eWxlW3N0eV0gfHwgd2hvLmN1cnJlbnRTdHlsZVtzdHldIHx8ICcnO1xuICAgICAgfVxuICAgICAgY29uc3QgZHYgPSBkb2N1bWVudC5kZWZhdWx0VmlldyB8fCB3aW5kb3c7XG4gICAgICByZXR1cm4gd2hvLnN0eWxlW3N0eV0gfHwgZHYuZ2V0Q29tcHV0ZWRTdHlsZSh3aG8sICcnKS5nZXRQcm9wZXJ0eVZhbHVlKGNzcykgfHwgJyc7XG4gICAgfSxcbiAgICBhcnJheUluZGV4T2YoYXJyYXksIHdoYXQsIGluZGV4KSB7XG4gICAgICBpbmRleCA9IGluZGV4IHx8IDA7XG4gICAgICBjb25zdCBMID0gYXJyYXkubGVuZ3RoO1xuICAgICAgd2hpbGUgKGluZGV4IDwgTCkge1xuICAgICAgICBpZiAoYXJyYXlbaW5kZXhdID09PSB3aGF0KSByZXR1cm4gaW5kZXg7XG4gICAgICAgICsraW5kZXg7XG4gICAgICB9XG4gICAgICByZXR1cm4gLTE7XG4gICAgfSxcbiAgICBxdWVyeVNlbGVjdG9yQWxsU2hhZG93cyhzZWxlY3RvciwgZWwgPSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICAvLyByZWN1cnNlIG9uIGNoaWxkU2hhZG93c1xuICAgICAgY29uc3QgY2hpbGRTaGFkb3dzID0gQXJyYXkuZnJvbShlbC5xdWVyeVNlbGVjdG9yQWxsKCcqJykpXG4gICAgICAgIC5tYXAoZWwgPT4gZWwuc2hhZG93Um9vdClcbiAgICAgICAgLmZpbHRlcihCb29sZWFuKTtcblxuICAgICAgLy8gY29uc29sZS5sb2coJ1txdWVyeVNlbGVjdG9yQWxsU2hhZG93c10nLCBzZWxlY3RvciwgZWwsIGAoJHtjaGlsZFNoYWRvd3MubGVuZ3RofSBzaGFkb3dSb290cylgKTtcblxuICAgICAgY29uc3QgY2hpbGRSZXN1bHRzID0gY2hpbGRTaGFkb3dzLm1hcChjaGlsZCA9PiBpbWFnZU1hbmFnZXIucXVlcnlTZWxlY3RvckFsbFNoYWRvd3Moc2VsZWN0b3IsIGNoaWxkKSk7XG5cbiAgICAgIC8vIGZ1c2UgYWxsIHJlc3VsdHMgaW50byBzaW5ndWxhciwgZmxhdCBhcnJheVxuICAgICAgY29uc3QgcmVzdWx0ID0gQXJyYXkuZnJvbShlbC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XG4gICAgICByZXR1cm4gcmVzdWx0LmNvbmNhdChjaGlsZFJlc3VsdHMpLmZsYXQoKTtcbiAgICB9LFxuICB9O1xuXG4gIGNvbnN0IHJlc3VsdCA9IHtcbiAgICBpbWFnZXM6IGltYWdlTWFuYWdlci5nZXRVbmlxdWVJbWFnZXNTcmNzKCksXG4gICAgdGl0bGU6IGRvY3VtZW50LnRpdGxlLFxuICAgIGlzVG9wOiB3aW5kb3cudG9wID09IHdpbmRvdy5zZWxmLFxuICAgIG9yaWdpbjogd2luZG93LmxvY2F0aW9uLm9yaWdpbixcbiAgfTtcblxuICB0cnkge1xuICAgIHJlc3VsdC5pc0FyYyA9IGdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KS5nZXRQcm9wZXJ0eVZhbHVlKCctLWFyYy1wYWxldHRlLXRpdGxlJyk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICAvLyBlbXB0eSBzdHJpbmdcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59KSgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9