import { Budget } from "./../Model/Budget";

export abstract class View {
  constructor(public parent: Element) {}

  abstract template(): string;
  abstract eventsMap(): { [key: string]: (event: Event) => void };

  eventsBind(fragment: DocumentFragment): void {
    const eventDetail = this.eventsMap();

    for (let key in eventDetail) {
      const [eventName, selector] = key.split(":");

      fragment.querySelectorAll(selector).forEach(element => {
        element.addEventListener(eventName, eventDetail[key]);
      });
    }
  }

  render(): void {
    const template = document.createElement("template");

    template.innerHTML = this.template();

    //binding event
    this.eventsBind(template.content);

    this.parent.append(template.content);
  }
}
