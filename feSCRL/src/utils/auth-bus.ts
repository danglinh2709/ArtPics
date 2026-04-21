type Listener = () => void;
let listeners: Listener[] = [];

export const authBus = {
  /**
   * Subscribe to unauthorized events (401)
   * @param callback Function to call when 401 occurs
   * @returns Unsubscribe function
   */
  onUnauthorized(callback: Listener) {
    listeners.push(callback);
    return () => {
      listeners = listeners.filter((l) => l !== callback);
    };
  },

  /**
   * Emit an unauthorized event
   */
  emitUnauthorized() {
    listeners.forEach((l) => l());
  },
};
