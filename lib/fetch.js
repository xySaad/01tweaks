export const hijackFetch = () => {
  window.fetchNoCatch = window.fetch;
  const listeners = new Set();

  window.onFetch = (ln) => listeners.add(ln);

  window.fetch = async (...args) => {
    const context = { args, response: null };

    try {
      for (const listener of listeners) {
        if (listener.request) await listener.request(context);
      }
    } catch (error) {
      console.error(error);
    }

    if (!context.response) {
      context.response = await window.fetchNoCatch.apply(window, context.args);
    }

    try {
      for (const listener of listeners) {
        if (listener.response) await listener.response(context);
      }
    } catch (error) {
      console.error(error);
    }

    return context.response;
  };
};
