import { safeGetString } from '@core';
/* eslint-disable @typescript-eslint/naming-convention */
export class BookMetadataModel {
  title: string;
  creator: string;
  description: string;
  pubdate: string;
  publisher: string;
  identifier: string;
  language: string;
  rights: string;
  modified_date: string;
  layout: string;
  orientation: string;
  flow: string;
  viewport: string;
  media_active_class: string;
  spread: string;
  direction: any;
  constructor(
    title: string,
    creator: string,
    description: string,
    pubdate: string,
    publisher: string,
    identifier: string,
    language: string,
    rights: string,
    modified_date: string,
    layout: string,
    orientation: string,
    flow: string,
    viewport: string,
    media_active_class: string,
    spread: string,
    direction: any
  ) {
    this.title = title;
    this.creator = creator;
    this.description = description;
    this.pubdate = pubdate;
    this.publisher = publisher;
    this.identifier = identifier;
    this.language = language;
    this.rights = rights;
    this.modified_date = modified_date;
    this.layout = layout;
    this.orientation = orientation;
    this.flow = flow;
    this.viewport = viewport;
    this.media_active_class = media_active_class;
    this.spread = spread;
    this.direction = direction;
  }

  public static instantiate = (json: any) => {
    const title = safeGetString(json, 'title', '');
    const creator = safeGetString(json, 'creator', '');
    const description = safeGetString(json, 'description', '');
    const pubdate = safeGetString(json, 'pubdate', '');
    const publisher = safeGetString(json, 'publisher', '');
    const identifier = safeGetString(json, 'identifier', '');
    const language = safeGetString(json, 'language', '');
    const rights = safeGetString(json, 'rights', '');
    const modified_date = safeGetString(json, 'modified_date', '');
    const layout = safeGetString(json, 'layout', '');
    const orientation = safeGetString(json, 'orientation', '');
    const flow = safeGetString(json, 'flow', '');
    const viewport = safeGetString(json, 'viewport', '');
    const media_active_class = safeGetString(json, 'media_active_class', '');
    const spread = safeGetString(json, 'spread', '');
    const direction = safeGetString(json, 'direction', '');
    return new BookMetadataModel(
      title,
      creator,
      description,
      pubdate,
      publisher,
      identifier,
      language,
      rights,
      modified_date,
      layout,
      orientation,
      flow,
      viewport,
      media_active_class,
      spread,
      direction
    );
  };
}
