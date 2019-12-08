type callback = () => void;

export class Eventing {
  events: { [key: string]: callback[] } = {};

  //registering events
  on = (eventName: string, callback: callback): void => {
    const handler = this.events[eventName] || [];
    handler.push(callback);
    this.events[eventName] = handler;
  };

  //trigger event
  trigger = (eventName: string) => {
    this.events[eventName].forEach((callback: callback) => {
      callback();
    });
  };
}
