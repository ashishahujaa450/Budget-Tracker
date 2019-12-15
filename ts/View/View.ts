import { Budget } from "./../Model/Budget";

export abstract class View<T extends Budget> {
  constructor(public parent: Element, public model: Budget) {
    this.checkChange();
  }

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

  checkChange(): void {
    this.model.on("change", () => {
      this.render();
    });
  }

  validator = (value: string): boolean => {
    if (value && value.length) {
      return true;
    } else {
      return false;
    }
  };

  render(): void {
    this.parent.innerHTML = "";
    const template = document.createElement("template");

    template.innerHTML = this.template();

    //binding event
    this.eventsBind(template.content);

    this.parent.append(template.content);
  }
}
