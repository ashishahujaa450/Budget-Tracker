type callback = () => void;

export class Eventing {
  private events: { [key: string]: callback[] } = {};

  //registering events
  public on = (eventName: string, callback: callback): void => {
    const handler = this.events[eventName] || [];
    handler.push(callback);
    this.events[eventName] = handler;
  };

  //trigger event
  public trigger = (eventName: string) => {
    const handler = this.events[eventName];

    if (handler) {
      handler.forEach((callback: callback) => {
        callback();
      });
    } else {
      throw new Error("event not found");
    }
  };
}
