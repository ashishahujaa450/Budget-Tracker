import { Budget } from "./../Model/Budget";

export abstract class View<T extends Budget> {
  regions: { [key: string]: Element } = {};

  constructor(public parent: Element, public model: Budget) {
    this.checkChange();
  }

  abstract template(): string;
  abstract eventsMap(): { [key: string]: (event: Event) => void };

  regionsMap = (): { [key: string]: string } => {
    return {};
  };

  eventsBind(fragment: DocumentFragment): void {
    const eventDetail = this.eventsMap();

    for (let key in eventDetail) {
      const [eventName, selector] = key.split(":");

      fragment.querySelectorAll(selector).forEach(element => {
        element.addEventListener(eventName, eventDetail[key]);
      });
    }
  }

  mapRegions = (fragment: DocumentFragment): void => {
    const regionsMap = this.regionsMap();
    for (let key in regionsMap) {
      const selector = regionsMap[key];

      const element = fragment.querySelector(selector);

      if (element) {
        this.regions[key] = element;
      }
    }
  };

  onRender(): void {}

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

    //creating template
    const template = document.createElement("template");
    template.innerHTML = this.template();

    //binding event
    this.eventsBind(template.content);

    //region
    this.mapRegions(template.content);

    //render all views nesting
    this.onRender();

    //appending html
    this.parent.append(template.content);
  }
}
