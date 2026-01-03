export const hijackObjectURL = () => {
  const blobs = new Map();
  const createObjectURL_ = window.URL.createObjectURL;
  window.URL.createObjectURL = (blob) => {
    if (!blobs.has(blob)) {
      const url = createObjectURL_.apply(window, [blob]);
      blobs.set(blob, url);
    }
    return blobs.get(blob);
  };
};
