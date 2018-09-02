const IMG_SRC_REGEX = new RegExp('<img.*?src=')

export class ImageUpload {
  constructor(quill, options) {
    this.quill = quill;

    // if onChange defined, use it, else use function that promises null.
    // this allows user to redefine `onChange` later, if desired
    this.onChange = options.onChange || (() => Promise.resolve(null));

    // loop over img tags that have base64 content and call `onChange` on them
    const update = () => this.getBase64Images().forEach(img => {
      let src = img.attributes.src.value;
      img.classList.add('l-convert-doing')
      Promise.resolve(this.onChange(src)).then(href => {
        if (!href) throw new Error("No href returned from `onChange`");

        img.classList.remove('l-convert-doing')
        img.classList.add('l-convert-done')
        img.attributes.src.value = href;
      }).catch(err => {
        console.log(`Caught error: ${err.message}`);

        // if an error occurs (e.g. when `onChange` didn't return an href)
        // resolve with null
        return Promise.resolve(null);
      });
    });

    // when a quill updates, check for new images
    quill.on('text-change', update);

    // Check for images when a quill is created
    update();
  }

  getBase64Images() {
    let imgs = this.quill.container.querySelectorAll('img[src^="data:"]:not(.l-convert-done):not(.l-convert-doing)')
    return imgs ? Array.prototype.slice.call(imgs) : [];
  }
}
